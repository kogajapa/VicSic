import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, ArrowLeft, Sparkles, Settings, Link, Cpu, Server, Key, Brain, ShieldCheck, Eye, EyeOff, Save } from 'lucide-react';

export function AgentConfig() {
  const [agentType, setAgentType] = useState('direct');
  const [isAgentActive, setIsAgentActive] = useState(true);
  const [apiKey, setApiKey] = useState('sk-*************************');
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bot className="w-7 h-7 mr-2 text-primary" />
            Configuração do Agente IA
          </h1>
          <p className="text-gray-600 mt-1">Configure o assistente virtual para processar transcrições e gerar relatórios médicos</p>
        </div>

      </div>

      {/* Status do Agente */}
      <Card className="mb-6">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">Status do Agente</h2>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${isAgentActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm ${isAgentActive ? 'text-green-700' : 'text-red-700'}`}>
                  {isAgentActive ? 'Ativo e processando transcrições' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-3">Ativar agente</span>
            <Switch checked={isAgentActive} onCheckedChange={setIsAgentActive} />
          </div>
        </CardContent>
      </Card>

      {/* Navegação por Tabs */}
      <Tabs defaultValue="configuracao" className="w-full">
        <TabsList>
          <TabsTrigger value="configuracao"><Settings className="w-4 h-4 mr-2"/>Configuração</TabsTrigger>
        </TabsList>

        {/* Conteúdo das Tabs */}
        <TabsContent value="configuracao" className="mt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tipo de Agente</h3>
            <p className="text-sm text-gray-600 mb-4">Escolha como o agente processará as transcrições e gerará relatórios</p>
            <RadioGroup value={agentType} onValueChange={setAgentType} className="inline-flex bg-gray-100 p-1 rounded-md">
                <RadioGroupItem value="webhook" id="webhook" className="sr-only" />
                <Label htmlFor="webhook" className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${agentType === 'webhook' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}>
                    <Link className="w-5 h-5 mr-2" />
                    <span>Webhook</span>
                </Label>
                <RadioGroupItem value="direct" id="direct" className="sr-only" />
                <Label htmlFor="direct" className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${agentType === 'direct' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}>
                    <Cpu className="w-5 h-5 mr-2" />
                    <span>Agente Direto</span>
                </Label>
            </RadioGroup>
          </div>

          {/* Configuração Webhook (condicional) */}
          {agentType === 'webhook' && (
            <div id="webhook-config">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Link className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                          <CardTitle className="text-sm font-medium">URL do Webhook (n8n, Zapier, etc.)</CardTitle>
                          <CardDescription className="text-xs">Endpoint para automações que irão processar as transcrições.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Input type="text" placeholder="https://seu-webhook.com/endpoint" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Key className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                          <CardTitle className="text-sm font-medium">Token de Segurança</CardTitle>
                          <CardDescription className="text-xs">Opcional: Token para autenticar requisições</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Input type="password" placeholder="Token de segurança" />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Configuração Agente Direto (condicional) */}
          {agentType === 'direct' && (
            <div id="direct-config">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Server className="w-4 h-4 text-primary" /></div>
                    <div>
                      <CardTitle className="text-sm font-medium">Provedor da IA</CardTitle>
                      <CardDescription className="text-xs">Selecione o provedor do modelo de linguagem</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="openai">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="cohere">Cohere</SelectItem>
                        <SelectItem value="mistral">Mistral AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Key className="w-4 h-4 text-primary" /></div>
                    <div>
                      <CardTitle className="text-sm font-medium">Chave da API</CardTitle>
                      <CardDescription className="text-xs">Chave de acesso ao serviço selecionado</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Input type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." />
                      <Button variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Brain className="w-4 h-4 text-primary" /></div>
                    <div>
                      <CardTitle className="text-sm font-medium">Modelo</CardTitle>
                      <CardDescription className="text-xs">Selecione o modelo de linguagem</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="gpt-4o">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-primary" /></div>
                      <div>
                        <CardTitle className="text-sm font-medium">Modo Seguro</CardTitle>
                        <CardDescription className="text-xs">Verificação adicional de conteúdo sensível</CardDescription>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </CardHeader>
                </Card>
              </div>
              <Card className="mt-6">
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Settings className="w-4 h-4 text-primary" /></div>
                      <div>
                          <CardTitle className="text-sm font-medium">Prompt do Sistema</CardTitle>
                          <CardDescription className="text-xs">Instruções básicas para o comportamento do agente</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Textarea className="h-32" placeholder="Você é um assistente médico especializado..." defaultValue="Você é um assistente médico especializado em psiquiatria, com vasta experiência em diagnósticos e acompanhamento terapêutico. Sua função é analisar transcrições de consultas médicas e gerar relatórios estruturados, destacando sintomas, possíveis diagnósticos conforme CID-10, recomendações de tratamento e pontos de atenção. Mantenha sempre linguagem técnica apropriada e siga rigorosamente os princípios éticos da medicina. Organize as informações de forma clara e objetiva para facilitar a documentação clínica." />
                  </CardContent>
              </Card>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
