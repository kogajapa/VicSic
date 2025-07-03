import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  FilePlus2,
  Users2,
  FileText,
  Settings,
  ShieldCheck,
  FileSignature,
  CheckCircle2,
} from 'lucide-react';

const mainFeatures = [
  {
    icon: BarChart3,
    title: '1. Dashboard',
    color: 'text-sky-500',
    description: (
      <ul className="mt-2 space-y-2 text-sm list-none">
        <li><strong>Visão Geral:</strong> A página inicial do sistema, que apresenta um resumo das informações mais importantes.</li>
        <li><strong>Estatísticas:</strong> Cards com dados chave e métricas de desempenho.</li>
        <li><strong>Atividade Recente:</strong> Um feed com as últimas atividades realizadas no sistema.</li>
        <li><strong>Gráficos:</strong> Visualizações gráficas de dados, como diagnósticos e sessões.</li>
      </ul>
    ),
  },
  {
    icon: FilePlus2,
    title: '2. Novo Relatório',
    color: 'text-emerald-500',
    description: (
      <ul className="mt-2 space-y-2 text-sm list-none">
        <li><strong>Criação de Relatórios:</strong> Formulário completo para a criação de novos relatórios, permitindo a inserção de textos detalhados e upload de arquivos de áudio.</li>
        <li><strong>Seleção de Paciente:</strong> Permite associar o relatório a um paciente existente.</li>
        <li><strong>Tipos de Consulta:</strong> Campo para especificar o tipo de consulta relacionada ao relatório.</li>
      </ul>
    ),
  },
  {
    icon: Users2,
    title: '3. Pacientes',
    color: 'text-indigo-500',
    description: (
      <ul className="mt-2 space-y-2 text-sm list-none">
        <li><strong>Gerenciamento de Pacientes:</strong> Uma área dedicada para cadastrar, visualizar, editar e remover pacientes.</li>
        <li><strong>Tabela de Pacientes:</strong> Apresenta uma lista de todos os pacientes com informações relevantes e ações rápidas.</li>
      </ul>
    ),
  },
  {
    icon: FileText,
    title: '4. Relatórios',
    color: 'text-rose-500',
    description: (
      <ul className="mt-2 space-y-2 text-sm list-none">
        <li><strong>Visualização de Relatórios:</strong> Permite acessar e gerenciar todos os relatórios criados.</li>
        <li><strong>Busca e Filtragem:</strong> Ferramentas para encontrar relatórios específicos com facilidade.</li>
        <li><strong>Pré-visualização:</strong> Opção para visualizar o conteúdo de um relatório antes de abri-lo completamente.</li>
      </ul>
    ),
  },
  {
    icon: Settings,
    title: '5. Configurações',
    color: 'text-amber-500',
    description: (
      <ul className="mt-2 space-y-2 text-sm list-none">
        <li><strong>Ajustes do Usuário:</strong> Permite que o usuário personalize suas preferências e configurações de conta.</li>
      </ul>
    ),
  },
];

const adminFeatures = [
    { strong: 'Configuração do Agente:', normal: ' Ajustes relacionados a agentes ou configurações centrais do sistema.' },
    { strong: 'Gerenciamento de Planos:', normal: ' Permite criar e gerenciar os planos de assinatura ou acesso.' },
    { strong: 'Gerenciamento de Usuários:', normal: ' Ferramentas para administrar as contas de todos os usuários do sistema.' },
    { strong: 'Logs do Sistema:', normal: ' Visualização de logs para monitoramento e depuração.' },
    { strong: 'Feedbacks:', normal: ' Área para visualizar e gerenciar os feedbacks enviados pelos usuários.' },
    { strong: 'Configurações Gerais:', normal: ' Configurações avançadas da aplicação.' },
];

export function Sobre() {
  return (
    <Layout title="Sobre o Sistema">
      <div className="p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="sobre-sistema" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sobre-sistema">Sobre o Sistema</TabsTrigger>
            <TabsTrigger value="features">Próximas Features</TabsTrigger>
          </TabsList>

          <TabsContent value="sobre-sistema">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Sistema VicSic</CardTitle>
                <p className="text-muted-foreground pt-2">
                  VicSic é um sistema de dashboard completo, projetado para gerenciar informações e processos de forma eficiente. Construído com tecnologias modernas como React, Vite e TypeScript, o sistema oferece uma interface de usuário rápida, responsiva e intuitiva, utilizando componentes da biblioteca Shadcn/UI e estilização com Tailwind CSS.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                    <h2 className="text-xl font-semibold mt-4 border-b pb-2">Funcionalidades Principais</h2>
                    <p className="text-muted-foreground">O sistema é dividido em várias seções, cada uma com um propósito específico:</p>
                    {mainFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <Icon className={`h-10 w-10 flex-shrink-0 ${feature.color}`} />
                          <div>
                            <h3 className={`text-lg font-semibold ${feature.color}`}>{feature.title}</h3>
                            <div className="text-muted-foreground">{feature.description}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="mt-8 pt-8 border-t">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className={`h-10 w-10 flex-shrink-0 text-slate-600`} />
                        <div>
                            <h3 className={`text-lg font-semibold text-slate-600`}>Área do Administrador</h3>
                            <p className="text-muted-foreground mt-2">O sistema conta com uma área restrita para administradores, acessível através da rota <code>/administrador</code>, que oferece controle total sobre a plataforma.</p>
                            <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-none">
                                {adminFeatures.map((feat, i) => (
                                    <li key={i}>
                                        <strong>{feat.strong}</strong>{feat.normal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex-row items-center gap-4">
                <FileSignature className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-primary">Receituário com Assinatura Digital</CardTitle>
                  <p className="text-sm text-muted-foreground">A próxima grande atualização do VicSic!</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">
                  Estamos trabalhando para implementar um módulo completo de receituário médico, trazendo mais segurança e agilidade para o seu dia a dia.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-1" />
                    <span>
                      <strong>Criação Simplificada:</strong> Crie e edite prescrições médicas diretamente na plataforma.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-1" />
                    <span>
                      <strong>Validade Legal:</strong> Integração com assinatura digital para garantir segurança e validade jurídica.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-1" />
                    <span>
                      <strong>Compartilhamento Seguro:</strong> Gere PDFs e compartilhe o receituário com o paciente de forma segura.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-1" />
                    <span>
                      <strong>Histórico Centralizado:</strong> Mantenha um histórico completo de prescrições por paciente.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
