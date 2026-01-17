import SOSButton from "@/components/SOSButton";
import EmergencyServices from "@/components/EmergencyServices";
import MedicineDelivery from "@/components/MedicineDelivery";
import ConsultationCard from "@/components/ConsultationCard";
import EmergencyPrescription from "@/components/EmergencyPrescription";
import HospitalPreBooking from "@/components/HospitalPreBooking";
import EmergencyFund from "@/components/EmergencyFund";
import { Shield, Clock, Building2 } from "lucide-react";

interface HomeTabProps {
  onSOS: () => void;
}

const HomeTab = ({ onSOS }: HomeTabProps) => {
  return (
    <>
      {/* Hero Section with Tagline */}
      <section className="gradient-hero px-4 py-8 -mx-4 rounded-b-3xl">
        <div className="container">
          {/* Tagline */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Emergency Healthcare
            </div>
            <p className="text-sm italic text-muted-foreground leading-relaxed max-w-sm mx-auto">
              "This app is for those who stand with someone in trouble, even when they're not family by blood."
            </p>
          </div>
          
          {/* SOS Button */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <SOSButton onPress={onSOS} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-6 mt-6">
        <div className="animate-slide-up stagger-1">
          <EmergencyServices />
        </div>
        <div className="animate-slide-up stagger-2">
          <EmergencyPrescription />
        </div>
        <div className="animate-slide-up stagger-3">
          <MedicineDelivery />
        </div>
        <div className="animate-slide-up stagger-4">
          <ConsultationCard />
        </div>
        <div className="animate-slide-up stagger-5">
          <HospitalPreBooking />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <EmergencyFund />
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 py-6 mt-4 border-t bg-gradient-to-r from-secondary/30 via-secondary/50 to-secondary/30 rounded-2xl mx-2">
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">10k+</p>
            <p className="text-[10px] text-muted-foreground font-medium">Verified Stores</p>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-[10px] text-muted-foreground font-medium">Hospitals</p>
          </div>
          <div className="h-16 w-px bg-border" />
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="h-6 w-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">24/7</p>
            <p className="text-[10px] text-muted-foreground font-medium">Emergency</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTab;
