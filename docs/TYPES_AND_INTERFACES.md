# TYPES_AND_INTERFACES.md

Este documento define todas as interfaces TypeScript, tipos, enums e constantes padronizadas para o VicSic, eliminando duplicações e estabelecendo uma estrutura unificada.

## 📋 **Estrutura de Arquivos de Tipos**

```
src/
├── types/
│   ├── index.ts              # Re-exports principais
│   ├── user.types.ts         # Tipos de usuários
│   ├── patient.types.ts      # Tipos de pacientes
│   ├── report.types.ts       # Tipos de relatórios
│   ├── session.types.ts      # Tipos de sessões
│   ├── api.types.ts          # Tipos de API responses
│   └── common.types.ts       # Tipos comuns
├── constants/
│   ├── index.ts              # Re-exports
│   ├── status.constants.ts   # Status values
│   ├── colors.constants.ts   # Color mappings
│   └── config.constants.ts   # App configurations
└── schemas/
    ├── index.ts              # Re-exports
    ├── user.schemas.ts       # Validação Zod para usuários
    ├── patient.schemas.ts    # Validação Zod para pacientes
    └── report.schemas.ts     # Validação Zod para relatórios
```

## 🔧 **Tipos Base e Utilitários**

### **src/types/common.types.ts**

```typescript
// =======================
// TIPOS UTILITÁRIOS
// =======================

export type UUID = string;
export type ISODateString = string;
export type Timestamp = string;

// Status base para todas as entidades
export type BaseStatus = 'active' | 'inactive';

// Tipo para paginação
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Tipo para ordenação
export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

// Tipo para filtros
export interface FilterParams {
  [key: string]: string | number | boolean | null | undefined;
}

// Tipo para responses de API
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error';
}

// Tipo para loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Tipo para arquivo upload
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Endereço padrão
export interface Address {
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

// Metadados de auditoria
export interface AuditFields {
  createdAt: ISODateString;
  updatedAt: ISODateString;
  createdBy?: UUID;
  updatedBy?: UUID;
}
```

## 👤 **Tipos de Usuários**

### **src/types/user.types.ts**

```typescript
import { UUID, BaseStatus, AuditFields } from './common.types';

// =======================
// ENUMS PARA USUÁRIOS
// =======================

export enum UserType {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

// =======================
// INTERFACE BASE DO USUÁRIO
// =======================

export interface User extends AuditFields {
  id: UUID;
  email: string;
  name: string;
  crm?: string;
  userType: UserType;
  status: UserStatus;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

// Dados públicos do usuário (para display)
export interface UserPublic {
  id: UUID;
  name: string;
  initials: string;
  avatarUrl?: string;
  userType: UserType;
}

// Dados para criação de usuário
export interface CreateUserData {
  email: string;
  name: string;
  crm?: string;
  userType?: UserType;
  phone?: string;
  address?: string;
}

// Dados para atualização de usuário
export interface UpdateUserData {
  name?: string;
  crm?: string;
  phone?: string;
  address?: string;
  status?: UserStatus;
}

// Estatísticas do usuário (para dashboard)
export interface UserStats {
  totalPatients: number;
  totalReports: number;
  reportsThisMonth: number;
  avgSessionDuration?: number;
  lastActivity?: ISODateString;
}

// Usuário com estatísticas
export interface UserWithStats extends User {
  stats: UserStats;
}

// Dados de perfil completo
export interface UserProfile extends User {
  patients?: number;
  transcriptions?: number;
  lastLogin?: ISODateString;
  preferences?: UserPreferences;
}

// Preferências do usuário
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  language?: 'pt' | 'en';
  notifications?: NotificationSettings;
  aiConfig?: AIConfiguration;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sessionReminders: boolean;
  reportReady: boolean;
}

export interface AIConfiguration {
  provider: 'openai' | 'anthropic' | 'google';
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}
```

## 🏥 **Tipos de Pacientes**

### **src/types/patient.types.ts**

