# BACKEND_INTEGRATION_PLAN.md

Este documento define o plano completo para integração do VicSic com Supabase backend.

## 📋 **Visão Geral**

O VicSic é um sistema de gestão para clínicas psiquiátricas que atualmente funciona com dados mock. Este plano estabelece a migração completa para um backend Supabase robusto e seguro.

## 🗄️ **Schema do Banco de Dados Supabase**

### **1. Tabela `users` (Psicólogos/Administradores)**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  crm VARCHAR UNIQUE,
  user_type VARCHAR CHECK (user_type IN ('admin', 'normal')) DEFAULT 'normal',
  status VARCHAR CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  phone VARCHAR,
  address TEXT,
  avatar_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_type ON users(user_type);
```

### **2. Tabela `patients` (Pacientes)**

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR,
  cpf VARCHAR UNIQUE,
  birth_date DATE,
  phone VARCHAR,
  gender VARCHAR CHECK (gender IN ('male', 'female', 'other')),
  insurance_plan VARCHAR,
  insurance_id VARCHAR,
  address JSONB,
  status VARCHAR CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'active',
  notes TEXT,
  doctor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_patients_doctor_id ON patients(doctor_id);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_cpf ON patients(cpf);
CREATE INDEX idx_patients_name ON patients(name);
```

### **3. Tabela `reports` (Relatórios de Sessão)**

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  consult_type VARCHAR NOT NULL,
  report_type VARCHAR CHECK (report_type IN ('audio', 'text')) NOT NULL,
  status VARCHAR CHECK (status IN ('completed', 'edited', 'draft', 'processing')) DEFAULT 'draft',
  content TEXT,
  original_content TEXT,
  audio_file_url VARCHAR,
  audio_file_name VARCHAR,
  audio_file_size INTEGER,
  processing_duration INTEGER, -- em segundos
  ai_model_used VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_reports_patient_id ON reports(patient_id);
CREATE INDEX idx_reports_doctor_id ON reports(doctor_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_session_date ON reports(session_date);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

### **4. Tabela `sessions` (Agendamentos)**

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 50, -- em minutos
  status VARCHAR CHECK (status IN ('confirmed', 'waiting', 'completed', 'cancelled', 'no_show')) DEFAULT 'waiting',
  session_type VARCHAR DEFAULT 'consultation',
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_sessions_doctor_id ON sessions(doctor_id);
CREATE INDEX idx_sessions_patient_id ON sessions(patient_id);
CREATE INDEX idx_sessions_scheduled_date ON sessions(scheduled_date);
CREATE INDEX idx_sessions_status ON sessions(status);
```

### **5. Tabela `files` (Arquivos de Áudio e Documentos)**

```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  filename VARCHAR NOT NULL,
  file_url VARCHAR NOT NULL,
  file_type VARCHAR NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR,
  uploaded_by UUID REFERENCES users(id),
  bucket_name VARCHAR DEFAULT 'audio-files',
  processing_status VARCHAR CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_files_report_id ON files(report_id);
CREATE INDEX idx_files_patient_id ON files(patient_id);
CREATE INDEX idx_files_processing_status ON files(processing_status);
```

### **6. Tabela `activity_log` (Log de Atividades)**

```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout'
  resource_type VARCHAR NOT NULL, -- 'patient', 'report', 'session', 'user'
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);
CREATE INDEX idx_activity_log_action_type ON activity_log(action_type);
```

### **7. Tabela `ai_configs` (Configurações de IA)**

```sql
CREATE TABLE ai_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  provider VARCHAR NOT NULL, -- 'openai', 'anthropic', 'google', etc.
  model_name VARCHAR NOT NULL,
  api_key_encrypted TEXT, -- Chave criptografada
  webhook_url VARCHAR,
  system_prompt TEXT,
  temperature DECIMAL(3,2) DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 4000,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_ai_configs_doctor_id ON ai_configs(doctor_id);
CREATE INDEX idx_ai_configs_provider ON ai_configs(provider);
```

## 🔐 **Políticas de Segurança (Row Level Security)**

### **1. Políticas para `users`**

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Política: Admins podem ver todos os usuários
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Política: Usuários podem atualizar próprio perfil
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Política: Apenas admins podem criar/deletar usuários
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
```

### **2. Políticas para `patients`**

```sql
-- Habilitar RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Política: Psicólogos podem ver apenas seus pacientes
CREATE POLICY "Doctors can view own patients" ON patients
  FOR SELECT USING (doctor_id = auth.uid());

-- Política: Admins podem ver todos os pacientes
CREATE POLICY "Admins can view all patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Política: Psicólogos podem gerenciar seus pacientes
CREATE POLICY "Doctors can manage own patients" ON patients
  FOR ALL USING (doctor_id = auth.uid());
```

### **3. Políticas para `reports`**

```sql
-- Habilitar RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Política: Psicólogos podem ver apenas seus relatórios
CREATE POLICY "Doctors can view own reports" ON reports
  FOR SELECT USING (doctor_id = auth.uid());

-- Política: Psicólogos podem gerenciar seus relatórios
CREATE POLICY "Doctors can manage own reports" ON reports
  FOR ALL USING (doctor_id = auth.uid());
```

## 🔧 **Funções do Banco de Dados**

### **1. Função para busca de pacientes**

