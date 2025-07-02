import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  FilePlus, 
  User, 
  FileText, 
  Settings, 
  Shield, 
  ArrowLeft,
  ArrowRight 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Novo Relatório', href: '/novo-relatorio', icon: FilePlus },
  { name: 'Pacientes', href: '/pacientes', icon: User },
  { name: 'Relatórios', href: '/relatorios', icon: FileText },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
];

const adminNavigation = [
  { name: 'Administrador', href: '/administrador', icon: Shield },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // TODO: Substitua esta variável pela sua lógica de autenticação real
  const isAdmin = true;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="font-pacifico text-2xl text-primary">
          {!isCollapsed && 'VicSic'}
          {isCollapsed && 'V'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''} ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  }`
                }
              >
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <item.icon className="w-5 h-5" />
                </div>
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Admin Navigation */}
      {isAdmin && (
        <div className="py-4 border-t border-sidebar-border">
          <ul className="space-y-1">
            {adminNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''} ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    }`
                  }
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle Button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-sidebar-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap"
        >
          <div className="w-5 h-5 flex items-center justify-center mr-2">
            {isCollapsed ? (
              <ArrowRight className="w-5 h-5" />
            ) : (
              <ArrowLeft className="w-5 h-5" />
            )}
          </div>
          {!isCollapsed && <span>Recolher menu</span>}
        </button>
      </div>
    </aside>
  );
}