```typescript
import { UUID, Address, AuditFields } from './common.types';

// =======================
// ENUMS PARA PACIENTES
// =======================

export enum PatientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

// =======================
// INTERFACE BASE DO PACIENTE
// =======================

export interface Patient extends AuditFields {
  id: UUID;
  name: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  gender?: Gender;
  insurancePlan?: string;
  insuranceId?: string;
  address?: Address;
  status: PatientStatus;
  notes?: string;
  doctorId: UUID;
}

// Dados públicos do paciente (para dropdowns e listas)
export interface PatientPublic {
  id: UUID;
  name: string;
  initials: string;
  avatarColor: string;
  status: PatientStatus;
  lastAppointment?: string;
}

// Dados para criação de paciente
export interface CreatePatientData {
  name: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  gender?: Gender;
  insurancePlan?: string;
  insuranceId?: string;
  address?: Address;
  notes?: string;
  doctorId: UUID;
}

// Dados para atualização de paciente
export interface UpdatePatientData {
  name?: string;
  email?: string;
  phone?: string;
  insurancePlan?: string;
  insuranceId?: string;
  address?: Address;
  status?: PatientStatus;
  notes?: string;
}

// Estatísticas do paciente
export interface PatientStats {
  totalSessions: number;
  totalReports: number;
  lastSession?: string;
  nextSession?: string;
  averageSessionInterval?: number; // em dias
}

// Paciente com estatísticas
export interface PatientWithStats extends Patient {
  stats: PatientStats;
}

// Histórico médico resumido
export interface PatientSummary {
  id: UUID;
  name: string;
  totalSessions: number;
  totalReports: number;
  lastSession?: string;
  status: PatientStatus;
  notes?: string;
}

// Filtros para busca de pacientes
export interface PatientFilters {
  status?: PatientStatus;
  search?: string;
  gender?: Gender;
  hasInsurance?: boolean;
  ageRange?: [number, number];
  lastSessionBefore?: string;
  lastSessionAfter?: string;
}
```

## 📄 **Tipos de Relatórios**

### **src/types/report.types.ts**

```typescript
import { UUID, AuditFields } from './common.types';
import { PatientPublic } from './patient.types';

// =======================
// ENUMS PARA RELATÓRIOS
// =======================

export enum ReportType {
  AUDIO = 'audio',
  TEXT = 'text'
}

export enum ReportStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  EDITED = 'edited',
  FAILED = 'failed'
}

export enum ProcessingStatus {
  PENDING = 'pending',
  TRANSCRIBING = 'transcribing',
  ANALYZING = 'analyzing',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// =======================
// INTERFACE BASE DO RELATÓRIO
// =======================

export interface Report extends AuditFields {
  id: UUID;
  patientId: UUID;
  doctorId: UUID;
  sessionDate: string;
  consultType: string;
  reportType: ReportType;
  status: ReportStatus;
  content?: string;
  originalContent?: string;
  audioFileUrl?: string;
  audioFileName?: string;
  audioFileSize?: number;
  processingDuration?: number; // em segundos
  aiModelUsed?: string;
}

// Relatório com dados do paciente
export interface ReportWithPatient extends Report {
  patient: PatientPublic;
}

// Dados para criação de relatório
export interface CreateReportData {
  patientId: UUID;
  sessionDate: string;
  consultType: string;
  reportType: ReportType;
  content?: string;
  audioFile?: File;
}

// Dados para atualização de relatório
export interface UpdateReportData {
  content?: string;
  status?: ReportStatus;
  consultType?: string;
  sessionDate?: string;
}

// Resultado do processamento de áudio
export interface AudioProcessingResult {
  transcription: string;
  confidence: number;
  duration: number;
  language: string;
  segments?: TranscriptionSegment[];
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  confidence: number;
}

// Resultado da geração de relatório
export interface ReportGenerationResult {
  reportId: UUID;
  content: string;
  summary: string;
  keyPoints: string[];
  recommendations: string[];
  followUp?: string;
}

// Template de relatório
export interface ReportTemplate {
  id: UUID;
  name: string;
  description: string;
  template: string;
  sections: ReportSection[];
  isDefault: boolean;
  doctorId: UUID;
}

export interface ReportSection {
  id: string;
  title: string;
  order: number;
  isRequired: boolean;
  placeholder?: string;
}

// Filtros para busca de relatórios
export interface ReportFilters {
  status?: ReportStatus;
  reportType?: ReportType;
  patientId?: UUID;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Estatísticas de relatórios
export interface ReportStats {
  total: number;
  byStatus: Record<ReportStatus, number>;
  byType: Record<ReportType, number>;
  thisMonth: number;
  avgProcessingTime: number;
}
```

## 📅 **Tipos de Sessões**

### **src/types/session.types.ts**

