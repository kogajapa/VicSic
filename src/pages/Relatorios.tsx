import { useState, useRef } from 'react';
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FilePlus2,
  Search,
  CalendarDays,
  ChevronDown,
  Plus,
  X,
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
  Info,
  ChevronLeft,
  ChevronRight,
  ClipboardPaste,
  Pill,
  Share2
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
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<(typeof reportsData)[0] | null>(null);
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const [isPrescriptionEditMode, setPrescriptionEditMode] = useState(false);
  const [editablePrescription, setEditablePrescription] = useState<any>(null);

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

  const openPrescriptionModal = (report: (typeof reportsData)[0]) => {
    setSelectedReport(report);
    const initialPrescription = {
      patientName: report.patient.name,
      patientAge: '33 anos',
      patientAddress: 'Rua das Flores, 123 - São Paulo/SP',
      doctorName: 'Dr. Ricardo Oliveira',
      doctorCrm: 'CRM: 12345-SP - Psiquiatra',
      doctorAddress: 'Av. Paulista, 1000 - Sala 123, São Paulo/SP',
      doctorPhone: 'Tel: (11) 3456-7890',
      date: '2025-07-02', // Formato YYYY-MM-DD para input date
      medications: [
        { name: 'Escitalopram 10mg', instructions: '1 comprimido, via oral, pela manhã, após o café da manhã.', quantity: 'Quantidade: 30 comprimidos' },
        { name: 'Clonazepam 0,5mg', instructions: '1 comprimido, via oral, à noite, em caso de crise de ansiedade. Não utilizar por mais de 3 dias consecutivos.', quantity: 'Quantidade: 10 comprimidos' }
      ],
      orientations: [
        'Não interromper o uso do escitalopram sem orientação médica',
        'Evitar ingestão de bebidas alcoólicas durante o tratamento.'
      ]
    };
    setEditablePrescription(initialPrescription);
    setPrescriptionEditMode(false);
    setPrescriptionModalOpen(true);
  };

  const handleCancelEdit = () => {
    openPrescriptionModal(selectedReport!);
    setPrescriptionEditMode(false);
  };

  const handlePrescriptionFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditablePrescription((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    setEditablePrescription((prev: any) => {
        const newMeds = [...prev.medications];
        newMeds[index] = { ...newMeds[index], [name]: value };
        return { ...prev, medications: newMeds };
    });
  };

  const handleOrientationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditablePrescription((prev: any) => ({
        ...prev,
        orientations: e.target.value.split('\n')
    }));
  };

  const handleAddMedication = () => {
    setEditablePrescription((prev: any) => ({
      ...prev,
      medications: [...prev.medications, { name: '', instructions: '', quantity: '' }]
    }));
  };

  const handleRemoveMedication = (index: number) => {
    setEditablePrescription((prev: any) => {
      const newMeds = [...prev.medications];
      newMeds.splice(index, 1);
      return { ...prev, medications: newMeds };
    });
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleDownloadPdf = () => {
    const input = prescriptionRef.current;
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        // Se a altura for maior que a página, ajusta para caber
        let finalHeight = height > pdfHeight ? pdfHeight : height;

        pdf.addImage(imgData, 'PNG', 0, 0, width, finalHeight);
        pdf.save(`prescricao-${selectedReport?.patient.name.replace(/ /g, '_')}.pdf`);
      });
    }
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
                    <Button variant="ghost" size="icon" onClick={() => openPrescriptionModal(report)}><ClipboardPaste className="w-4 h-4" /></Button>
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

      {/* Prescription Modal */}
      {editablePrescription && (
      <Dialog open={isPrescriptionModalOpen} onOpenChange={setPrescriptionModalOpen}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col">
          <div className="p-4 sm:p-6 overflow-y-auto">
            <DialogHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                        <DialogTitle className="text-xl sm:text-2xl font-bold">Prescrição Médica</DialogTitle>
                        <p className="text-sm text-muted-foreground">Paciente: {editablePrescription.patientName}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 whitespace-nowrap">Pronto para assinatura</Badge>
                </div>
            </DialogHeader>
            <div ref={prescriptionRef} className="mt-6 p-4 sm:p-8 border rounded-lg bg-white text-black">
                 {/* Cabeçalho do Receituário */}
                 <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                    <div className="font-bold text-xl sm:text-2xl text-primary">VicSic</div>
                    <div className="text-left sm:text-right text-xs sm:text-sm">
                        {isPrescriptionEditMode ? <Input name="doctorName" value={editablePrescription.doctorName} onChange={handlePrescriptionFieldChange} className="mb-1 font-bold" /> : <p className="font-bold">{editablePrescription.doctorName}</p>}
                        {isPrescriptionEditMode ? <Input name="doctorCrm" value={editablePrescription.doctorCrm} onChange={handlePrescriptionFieldChange} className="mb-1" /> : <p>{editablePrescription.doctorCrm}</p>}
                        {isPrescriptionEditMode ? <Input name="doctorAddress" value={editablePrescription.doctorAddress} onChange={handlePrescriptionFieldChange} className="mb-1" /> : <p>{editablePrescription.doctorAddress}</p>}
                        {isPrescriptionEditMode ? <Input name="doctorPhone" value={editablePrescription.doctorPhone} onChange={handlePrescriptionFieldChange} /> : <p>{editablePrescription.doctorPhone}</p>}
                    </div>
                 </div>

                 {/* Corpo do Receituário */}
                 <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-wider">RECEITUÁRIO</h2>
                    {isPrescriptionEditMode ? <Input name="date" type="date" value={editablePrescription.date} onChange={handlePrescriptionFieldChange} className="text-right w-full mt-4 text-sm" /> : <p className="text-right w-full mt-4 text-sm">Data: {new Date(editablePrescription.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>}
                 </div>

                 <div className="mb-8 text-sm space-y-1">
                    <div className="flex items-center gap-2"><span className="font-bold w-20">Paciente:</span> {isPrescriptionEditMode ? <Input name="patientName" value={editablePrescription.patientName} onChange={handlePrescriptionFieldChange} /> : <span>{editablePrescription.patientName}</span>}</div>
                    <div className="flex items-center gap-2"><span className="font-bold w-20">Idade:</span> {isPrescriptionEditMode ? <Input name="patientAge" value={editablePrescription.patientAge} onChange={handlePrescriptionFieldChange} /> : <span>{editablePrescription.patientAge}</span>}</div>
                    <div className="flex items-center gap-2"><span className="font-bold w-20">Endereço:</span> {isPrescriptionEditMode ? <Input name="patientAddress" value={editablePrescription.patientAddress} onChange={handlePrescriptionFieldChange} /> : <span>{editablePrescription.patientAddress}</span>}</div>
                 </div>

                 {/* Medicação */}
                 <div className="mb-8">
                    <h3 className="text-base sm:text-lg font-bold mb-4">Medicação</h3>
                    <div className="space-y-4">
                        {editablePrescription.medications.map((med: any, index: number) => (
                            <div key={index} className="border-l-4 border-primary pl-4 py-2 relative">
                                {isPrescriptionEditMode ? (
                                    <>
                                        <Input name="name" value={med.name} onChange={(e) => handleMedicationChange(e, index)} className="font-bold text-sm sm:text-base mb-1" placeholder="Nome do Medicamento" />
                                        <Textarea name="instructions" value={med.instructions} onChange={(e) => handleMedicationChange(e, index)} className="text-xs sm:text-sm mb-1" rows={3} placeholder="Instruções de uso" />
                                        <Input name="quantity" value={med.quantity} onChange={(e) => handleMedicationChange(e, index)} className="text-xs text-muted-foreground" placeholder="Quantidade" />
                                        <Button variant="ghost" size="icon" className="absolute top-0 right-0 text-red-500 hover:text-red-700" onClick={() => handleRemoveMedication(index)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-bold text-sm sm:text-base">{med.name}</p>
                                        <p className="text-xs sm:text-sm">{med.instructions}</p>
                                        <p className="text-xs text-muted-foreground">{med.quantity}</p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {isPrescriptionEditMode && (
                        <Button variant="outline" onClick={handleAddMedication} className="mt-4 w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Medicação
                        </Button>
                    )}
                 </div>

                 {/* Orientações */}
                 <div className="mb-12">
                    <h3 className="text-base sm:text-lg font-bold mb-4">Orientações</h3>
                    {isPrescriptionEditMode ? <Textarea value={editablePrescription.orientations.join('\n')} onChange={handleOrientationsChange} rows={4} className="text-xs sm:text-sm" /> : (
                        <ul className="list-disc list-inside text-xs sm:text-sm space-y-1">
                            {editablePrescription.orientations.map((o: string, i: number) => <li key={i}>{o}</li>)}
                        </ul>
                    )}
                 </div>

                 {/* Assinatura */}
                 <div className="mt-20 text-center">
                    <div className="border-t w-64 mx-auto border-black"></div>
                    <p className="mt-2 font-bold text-sm sm:text-base">{editablePrescription.doctorName}</p>
                    <p className="text-xs sm:text-sm">{editablePrescription.doctorCrm.split(' - ')[0]}</p>
                 </div>
            </div>
          </div>
          <DialogFooter className="bg-gray-50 px-4 sm:px-6 py-4 border-t flex flex-wrap justify-center sm:justify-end gap-2">
            {isPrescriptionEditMode ? (
                <>
                    <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                    <Button onClick={() => setPrescriptionEditMode(false)}>Salvar Alterações</Button>
                </>
            ) : (
                <>
                    <Button variant="outline"><Printer className="w-4 h-4 mr-2" /> Imprimir</Button>
                    <Button variant="outline" onClick={handleDownloadPdf}><Download className="w-4 h-4 mr-2" /> Baixar PDF</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline"><Share2 className="w-4 h-4 mr-2" /> Compartilhar <ChevronDown className="w-4 h-4 ml-2"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Enviar por E-mail</DropdownMenuItem>
                            <DropdownMenuItem>Enviar por WhatsApp</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => setPrescriptionEditMode(true)}><FilePenLine className="w-4 h-4 mr-2" /> Editar Prescrição</Button>
                </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )}

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