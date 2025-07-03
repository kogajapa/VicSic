import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    icon: LucideIcon;
  };
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBgColor, 
  iconColor,
  trend 
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 card-stats">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-end gap-3 mt-2">
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {subtitle && <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>}
          </div>
          {trend && (
            <p className={`text-xs mt-1 flex items-center ${
              trend.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              <trend.icon className="w-4 h-4 mr-1" />
              <span>{trend.value}</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}