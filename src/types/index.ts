// =======================
// COMMON TYPES
// =======================

export type UUID = string;
export type ISODateString = string;

// =======================
// PATIENT TYPES
// =======================

export interface Patient {
  id: string;
  name: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  insurancePlan?: string;
  insuranceId?: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  notes?: string;
  doctorId?: UUID;
  lastAppointment?: string;
  nextAppointment?: string;
  totalSessions?: number;
  lastSessionDate?: string;
}

export interface PatientPublic {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  lastAppointment?: string;
}

// =======================
// REPORT TYPES
// =======================

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  sessionDate: string;
  consultType: string;
  reportType: 'audio' | 'text';
  status: 'Concluído' | 'Editado' | 'Rascunho' | 'Processando';
  content?: string;
  originalContent?: string;
  audioFileUrl?: string;
  audioFileName?: string;
  audioFileSize?: number;
  processingDuration?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ReportWithPatient extends Report {
  patient: PatientPublic;
}

// =======================
// USER TYPES
// =======================

export interface User {
  id: string;
  name: string;
  email: string;
  crm?: string;
  type: 'Admin' | 'Normal';
  status: 'Ativo' | 'Inativo';
  patients?: number;
  transcriptions?: number;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface UserWithStats extends User {
  stats: {
    totalPatients: number;
    totalReports: number;
    reportsThisMonth: number;
    lastActivity?: string;
  };
}

// =======================
// SESSION TYPES
// =======================

export interface Session {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'waiting' | 'completed' | 'cancelled';
  type: 'Consulta' | 'Retorno' | 'Primeira consulta';
  notes?: string;
}

// =======================
// ACTIVITY TYPES
// =======================

export interface ActivityItem {
  id: string;
  type: 'report' | 'patient' | 'session' | 'user';
  action: string;
  resourceName: string;
  timestamp: string;
  user?: string;
}

// =======================
// API RESPONSE TYPES
// =======================

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// =======================
// FORM TYPES
// =======================

export interface CreatePatientData {
  name: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  insurancePlan?: string;
  insuranceId?: string;
  notes?: string;
}

export interface CreateReportData {
  patientId: string;
  sessionDate: string;
  consultType: string;
  reportType: 'audio' | 'text';
  content?: string;
  audioFile?: File;
}

// =======================
// DASHBOARD TYPES
// =======================

export interface DashboardStats {
  totalPatients: number;
  totalReports: number;
  reportsThisMonth: number;
  upcomingSessions: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityItem[];
  upcomingSessions: Session[];
  recentReports: Report[];
}