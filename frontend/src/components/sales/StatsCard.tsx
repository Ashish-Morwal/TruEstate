import { Card } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
}

export default function StatsCard({ label, value, subtitle, highlight = false }: StatsCardProps) {
  return (
    <Card 
      className={`px-4 py-3 ${highlight ? 'border-primary/50' : ''}`}
      data-testid={`stats-card-${label.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span className={`text-xl font-semibold ${highlight ? 'text-primary' : ''}`}>
            {value}
          </span>
          {subtitle && (
            <span className="text-xs text-muted-foreground">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
