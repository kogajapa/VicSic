import { Routes, Route, useLocation } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AgentConfig } from '@/components/admin/AgentConfig';
import UsersPage from '@/components/admin/Users';
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
      case '/administrador/usuarios':
        setTitle('Administração / Usuários');
        break;
      case '/administrador/configuracoes':
        setTitle('Administração / Configurações');
        break;
      default:
        setTitle('Administração');
    }
  }, [location.pathname]);

  return (
    <AdminLayout title={title}>
      <Routes>
        <Route index element={<AgentConfig />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
}
