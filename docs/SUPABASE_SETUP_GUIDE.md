# SUPABASE_SETUP_GUIDE.md

Este guia fornece instruções passo-a-passo para configurar o Supabase como backend do VicSic.

## 🚀 **Pré-requisitos**

- Conta no [Supabase](https://supabase.com)
- Node.js 18+ instalado
- CLI do Supabase instalado: `npm install -g supabase`
- Conhecimento básico de SQL e PostgreSQL

## 📝 **Passo 1: Criação do Projeto Supabase**

### **1.1 Criar Novo Projeto**
1. Acesse [app.supabase.com](https://app.supabase.com)
2. Clique em "New Project"
3. Escolha sua organização
4. Configure o projeto:
   ```
   Nome: VicSic Production
   Database Password: [senha forte de 20+ caracteres]
   Região: South America (sa-east-1) [para Brasil]
   Plano: Pro [recomendado para produção médica]
   ```

### **1.2 Aguardar Provisionamento**
- Tempo estimado: 2-3 minutos
- Aguarde status "Active" no dashboard

### **1.3 Coletar Credenciais**
No dashboard do projeto, vá em Settings > API:
```env
Project URL: https://[projeto-id].supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ **Passo 2: Configuração do Banco de Dados**

### **2.1 Acessar SQL Editor**
1. No dashboard, vá em "SQL Editor"
2. Clique em "New Query"

### **2.2 Executar Script de Criação de Tabelas**

```sql
-- =======================
-- CRIAÇÃO DAS TABELAS
-- =======================

-- 1. Tabela users (estende auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL,
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

-- 2. Tabela patients
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

-- 3. Tabela reports
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
  processing_duration INTEGER,
  ai_model_used VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER DEFAULT 50,
  status VARCHAR CHECK (status IN ('confirmed', 'waiting', 'completed', 'cancelled', 'no_show')) DEFAULT 'waiting',
  session_type VARCHAR DEFAULT 'consultation',
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela files
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

-- 6. Tabela activity_log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR NOT NULL,
  resource_type VARCHAR NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabela ai_configs
CREATE TABLE ai_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  provider VARCHAR NOT NULL,
  model_name VARCHAR NOT NULL,
  api_key_encrypted TEXT,
  webhook_url VARCHAR,
  system_prompt TEXT,
  temperature DECIMAL(3,2) DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 4000,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **2.3 Criar Índices para Performance**

```sql
-- =======================
-- ÍNDICES PARA PERFORMANCE
-- =======================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_type ON users(user_type);

-- Patients
CREATE INDEX idx_patients_doctor_id ON patients(doctor_id);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_cpf ON patients(cpf);
CREATE INDEX idx_patients_name ON patients(name);

-- Reports
CREATE INDEX idx_reports_patient_id ON reports(patient_id);
CREATE INDEX idx_reports_doctor_id ON reports(doctor_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_session_date ON reports(session_date);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_doctor_date ON reports(doctor_id, session_date DESC);

-- Sessions
CREATE INDEX idx_sessions_doctor_id ON sessions(doctor_id);
CREATE INDEX idx_sessions_patient_id ON sessions(patient_id);
CREATE INDEX idx_sessions_scheduled_date ON sessions(scheduled_date);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_doctor_date ON sessions(doctor_id, scheduled_date);

-- Files
CREATE INDEX idx_files_report_id ON files(report_id);
CREATE INDEX idx_files_patient_id ON files(patient_id);
CREATE INDEX idx_files_processing_status ON files(processing_status);

-- Activity Log
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);
CREATE INDEX idx_activity_log_action_type ON activity_log(action_type);

-- AI Configs
CREATE INDEX idx_ai_configs_doctor_id ON ai_configs(doctor_id);
CREATE INDEX idx_ai_configs_provider ON ai_configs(provider);

-- Índices compostos para consultas frequentes
CREATE INDEX idx_patients_doctor_status ON patients(doctor_id, status);
```

## 🔐 **Passo 3: Configuração de Segurança (RLS)**

### **3.1 Habilitar Row Level Security**

```sql
-- =======================
-- HABILITAR RLS EM TODAS AS TABELAS
-- =======================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_configs ENABLE ROW LEVEL SECURITY;
```

### **3.2 Criar Políticas de Segurança**

```sql
-- =======================
-- POLÍTICAS PARA USERS
-- =======================

-- Usuários podem ver próprio perfil
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admins podem ver todos os usuários
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Usuários podem atualizar próprio perfil
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Apenas admins podem inserir/deletar usuários
CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- =======================
-- POLÍTICAS PARA PATIENTS
-- =======================

-- Psicólogos podem ver apenas seus pacientes
CREATE POLICY "Doctors can view own patients" ON patients
  FOR SELECT USING (doctor_id = auth.uid());

-- Admins podem ver todos os pacientes
CREATE POLICY "Admins can view all patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Psicólogos podem gerenciar seus pacientes
CREATE POLICY "Doctors can manage own patients" ON patients
  FOR ALL USING (doctor_id = auth.uid());

-- =======================
-- POLÍTICAS PARA REPORTS
-- =======================

-- Psicólogos podem ver apenas seus relatórios
CREATE POLICY "Doctors can view own reports" ON reports
  FOR SELECT USING (doctor_id = auth.uid());

-- Psicólogos podem gerenciar seus relatórios
CREATE POLICY "Doctors can manage own reports" ON reports
  FOR ALL USING (doctor_id = auth.uid());

-- =======================
-- POLÍTICAS PARA SESSIONS
-- =======================

-- Psicólogos podem ver apenas suas sessões
CREATE POLICY "Doctors can view own sessions" ON sessions
  FOR SELECT USING (doctor_id = auth.uid());

-- Psicólogos podem gerenciar suas sessões
CREATE POLICY "Doctors can manage own sessions" ON sessions
  FOR ALL USING (doctor_id = auth.uid());

-- =======================
-- POLÍTICAS PARA FILES
-- =======================

-- Arquivos vinculados a relatórios do psicólogo
CREATE POLICY "Doctors can view own files" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reports r
      WHERE r.id = files.report_id AND r.doctor_id = auth.uid()
    )
  );

-- Psicólogos podem fazer upload de arquivos
CREATE POLICY "Doctors can upload files" ON files
  FOR INSERT WITH CHECK (
    uploaded_by = auth.uid()
  );

-- =======================
-- POLÍTICAS PARA ACTIVITY_LOG
-- =======================

-- Usuários podem ver apenas suas atividades
CREATE POLICY "Users can view own activity" ON activity_log
  FOR SELECT USING (user_id = auth.uid());

-- Admins podem ver todas as atividades
CREATE POLICY "Admins can view all activity" ON activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- =======================
-- POLÍTICAS PARA AI_CONFIGS
-- =======================

-- Psicólogos podem ver apenas suas configurações
CREATE POLICY "Doctors can view own ai configs" ON ai_configs
  FOR SELECT USING (doctor_id = auth.uid());

-- Psicólogos podem gerenciar suas configurações
CREATE POLICY "Doctors can manage own ai configs" ON ai_configs
  FOR ALL USING (doctor_id = auth.uid());
```

## 🗂️ **Passo 4: Configuração do Storage**

### **4.1 Criar Bucket para Arquivos de Áudio**

No dashboard do Supabase:
1. Vá em "Storage"
2. Clique em "Create a new bucket"
3. Configure:
   ```
   Name: audio-files
   Public: No (privado)
   File size limit: 100MB
   Allowed MIME types: audio/mpeg, audio/wav, audio/mp3, audio/m4a
   ```

### **4.2 Configurar Políticas do Storage**

```sql
-- =======================
-- POLÍTICAS PARA STORAGE
-- =======================

-- Psicólogos podem fazer upload de arquivos de áudio
CREATE POLICY "Doctors can upload audio files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'audio-files' AND
    auth.uid() IS NOT NULL AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Psicólogos podem visualizar próprios arquivos
CREATE POLICY "Doctors can view own audio files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'audio-files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Psicólogos podem deletar próprios arquivos
CREATE POLICY "Doctors can delete own audio files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'audio-files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

## 🔧 **Passo 5: Funções e Triggers**

### **5.1 Função para Criar Usuário Automaticamente**

```sql
-- =======================
-- FUNÇÃO PARA CRIAR USUÁRIO APÓS SIGNUP
-- =======================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email LIKE '%@admin.vicsic.com' THEN 'admin'
      ELSE 'normal'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar após criação de usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### **5.2 Função para Auditoria Automática**

```sql
-- =======================
-- FUNÇÃO PARA AUDITORIA AUTOMÁTICA
-- =======================

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_log (
    user_id,
    action_type,
    resource_type,
    resource_id,
    old_values,
    new_values,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
    inet_client_addr()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar triggers nas tabelas principais
CREATE TRIGGER audit_patients_trigger
  AFTER INSERT OR UPDATE OR DELETE ON patients
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_reports_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reports
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_sessions_trigger
  AFTER INSERT OR UPDATE OR DELETE ON sessions
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

### **5.3 Função para Estatísticas do Dashboard**

```sql
-- =======================
-- FUNÇÃO PARA ESTATÍSTICAS DO DASHBOARD
-- =======================

CREATE OR REPLACE FUNCTION get_dashboard_stats(doctor_id_param UUID DEFAULT auth.uid())
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
        ) ORDER BY created_at DESC
      )
      FROM activity_log 
      WHERE user_id = doctor_id_param 
      LIMIT 10
    )
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🔑 **Passo 6: Configuração de Autenticação**

