import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Phone, FileText, Clock, CheckCircle } from "lucide-react";

const ConsultationCard = () => {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="gradient-primary h-2" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Online OPD</CardTitle>
          <span className="flex items-center gap-1 text-xs font-medium text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Doctors Available
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Instant consultation with verified doctors. Get e-prescriptions directly linked to medicine ordering.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Audio Call</span>
            <span className="text-[10px] text-muted-foreground">₹99</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Video className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium">Video Call</span>
            <span className="text-[10px] text-muted-foreground">₹149</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Wait time: ~2 min</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            <span>E-prescription included</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationCard;
