
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Settings, 
  UserCheck, 
  FileText, 
  Shield, 
  Link, 
  RefreshCw,
  Camera,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Download,
  Laptop,
  Smartphone,
  HardDrive,
  GripVertical
} from 'lucide-react';

export default function Configuracoes() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['profile']);
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const SectionCard = ({ 
    id, 
    icon: Icon, 
    title, 
    description, 
    children, 
    iconBgColor = 'bg-primary/10',
    iconColor = 'text-primary'
  }: {
    id: string;
    icon: any;
    title: string;
    description: string;
    children: React.ReactNode;
    iconBgColor?: string;
    iconColor?: string;
  }) => {
    const isExpanded = expandedSections.includes(id);
    
    return (
      <Card className={`section-card transition-all duration-300 hover:shadow-lg ${isExpanded ? 'border-primary' : ''}`}>
        <div 
          className="p-6 cursor-pointer flex justify-between items-center"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center mr-4`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="border-t border-gray-200 pt-6">
              {children}
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <Layout title="Configurações">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <Settings className="w-7 h-7 mr-2 text-primary" />
            Configurações
          </h1>
          <p className="text-muted-foreground mt-1">Gerencie suas preferências do sistema VicSic</p>
        </div>

      </div>

      <div className="space-y-6 mb-8">
        {/* Profile Section */}
        <SectionCard
          id="profile"
          icon={UserCheck}
          title="Informações de Perfil"
          description="Gerencie suas informações pessoais e profissionais"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 relative group">
                <UserCheck className="w-16 h-16 text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <Camera className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="text-primary border-primary/20 bg-primary/10 hover:bg-primary/20">
                Alterar foto
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                <Input defaultValue="Dr. Ricardo Oliveira" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                <Input defaultValue="Psiquiatria" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CRM</label>
                <Input defaultValue="12345-SP" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" defaultValue="ricardo.oliveira@exemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <Input type="tel" defaultValue="(11) 98765-4321" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço do consultório</label>
                <Input defaultValue="Av. Paulista, 1000 - Sala 123" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>Salvar alterações</Button>
          </div>
        </SectionCard>



        {/* Security Section */}
        <SectionCard
          id="security"
          icon={Shield}
          title="Segurança da Conta"
          description="Gerencie sua senha e opções de autenticação"
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Alterar senha</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
                  <div className="relative">
                    <Input 
                      type={showPassword.current ? 'text' : 'password'}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
                  <div className="relative">
                    <Input 
                      type={showPassword.new ? 'text' : 'password'}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="h-1 w-1/4 bg-red-500 rounded"></div>
                      <div className="h-1 w-1/4 bg-gray-200 rounded"></div>
                      <div className="h-1 w-1/4 bg-gray-200 rounded"></div>
                      <div className="h-1 w-1/4 bg-gray-200 rounded"></div>
                    </div>
                    <p className="text-xs text-gray-500">Fraca: Adicione mais caracteres, números e símbolos</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
                  <div className="relative">
                    <Input 
                      type={showPassword.confirm ? 'text' : 'password'}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button>Atualizar senha</Button>
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Histórico de login</h4>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data e hora
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dispositivo
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Localização
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { date: '01/07/2025, 08:45', device: 'MacBook Pro (Chrome)', icon: Laptop, location: 'São Paulo, Brasil', status: 'Sucesso', statusColor: 'bg-green-100 text-green-800' },
                          { date: '30/06/2025, 17:23', device: 'iPhone 15 (Safari)', icon: Smartphone, location: 'São Paulo, Brasil', status: 'Sucesso', statusColor: 'bg-green-100 text-green-800' },
                          { date: '29/06/2025, 09:12', device: 'MacBook Pro (Chrome)', icon: Laptop, location: 'Rio de Janeiro, Brasil', status: 'Falha', statusColor: 'bg-red-100 text-red-800' }
                        ].map((login, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {login.date}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <login.icon className="w-4 h-4 mr-1 text-gray-400" />
                                <span>{login.device}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {login.location}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${login.statusColor}`}>
                                {login.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Button variant="ghost" className="mt-4 text-primary p-0">
                <Download className="w-4 h-4 mr-1" />
                Exportar histórico completo
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Integrations Section */}
        <SectionCard
          id="integrations"
          icon={Link}
          title="Integrações"
          description="Conecte o VicSic com outros sistemas e aplicativos"
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                      <HardDrive className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Google Drive</h5>
                      <p className="text-xs text-gray-500 mt-1">Armazene e compartilhe documentos no Drive</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mr-3">
                      Desconectado
                    </span>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm">Conectar</Button>
                </div>
              </Card>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900 mb-4">Opções de sincronização</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sincronização automática</p>
                    <p className="text-xs text-gray-500">Sincronizar dados automaticamente</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sincronização em segundo plano</p>
                    <p className="text-xs text-gray-500">Sincronizar mesmo quando o aplicativo estiver fechado</p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Frequência de sincronização</p>
                  <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>A cada 15 minutos</option>
                    <option>A cada 30 minutos</option>
                    <option selected>A cada 1 hora</option>
                    <option>A cada 3 horas</option>
                    <option>A cada 6 horas</option>
                    <option>Diariamente</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button>Salvar alterações</Button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mb-8">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar todas as alterações</Button>
      </div>
    </Layout>
  );
}