### **6.1 Configurar Provedores de Auth**

No dashboard: Authentication > Providers

**Email (obrigatório):**
- Enable email confirmations: ✅
- Enable email change confirmations: ✅
- Secure email change: ✅

**Google (opcional):**
- Adicionar Client ID e Secret do Google Cloud Console

### **6.2 Configurar Templates de Email**

Authentication > Email Templates

**Confirm signup:**
```html
<h1>Bem-vindo ao VicSic</h1>
<p>Clique no link abaixo para confirmar sua conta:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar conta</a></p>
```

**Reset password:**
```html
<h1>Redefinir senha - VicSic</h1>
<p>Clique no link abaixo para redefinir sua senha:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir senha</a></p>
```

### **6.3 Configurar URLs de Redirecionamento**

Authentication > URL Configuration:
```
Site URL: https://seudomain.com
Redirect URLs: 
  - http://localhost:5173/**
  - https://seudomain.com/**
```

## 🌐 **Passo 7: Edge Functions (Opcional)**

### **7.1 Configurar CLI Local**

```bash
# Instalar CLI
npm install -g supabase

# Fazer login
supabase login

# Inicializar projeto local
supabase init

# Linkar com projeto remoto
supabase link --project-ref [seu-project-id]
```

### **7.2 Criar Function para Processamento de IA**

