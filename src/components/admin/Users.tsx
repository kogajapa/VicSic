import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Users as UsersIcon,
  UserPlus,
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  User,
  FileText,
  ShieldCheck,
  X,
  ArrowUp,
  UserCheck,
  MoreHorizontal,
  Camera,
  Clock,
  BarChart,
  Mail,
} from 'lucide-react';

// Tipos
type UserData = {
  id: number;
  name: string;
  email: string;
  crm: string;
  patients: number;
  transcriptions: number;
  status: 'Ativo' | 'Inativo';
  type: 'Admin' | 'Normal';
  avatar?: string;
};

// Dados Estáticos
const usersData: UserData[] = [
  {
    id: 1,
    name: 'Dra. Mariana Santos',
    email: 'mariana.santos@vicsic.com',
    crm: 'CRP 06/98745',
    patients: 32,
    transcriptions: 128,
    status: 'Ativo',
    type: 'Admin',
  },
  {
    id: 2,
    name: 'Dr. Paulo Mendonça',
    email: 'paulo.mendonca@vicsic.com',
    crm: 'CRP 06/45678',
    patients: 24,
    transcriptions: 96,
    status: 'Ativo',
    type: 'Normal',
  },
  {
    id: 3,
    name: 'Dra. Fernanda Almeida',
    email: 'fernanda.almeida@vicsic.com',
    crm: 'CRP 06/12345',
    patients: 18,
    transcriptions: 76,
    status: 'Ativo',
    type: 'Normal',
  },
  {
    id: 4,
    name: 'Dr. Roberto Cardoso',
    email: 'roberto.cardoso@vicsic.com',
    crm: 'CRP 06/78901',
    patients: 28,
    transcriptions: 112,
    status: 'Ativo',
    type: 'Normal',
  },
  {
    id: 5,
    name: 'Dra. Camila Vieira',
    email: 'camila.vieira@vicsic.com',
    crm: 'CRP 06/56789',
    patients: 15,
    transcriptions: 64,
    status: 'Inativo',
    type: 'Normal',
  },
];

