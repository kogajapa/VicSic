import { Routes, Route, useLocation } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AgentConfig } from '@/components/admin/AgentConfig';
import { Plans } from '@/components/admin/Plans';
import UsersPage from '@/components/admin/Users';
import LogsPage from '@/components/admin/Logs';
import { FeedbacksPage } from '@/components/admin/Feedbacks';
import { SettingsPage } from '@/components/admin/SettingsPage';
import { useEffect, useState } from 'react';

// Componente de placeholder para páginas não implementadas
const Placeholder = ({ pageName }: { pageName: string }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-10 border rounded-lg bg-card">
      <h2 className="text-2xl font-bold">Página "{pageName}" em Construção</h2>
      <p className="text-muted-foreground mt-2">Esta funcionalidade estará disponível em breve.</p>
    </div>
  </div>
);

export default function Administrador() {
  const location = useLocation();
  const [title, setTitle] = useState('Administração');

  useEffect(() => {
    switch (location.pathname) {
      case '/administrador':
        setTitle('Administração / Configuração do Agente');
        break;
      case '/administrador/planos':
        setTitle('Administração / Planos e Limites');
        break;
      case '/administrador/usuarios':
        setTitle('Administração / Usuários');
        break;
      case '/administrador/configuracoes':
        setTitle('Administração / Configurações');
        break;
      case '/administrador/logs':
        setTitle('Administração / Logs e Auditoria');
        break;
      case '/administrador/feedbacks':
        setTitle('Administração / Feedbacks');
        break;
      default:
        setTitle('Administração');
    }
  }, [location.pathname]);

  return (
    <AdminLayout title={title}>
      <Routes>
        <Route index element={<AgentConfig />} />
        <Route path="planos" element={<Plans />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
        <Route path="feedbacks" element={<FeedbacksPage />} />
      </Routes>
    </AdminLayout>
  );
}
