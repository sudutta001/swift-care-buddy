import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "warning" | "destructive";
  onClick?: () => void;
  className?: string;
}

const badgeVariants = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  badge,
  badgeVariant = "default",
  onClick,
  className,
}: QuickActionCardProps) => {
  return (
    <Card 
      variant="interactive" 
      className={cn("group", className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{title}</h3>
              {badge && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                  badgeVariants[badgeVariant]
                )}>
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
