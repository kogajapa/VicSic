import { Layout } from '@/components/layout/Layout';

export function Sobre() {
  return (
    <Layout title="Sobre o Sistema">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="prose lg:prose-xl dark:prose-invert max-w-none bg-card p-6 md:p-8 rounded-lg shadow-md">
          <h1>Sobre o Sistema VicSic</h1>
          <p className="lead">
            VicSic é um sistema de dashboard completo, projetado para gerenciar informações e processos de forma eficiente.
          </p>
          <p>
            Construído com tecnologias modernas como <code>React</code>, <code>Vite</code> e <code>TypeScript</code>, o sistema oferece uma interface de usuário rápida, responsiva e intuitiva. A estilização é feita com <code>Tailwind CSS</code> e os componentes são da biblioteca <code>Shadcn/UI</code>, garantindo um design limpo e moderno.
          </p>
          
          <hr className="my-8" />

          <h2>Funcionalidades Principais</h2>
          <p>O sistema é dividido em várias seções, cada uma com um propósito específico para otimizar o fluxo de trabalho:</p>

          <div className="space-y-8 mt-6">
            <div>
              <h3>1. Dashboard</h3>
              <ul>
                <li><strong>Visão Geral:</strong> A página inicial do sistema, que apresenta um resumo das informações mais importantes.</li>
                <li><strong>Estatísticas:</strong> Cards com dados chave e métricas de desempenho.</li>
                <li><strong>Atividade Recente:</strong> Um feed com as últimas atividades realizadas no sistema.</li>
                <li><strong>Gráficos:</strong> Visualizações gráficas de dados, como diagnósticos e sessões.</li>
              </ul>
            </div>

            <div>
              <h3>2. Novo Relatório</h3>
              <ul>
                <li><strong>Criação de Relatórios:</strong> Formulário completo para a criação de novos relatórios, permitindo a inserção de textos detalhados e upload de arquivos de áudio.</li>
                <li><strong>Seleção de Paciente:</strong> Permite associar o relatório a um paciente existente.</li>
                <li><strong>Tipos de Consulta:</strong> Campo para especificar o tipo de consulta relacionada ao relatório.</li>
              </ul>
            </div>

            <div>
              <h3>3. Pacientes</h3>
              <ul>
                <li><strong>Gerenciamento de Pacientes:</strong> Uma área dedicada para cadastrar, visualizar, editar e remover pacientes.</li>
                <li><strong>Tabela de Pacientes:</strong> Apresenta uma lista de todos os pacientes com informações relevantes e ações rápidas.</li>
              </ul>
            </div>

            <div>
              <h3>4. Relatórios</h3>
              <ul>
                <li><strong>Visualização de Relatórios:</strong> Permite acessar e gerenciar todos os relatórios criados.</li>
                <li><strong>Busca e Filtragem:</strong> Ferramentas para encontrar relatórios específicos com facilidade.</li>
                <li><strong>Pré-visualização:</strong> Opção para visualizar o conteúdo de um relatório antes de abri-lo completamente.</li>
              </ul>
            </div>

            <div>
              <h3>5. Configurações</h3>
              <ul>
                <li><strong>Ajustes do Usuário:</strong> Permite que o usuário personalize suas preferências e configurações de conta.</li>
              </ul>
            </div>
          </div>

          <hr className="my-8" />

          <h2>Área do Administrador</h2>
          <p>O sistema conta com uma área restrita para administradores, acessível através da rota <code>/administrador</code>, que oferece controle total sobre a plataforma.</p>
          <ul>
            <li><strong>Configuração do Agente:</strong> Ajustes relacionados a agentes ou configurações centrais do sistema.</li>
            <li><strong>Gerenciamento de Planos:</strong> Permite criar e gerenciar os planos de assinatura ou acesso.</li>
            <li><strong>Gerenciamento de Usuários:</strong> Ferramentas para administrar as contas de todos os usuários do sistema.</li>
            <li><strong>Logs do Sistema:</strong> Visualização de logs para monitoramento e depuração.</li>
            <li><strong>Feedbacks:</strong> Área para visualizar e gerenciar os feedbacks enviados pelos usuários.</li>
            <li><strong>Configurações Gerais:</strong> Configurações avançadas da aplicação.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
