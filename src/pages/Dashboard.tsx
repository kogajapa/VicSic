import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { SessionsTable } from '@/components/dashboard/SessionsTable';
import { DiagnosisChart } from '@/components/dashboard/DiagnosisChart';
import { 
  FileText, 
  BarChart, 
  Users, 
  Mic, 
  ArrowUp,
  Clock 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center">
          <BarChart className="w-7 h-7 mr-2 text-primary" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Visão geral do sistema Paulo excelência em Psiquiatria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        
        <StatsCard
          title="Relatórios gerados"
          value="8"
          icon={BarChart}
          iconBgColor="bg-chart-blue/10"
          iconColor="text-chart-blue"
        />
        
        <StatsCard
          title="Pacientes ativos cadastrados"
          value="127"
          icon={Users}
          iconBgColor="bg-success-light"
          iconColor="text-success"
          trend={{
            value: "5 novos esta semana",
            isPositive: true,
            icon: ArrowUp
          }}
        />
        
        <StatsCard
          title="Última transcrição enviada"
          value="Mariana Costa"
          icon={Mic}
          iconBgColor="bg-chart-purple/10"
          iconColor="text-chart-purple"
          trend={{
            value: "Hoje, 14:35",
            isPositive: true,
            icon: Clock
          }}
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Evolution Chart Placeholder */}
        <div className="lg:col-span-2 bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">Evolução de Transcrições</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
                7 dias
              </button>
              <button className="px-3 py-1.5 text-xs font-medium bg-primary-light text-primary rounded-full hover:bg-primary/20 transition-colors">
                30 dias
              </button>
              <button className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
                90 dias
              </button>
            </div>
          </div>
          <div className="w-full h-80 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Gráfico de evolução aqui</p>
          </div>
        </div>

        <ActivityFeed />
      </div>


    </Layout>
  );
}