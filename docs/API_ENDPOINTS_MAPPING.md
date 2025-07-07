# API_ENDPOINTS_MAPPING.md

Este documento mapeia todos os endpoints de API necessários para substituir os dados mock por integração real com Supabase, incluindo estratégias de implementação e priorização.

## 🎯 **Visão Geral**

O VicSic atualmente usa dados hardcoded em 15+ arquivos. Este mapeamento identifica todos os pontos onde APIs reais precisam ser implementadas, organizados por prioridade e complexidade.

## 🔥 **Endpoints Críticos (Prioridade Alta)**

### **1. Autenticação e Autorização**

#### **1.1 Authentication Endpoints**
```typescript
// Base URL: /api/auth
POST   /auth/login              // Login do usuário
POST   /auth/logout             // Logout do usuário  
POST   /auth/signup             // Registro de novo usuário
POST   /auth/refresh            // Refresh do token
GET    /auth/me                 // Dados do usuário atual
POST   /auth/forgot-password    // Solicitar reset de senha
POST   /auth/reset-password     // Confirmar reset de senha
```

**Arquivos Impactados:**
- `src/components/layout/Sidebar.tsx` (linha 33 - isAdmin hardcoded)
- `src/App.tsx` (sistema de rotas não protegidas)
- Todos os componentes admin (sem verificação de permissão)

**Implementação Supabase:**
```typescript
// src/services/auth.service.ts
import { supabase } from '../lib/supabase';

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },
  
  async logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      return { user, profile };
    }
    return { user: null, profile: null };
  }
};
```

### **2. Gerenciamento de Usuários**

#### **2.1 Users Management Endpoints**
```typescript
// Base URL: /api/users
GET    /users                   // Listar usuários (admin only)
GET    /users/:id               // Obter usuário específico
POST   /users                   // Criar novo usuário (admin only)
PUT    /users/:id               // Atualizar usuário
DELETE /users/:id               // Deletar usuário (admin only)
GET    /users/:id/stats         // Estatísticas do usuário
GET    /users/profile           // Perfil do usuário atual
PUT    /users/profile           // Atualizar perfil próprio
```

**Arquivo Principal:** `src/components/admin/Users.tsx`
**Mock Data Location:** Linhas 70-121 (usersData array)

**Dados Mock Atuais:**
```typescript
const usersData: UserData[] = [
  {
    id: 1,
    name: 'Dra. Mariana Santos',
    email: 'mariana.santos@vicsic.com',
    crm: 'CRP 06/98745',
    patients: 32,
    transcriptions: 128,
    status: 'Ativo',
    type: 'Admin',
  }
  // ... mais 4 usuários
];
```

**Implementação Supabase:**
```typescript
// src/services/users.service.ts
export const usersService = {
  async getUsers(filters?: UserFilters) {
    let query = supabase
      .from('users')
      .select(`
        *,
        patients:patients(count),
        reports:reports(count)
      `);
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query;
    return { data, error };
  },
  
  async createUser(userData: CreateUserInput) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    return { data, error };
  }
};
```

### **3. Gerenciamento de Pacientes**

#### **3.1 Patients Management Endpoints**
```typescript
// Base URL: /api/patients
GET    /patients                // Listar pacientes do médico
GET    /patients/:id            // Obter paciente específico
POST   /patients                // Criar novo paciente
PUT    /patients/:id            // Atualizar paciente
DELETE /patients/:id            // Deletar paciente
GET    /patients/search         // Buscar pacientes
GET    /patients/:id/stats      // Estatísticas do paciente
GET    /patients/:id/history    // Histórico médico
```

**Arquivos Impactados:**
- `src/pages/Pacientes.tsx` (linhas 32-102 - mock data)
- `src/components/forms/PatientDropdown.tsx` (linhas 15-20 - mock patients)
- `src/components/dashboard/SessionsTable.tsx` (sessões mock)

**Mock Data Principal:**
```typescript
// src/pages/Pacientes.tsx
const patientsData = [
  {
    id: 'P12345',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    // ... 15 pacientes mock completos
  }
];
```

### **4. Gerenciamento de Relatórios**

#### **4.1 Reports Management Endpoints**
```typescript
// Base URL: /api/reports
GET    /reports                 // Listar relatórios do médico
GET    /reports/:id             // Obter relatório específico
POST   /reports                 // Criar novo relatório
PUT    /reports/:id             // Atualizar relatório
DELETE /reports/:id             // Deletar relatório
POST   /reports/process         // Processar áudio/texto
GET    /reports/templates       // Templates de relatório
POST   /reports/generate        // Gerar relatório via IA
```

