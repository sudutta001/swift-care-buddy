import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Clock, CheckCircle, Truck, AlertTriangle } from "lucide-react";

const steps = [
  { icon: Camera, text: "Upload prescription photo" },
  { icon: Clock, text: "Stores confirm availability" },
  { icon: Truck, text: "Delivery to hospital/ICU" },
];

const EmergencyPrescription = () => {
  return (
    <Card variant="emergency" className="overflow-hidden">
      <div className="h-1 gradient-emergency" />
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-base text-foreground">Emergency Prescription</CardTitle>
            <CardDescription className="text-xs">
              For trauma & ICU cases - Priority delivery to hospital
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 mb-2">
                  <Icon className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{step.text}</p>
              </div>
            );
          })}
        </div>
        
        <Button variant="destructive" className="w-full" size="lg">
          <Camera className="h-5 w-5" />
          Upload Prescription Photo
        </Button>
        
        <p className="text-[10px] text-center text-muted-foreground">
          First store confirming prepares immediately. Delivery directly to ward/ER/ICU gate.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmergencyPrescription;
