import { useState } from 'react';
import {
  ArrowLeft, Download, MessageSquare, Search, Filter, Clock, Check, ArrowUp,
  Reply, CheckCheck, MoreHorizontal, Trash2, User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';

const feedbacksData = [
  { id: 1, user: { name: 'Dra. Mariana Santos' }, title: 'Problema com transcrição', content: 'O sistema não está reconhecendo termos médicos...', date: '01/07/2025', status: 'pending' },
  { id: 2, user: { name: 'Dr. Paulo Mendonça' }, title: 'Sugestão de funcionalidade', content: 'Seria útil ter categorização automática...', date: '30/06/2025', status: 'in-progress' },
  { id: 3, user: { name: 'Dra. Fernanda Almeida' }, title: 'Elogio ao sistema', content: 'A nova atualização melhorou muito a velocidade...', date: '28/06/2025', status: 'resolved' },
  { id: 4, user: { name: 'Dr. Roberto Cardoso' }, title: 'Problema com exportação', content: 'Ao tentar exportar PDF, o sistema trava...', date: '27/06/2025', status: 'in-progress' },
  { id: 5, user: { name: 'Dra. Camila Vieira' }, title: 'Dúvida sobre integração', content: 'Gostaria de saber se o VicSic pode ser integrado...', date: '25/06/2025', status: 'resolved' },
];

type FeedbackStatus = 'pending' | 'in-progress' | 'resolved';
type Feedback = typeof feedbacksData[0];

const statusMap: Record<FeedbackStatus, { variant: 'warning' | 'info' | 'success'; text: string }> = {
  pending: { variant: 'warning', text: 'Pendente' },
  'in-progress': { variant: 'info', text: 'Em andamento' },
  resolved: { variant: 'success', text: 'Resolvido' },
};

export function FeedbacksPage() {
  const navigate = useNavigate();
  const [isReplyModalOpen, setReplyModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const handleActionClick = (feedback: Feedback, action: 'reply' | 'delete') => {
    setSelectedFeedback(feedback);
    if (action === 'reply') setReplyModalOpen(true);
    if (action === 'delete') setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-7 h-7 mr-2 text-primary" />
              Feedbacks dos Usuários
            </h1>
            <p className="text-gray-600 mt-1">Gerencie e responda aos feedbacks recebidos.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 mr-2" />Voltar</Button>
            <Button onClick={() => alert('Exportando...')}><Download className="w-5 h-5 mr-2" />Exportar</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-green-600 flex items-center mt-1"><ArrowUp className="w-3 h-3 mr-1" />15%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-yellow-600 flex items-center mt-1"><ArrowUp className="w-3 h-3 mr-1" />8%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-green-600 flex items-center mt-1"><ArrowUp className="w-3 h-3 mr-1" />12%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar feedback..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Select><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem></SelectContent></Select>
              <Button variant="outline"><Filter className="w-5 h-5 mr-2" />Filtros</Button>
            </div>
          </div>
        </Card>

        <Card>
          <Table>
            <TableHeader><TableRow><TableHead className="w-[50px]"><Checkbox /></TableHead><TableHead>Usuário</TableHead><TableHead>Feedback</TableHead><TableHead>Data</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {feedbacksData.map((fb) => (
                <TableRow key={fb.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell><div className="flex items-center"><Avatar className="h-10 w-10"><AvatarFallback><User className="w-5 h-5" /></AvatarFallback></Avatar><div className="ml-4 font-medium">{fb.user.name}</div></div></TableCell>
                  <TableCell><div className="font-medium">{fb.title}</div><div className="text-sm text-muted-foreground truncate">{fb.content}</div></TableCell>
                  <TableCell>{fb.date}</TableCell>
                  <TableCell><Badge variant={statusMap[fb.status as FeedbackStatus].variant}>{statusMap[fb.status as FeedbackStatus].text}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleActionClick(fb, 'reply')}><Reply className="mr-2 h-4 w-4" />Responder</DropdownMenuItem>
                        <DropdownMenuItem><CheckCheck className="mr-2 h-4 w-4" />Resolver</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleActionClick(fb, 'delete')}><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {selectedFeedback && (
        <>
          <Dialog open={isReplyModalOpen} onOpenChange={setReplyModalOpen}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader><DialogTitle>Responder a {selectedFeedback.user.name}</DialogTitle></DialogHeader>
              <div className="py-4 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4"><p className="font-medium">{selectedFeedback.title}</p><p className="text-sm text-muted-foreground">{selectedFeedback.content}</p></div>
                <Select defaultValue={selectedFeedback.status}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pendente</SelectItem><SelectItem value="in-progress">Em andamento</SelectItem><SelectItem value="resolved">Resolvido</SelectItem></SelectContent></Select>
                <Textarea placeholder="Sua resposta..." className="h-32" />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                <Button type="submit" onClick={() => setReplyModalOpen(false)}>Enviar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle><DialogDescription>Deseja excluir o feedback de {selectedFeedback.user.name}? Esta ação é irreversível.</DialogDescription></DialogHeader>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
                <Button type="submit" variant="destructive" onClick={() => setDeleteModalOpen(false)}>Excluir</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
