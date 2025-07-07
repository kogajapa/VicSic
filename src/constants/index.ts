// =======================
// STATUS CONSTANTS
// =======================

export const PATIENT_STATUS = {
  ACTIVE: 'Ativo' as const,
  INACTIVE: 'Inativo' as const,
  PENDING: 'Pendente' as const,
} as const;

export const REPORT_STATUS = {
  COMPLETED: 'Concluído' as const,
  EDITED: 'Editado' as const,
  DRAFT: 'Rascunho' as const,
  PROCESSING: 'Processando' as const,
} as const;

export const USER_STATUS = {
  ACTIVE: 'Ativo' as const,
  INACTIVE: 'Inativo' as const,
} as const;

export const USER_TYPE = {
  ADMIN: 'Admin' as const,
  NORMAL: 'Normal' as const,
} as const;

export const SESSION_STATUS = {
  CONFIRMED: 'confirmed' as const,
  WAITING: 'waiting' as const,
  COMPLETED: 'completed' as const,
  CANCELLED: 'cancelled' as const,
} as const;

// =======================
// STATUS VARIANT MAPPINGS
// =======================

export const PATIENT_STATUS_VARIANTS = {
  [PATIENT_STATUS.ACTIVE]: 'success' as const,
  [PATIENT_STATUS.INACTIVE]: 'destructive' as const,
  [PATIENT_STATUS.PENDING]: 'warning' as const,
} as const;

export const REPORT_STATUS_VARIANTS = {
  [REPORT_STATUS.COMPLETED]: 'success' as const,
  [REPORT_STATUS.EDITED]: 'info' as const,
  [REPORT_STATUS.DRAFT]: 'secondary' as const,
  [REPORT_STATUS.PROCESSING]: 'warning' as const,
} as const;

export const USER_STATUS_VARIANTS = {
  [USER_STATUS.ACTIVE]: 'success' as const,
  [USER_STATUS.INACTIVE]: 'destructive' as const,
} as const;

export const USER_TYPE_VARIANTS = {
  [USER_TYPE.ADMIN]: 'destructive' as const,
  [USER_TYPE.NORMAL]: 'secondary' as const,
} as const;

// =======================
// AVATAR COLORS
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
  'bg-cyan-100 text-cyan-600',
] as const;

// =======================
// UTILITY FUNCTIONS
// =======================

export const getAvatarColorByName = (name: string): string => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// =======================
// APPLICATION CONFIG
// =======================

export const APP_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_AUDIO_TYPES: [
    'audio/mpeg',
    'audio/wav',
    'audio/mp3',
    'audio/m4a',
    'audio/ogg'
  ],
  API_TIMEOUT: 30000, // 30 seconds
  UPLOAD_TIMEOUT: 300000, // 5 minutes
  TOAST_DURATION: 5000, // 5 seconds
  DEBOUNCE_DELAY: 300, // 300ms
  MIN_PASSWORD_LENGTH: 8,
  CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CRM_REGEX: /^CRP \d{2}\/\d{5}$/,
  DEFAULT_SESSION_DURATION: 50, // minutes
  DATE_FORMAT: 'dd/MM/yyyy',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
  TIME_FORMAT: 'HH:mm'
} as const;

// =======================
// TOAST CONFIGURATION
// =======================

export const TOAST_CONFIG = {
  REMOVE_DELAY: 5000,
  SUCCESS_DURATION: 3000,
  ERROR_DURATION: 5000,
  WARNING_DURATION: 4000,
} as const;