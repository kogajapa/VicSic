import { useState } from 'react';
import { Settings, ArrowLeft, Save, Settings2, FileText, Bell, ShieldCheck, Link as LinkIcon, ClipboardList, History, Plug, CheckCircle, Calendar, XCircle, CreditCard, Eye, EyeOff } from 'lucide-react';
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

const NotificationsTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Canais de Notificação</CardTitle>
        <CardDescription>Ative ou desative os canais de notificação globais.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
            <span>Notificações por Email</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Receba resumos e alertas importantes no seu email.
            </span>
          </Label>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <Label htmlFor="system-notifications" className="flex flex-col space-y-1">
            <span>Notificações no Sistema</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Mostra alertas dentro da plataforma VicSic.
            </span>
          </Label>
          <Switch id="system-notifications" defaultChecked />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Alertas Específicos</CardTitle>
        <CardDescription>Escolha quais notificações detalhadas você deseja receber.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Novo feedback recebido</Label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label>Relatório semanal de uso gerado</Label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label>Alerta de segurança importante</Label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label>Atualização do sistema disponível</Label>
          <Switch />
        </div>
      </CardContent>
    </Card>
  </div>
);

const SecurityTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
        <CardDescription>Adicione uma camada extra de segurança à sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch id="2fa-switch" />
          <Label htmlFor="2fa-switch">Ativar 2FA</Label>
        </div>
      </CardContent>
    </Card>
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
        <CardTitle>Política de Senha</CardTitle>
        <CardDescription>Defina os requisitos para as senhas dos usuários.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline"><ClipboardList className="mr-2 h-4 w-4" />Gerenciar Política</Button>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Logs de Acesso e Auditoria</CardTitle>
        <CardDescription>Revise os logs de login e atividades importantes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline"><History className="mr-2 h-4 w-4" />Visualizar Logs</Button>
      </CardContent>
    </Card>
  </div>
);

const IntegrationsTab = () => {
    const [apiKey, setApiKey] = useState('sk_test_********************');
    const [showApiKey, setShowApiKey] = useState(false);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" />Gateway de Pagamento (Stripe)</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="env-select" className="text-sm font-medium">Ambiente:</Label>
                            <Select defaultValue="test">
                                <SelectTrigger id="env-select" className="w-[120px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="test">Teste</SelectItem>
                                    <SelectItem value="live">Produção</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <CardDescription>Conecte sua conta Stripe para gerenciar assinaturas e cobranças.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="stripe-pk">Chave Publicável</Label>
                        <Input id="stripe-pk" placeholder="pk_test_..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stripe-sk">Chave Secreta</Label>
                        <div className="relative">
                            <Input id="stripe-sk" type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                            <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7" onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="outline">Testar Conexão</Button>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Não conectado</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Configuração de Webhooks</CardTitle>
                    <CardDescription>Use webhooks para receber eventos importantes do Stripe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">URL do Endpoint</Label>
                        <Input id="webhook-url" readOnly value="https://api.vicsic.com/webhooks/stripe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="webhook-secret">Segredo do Webhook</Label>
                        <Input id="webhook-secret" placeholder="whsec_..." />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Configure este endpoint no seu <a href="#" className="text-primary underline">Dashboard do Stripe</a> para receber eventos.
                    </p>
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
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie as configurações e preferências do VicSic</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 mr-2" />Voltar</Button>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral"><Settings2 className="mr-2 h-4 w-4"/>Geral</TabsTrigger>
          <TabsTrigger value="notificacoes"><Bell className="mr-2 h-4 w-4"/>Notificações</TabsTrigger>
          <TabsTrigger value="seguranca"><ShieldCheck className="mr-2 h-4 w-4"/>Segurança</TabsTrigger>
          <TabsTrigger value="integracoes"><LinkIcon className="mr-2 h-4 w-4"/>Integrações</TabsTrigger>
        </TabsList>
        <TabsContent value="geral" className="mt-6"><GeneralTab /></TabsContent>
        <TabsContent value="notificacoes" className="mt-6"><NotificationsTab /></TabsContent>
        <TabsContent value="seguranca" className="mt-6"><SecurityTab /></TabsContent>
        <TabsContent value="integracoes" className="mt-6"><IntegrationsTab /></TabsContent>
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