const UsersPage = () => {
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);

  const handleOpenDetailsModal = (user: UserData) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleOpenEditModal = (user: UserData | null) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const StatusBadge = ({ status }: { status: 'Ativo' | 'Inativo' }) => (
    <Badge variant={status === 'Ativo' ? 'default' : 'destructive'}
      className={status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
      {status}
    </Badge>
  );

  const TypeBadge = ({ type }: { type: 'Admin' | 'Normal' }) => (
    <Badge variant={type === 'Admin' ? 'secondary' : 'outline'}
      className={type === 'Admin' ? 'bg-blue-100 text-blue-800' : ''}>
      {type}
    </Badge>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center">
                <UsersIcon className="w-7 h-7 mr-3 text-primary" />
                Gerenciamento de Usuários
              </h1>
              <p className="text-muted-foreground mt-2">Gerencie os psicólogos cadastrados no sistema Paulo excelência em Psiquiatria</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              <Button onClick={() => handleOpenEditModal(null)}>
                <UserPlus className="w-5 h-5 mr-2" />
                Adicionar Usuário
              </Button>
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuários</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">124</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12% este mês
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
                <div className="p-2 bg-green-500/10 rounded-full">
                  <UserCheck className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">112</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  8% este mês
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Pacientes</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <UsersIcon className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">1.458</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  15% este mês
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Transcrições</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-full">
                  <FileText className="h-4 w-4 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">4.872</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  22% este mês
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="p-6 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="relative flex-grow w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome, email ou CRM..." 
                  className="pl-10 h-10 focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select>
                  <SelectTrigger className="w-[160px] h-10">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px] h-10">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="admin">Administradores</SelectItem>
                    <SelectItem value="normal">Usuários normais</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  Mais filtros
                </Button>
              </div>
            </div>
          </Card>

          {/* Tabela de Usuários */}
          <Card className="shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                  <TableHead className="font-semibold">Psicólogo</TableHead>
                  <TableHead className="font-semibold">CRM</TableHead>
                  <TableHead className="font-semibold">Pacientes</TableHead>
                  <TableHead className="font-semibold">Transcrições</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="text-right font-semibold pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30 border-b">
                    <TableCell className="pl-6"><Checkbox /></TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">{user.crm}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      <div className="flex items-center">
                        <span className="font-semibold">{user.patients}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      <div className="flex items-center">
                        <span className="font-semibold">{user.transcriptions}</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={user.status} /></TableCell>
                    <TableCell><TypeBadge type={user.type} /></TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={() => handleOpenDetailsModal(user)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={() => handleOpenEditModal(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted hover:text-red-500" onClick={() => handleOpenDeleteModal(user)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Paginação (Placeholder) */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">1</span> a <span className="font-medium text-foreground">5</span> de <span className="font-medium text-foreground">124</span> usuários
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="h-8">Anterior</Button>
              <Button size="sm" className="h-8 min-w-8">1</Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8">2</Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="h-8 min-w-8">25</Button>
              <Button variant="outline" size="sm" className="h-8">Próximo</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold">
              {selectedUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Coluna da Foto */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-4 relative group cursor-pointer">
                  <User className="w-16 h-16 text-muted-foreground" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      <Camera className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Alterar foto
                </Button>
              </div>

              {/* Coluna dos Campos */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nome completo</label>
                    <Input defaultValue={selectedUser?.name} placeholder="Nome do psicólogo" className="h-10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input type="email" defaultValue={selectedUser?.email} placeholder="email@exemplo.com" className="h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CRM</label>
                    <Input defaultValue={selectedUser?.crm} placeholder="CRP 00/00000" className="h-10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                    <Input type="tel" placeholder="(00) 00000-0000" className="h-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Endereço do consultório</label>
                  <Input placeholder="Endereço completo" className="h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                    <Select defaultValue={selectedUser?.status || 'Ativo'}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tipo de Usuário</label>
                    <Select defaultValue={selectedUser?.type || 'Normal'}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="ml-2">
              {selectedUser ? 'Salvar Alterações' : 'Adicionar Usuário'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold text-red-600">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Você tem certeza que deseja excluir o usuário <span className="font-semibold text-foreground">{selectedUser?.name}</span>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="button" variant="destructive" className="ml-2">
              Excluir Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes do Usuário */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Perfil do Psicólogo
              </DialogTitle>
              <div className="flex items-center space-x-2">
                {selectedUser && (
                  <>
                    <StatusBadge status={selectedUser.status} />
                    <TypeBadge type={selectedUser.type} />
                  </>
                )}
              </div>
            </div>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-6 space-y-8">
              {/* Header Section - Profile Info */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/20">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white shadow-lg">
                    <User className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedUser.name}</h3>
                  <p className="text-muted-foreground mb-2 flex items-center">
                    <span className="mr-2">📧</span>
                    {selectedUser.email}
                  </p>
                  <p className="text-muted-foreground mb-4 flex items-center">
                    <span className="mr-2">🏥</span>
                    {selectedUser.crm}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <span className="mr-1">📅</span>
                      <span>Cadastrado em 15/03/2025</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="mr-1">🟢</span>
                      <span>Último acesso: 01/07/2025, 09:15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Ativos</CardTitle>
                    <div className="p-2 bg-blue-500/15 rounded-full">
                      <UsersIcon className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{selectedUser.patients}</div>
                    <p className="text-xs text-green-600 flex items-center mt-2">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+5 este mês</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Transcrições</CardTitle>
                    <div className="p-2 bg-purple-500/15 rounded-full">
                      <FileText className="h-5 w-5 text-purple-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{selectedUser.transcriptions}</div>
                    <p className="text-xs text-green-600 flex items-center mt-2">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>+12 este mês</span>
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Pacientes Recentes */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <UsersIcon className="h-5 w-5 mr-2 text-blue-500" />
                      Pacientes Recentes
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Ver todos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                          AB
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Ana Beatriz Silva</p>
                          <p className="text-sm text-muted-foreground">8 transcrições • Última: 01/07/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ativo
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                          CM
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Carlos Eduardo Martins</p>
                          <p className="text-sm text-muted-foreground">12 transcrições • Última: 30/06/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ativo
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                          LS
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Luiza Santos</p>
                          <p className="text-sm text-muted-foreground">6 transcrições • Última: 28/06/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Inativo
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                          MF
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Maria Fernanda Costa</p>
                          <p className="text-sm text-muted-foreground">15 transcrições • Última: 25/06/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ativo
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                          JS
                        </div>
                        <div>
                          <p className="font-medium text-foreground">João Silva</p>
                          <p className="text-sm text-muted-foreground">9 transcrições • Última: 20/06/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ativo
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter className="pt-6 border-t flex flex-col sm:flex-row gap-3">
            <div className="flex flex-wrap gap-2 flex-1">
              <Button variant="outline" size="sm">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {selectedUser?.type === 'Admin' ? 'Remover Admin' : 'Tornar Admin'}
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Relatório Completo
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </Button>
            </div>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              <Button onClick={() => {
                if (!selectedUser) return;
                setDetailsModalOpen(false);
                handleOpenEditModal(selectedUser);
              }}>
                <Pencil className="w-4 h-4 mr-2" />
                Editar Usuário
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UsersPage;
