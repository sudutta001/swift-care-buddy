import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Bed, Clock, FileCheck, CreditCard, Bell, ChevronRight } from "lucide-react";

const features = [
  { icon: Bed, text: "Real-time bed availability" },
  { icon: FileCheck, text: "Digital admission forms" },
  { icon: CreditCard, text: "Insurance pre-clearance" },
  { icon: Bell, text: "Alert doctors before arrival" },
];

const HospitalPreBooking = () => {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Hospital Pre-Booking</CardTitle>
              <CardDescription className="text-xs">Skip paperwork in emergencies</CardDescription>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[11px] text-muted-foreground leading-tight">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalPreBooking;