```bash
# Criar function
supabase functions new process-audio
```

**Arquivo:** `supabase/functions/process-audio/index.ts`
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { audioUrl, aiConfig } = await req.json()

    // Processar áudio com IA
    // Implementar lógica de transcrição
    // Retornar resultado

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
```

### **7.3 Deploy da Function**

```bash
# Deploy
supabase functions deploy process-audio

# Definir secrets
supabase secrets set OPENAI_API_KEY=your_key
supabase secrets set ANTHROPIC_API_KEY=your_key
```

## 📊 **Passo 8: Monitoramento e Logs**

### **8.1 Configurar Alertas**

No dashboard: Settings > Alerts
- CPU usage > 80%
- Database connections > 80%
- Storage usage > 90%

### **8.2 Configurar Webhooks (opcional)**

Settings > Webhooks:
```json
{
  "url": "https://yourdomain.com/webhook/supabase",
  "events": ["INSERT", "UPDATE", "DELETE"],
  "table": "reports"
}
```

## 🚀 **Passo 9: Dados de Teste**

### **9.1 Inserir Usuário Admin de Teste**

```sql
-- Inserir usuário admin de teste (após criar conta via interface)
INSERT INTO users (id, email, name, user_type) VALUES 
  ((SELECT id FROM auth.users WHERE email = 'admin@vicsic.com'), 
   'admin@vicsic.com', 
   'Administrador', 
   'admin');
```

### **9.2 Inserir Dados de Exemplo**

```sql
-- Pacientes de exemplo
INSERT INTO patients (name, email, cpf, doctor_id, status) VALUES 
  ('Maria Silva', 'maria@email.com', '123.456.789-00', (SELECT id FROM users LIMIT 1), 'active'),
  ('João Santos', 'joao@email.com', '987.654.321-00', (SELECT id FROM users LIMIT 1), 'active');

-- Relatórios de exemplo
INSERT INTO reports (patient_id, doctor_id, session_date, consult_type, report_type, status, content) VALUES 
  ((SELECT id FROM patients LIMIT 1), 
   (SELECT id FROM users LIMIT 1), 
   NOW(), 
   'Consulta inicial', 
   'text', 
   'completed', 
   'Relatório de exemplo da primeira consulta.');
```

## ✅ **Checklist de Verificação**

### **Database:**
- [ ] Todas as tabelas criadas
- [ ] Índices criados
- [ ] RLS habilitado
- [ ] Políticas configuradas
- [ ] Funções criadas
- [ ] Triggers configurados

### **Storage:**
- [ ] Bucket criado
- [ ] Políticas configuradas
- [ ] Limites de tamanho definidos

### **Auth:**
- [ ] Provedores configurados
- [ ] Templates de email personalizados
- [ ] URLs de redirecionamento configuradas

### **Segurança:**
- [ ] RLS testado
- [ ] Políticas testadas
- [ ] Variáveis de ambiente configuradas

### **Testes:**
- [ ] Usuário admin criado
- [ ] Dados de exemplo inseridos
- [ ] Dashboard acessível
- [ ] Upload de arquivos funcionando

## 🔧 **Variáveis de Ambiente**

Criar arquivo `.env.local`:
```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Providers (opcionais para Edge Functions)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_KEY=AI...
```

## 🚨 **Considerações de Produção**

### **Backup:**
- Configurar backups automáticos diários
- Testar restore procedures
- Documentar processo de disaster recovery

### **Performance:**
- Monitorar slow queries
- Configurar connection pooling
- Implementar caching quando necessário

### **Segurança:**
- Configurar IP whitelisting se necessário
- Implementar rate limiting
- Revisar políticas RLS regularmente

---

**⚡ Tempo Total:** 2-3 horas para setup completo
**🎯 Resultado:** Backend Supabase 100% funcional e seguro
**📈 Próximo:** Integrar frontend com APIs do Supabase