```typescript
import { UUID, AuditFields } from './common.types';
import { PatientPublic } from './patient.types';

// =======================
// ENUMS PARA SESSÕES
// =======================

export enum SessionStatus {
  WAITING = 'waiting',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum SessionType {
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  INITIAL = 'initial',
  EMERGENCY = 'emergency'
}

// =======================
// INTERFACE BASE DA SESSÃO
// =======================

export interface Session extends AuditFields {
  id: UUID;
  patientId: UUID;
  doctorId: UUID;
  scheduledDate: string;
  duration: number; // em minutos
  status: SessionStatus;
  sessionType: SessionType;
  notes?: string;
  reminderSent: boolean;
}

// Sessão com dados do paciente
export interface SessionWithPatient extends Session {
  patient: PatientPublic;
}

// Dados para criação de sessão
export interface CreateSessionData {
  patientId: UUID;
  scheduledDate: string;
  duration?: number;
  sessionType: SessionType;
  notes?: string;
}

// Dados para atualização de sessão
export interface UpdateSessionData {
  scheduledDate?: string;
  duration?: number;
  status?: SessionStatus;
  sessionType?: SessionType;
  notes?: string;
}

// Agenda do médico
export interface DoctorSchedule {
  date: string;
  sessions: SessionWithPatient[];
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  sessionId?: UUID;
}

// Filtros para busca de sessões
export interface SessionFilters {
  status?: SessionStatus;
  sessionType?: SessionType;
  patientId?: UUID;
  dateFrom?: string;
  dateTo?: string;
}

// Estatísticas de sessões
export interface SessionStats {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  noShow: number;
  averageDuration: number;
}
```

## 🔌 **Tipos de API**

### **src/types/api.types.ts**

```typescript
import { UUID } from './common.types';

// =======================
// TIPOS DE REQUEST/RESPONSE
// =======================

// Base response para todas as APIs
export interface BaseApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  message?: string;
  status: 'success' | 'error';
  timestamp: string;
}

// Estrutura de erro padrão
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

// Response de autenticação
export interface AuthResponse {
  user: {
    id: UUID;
    email: string;
    name: string;
    userType: string;
  };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

// Request de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Request de signup
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  crm?: string;
}

// Request de upload de arquivo
export interface FileUploadRequest {
  file: File;
  reportId?: UUID;
  patientId?: UUID;
}

// Response de upload de arquivo
export interface FileUploadResponse {
  fileId: UUID;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Request de processamento de áudio
export interface AudioProcessingRequest {
  audioUrl: string;
  reportId: UUID;
  aiConfig?: AIProcessingConfig;
}

export interface AIProcessingConfig {
  provider: 'openai' | 'anthropic' | 'google';
  model: string;
  language?: string;
  temperature?: number;
  maxTokens?: number;
}

// Response de processamento de áudio
export interface AudioProcessingResponse {
  transcription: string;
  reportContent: string;
  processingTime: number;
  confidence: number;
}

// Dashboard data response
export interface DashboardData {
  stats: {
    totalPatients: number;
    totalReports: number;
    reportsThisMonth: number;
    upcomingSessions: number;
  };
  recentActivity: ActivityItem[];
  upcomingSessions: SessionWithPatient[];
  recentReports: ReportWithPatient[];
}

export interface ActivityItem {
  id: UUID;
  type: 'report' | 'session' | 'patient' | 'user';
  action: string;
  resourceId: UUID;
  resourceName: string;
  timestamp: string;
  userId: UUID;
}

// Search response
export interface SearchResponse<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Validação de CPF/Email
export interface ValidationResponse {
  valid: boolean;
  message?: string;
  suggestions?: string[];
}
```

## 🎨 **Constantes de Status e Cores**

### **src/constants/status.constants.ts**

