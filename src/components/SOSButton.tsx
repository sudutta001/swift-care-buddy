import { Heart, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOSButtonProps {
  onPress?: () => void;
}

const SOSButton = ({ onPress }: SOSButtonProps) => {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: '2s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-28 w-28 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      </div>
      
      {/* Main SOS button */}
      <Button
        variant="emergency"
        size="icon-xl"
        onClick={onPress}
        className="relative z-10 h-24 w-24 text-2xl font-black tracking-wider"
      >
        SOS
      </Button>
      
      <p className="text-sm font-medium text-muted-foreground text-center max-w-[200px]">
        One-tap emergency alert to ambulance, hospital & contacts
      </p>
    </div>
  );
};

export default SOSButton;
