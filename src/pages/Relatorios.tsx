import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {
  FilePlus2,
  Search,
  CalendarDays,
  ChevronDown,
  Filter,
  FileText,
  ArrowDownUp,
  Mic,
  Eye,
  FilePenLine,
  Download,
  MoreHorizontal,
  Mail,
  History,
  UserPlus,
  Trash2,
  Printer,
  Copy,
  X,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock Data
// Mock Data - Adicionado campo 'content' para os modais
const reportsData = [
  {
    id: 'R12345',
    patient: { name: 'Mariana Costa', diagnosis: 'Transtorno de Ansiedade', initials: 'MC', color: 'bg-primary/10 text-primary' },
    type: 'Áudio',
    sessionDate: '01/07/2025',
    status: 'Concluído',
    content: 'Transcrição da sessão de áudio com Mariana Costa.\nA paciente relatou melhora nos sintomas de ansiedade após o início da terapia cognitivo-comportamental. Discutimos técnicas de respiração e mindfulness. Próxima sessão focará em exposição gradual a situações temidas.'
  },
  {
    id: 'R12346',
    patient: { name: 'Pedro Almeida', diagnosis: 'Depressão', initials: 'PA', color: 'bg-green-100 text-green-600' },
    type: 'Texto',
    sessionDate: '30/06/2025',
    status: 'Editado',
    content: 'Relatório da sessão de texto com Pedro Almeida.\nO paciente continua a apresentar humor deprimido, mas relatou um pequeno aumento na energia e motivação. Ajustamos a medicação e reforçamos a importância da rotina de sono. Foi encorajado a praticar atividades prazerosas.'
  },
  {
    id: 'R12347',
    patient: { name: 'Juliana Santos', diagnosis: 'TDAH', initials: 'JS', color: 'bg-blue-100 text-blue-600' },
    type: 'Áudio',
    sessionDate: '28/06/2025',
    status: 'Em processamento',
    content: 'Transcrição da sessão de áudio com Juliana Santos.\nA paciente discutiu desafios com a organização e gerenciamento de tempo no trabalho. Exploramos o uso de ferramentas digitais e a técnica Pomodoro para melhorar o foco. A paciente se mostrou receptiva às sugestões.'
  },
  {
    id: 'R12348',
    patient: { name: 'Rafael Mendes', diagnosis: 'Transtorno Bipolar', initials: 'RM', color: 'bg-purple-100 text-purple-600' },
    type: 'Texto',
    sessionDate: '25/06/2025',
    status: 'Concluído',
    content: 'Relatório da sessão de texto com Rafael Mendes.\nO paciente está estável, sem episódios de mania ou depressão nas últimas semanas. A adesão à medicação tem sido consistente. Focamos na psicoeducação sobre os gatilhos e sinais de alerta de novos episódios.'
  },
  {
    id: 'R12349',
    patient: { name: 'Luciana Ferreira', diagnosis: 'Transtorno do Pânico', initials: 'LF', color: 'bg-yellow-100 text-yellow-600' },
    type: 'Áudio',
    sessionDate: '22/06/2025',
    status: 'Concluído',
    content: 'Transcrição da sessão de áudio com Luciana Ferreira.\nA paciente não teve ataques de pânico desde a nossa última sessão. Praticamos a técnica de reestruturação cognitiva para lidar com pensamentos catastróficos. O progresso é notável.'
  },
];

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' } = {
  'Concluído': 'success',
  'Em processamento': 'warning',
  'Editado': 'info',
};

