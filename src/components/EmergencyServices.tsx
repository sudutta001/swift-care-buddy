import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Droplets, Building2, CreditCard } from "lucide-react";

const emergencyServices = [
  {
    icon: Ambulance,
    title: "Ambulance",
    subtitle: "Real-time availability",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Droplets,
    title: "Blood Bank",
    subtitle: "Find nearby donors",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Building2,
    title: "Hospital",
    subtitle: "Pre-book beds",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "Emergency Fund",
    subtitle: "Financial assistance",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const EmergencyServices = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Emergency Services</h2>
        <Button variant="ghost" size="sm" className="text-xs text-primary">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {emergencyServices.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              variant="interactive"
              className="text-center"
            >
              <CardContent className="p-3">
                <div className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl ${service.bgColor}`}>
                  <Icon className={`h-5 w-5 ${service.color}`} />
                </div>
                <h3 className="text-[11px] font-semibold text-foreground leading-tight">{service.title}</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{service.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyServices;