```sql
CREATE OR REPLACE FUNCTION search_patients(
  doctor_id_param UUID,
  search_term TEXT DEFAULT NULL,
  status_filter TEXT DEFAULT NULL,
  limit_param INTEGER DEFAULT 50,
  offset_param INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  status VARCHAR,
  last_session TIMESTAMP WITH TIME ZONE,
  total_sessions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.email,
    p.phone,
    p.status,
    MAX(s.scheduled_date) as last_session,
    COUNT(s.id) as total_sessions
  FROM patients p
  LEFT JOIN sessions s ON p.id = s.patient_id
  WHERE 
    p.doctor_id = doctor_id_param
    AND (search_term IS NULL OR p.name ILIKE '%' || search_term || '%')
    AND (status_filter IS NULL OR p.status = status_filter)
  GROUP BY p.id, p.name, p.email, p.phone, p.status
  ORDER BY p.name
  LIMIT limit_param
  OFFSET offset_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### **2. Função para estatísticas do dashboard**

```sql
CREATE OR REPLACE FUNCTION get_dashboard_stats(doctor_id_param UUID)
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_patients', (
      SELECT COUNT(*) FROM patients 
      WHERE doctor_id = doctor_id_param AND status = 'active'
    ),
    'total_reports', (
      SELECT COUNT(*) FROM reports 
      WHERE doctor_id = doctor_id_param
    ),
    'reports_this_month', (
      SELECT COUNT(*) FROM reports 
      WHERE doctor_id = doctor_id_param 
      AND created_at >= date_trunc('month', CURRENT_DATE)
    ),
    'upcoming_sessions', (
      SELECT COUNT(*) FROM sessions 
      WHERE doctor_id = doctor_id_param 
      AND scheduled_date > NOW()
      AND status IN ('confirmed', 'waiting')
    ),
    'recent_activity', (
      SELECT json_agg(
        json_build_object(
          'type', action_type,
          'resource', resource_type,
          'created_at', created_at
        )
      )
      FROM activity_log 
      WHERE user_id = doctor_id_param 
      ORDER BY created_at DESC 
      LIMIT 10
    )
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🔄 **Triggers para Auditoria**

### **1. Trigger para log de atividades**

```sql
-- Função para auditoria automática
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_log (
    user_id,
    action_type,
    resource_type,
    resource_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar trigger nas tabelas principais
CREATE TRIGGER audit_patients_trigger
  AFTER INSERT OR UPDATE OR DELETE ON patients
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_reports_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reports
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

## 📁 **Configuração do Supabase Storage**

### **1. Bucket para arquivos de áudio**

```sql
-- Criar bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-files', 'audio-files', false);

-- Políticas de acesso
CREATE POLICY "Doctors can upload audio files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'audio-files' AND
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Doctors can view own audio files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'audio-files' AND
    EXISTS (
      SELECT 1 FROM files f
      JOIN reports r ON f.report_id = r.id
      WHERE f.file_url LIKE '%' || name || '%'
      AND r.doctor_id = auth.uid()
    )
  );
```

## 🚀 **Endpoints da API (via Supabase Edge Functions)**

### **1. Processamento de Áudio para Texto**

```typescript
// supabase/functions/process-audio/index.ts
export const processAudio = async (audioFile: File, aiConfig: AIConfig) => {
  // 1. Upload do arquivo para Storage
  // 2. Chamar API de transcrição (OpenAI/Anthropic)
  // 3. Gerar relatório estruturado
  // 4. Salvar no banco de dados
  // 5. Retornar resultado
};
```

### **2. Geração de Relatório a partir de Texto**

```typescript
// supabase/functions/generate-report/index.ts
export const generateReport = async (text: string, aiConfig: AIConfig) => {
  // 1. Processar texto com IA
  // 2. Estruturar relatório médico
  // 3. Salvar no banco
  // 4. Retornar resultado formatado
};
```

## 🔐 **Configuração de Autenticação**

### **1. Políticas de Email**

- Apenas emails corporativos permitidos
- Verificação obrigatória via email
- 2FA recomendado para admins

### **2. Hooks de Autenticação**

```sql
-- Criar usuário na tabela users após signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 📊 **Métricas e Monitoramento**

### **1. Views para Relatórios**

```sql
-- View para estatísticas por médico
CREATE VIEW doctor_statistics AS
SELECT 
  u.id,
  u.name,
  COUNT(DISTINCT p.id) as total_patients,
  COUNT(DISTINCT r.id) as total_reports,
  COUNT(DISTINCT s.id) as total_sessions,
  AVG(s.duration) as avg_session_duration
FROM users u
LEFT JOIN patients p ON u.id = p.doctor_id
LEFT JOIN reports r ON u.id = r.doctor_id
LEFT JOIN sessions s ON u.id = s.doctor_id
WHERE u.user_type = 'normal'
GROUP BY u.id, u.name;
```

### **2. Índices para Performance**

```sql
-- Índices compostos para consultas frequentes
CREATE INDEX idx_reports_doctor_date ON reports(doctor_id, session_date DESC);
CREATE INDEX idx_sessions_doctor_date ON sessions(doctor_id, scheduled_date);
CREATE INDEX idx_patients_doctor_status ON patients(doctor_id, status);
```

## 🔄 **Plano de Migração**

### **Fase 1: Setup Inicial**
1. Criar projeto Supabase
2. Executar scripts SQL
3. Configurar autenticação
4. Setup do Storage

### **Fase 2: Migração de Dados**
1. Migrar dados de usuários mock
2. Migrar dados de pacientes
3. Migrar relatórios existentes
4. Testar integridade dos dados

### **Fase 3: Integração Frontend**
1. Implementar cliente Supabase
2. Substituir mock data por APIs reais
3. Implementar autenticação
4. Adicionar tratamento de erros

### **Fase 4: Testes e Deploy**
1. Testes de integração
2. Testes de performance
3. Testes de segurança
4. Deploy em produção

---

**✅ Status:** Pronto para implementação
**🔄 Próximo:** Executar scripts SQL no Supabase
**📅 Estimativa:** 2-3 dias para implementação completa