import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SOSButton from "@/components/SOSButton";
import EmergencyServices from "@/components/EmergencyServices";
import MedicineDelivery from "@/components/MedicineDelivery";
import ConsultationCard from "@/components/ConsultationCard";
import EmergencyPrescription from "@/components/EmergencyPrescription";
import HospitalPreBooking from "@/components/HospitalPreBooking";
import EmergencyFund from "@/components/EmergencyFund";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSOS = () => {
    toast({
      title: "🚨 SOS Activated",
      description: "Alerting nearby ambulances, hospitals, and your emergency contacts...",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      {/* Hero Section with Tagline */}
      <section className="gradient-hero px-4 py-6">
        <div className="container">
          {/* Tagline */}
          <div className={cn(
            "text-center mb-6 transition-all duration-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <p className="text-sm italic text-muted-foreground leading-relaxed max-w-xs mx-auto">
              "This app is for those who stand with someone in trouble, even when they're not family by blood."
            </p>
          </div>
          
          {/* SOS Button */}
          <div className={cn(
            "flex justify-center mb-6 transition-all duration-500 delay-100",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <SOSButton onPress={handleSOS} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container px-4 space-y-6 py-4">
        {/* Emergency Services Grid */}
        <div className={cn(
          "transition-all duration-500 delay-150",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <EmergencyServices />
        </div>

        {/* Emergency Prescription - Priority for trauma */}
        <div className={cn(
          "transition-all duration-500 delay-200",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <EmergencyPrescription />
        </div>

        {/* Medicine Delivery */}
        <div className={cn(
          "transition-all duration-500 delay-[250ms]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <MedicineDelivery />
        </div>

        {/* Online OPD Consultation */}
        <div className={cn(
          "transition-all duration-500 delay-300",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <ConsultationCard />
        </div>

        {/* Hospital Pre-Booking */}
        <div className={cn(
          "transition-all duration-500 delay-[350ms]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <HospitalPreBooking />
        </div>

        {/* Emergency Fund */}
        <div className={cn(
          "transition-all duration-500 delay-[400ms]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <EmergencyFund />
        </div>

        {/* Trust Indicators */}
        <div className={cn(
          "transition-all duration-500 delay-[450ms]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex items-center justify-center gap-6 py-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">10k+</p>
              <p className="text-[10px] text-muted-foreground">Verified Stores</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-[10px] text-muted-foreground">Hospitals</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-success">24/7</p>
              <p className="text-[10px] text-muted-foreground">Emergency Support</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
