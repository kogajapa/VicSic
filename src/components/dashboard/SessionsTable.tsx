const sessions = [
  {
    id: 1,
    patient: { name: 'Mariana Costa', initials: 'MC' },
    date: '02/07/2025',
    time: '09:00',
    status: 'confirmed',
    initialsColor: 'bg-primary/10 text-primary'
  },
  {
    id: 2,
    patient: { name: 'Pedro Almeida', initials: 'PA' },
    date: '02/07/2025',
    time: '11:30',
    status: 'waiting',
    initialsColor: 'bg-chart-blue/10 text-chart-blue'
  },
  {
    id: 3,
    patient: { name: 'Juliana Santos', initials: 'JS' },
    date: '03/07/2025',
    time: '14:00',
    status: 'confirmed',
    initialsColor: 'bg-chart-purple/10 text-chart-purple'
  },
  {
    id: 4,
    patient: { name: 'Rafael Mendes', initials: 'RM' },
    date: '03/07/2025',
    time: '16:30',
    status: 'confirmed',
    initialsColor: 'bg-warning/10 text-warning'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'px-2 py-1 text-xs font-medium bg-success-light text-success rounded-full';
    case 'waiting':
      return 'px-2 py-1 text-xs font-medium bg-warning-light text-warning rounded-full';
    default:
      return 'px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'waiting':
      return 'Aguardando';
    default:
      return status;
  }
};

export function SessionsTable() {
  return (
    <div className="lg:col-span-2 bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Próximas Sessões</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver agenda completa
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Data
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Horário
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full ${session.initialsColor} flex items-center justify-center`}>
                      <span className="font-medium text-sm">{session.patient.initials}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-foreground">
                        {session.patient.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {session.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {session.time}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(session.status)}>
                    {getStatusText(session.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}