**Arquivo Principal:** `src/pages/Relatorios.tsx`
**Mock Data Location:** Linhas 32-73 (reportsData array)

**Processamento de Relatório:**
- Arquivo: `src/pages/NovoRelatorio.tsx`
- Função: `processReport()` (linhas 59-90)
- Atual: Simulação com setTimeout e progresso fake

## 📊 **Endpoints de Dashboard (Prioridade Alta)**

### **5.1 Dashboard Data Endpoints**
```typescript
// Base URL: /api/dashboard
GET    /dashboard/stats         // Estatísticas principais
GET    /dashboard/activity      // Feed de atividades
GET    /dashboard/sessions      // Próximas sessões
GET    /dashboard/reports       // Relatórios recentes
GET    /dashboard/charts        // Dados para gráficos
```

**Arquivos Impactados:**
- `src/pages/Dashboard.tsx` (stats hardcoded)
- `src/components/dashboard/ActivityFeed.tsx` (atividades mock)
- `src/components/dashboard/SessionsTable.tsx` (sessões mock)
- `src/components/dashboard/StatsCard.tsx` (valores hardcoded)

**Mock Data Atual:**
```typescript
// Dashboard hardcoded values
<StatsCard
  title="Relatórios gerados"
  value="8"                    // ❌ Hardcoded
  // ...
/>
<StatsCard
  title="Pacientes ativos"
  value="127"                  // ❌ Hardcoded
  // ...
/>
```

## 📁 **Endpoints de Upload (Prioridade Média)**

### **6.1 File Upload Endpoints**
```typescript
// Base URL: /api/files
POST   /files/upload           // Upload de arquivo
GET    /files/:id              // Download de arquivo
DELETE /files/:id              // Deletar arquivo
GET    /files/:id/metadata     // Metadados do arquivo
POST   /files/presigned-url    // URL pré-assinada para upload
```

**Arquivo Principal:** `src/components/forms/AudioUpload.tsx`
**Limitações Atuais:**
- Upload apenas local (ObjectURL)
- Sem persistência
- Sem validação server-side
- Limite de 100MB apenas frontend

**Implementação Supabase Storage:**
```typescript
// src/services/upload.service.ts
export const uploadService = {
  async uploadAudio(file: File, reportId: string) {
    const fileName = `${reportId}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('audio-files')
      .upload(fileName, file);
    
    if (error) return { error };
    
    // Salvar metadados na tabela files
    const { data: fileRecord } = await supabase
      .from('files')
      .insert({
        report_id: reportId,
        filename: file.name,
        file_url: data.path,
        file_size: file.size,
        mime_type: file.type
      })
      .select()
      .single();
    
    return { data: fileRecord };
  }
};
```

## 🤖 **Endpoints de IA (Prioridade Média)**

### **7.1 AI Processing Endpoints**
```typescript
// Base URL: /api/ai
POST   /ai/transcribe           // Transcrever áudio
POST   /ai/generate-report      // Gerar relatório
POST   /ai/analyze-text         // Analisar texto
GET    /ai/models              // Modelos disponíveis
POST   /ai/test-config         // Testar configuração
```

**Arquivo Principal:** `src/components/admin/AgentConfig.tsx`
**Configurações Mock:**
- Provider hardcoded
- API keys fake
- Modelos hardcoded

## 📅 **Endpoints de Sessões (Prioridade Baixa)**

### **8.1 Sessions Management Endpoints**
```typescript
// Base URL: /api/sessions
GET    /sessions                // Listar sessões do médico
GET    /sessions/:id            // Obter sessão específica
POST   /sessions                // Agendar nova sessão
PUT    /sessions/:id            // Atualizar sessão
DELETE /sessions/:id            // Cancelar sessão
GET    /sessions/calendar       // Visualização de calendário
POST   /sessions/bulk           // Operações em lote
```

## 🔍 **Endpoints de Busca e Filtros**

### **9.1 Search Endpoints**
```typescript
// Base URL: /api/search
GET    /search/patients         // Buscar pacientes
GET    /search/reports          // Buscar relatórios
GET    /search/global           // Busca global
GET    /search/suggestions      // Sugestões de busca
```

## 📈 **Estratégia de Implementação por Fases**

### **Fase 1: Autenticação (Semana 1)**
1. ✅ Setup Supabase Auth
2. ✅ Implementar login/logout
3. ✅ Protected routes
4. ✅ User context

### **Fase 2: Usuários e Permissões (Semana 1)**
1. ✅ CRUD de usuários
2. ✅ Role-based access
3. ✅ Admin functions
4. ✅ User profile

### **Fase 3: Pacientes (Semana 2)**
1. ✅ CRUD de pacientes
2. ✅ Search e filtros
3. ✅ Patient dropdown real
4. ✅ Statistics

### **Fase 4: Relatórios (Semana 2-3)**
1. ✅ CRUD de relatórios
2. ✅ File upload
3. ✅ AI integration
4. ✅ Report generation

### **Fase 5: Dashboard (Semana 3)**
1. ✅ Real statistics
2. ✅ Activity feed
3. ✅ Charts com dados reais
4. ✅ Performance optimization

### **Fase 6: Sessões (Semana 4)**
1. ✅ Session management
2. ✅ Calendar integration
3. ✅ Reminders
4. ✅ Bulk operations

## 🔧 **Services Layer Structure**

```
src/services/
├── index.ts                   # Re-exports
├── auth.service.ts           # Autenticação
├── users.service.ts          # Gerenciamento de usuários
├── patients.service.ts       # Gerenciamento de pacientes
├── reports.service.ts        # Gerenciamento de relatórios
├── sessions.service.ts       # Gerenciamento de sessões
├── upload.service.ts         # Upload de arquivos
├── ai.service.ts             # Integração com IA
├── dashboard.service.ts      # Dados do dashboard
└── search.service.ts         # Busca e filtros
```

### **Padrão de Service Base**

```typescript
// src/services/base.service.ts
export abstract class BaseService {
  protected supabase = supabase;
  
