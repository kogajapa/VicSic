# CODE_CLEANUP_REPORT.md

Este documento identifica todas as duplicações, conflitos e problemas no código do VicSic que precisam ser resolvidos antes da integração com Supabase.

## 🚨 **Problemas Críticos Identificados**

### **1. Configuração TypeScript Inadequada**

**Arquivo:** `tsconfig.json`
**Problemas:**
```json
{
  "noImplicitAny": false,        // ❌ Permite tipos 'any' implícitos
  "noUnusedLocals": false,       // ❌ Não detecta variáveis não utilizadas
  "noUnusedParameters": false,   // ❌ Não detecta parâmetros não utilizados
  "strictNullChecks": false,     // ❌ Permite null/undefined unsafety
  "strict": false                // ❌ Desabilita todas as verificações rigorosas
}
```

**Solução:**
```json
{
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "strictNullChecks": true,
  "strict": true
}
```

### **2. ESLint com Regras Desabilitadas**

**Arquivo:** `eslint.config.js` (Linha 26)
**Problema:**
```javascript
"@typescript-eslint/no-unused-vars": "off"  // ❌ Permite variáveis não utilizadas
```

**Solução:**
```javascript
"@typescript-eslint/no-unused-vars": "error"
```

## 🔄 **Duplicações de Código Identificadas**

### **1. Hook de Toast Duplicado**

**Arquivos Duplicados:**
- `src/hooks/use-toast.ts`
- `src/components/ui/use-toast.ts`

**Problema:** O arquivo `src/components/ui/use-toast.ts` apenas re-exporta o hook do `src/hooks/use-toast.ts`.

**Solução:** 
- Remover `src/components/ui/use-toast.ts`
- Atualizar importações para usar apenas `src/hooks/use-toast.ts`

### **2. Interfaces de Patient Duplicadas**

**Localizações:**
1. `src/pages/NovoRelatorio.tsx` (Linhas 14-17)
```typescript
interface Patient {
  id: string;
  name: string;
}
```

2. `src/components/forms/PatientDropdown.tsx` (Similar)
3. `src/components/reports/ReportPreview.tsx` (Similar)
4. `src/pages/Pacientes.tsx` (Versão completa inline)

**Solução:** Criar interface única em `src/types/index.ts`

### **3. Mapas de Status Repetidos**

**Localizações:**
1. `src/pages/Relatorios.tsx` (Linhas 75-78)
```typescript
const statusVariantMap = {
  'Concluído': 'success',
  'Editado': 'info',
};
```

2. `src/components/admin/Users.tsx` (Similar para status de usuários)
3. `src/pages/Pacientes.tsx` (Similar para status de pacientes)

**Solução:** Centralizar em arquivo de constantes

### **4. Dados Mock Repetidos**

**Problema:** Estruturas similares de dados mock em múltiplos arquivos:
- `src/pages/Pacientes.tsx` - 15 pacientes mock
- `src/pages/Relatorios.tsx` - 5 relatórios mock  
- `src/components/admin/Users.tsx` - 5 usuários mock
- `src/components/dashboard/ActivityFeed.tsx` - 6 atividades mock
- `src/components/dashboard/SessionsTable.tsx` - 4 sessões mock

**Solução:** Centralizar em `src/data/mockData.ts`

## 🏗️ **Problemas de Arquitetura**

### **1. Autenticação Hardcoded**

**Arquivo:** `src/components/layout/Sidebar.tsx` (Linha 33)
```typescript
const isAdmin = true; // TODO: Implement real authentication
```

**Problema:** Autenticação fake que permite acesso admin a todos.

**Solução:** Implementar sistema real com Supabase Auth.

### **2. Validação com Alerts Nativas**

**Arquivo:** `src/pages/NovoRelatorio.tsx` (Linhas 33-57)
```typescript
const validateForm = () => {
  if (!selectedPatient) {
    alert('Por favor, selecione um paciente antes de processar o relatório.');
    return false;
  }
  // Mais alerts...
};
```

**Problema:** UX ruim com alerts nativas do browser.

**Solução:** Implementar validação com `react-hook-form` + `zod`.

### **3. Manipulação DOM Direta**

**Arquivo:** `src/pages/NovoRelatorio.tsx` (Linhas 100-132)
```typescript
const handleSaveDraft = (button: HTMLButtonElement) => {
  const originalText = button.textContent;
  button.textContent = 'Salvando...';
  button.disabled = true;
  // Mais manipulação DOM...
};
```

**Problema:** Anti-pattern React com manipulação DOM direta.

**Solução:** Usar estado React para controlar UI.

## 📊 **Constantes que Precisam ser Centralizadas**

### **1. Status Values**

```typescript
// Encontrados em múltiplos arquivos:
type PatientStatus = 'Ativo' | 'Inativo' | 'Pendente';
type ReportStatus = 'Concluído' | 'Editado';
type UserStatus = 'Ativo' | 'Inativo';
type UserType = 'Admin' | 'Normal';
type SessionStatus = 'confirmed' | 'waiting';
```

**Solução:** Criar enums centralizados.

### **2. Color Mappings**

```typescript
// Espalhados pelo código:
const colors = {
  'bg-primary/10 text-primary',
  'bg-green-100 text-green-600',
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-600'
};
```

**Solução:** Sistema de cores consistente.

