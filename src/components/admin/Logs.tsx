import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Calendar,
  Search,
  Eye,
} from 'lucide-react';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


// Mock Data (shortened)
const logsData = [
  {
    id: 1,
    dateTime: '01/07/2025 14:32:45',
    user: 'Dra. Mariana Santos',
    action: 'Adicionou novo paciente',
    type: 'Cadastro',
    ip: '192.168.1.105',
    device: 'Chrome 120.0 / Windows',
    description: 'Usuário adicionou um novo paciente.',
    rawData: `{"action": "create", "entity": "patient"}`,
  },
  {
    id: 2,
    dateTime: '01/07/2025 13:15:22',
    user: 'Dr. Paulo Mendonça',
    action: 'Realizou transcrição',
    type: 'Transcrição',
    ip: '203.0.113.45',
    device: 'Safari 15.0 / macOS',
    description: 'Transcrição de áudio para texto concluída.',
    rawData: `{"action": "transcribe", "entity": "audio"}`,
  },
  {
    id: 3,
    dateTime: '01/07/2025 11:08:53',
    user: 'Dr. Ricardo Oliveira',
    action: 'Alterou permissões de usuário',
    type: 'Segurança',
    ip: '198.51.100.21',
    device: 'Firefox 118.0 / Linux',
    description: 'Permissões do usuário alteradas.',
    rawData: `{"action": "update_permissions", "entity": "user"}`,
  },
  {
    id: 5,
    dateTime: '01/07/2025 09:35:07',
    user: 'Sistema',
    action: 'Tentativa de login inválida',
    type: 'Segurança',
    ip: '10.0.0.5',
    device: 'Unknown',
    description: 'Tentativa de login falhou.',
    rawData: `{"action": "login_failed", "entity": "system"}`,
  },
];

type LogEntry = typeof logsData[0];

const getBadgeVariant = (log: LogEntry): 'destructive' | 'warning' | 'success' | 'info' | 'default' => {
    const type = log.type.toLowerCase();
    if (type === 'segurança') {
        return log.action.toLowerCase().includes('inválida') ? 'destructive' : 'warning';
    }
    if (type === 'transcrição') return 'success';
    if (['cadastro', 'atualização', 'acesso'].includes(type)) return 'info';
    return 'default';
};

const LogsPage = () => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

    const handleViewDetails = (log: LogEntry) => {
        setSelectedLog(log);
        setIsDetailsModalOpen(true);
    };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Logs e Auditoria</h1>
        <p className="text-gray-600 mt-1">Visualize o histórico de atividades realizadas no sistema</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Buscar por usuário ou tipo de ação..." className="pl-10" />
            </div>
            <Button>
                <Download className="w-5 h-5 mr-2" />
                <span>Exportar CSV</span>
            </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm text-gray-500">{log.dateTime}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{log.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 text-sm font-medium">{log.user}</div>
                  </div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell><Badge variant={getBadgeVariant(log)}>{log.type}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleViewDetails(log)}><Eye className="h-5 w-5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>Detalhes do Log</DialogTitle></DialogHeader>
          {selectedLog && (
            <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground">Data e Hora</p><p className="font-medium">{selectedLog.dateTime}</p></div>
                    <div><p className="text-sm text-muted-foreground">Usuário</p><p className="font-medium">{selectedLog.user}</p></div>
                    <div><p className="text-sm text-muted-foreground">IP de Acesso</p><p className="font-medium">{selectedLog.ip}</p></div>
                    <div><p className="text-sm text-muted-foreground">Dispositivo</p><p className="font-medium">{selectedLog.device}</p></div>
                </div>
                <div><p className="text-sm text-muted-foreground">Descrição</p><p>{selectedLog.description}</p></div>
                <div>
                    <p className="text-sm text-muted-foreground">Dados da Operação</p>
                    <pre className="bg-gray-100 rounded p-3 text-xs mt-1 overflow-x-auto"><code>{JSON.stringify(JSON.parse(selectedLog.rawData), null, 2)}</code></pre>
                </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Fechar</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogsPage;
