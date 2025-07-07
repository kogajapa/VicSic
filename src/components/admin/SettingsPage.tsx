import { Settings, ArrowLeft, Save, Settings2, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const GeneralTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card><CardHeader><CardTitle>Idioma</CardTitle><CardDescription>Selecione o idioma do sistema</CardDescription></CardHeader><CardContent><Select defaultValue="pt_BR"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pt_BR">Português (Brasil)</SelectItem></SelectContent></Select></CardContent></Card>
    <Card><CardHeader><CardTitle>Fuso Horário</CardTitle><CardDescription>Defina o fuso horário</CardDescription></CardHeader><CardContent><Select defaultValue="gmt-3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="gmt-3">Brasília (GMT-3)</SelectItem></SelectContent></Select></CardContent></Card>
    <Card><CardHeader><CardTitle>Formato de Data</CardTitle><CardDescription>Escolha como as datas são exibidas</CardDescription></CardHeader><CardContent><RadioGroup defaultValue="dmy"><div className="flex items-center space-x-2"><RadioGroupItem value="dmy" id="dmy" /><Label htmlFor="dmy">DD/MM/AAAA</Label></div></RadioGroup></CardContent></Card>
    <Card><CardHeader><CardTitle>Tema da Interface</CardTitle><CardDescription>Escolha o tema visual</CardDescription></CardHeader><CardContent><RadioGroup defaultValue="light"><div className="flex items-center space-x-2"><RadioGroupItem value="light" id="light" /><Label htmlFor="light">Claro</Label></div></RadioGroup></CardContent></Card>
  </div>
);



const SecurityTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tempo de Sessão</CardTitle>
          <CardDescription>Tempo de inatividade antes do logout automático.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="30">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutos</SelectItem>
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="60">1 hora</SelectItem>
              <SelectItem value="120">2 horas</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redefinir Senha do Administrador</CardTitle>
          <CardDescription>Defina uma nova senha para a conta de administrador principal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input id="new-password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button><KeyRound className="mr-2 h-4 w-4" />Redefinir Senha</Button>
        </CardContent>
      </Card>
    </div>
  );
};



export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <Settings className="w-7 h-7 mr-2 text-primary" />
            Configurações do Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie as configurações e preferências do Paulo excelência em Psiquiatria</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 mr-2" />Voltar</Button>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="geral"><Settings2 className="mr-2 h-4 w-4"/>Geral</TabsTrigger>
          <TabsTrigger value="seguranca"><ShieldCheck className="mr-2 h-4 w-4"/>Segurança</TabsTrigger>
        </TabsList>
        <TabsContent value="geral" className="mt-6"><GeneralTab /></TabsContent>
        <TabsContent value="seguranca" className="mt-6"><SecurityTab /></TabsContent>
      </Tabs>

      <div className="fixed bottom-6 right-6">
        <Button size="lg" onClick={() => alert('Configurações salvas!')}>
          <Save className="w-5 h-5 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
