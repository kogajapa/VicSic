import { NavLink } from 'react-router-dom';
import { Bot, Users, Crown, Settings, History, MessageSquare, ChevronLeft } from 'lucide-react';

const navItems = [
  { to: '/administrador', icon: Bot, label: 'Agente' },
  { to: '/administrador/usuarios', icon: Users, label: 'Usuários' },
  { to: '/administrador/planos', icon: Crown, label: 'Planos e Limites' },
  { to: '/administrador/configuracoes', icon: Settings, label: 'Configurações' },
  { to: '/administrador/logs', icon: History, label: 'Logs e Auditoria' },
  { to: '/administrador/feedbacks', icon: MessageSquare, label: 'Feedbacks' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 h-full bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-border">
        {/* O estilo Pacifico precisa ser configurado no tailwind.config.js se não estiver */}
        <h1 className="font-['Pacifico'] text-2xl text-primary">VicSic</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end // 'end' prop ensures only exact match is active for parent routes
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg hover:bg-muted/80 transition-colors whitespace-nowrap">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Recolher menu</span>
        </button>
      </div>
    </aside>
  );
}