### **3. Configuration Values**

```typescript
// Hardcoded em vários lugares:
const TOAST_REMOVE_DELAY = 1000000; // 1000 segundos (!!)
const FILE_UPLOAD_LIMIT = 100 * 1024 * 1024; // 100MB
const API_ENDPOINTS = { /* hardcoded */ };
```

## 🔧 **Variáveis de Ambiente Necessárias**

### **1. Supabase Configuration**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### **2. AI Providers**
```env
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
VITE_GOOGLE_AI_KEY=your_google_key
```

### **3. Application Config**
```env
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
VITE_MAX_FILE_SIZE=104857600
VITE_ALLOWED_FILE_TYPES=audio/mpeg,audio/wav,audio/mp3
```

### **4. Security**
```env
VITE_ENCRYPTION_KEY=your_encryption_key
VITE_JWT_SECRET=your_jwt_secret
VITE_WEBHOOK_SECRET=your_webhook_secret
```

## 🗂️ **Estrutura de Pastas Proposta**

```
src/
├── components/           # Componentes reutilizáveis
├── pages/               # Páginas/rotas
├── hooks/               # Custom hooks
├── services/            # 🆕 Serviços de API
├── types/               # 🆕 Interfaces e tipos
├── constants/           # 🆕 Constantes globais
├── utils/               # 🆕 Funções utilitárias
├── data/                # 🆕 Mock data centralizada
├── schemas/             # 🆕 Schemas de validação Zod
└── lib/                 # Configurações e clients
```

## 🎯 **Componentes que Podem ser Consolidados**

### **1. Badge Components**
Múltiplos badges similares podem ser unificados:
- Status badges (pacientes, relatórios, usuários)
- Type badges (usuário admin/normal)
- Priority badges

### **2. Avatar Components**
Padrão repetido de avatar com iniciais:
- Patient avatars
- User avatars  
- Session participant avatars

### **3. Modal Components**
Estruturas similares de modal:
- Delete confirmation modals
- Edit modals
- View detail modals

## 🔍 **Código Não Utilizado Identificado**

### **1. Página Index Não Utilizada**
**Arquivo:** `src/pages/Index.tsx`
**Status:** Não referenciada no roteamento

### **2. Componentes UI Não Utilizados**
Possíveis componentes shadcn/ui não utilizados (análise necessária):
- `calendar.tsx`
- `carousel.tsx`
- `command.tsx`
- `hover-card.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`

### **3. Dependencies Não Utilizadas**
```json
{
  "recharts": "^2.12.7",        // Possivelmente não usado
  "@tanstack/react-query": "^5.56.2", // Importado mas não usado
  "html2canvas": "^1.4.1",      // Usado apenas em um lugar
  "jspdf": "^3.0.1"             // Usado apenas em um lugar
}
```

## ⚡ **Problemas de Performance**

### **1. Bundle Size**
- 47 componentes UI importados
- Muitos ícones Lucide importados individualmente
- Falta code splitting nas rotas

### **2. Re-renders Desnecessários**
- Falta de memoização em componentes pesados
- Estados locais que poderiam ser globais
- Funções inline em props

### **3. Memory Leaks Potenciais**
**Arquivo:** `src/components/forms/AudioUpload.tsx`
```typescript
// ⚠️ Possível memory leak
const audioUrl = URL.createObjectURL(file);
// Falta cleanup em alguns casos
```

## 🛡️ **Problemas de Segurança**

### **1. XSS Vulnerabilities**
**Arquivo:** `src/pages/NovoRelatorio.tsx`
```typescript
// ⚠️ Texto não sanitizado
<p className="text-muted-foreground whitespace-pre-wrap">
  {selectedReport.content}
</p>
```

### **2. File Upload Insecurity**
**Arquivo:** `src/components/forms/AudioUpload.tsx`
- Validação apenas no frontend
- Sem verificação de tipo MIME real
- Sem scan de vírus

### **3. Hardcoded Admin Access**
- Qualquer usuário pode acessar área admin
- Sem verificação de permissões

## 📋 **Checklist de Limpeza**

### **Prioridade Alta:**
- [ ] Corrigir configuração TypeScript
- [ ] Remover hook de toast duplicado
- [ ] Consolidar interfaces de Patient
- [ ] Implementar autenticação real
- [ ] Centralizar constantes de status

### **Prioridade Média:**
- [ ] Refatorar validação de formulários
- [ ] Consolidar dados mock
- [ ] Criar sistema de avatars unificado
- [ ] Implementar error boundaries
- [ ] Adicionar loading states

### **Prioridade Baixa:**
- [ ] Remover componentes não utilizados
- [ ] Otimizar imports de ícones
- [ ] Implementar code splitting
- [ ] Adicionar testes unitários
- [ ] Otimizar bundle size

## 🚀 **Próximos Passos**

1. **Executar limpeza crítica** (Prioridade Alta)
2. **Criar estrutura de tipos unificada**
3. **Implementar variáveis de ambiente**
4. **Preparar services layer para Supabase**
5. **Executar testes após refatoração**

---

**⚠️ Total de Problemas:** 23 críticos, 15 médios, 8 baixos
**🎯 Tempo Estimado:** 1-2 dias para limpeza completa
**✅ Impacto:** Código 90% mais limpo e preparado para produção