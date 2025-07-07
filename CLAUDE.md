# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VicSic is a medical practice management application called "Paulo excelência em Psiquiatria" (Paulo Excellence in Psychiatry). It's a React-based web application built with TypeScript for managing psychiatric practice operations, including patient management, consultation reports, and administrative tasks.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Package Manager
The project uses npm with a package-lock.json file. Do not use other package managers.

## Architecture & Structure

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React hooks (useState, useEffect) - no global state management
- **Icons**: Lucide React
- **Component Library**: Radix UI primitives
- **Charts**: Recharts (installed but not actively used)

### Component Architecture
The application follows a modular component structure:

#### Layout Components (`/src/components/layout/`)
- `Layout.tsx` - Main application wrapper with sidebar and header
- `Sidebar.tsx` - Collapsible navigation with primary and admin modes
- `Header.tsx` - Top navigation with search and user profile
- `AdminLayout.tsx` & `AdminSidebar.tsx` - Admin-specific layouts

#### Feature Components
- `/dashboard/` - Dashboard widgets (StatsCard, ActivityFeed, SessionsTable)
- `/forms/` - Form components (AudioUpload, TextEditor, PatientDropdown)
- `/modals/` - Modal components (ProcessingModal, SuccessModal)
- `/reports/` - Report preview and generation
- `/admin/` - Admin configuration (AgentConfig, Users, Settings)

#### UI Components (`/src/components/ui/`)
Complete shadcn/ui component library with 30+ reusable components including buttons, forms, modals, and data display components.

### Page Structure (`/src/pages/`)
- `Dashboard.tsx` - Main dashboard with stats and activity
- `NovoRelatorio.tsx` - Report creation with audio/text input
- `Pacientes.tsx` - Patient management
- `Relatorios.tsx` - Report listing and management
- `Administrador.tsx` - Admin panel with nested routing
- `Configuracoes.tsx` - Application settings

### Key Features
- **Medical Report Generation**: Audio-to-text transcription and structured report creation
- **Patient Management**: Patient database with consultation history
- **Dashboard Analytics**: Practice metrics and activity tracking
- **Admin Panel**: User management and AI agent configuration
- **Responsive Design**: Mobile-first approach with proper breakpoints

## Design System

### Color Scheme
The application uses CSS variables for theming with a professional medical color palette:
- Primary: Blue/indigo colors (`--primary`, `--primary-hover`, `--primary-light`)
- Semantic colors: `--success`, `--warning`, `--destructive`
- Sidebar-specific: `--sidebar-background`, `--sidebar-active`
- Chart colors: `--chart-blue`, `--chart-green`, `--chart-yellow`, `--chart-red`, `--chart-purple`

### Typography
- Body text: Inter font family
- Branding: Pacifico font for special elements
- Consistent sizing using Tailwind's type scale

### Component Patterns
- Use TypeScript interfaces for all component props
- Follow shadcn/ui patterns for consistency
- Implement proper loading states and error handling
- Use Lucide React icons consistently

## Development Notes

### State Management
The application uses local React state with useState hooks. No global state management library is implemented, making it suitable for adding Redux, Zustand, or similar if needed.

### API Integration
Components are prepared for backend integration with placeholder functions and mock data. Key integration points:
- Patient data fetching in `PatientDropdown`
- Report processing in `NovoRelatorio`
- Dashboard metrics in `Dashboard`
- Admin configuration in `AgentConfig`

### File Structure Conventions
- Use `.tsx` extension for React components
- Use `.ts` for utilities and types
- Components should be default exports
- Use absolute imports with `@/` alias pointing to `src/`

### Mock Data
The application includes mock data for development and testing:
- Patient lists with realistic medical information
- Dashboard statistics and activity feeds
- Report templates with proper medical structure

### AI Integration Framework
The admin panel includes configuration for AI agents with support for:
- Multiple AI providers (OpenAI, Anthropic, Google, etc.)
- Webhook and direct API integration modes
- Secure API key management
- Processing pipeline configuration

## Testing & Quality

### Linting
ESLint is configured with React-specific rules. Always run `npm run lint` before committing changes.

### Type Safety
Full TypeScript implementation with strict type checking. Ensure all new components have proper TypeScript interfaces.

### Performance
- Vite build system provides fast development and optimized production builds
- Components are designed for efficient rendering
- Images and assets are optimized for web delivery

## Deployment

The application is configured for Netlify deployment with:
- `netlify.toml` configuration file
- Build command: `npm run build`
- Publish directory: `dist/`
- Redirects configured for SPA routing