  protected handleError(error: any) {
    console.error('Service Error:', error);
    return {
      error: error.message || 'Erro interno do servidor'
    };
  }
  
  protected async executeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>
  ) {
    try {
      const result = await queryFn();
      if (result.error) {
        return this.handleError(result.error);
      }
      return { data: result.data };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
```

## 🎯 **Checklist de Migração**

### **Por Arquivo:**

#### **src/pages/Dashboard.tsx**
- [ ] Substituir stats hardcoded por `dashboardService.getStats()`
- [ ] Implementar loading states
- [ ] Adicionar error handling
- [ ] Integrar real-time updates

#### **src/pages/Pacientes.tsx**
- [ ] Substituir patientsData por `patientsService.getPatients()`
- [ ] Implementar paginação real
- [ ] Adicionar filtros funcionais
- [ ] Implementar busca server-side

#### **src/pages/Relatorios.tsx**
- [ ] Substituir reportsData por `reportsService.getReports()`
- [ ] Implementar processamento real
- [ ] Adicionar status tracking
- [ ] Integrar com file upload

#### **src/components/admin/Users.tsx**
- [ ] Substituir usersData por `usersService.getUsers()`
- [ ] Implementar CRUD real
- [ ] Adicionar role-based access
- [ ] Implementar audit trail

#### **src/components/forms/PatientDropdown.tsx**
- [ ] Substituir patients mock por `patientsService.search()`
- [ ] Implementar debounced search
- [ ] Adicionar infinite scroll
- [ ] Cache de resultados

#### **src/components/dashboard/ActivityFeed.tsx**
- [ ] Substituir activitiesData por `dashboardService.getActivity()`
- [ ] Implementar real-time updates
- [ ] Adicionar filtros por tipo
- [ ] Implement infinite scroll

#### **src/components/dashboard/SessionsTable.tsx**
- [ ] Substituir sessionsData por `sessionsService.getUpcoming()`
- [ ] Adicionar ações (confirmar/cancelar)
- [ ] Implementar reminders
- [ ] Integrar com calendar

## 📊 **Métricas de Migração**

### **Arquivos a Modificar:**
- **Total:** 23 arquivos
- **Críticos:** 8 arquivos
- **Médios:** 10 arquivos  
- **Baixos:** 5 arquivos

### **Mock Data a Remover:**
- **Total:** ~500 linhas de código
- **Arrays mock:** 8 principais
- **Hardcoded values:** 25+
- **Fake functions:** 12

### **APIs a Implementar:**
- **Endpoints:** 45 endpoints
- **Services:** 8 services
- **Types:** 20+ interfaces
- **Validations:** 15 schemas

### **Estimativa de Tempo:**
- **Setup inicial:** 1 dia
- **Auth + Users:** 2 dias
- **Patients + Reports:** 3 dias
- **Dashboard + Sessions:** 2 dias
- **Testes + Ajustes:** 2 dias
- **Total:** 10 dias úteis

---

**🎯 Meta:** Zero mock data, 100% backend integrado
**📈 Resultado:** Sistema produção-ready com Supabase
**🔄 Status:** Pronto para implementação fase por fase