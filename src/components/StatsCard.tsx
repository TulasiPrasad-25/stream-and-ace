import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatsCard = ({ title, value, change, icon: Icon, gradient = false }: StatsCardProps) => {
  return (
    <Card className={`${gradient ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground' : ''} shadow-md hover:shadow-lg transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${gradient ? 'text-primary-foreground' : ''}`}>
          {value}
        </div>
        {change && (
          <p className={`text-xs ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'} mt-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};