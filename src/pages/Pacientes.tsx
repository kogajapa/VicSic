import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  User, UserPlus, Search, Filter, CalendarDays, ChevronDown, ListChecks, Table as TableIcon, LayoutGrid,
  Eye, FilePenLine, Trash2, Download, Archive, X, Mail, Phone, MessageSquare, FileText, ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { PATIENT_STATUS_VARIANTS } from '@/constants';

// Mock Data
const patientsData = [
  {
    id: 'P12345',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    birthDate: '15/03/1985',
    phone: '(11) 98765-4321',
    status: 'Ativo',
    lastAppointment: '28/06/2025',
    initials: 'MC',
    avatarColor: 'bg-primary/10 text-primary',
    cpf: '111.222.333-44',
    gender: 'Feminino',
    insurancePlan: 'Plano Ouro',
    insuranceId: '987654321',
    address: { street: 'Rua das Flores, 123', city: 'São Paulo', state: 'SP' },
    notes: 'Paciente apresenta quadro de ansiedade generalizada.'
  },
  {
    id: 'P12346',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@email.com',
    birthDate: '22/07/1978',
    phone: '(11) 97654-3210',
    status: 'Ativo',
    lastAppointment: '30/06/2025',
    initials: 'PA',
    avatarColor: 'bg-green-100 text-green-600',
    cpf: '222.333.444-55',
    gender: 'Masculino',
    insurancePlan: 'Plano Prata',
    insuranceId: '123456789',
    address: { street: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP' },
    notes: ''
  },
  {
    id: 'P12347',
    name: 'Juliana Santos',
    email: 'juliana.santos@email.com',
    birthDate: '05/11/1992',
    phone: '(11) 96543-2109',
    status: 'Inativo',
    lastAppointment: '15/05/2025',
    initials: 'JS',
    avatarColor: 'bg-blue-100 text-blue-600',
    cpf: '333.444.555-66',
    gender: 'Feminino',
    insurancePlan: 'Plano Bronze',
    insuranceId: '456789123',
    address: { street: 'Rua da Consolação, 500', city: 'São Paulo', state: 'SP' },
    notes: 'Paciente transferido.'
  },
  {
    id: 'P12348',
    name: 'Rafael Mendes',
    email: 'rafael.mendes@email.com',
    birthDate: '18/09/1980',
    phone: '(11) 95432-1098',
    status: 'Pendente',
    lastAppointment: '-',
    initials: 'RM',
    avatarColor: 'bg-purple-100 text-purple-600',
    cpf: '444.555.666-77',
    gender: 'Masculino',
    insurancePlan: 'N/A',
    insuranceId: 'N/A',
    address: { street: 'Av. Faria Lima, 2500', city: 'São Paulo', state: 'SP' },
    notes: 'Aguardando documentação.'
  },
  {
    id: 'P12349',
    name: 'Luciana Ferreira',
    email: 'luciana.ferreira@email.com',
    birthDate: '12/04/1990',
    phone: '(11) 94321-0987',
    status: 'Ativo',
    lastAppointment: '25/06/2025',
    initials: 'LF',
    avatarColor: 'bg-yellow-100 text-yellow-600',
    cpf: '555.666.777-88',
    gender: 'Feminino',
    insurancePlan: 'Plano Ouro',
    insuranceId: '654321987',
    address: { street: 'Rua Augusta, 900', city: 'São Paulo', state: 'SP' },
    notes: ''
  },
];


export default function Pacientes() {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [isDetailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientsData)[0] | null>(null);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedPatients(patientsData.map(p => p.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedPatients(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openDetailsPanel = (patient: (typeof patientsData)[0]) => {
    setSelectedPatient(patient);
    setDetailsPanelOpen(true);
  };

  return (
    <Layout title="Pacientes">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <User className="w-7 h-7 mr-2 text-primary" />
            Gerenciamento de Pacientes
          </h1>
          <p className="text-muted-foreground mt-1">Visualize, adicione e gerencie todos os pacientes cadastrados</p>
        </div>
        <Button onClick={() => setAddEditModalOpen(true)}>
          <UserPlus className="w-5 h-5 mr-2" />
          Adicionar Paciente
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome, ID ou contato..." className="pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Ativos</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inativos</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pendentes</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Data de Cadastro
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              {/* Date filter dropdown content here */}
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ListChecks className="w-4 h-4 mr-2" />
                  Visualização
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><TableIcon className="w-4 h-4 mr-2" />Tabela</DropdownMenuItem>
                <DropdownMenuItem><LayoutGrid className="w-4 h-4 mr-2" />Cards</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPatients.length === patientsData.length ? true : selectedPatients.length > 0 ? 'indeterminate' : false}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientsData.map((patient) => (
              <TableRow key={patient.id} onClick={() => openDetailsPanel(patient)} className="cursor-pointer">
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedPatients.includes(patient.id)}
                    onCheckedChange={() => handleSelectRow(patient.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${patient.avatarColor}`}>
                      <span className="font-medium">{patient.initials}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">{patient.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{patient.birthDate}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>
                  <Badge variant={PATIENT_STATUS_VARIANTS[patient.status as keyof typeof PATIENT_STATUS_VARIANTS] || 'default'}>{patient.status}</Badge>
                </TableCell>
                <TableCell>{patient.lastAppointment}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openDetailsPanel(patient)}><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setAddEditModalOpen(true)}><FilePenLine className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteModalOpen(true)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="p-4 border-t">
            <Pagination>
                <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </Card>

      {/* Batch Actions Bar */}
      {selectedPatients.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-card shadow-lg border-t border-border py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{selectedPatients.length} pacientes selecionados</span>
              <Button variant="link" size="sm" onClick={() => setSelectedPatients([])}>Limpar seleção</Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar</Button>
              <Button variant="outline"><Archive className="w-4 h-4 mr-2" />Arquivar</Button>
              <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}><Trash2 className="w-4 h-4 mr-2" />Excluir</Button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Panel */}
      <Sheet open={isDetailsPanelOpen} onOpenChange={setDetailsPanelOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Detalhes do Paciente</SheetTitle>
          </SheetHeader>
          {selectedPatient && (
            <div className="py-4 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex flex-col items-center space-y-2 mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${selectedPatient.avatarColor}`}>
                  <span className="text-2xl font-medium">{selectedPatient.initials}</span>
                </div>
                <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                <p className="text-sm text-muted-foreground">ID: {selectedPatient.id}</p>
              </div>

              <Card>
                <CardHeader><CardTitle className="text-base">Informações Pessoais</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between"><span>CPF:</span> <span>{selectedPatient.cpf}</span></div>
                  <div className="flex justify-between"><span>Data de Nasc.:</span> <span>{selectedPatient.birthDate}</span></div>
                  <div className="flex justify-between"><span>Gênero:</span> <span>{selectedPatient.gender}</span></div>
                  <div className="flex justify-between"><span>Convênio:</span> <span>{selectedPatient.insurancePlan}</span></div>
                  <div className="flex justify-between"><span>Nº Carteirinha:</span> <span>{selectedPatient.insuranceId}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Informações de Contato</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between"><span>Email:</span> <span className="truncate">{selectedPatient.email}</span></div>
                  <div className="flex justify-between"><span>Telefone:</span> <span>{selectedPatient.phone}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Endereço</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between"><span>Endereço:</span> <span className="text-right">{selectedPatient.address.street}</span></div>
                  <div className="flex justify-between"><span>Cidade:</span> <span>{selectedPatient.address.city}</span></div>
                  <div className="flex justify-between"><span>Estado:</span> <span>{selectedPatient.address.state}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Observações</CardTitle></CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground italic">{selectedPatient.notes || 'Nenhuma observação.'}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Relatórios Recentes</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Relatório de Sessão</p>
                        <p className="text-xs text-muted-foreground">Gerado em: 28/06/2025</p>
                      </div>
                      <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-2" />Ver Relatório</Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Relatório de Acompanhamento</p>
                        <p className="text-xs text-muted-foreground">Gerado em: 15/06/2025</p>
                      </div>
                      <Button variant="outline" size="sm"><FileText className="w-4 h-4 mr-2" />Ver Relatório</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setDetailsPanelOpen(false)}>Fechar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Patient Modal */}
      <Dialog open={isAddEditModalOpen} onOpenChange={setAddEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Paciente</DialogTitle>
            <DialogDescription>Preencha os dados para cadastrar um novo paciente.</DialogDescription>
          </DialogHeader>
                    <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Informações Pessoais */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input id="nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nascimento">Data de Nascimento *</Label>
                  <Input id="nascimento" placeholder="dd/mm/aaaa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genero">Gênero</Label>
                  <Select>
                    <SelectTrigger id="genero">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="convenio">Convênio</Label>
                  <Input id="convenio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carteirinha">Número da Carteirinha</Label>
                  <Input id="carteirinha" />
                </div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Informações de Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input id="telefone" type="tel" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Endereço</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" />
                  </div>
                </div>
              </div>
            </div>

            {/* Informações Adicionais */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Informações Adicionais</h3>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setAddEditModalOpen(false)}>Salvar Paciente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o(s) paciente(s) selecionado(s)? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setDeleteModalOpen(false)}>Sim, Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}