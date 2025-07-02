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
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UsersIcon className="w-7 h-7 mr-2 text-primary" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-gray-600 mt-1">Gerencie os psicólogos cadastrados no sistema VicSic</p>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              12% este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              8% este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.458</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              15% este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Transcrições</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.872</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              22% este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar por nome, email ou CRM..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
                <SelectItem value="normal">Usuários normais</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-5 h-5 mr-2" />
              Mais filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><Checkbox /></TableHead>
              <TableHead>Psicólogo</TableHead>
              <TableHead>CRM</TableHead>
              <TableHead>Pacientes</TableHead>
              <TableHead>Transcrições</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{user.crm}</TableCell>
                <TableCell className="text-sm font-medium text-gray-900">{user.patients}</TableCell>
                <TableCell className="text-sm font-medium text-gray-900">{user.transcriptions}</TableCell>
                <TableCell><StatusBadge status={user.status} /></TableCell>
                <TableCell><TypeBadge type={user.type} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDetailsModal(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteModal(user)}>
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
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">124</span> usuários
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <span>...</span>
          <Button variant="outline" size="sm">25</Button>
          <Button variant="outline" size="sm">Próximo</Button>
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</DialogTitle>
          </DialogHeader>
          <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna da Foto */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 relative group">
                <User className="w-16 h-16 text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <Camera className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>
              <Button variant="outline">Alterar foto</Button>
            </div>

            {/* Coluna dos Campos */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                <Input defaultValue={selectedUser?.name} placeholder="Nome do psicólogo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input type="email" defaultValue={selectedUser?.email} placeholder="email@exemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CRM</label>
                <Input defaultValue={selectedUser?.crm} placeholder="CRP 00/00000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <Input type="tel" placeholder="(00) 00000-0000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço do consultório</label>
                <Input placeholder="Endereço completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select defaultValue={selectedUser?.status || 'Ativo'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
                <Select defaultValue={selectedUser?.type || 'Normal'}>
                  <SelectTrigger>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar Usuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir o usuário <span className="font-medium">{selectedUser?.name}</span>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="button" variant="destructive">Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes do Usuário */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Left Column */}
                <div className="col-span-1">
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                        <User className="w-12 h-12 text-gray-500" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{selectedUser.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">{selectedUser.email}</p>
                      <div className="flex space-x-2 mb-4">
                        <StatusBadge status={selectedUser.status} />
                        <TypeBadge type={selectedUser.type} />
                      </div>
                      <div className="w-full border-t border-gray-200 pt-4 text-left">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">CRM:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedUser.crm}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Data de Cadastro:</span>
                          <span className="text-sm font-medium text-gray-900">15/03/2025</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Último Acesso:</span>
                          <span className="text-sm font-medium text-gray-900">01/07/2025, 09:15</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedUser.patients}</div>
                        <p className="text-xs text-green-600 flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>5 novos este mês</span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transcrições</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedUser.transcriptions}</div>
                        <p className="text-xs text-green-600 flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>12 novas este mês</span>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Atividade Recente</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <UserPlus className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">Adicionou novo paciente <span className="font-medium">Rodrigo Oliveira</span></p>
                            <p className="text-xs text-gray-500">01/07/2025, 08:45</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">Realizou transcrição para <span className="font-medium">Ana Beatriz Silva</span></p>
                            <p className="text-xs text-gray-500">01/07/2025, 10:30</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-4">Lista de Pacientes</h5>
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead>Transcrições</TableHead>
                        <TableHead>Última Sessão</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Ana Beatriz Silva</TableCell>
                        <TableCell>15/03/2025</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>01/07/2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Carlos Eduardo Martins</TableCell>
                        <TableCell>22/03/2025</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>30/06/2025</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline">
              <ShieldCheck className="w-5 h-5 mr-2" />
              {selectedUser?.type === 'Admin' ? 'Remover Admin' : 'Tornar Admin'}
            </Button>
            <Button onClick={() => {
              if (!selectedUser) return;
              setDetailsModalOpen(false);
              handleOpenEditModal(selectedUser);
            }}>
              <Pencil className="w-5 h-5 mr-2" />
              Editar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UsersPage;