export default function Relatorios() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<(typeof reportsData)[0] | null>(null);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedReports(reportsData.map(r => r.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedReports(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openViewModal = (report: (typeof reportsData)[0]) => {
    setSelectedReport(report);
    setViewModalOpen(true);
  };

  const openEditModal = (report: (typeof reportsData)[0]) => {
    setSelectedReport(report);
    setEditModalOpen(true);
  };


  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <Layout title="Relatórios">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <FileText className="w-7 h-7 mr-2 text-primary" />
            Relatórios
          </h1>
          <p className="text-muted-foreground mt-1">Visualize, gerencie e crie relatórios de pacientes</p>
        </div>
        <Button>
          <FilePlus2 className="w-5 h-5 mr-2" />
          Gerar novo relatório
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome do paciente..." className="pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Data
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filtrar por data</DropdownMenuLabel>
                {/* Date filter options here */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem>Concluído</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Em processamento</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Editado</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  <ArrowDownUp className="w-4 h-4 mr-2" />
                  Ordenar
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                 <DropdownMenuItem>Mais recente</DropdownMenuItem>
                 <DropdownMenuItem>Mais antigo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedReports.length === reportsData.length ? true : selectedReports.length > 0 ? 'indeterminate' : false}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data da Sessão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportsData.map((report) => (
              <TableRow key={report.id} onClick={() => openViewModal(report)} className="cursor-pointer">
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={() => handleSelectRow(report.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${report.patient.color}`}>
                      <span className="font-medium">{report.patient.initials}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">{report.patient.name}</div>
                      <div className="text-xs text-muted-foreground">{report.patient.diagnosis}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      {report.type === 'Áudio' ? <Mic className="w-4 h-4 text-blue-600" /> : <FileText className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{report.type}</span>
                  </div>
                </TableCell>
                <TableCell>{report.sessionDate}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[report.status] || 'default'}>{report.status}</Badge>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openViewModal(report)}><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(report)}><FilePenLine className="w-4 h-4" /></Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Download className="w-4 h-4 mr-2" />Baixar</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="w-4 h-4 mr-2" />Enviar por email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={openDeleteModal}>
                          <Trash2 className="w-4 h-4 mr-2" />Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </Card>

      {/* Batch Actions Bar */}
      {selectedReports.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-card shadow-lg border-t border-border py-3 px-6 transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{selectedReports.length} relatórios selecionados</span>
              <Button variant="link" size="sm" onClick={() => setSelectedReports([])}>Limpar seleção</Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Baixar</Button>
              <Button variant="outline"><Mail className="w-4 h-4 mr-2" />Enviar por email</Button>
              <Button variant="destructive" onClick={openDeleteModal}><Trash2 className="w-4 h-4 mr-2" />Excluir</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Report Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Relatório de Sessão</DialogTitle>
          </DialogHeader>
          <div className="p-6 overflow-y-auto flex-1">
            {selectedReport && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Paciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${selectedReport.patient.color}`}>
                          <span className="text-xl font-medium">{selectedReport.patient.initials}</span>
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-foreground">{selectedReport.patient.name}</div>
                          <div className="text-sm text-muted-foreground">{selectedReport.patient.diagnosis}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Detalhes do Relatório</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between"><strong>ID:</strong> <span>{selectedReport.id}</span></div>
                      <div className="flex justify-between"><strong>Data da Sessão:</strong> <span>{selectedReport.sessionDate}</span></div>
                      <div className="flex justify-between"><strong>Tipo:</strong> <span>{selectedReport.type}</span></div>
                      <div className="flex justify-between items-center"><strong>Status:</strong> <Badge variant={statusVariantMap[selectedReport.status] || 'default'}>{selectedReport.status}</Badge></div>
                    </CardContent>
                  </Card>
                                     <div className="grid grid-cols-2 gap-2 pt-2">
                     <Button className="w-full"><Printer className="w-4 h-4 mr-2" /> Imprimir</Button>
                     <Button className="w-full" variant="outline"><Download className="w-4 h-4 mr-2" /> Baixar PDF</Button>
                   </div>
                </div>
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Conteúdo do Relatório</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{selectedReport.content}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Report Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Relatório</DialogTitle>
            <DialogDescription>
              Faça as alterações no conteúdo do relatório abaixo. As alterações serão salvas permanentemente.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedReport && (
              <Textarea
                defaultValue={selectedReport.content}
                rows={15}
                className="w-full bg-background"
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setEditModalOpen(false)}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <Trash2 className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <p className="text-muted-foreground">Tem certeza que deseja excluir o(s) relatório(s) selecionado(s)? Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setDeleteModalOpen(false)}>Sim, Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Layout>
  );
}