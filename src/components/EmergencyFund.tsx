import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Building2, Wallet, Shield, ChevronRight } from "lucide-react";

const fundSources = [
  { icon: Shield, text: "Government schemes", color: "text-primary" },
  { icon: Heart, text: "NGOs & trusts", color: "text-destructive" },
  { icon: Building2, text: "Hospital support", color: "text-success" },
  { icon: Wallet, text: "Emergency loans", color: "text-warning" },
];

const EmergencyFund = () => {
  return (
    <Card variant="elevated" className="overflow-hidden border-warning/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Heart className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">Emergency Medical Fund</CardTitle>
            <CardDescription className="text-xs">Financial help when you need it most</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Can't afford treatment? We connect you with verified fund sources. Money goes directly to hospitals.
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {fundSources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                <Icon className={`h-4 w-4 shrink-0 ${source.color}`} />
                <span className="text-[11px] text-muted-foreground">{source.text}</span>
              </div>
            );
          })}
        </div>
        
        <Button variant="warning" className="w-full" size="default">
          Request Emergency Fund
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyFund;