```typescript
import { 
  UserStatus, UserType,
  PatientStatus, Gender,
  ReportStatus, ReportType,
  SessionStatus, SessionType
} from '../types';

// =======================
// MAPEAMENTOS DE STATUS
// =======================

// Labels em português para status
export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.INACTIVE]: 'Inativo',
  [UserStatus.PENDING]: 'Pendente'
};

export const USER_TYPE_LABELS: Record<UserType, string> = {
  [UserType.ADMIN]: 'Administrador',
  [UserType.NORMAL]: 'Psicólogo'
};

export const PATIENT_STATUS_LABELS: Record<PatientStatus, string> = {
  [PatientStatus.ACTIVE]: 'Ativo',
  [PatientStatus.INACTIVE]: 'Inativo',
  [PatientStatus.PENDING]: 'Pendente'
};

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: 'Masculino',
  [Gender.FEMALE]: 'Feminino',
  [Gender.OTHER]: 'Outro'
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  [ReportStatus.DRAFT]: 'Rascunho',
  [ReportStatus.PROCESSING]: 'Processando',
  [ReportStatus.COMPLETED]: 'Concluído',
  [ReportStatus.EDITED]: 'Editado',
  [ReportStatus.FAILED]: 'Falhou'
};

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  [ReportType.AUDIO]: 'Áudio',
  [ReportType.TEXT]: 'Texto'
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  [SessionStatus.WAITING]: 'Aguardando',
  [SessionStatus.CONFIRMED]: 'Confirmada',
  [SessionStatus.COMPLETED]: 'Concluída',
  [SessionStatus.CANCELLED]: 'Cancelada',
  [SessionStatus.NO_SHOW]: 'Faltou'
};

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  [SessionType.CONSULTATION]: 'Consulta',
  [SessionType.FOLLOW_UP]: 'Retorno',
  [SessionType.INITIAL]: 'Primeira consulta',
  [SessionType.EMERGENCY]: 'Emergência'
};

// =======================
// MAPEAMENTOS DE BADGE VARIANTS
// =======================

export const USER_STATUS_VARIANTS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'success',
  [UserStatus.INACTIVE]: 'destructive',
  [UserStatus.PENDING]: 'warning'
};

export const PATIENT_STATUS_VARIANTS: Record<PatientStatus, string> = {
  [PatientStatus.ACTIVE]: 'success',
  [PatientStatus.INACTIVE]: 'destructive',
  [PatientStatus.PENDING]: 'warning'
};

export const REPORT_STATUS_VARIANTS: Record<ReportStatus, string> = {
  [ReportStatus.DRAFT]: 'secondary',
  [ReportStatus.PROCESSING]: 'info',
  [ReportStatus.COMPLETED]: 'success',
  [ReportStatus.EDITED]: 'warning',
  [ReportStatus.FAILED]: 'destructive'
};

export const SESSION_STATUS_VARIANTS: Record<SessionStatus, string> = {
  [SessionStatus.WAITING]: 'secondary',
  [SessionStatus.CONFIRMED]: 'info',
  [SessionStatus.COMPLETED]: 'success',
  [SessionStatus.CANCELLED]: 'destructive',
  [SessionStatus.NO_SHOW]: 'warning'
};
```

### **src/constants/colors.constants.ts**

```typescript
// =======================
// CORES PARA AVATARS
// =======================

export const AVATAR_COLORS = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-600',
  'bg-red-100 text-red-600',
  'bg-indigo-100 text-indigo-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
  'bg-orange-100 text-orange-600',
  'bg-cyan-100 text-cyan-600'
] as const;

export type AvatarColor = typeof AVATAR_COLORS[number];

// =======================
// CORES PARA CHARTS
// =======================

export const CHART_COLORS = {
  primary: 'hsl(var(--chart-blue))',
  secondary: 'hsl(var(--chart-green))',
  accent: 'hsl(var(--chart-purple))',
  warning: 'hsl(var(--chart-yellow))',
  destructive: 'hsl(var(--chart-red))'
} as const;

// =======================
// CORES POR CATEGORIA
// =======================

export const STATUS_COLORS = {
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  info: 'text-blue-600 bg-blue-100',
  neutral: 'text-gray-600 bg-gray-100'
} as const;

// Função para gerar cor de avatar baseada no nome
export const getAvatarColorByName = (name: string): AvatarColor => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

// Função para gerar iniciais
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
```

### **src/constants/config.constants.ts**

