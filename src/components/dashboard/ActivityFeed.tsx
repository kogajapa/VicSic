import { FileText, Mic, Edit, UserPlus, Trash2, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'report',
    title: 'Relatório gerado',
    patient: 'Rafael Mendes',
    time: 'Hoje, 14:35',
    icon: FileText,
    bgColor: 'bg-success-light',
    iconColor: 'text-success'
  },
  {
    id: 2,
    type: 'transcription',
    title: 'Transcrição enviada',
    patient: 'Mariana Costa',
    time: 'Hoje, 13:20',
    icon: Mic,
    bgColor: 'bg-primary-light',
    iconColor: 'text-primary'
  },
  {
    id: 3,
    type: 'edit',
    title: 'Relatório editado',
    patient: 'Pedro Almeida',
    time: 'Hoje, 11:45',
    icon: Edit,
    bgColor: 'bg-chart-purple/10',
    iconColor: 'text-chart-purple'
  },
  {
    id: 4,
    type: 'patient',
    title: 'Novo paciente',
    patient: 'Juliana Santos',
    time: 'Hoje, 09:30',
    icon: UserPlus,
    bgColor: 'bg-warning-light',
    iconColor: 'text-warning'
  },
  {
    id: 5,
    type: 'delete',
    title: 'Relatório excluído',
    patient: 'Luciana Ferreira',
    time: 'Ontem, 16:15',
    icon: Trash2,
    bgColor: 'bg-destructive/10',
    iconColor: 'text-destructive'
  }
];

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Atividades Recentes</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver todas
        </button>
      </div>
      
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className={`relative pl-10 ${index !== activities.length - 1 ? 'pb-8' : ''} activity-item`}
          >
            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${activity.bgColor} flex items-center justify-center`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-1">Paciente: {activity.patient}</p>
              <p className="text-xs text-muted-foreground/80 mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}