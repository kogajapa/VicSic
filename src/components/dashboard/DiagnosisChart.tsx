const diagnosisData = [
  { name: 'Ansiedade', value: 32, color: 'hsl(var(--chart-blue))' },
  { name: 'Depressão', value: 28, color: 'hsl(var(--chart-green))' },
  { name: 'TDAH', value: 15, color: 'hsl(var(--chart-yellow))' },
  { name: 'Outros', value: 25, color: 'hsl(var(--chart-red))' }
];

export function DiagnosisChart() {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Diagnósticos</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver detalhes
        </button>
      </div>
      
      {/* Simple visual representation since we don't have chart library */}
      <div className="w-full h-64 mb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-32 h-32">
            {diagnosisData.map((item, index) => (
              <div
                key={item.name}
                className="rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ 
                  backgroundColor: item.color,
                  height: `${item.value * 1.5}px`,
                  minHeight: '40px'
                }}
              >
                {item.value}%
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        {diagnosisData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-xs font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}