```typescript
// =======================
// CONFIGURAÇÕES DA APLICAÇÃO
// =======================

export const APP_CONFIG = {
  // Paginação
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Upload de arquivos
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_AUDIO_TYPES: [
    'audio/mpeg',
    'audio/wav', 
    'audio/mp3',
    'audio/m4a',
    'audio/ogg'
  ],
  
  // Timeouts
  API_TIMEOUT: 30000, // 30 segundos
  UPLOAD_TIMEOUT: 300000, // 5 minutos
  
  // UI
  TOAST_DURATION: 5000, // 5 segundos
  DEBOUNCE_DELAY: 300, // 300ms
  
  // Validação
  MIN_PASSWORD_LENGTH: 8,
  CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CRM_REGEX: /^CRP \d{2}\/\d{5}$/,
  
  // Sessões
  DEFAULT_SESSION_DURATION: 50, // minutos
  MIN_SESSION_DURATION: 15,
  MAX_SESSION_DURATION: 180,
  
  // AI Processing
  DEFAULT_AI_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 4000,
  
  // Formatação
  DATE_FORMAT: 'dd/MM/yyyy',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
  TIME_FORMAT: 'HH:mm'
} as const;

// URLs da API
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SIGNUP: '/auth/signup',
  REFRESH: '/auth/refresh',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_STATS: '/users/stats',
  
  // Patients
  PATIENTS: '/patients',
  PATIENT_SEARCH: '/patients/search',
  PATIENT_STATS: '/patients/stats',
  
  // Reports
  REPORTS: '/reports',
  REPORT_PROCESS: '/reports/process',
  REPORT_GENERATE: '/reports/generate',
  
  // Sessions
  SESSIONS: '/sessions',
  SCHEDULE: '/sessions/schedule',
  
  // Files
  UPLOAD: '/files/upload',
  DOWNLOAD: '/files/download',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  ACTIVITY: '/dashboard/activity'
} as const;

// Variáveis de ambiente
export const ENV = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
} as const;
```

## 📝 **Schemas de Validação Zod**

### **src/schemas/user.schemas.ts**

```typescript
import { z } from 'zod';
import { UserType, UserStatus } from '../types';

// Schema para criação de usuário
export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  crm: z.string().regex(/^CRP \d{2}\/\d{5}$/, 'CRM inválido').optional(),
  userType: z.nativeEnum(UserType).default(UserType.NORMAL),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  address: z.string().optional()
});

// Schema para atualização de usuário
export const updateUserSchema = createUserSchema.partial().omit({ email: true });

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
});

// Schema para signup
export const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Senhas não coincidem",
    path: ["confirmPassword"]
  }
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
```

### **src/schemas/patient.schemas.ts**

```typescript
import { z } from 'zod';
import { PatientStatus, Gender } from '../types';

// Schema para endereço
const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  country: z.string().default('Brasil')
});

// Schema para criação de paciente
export const createPatientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').optional(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido').optional(),
  birthDate: z.string().optional(),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  gender: z.nativeEnum(Gender).optional(),
  insurancePlan: z.string().optional(),
  insuranceId: z.string().optional(),
  address: addressSchema.optional(),
  notes: z.string().optional(),
  doctorId: z.string().uuid('ID do médico inválido')
});

// Schema para atualização de paciente
export const updatePatientSchema = createPatientSchema.partial().omit({ doctorId: true });

// Schema para busca de pacientes
export const patientSearchSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(PatientStatus).optional(),
  gender: z.nativeEnum(Gender).optional(),
  hasInsurance: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
export type PatientSearchInput = z.infer<typeof patientSearchSchema>;
```

## 🔄 **Arquivo Principal de Re-exports**

### **src/types/index.ts**

```typescript
// Re-exports de todos os tipos
export * from './common.types';
export * from './user.types';
export * from './patient.types';
export * from './report.types';
export * from './session.types';
export * from './api.types';
```

### **src/constants/index.ts**

```typescript
// Re-exports de todas as constantes
export * from './status.constants';
export * from './colors.constants';
export * from './config.constants';
```

### **src/schemas/index.ts**

```typescript
// Re-exports de todos os schemas
export * from './user.schemas';
export * from './patient.schemas';
export * from './report.schemas';
```

## 🎯 **Benefícios da Padronização**

### **1. Eliminação de Duplicações**
- Interface única para cada entidade
- Constantes centralizadas
- Mapeamentos unificados

### **2. Type Safety**
- TypeScript strict mode
- Validação Zod em runtime
- IntelliSense melhorado

### **3. Manutenibilidade**
- Mudanças em um local apenas
- Refatoração facilitada
- Consistência garantida

### **4. Developer Experience**
- Auto-complete aprimorado
- Detecção de erros em build time
- Documentação implícita via tipos

### **5. Preparação para Backend**
- Tipos compatíveis com Supabase
- Validação client/server sincronizada
- APIs type-safe

---

**✅ Status:** Estrutura completa definida
**🔄 Próximo:** Implementar types no código existente
**📈 Impacto:** 100% type-safe, zero duplicações