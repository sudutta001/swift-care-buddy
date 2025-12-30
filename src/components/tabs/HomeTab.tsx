import SOSButton from "@/components/SOSButton";
import EmergencyServices from "@/components/EmergencyServices";
import MedicineDelivery from "@/components/MedicineDelivery";
import ConsultationCard from "@/components/ConsultationCard";
import EmergencyPrescription from "@/components/EmergencyPrescription";
import HospitalPreBooking from "@/components/HospitalPreBooking";
import EmergencyFund from "@/components/EmergencyFund";

interface HomeTabProps {
  onSOS: () => void;
}

const HomeTab = ({ onSOS }: HomeTabProps) => {
  return (
    <>
      {/* Hero Section with Tagline */}
      <section className="gradient-hero px-4 py-6 -mx-4">
        <div className="container">
          {/* Tagline */}
          <div className="text-center mb-6">
            <p className="text-sm italic text-muted-foreground leading-relaxed max-w-xs mx-auto">
              "This app is for those who stand with someone in trouble, even when they're not family by blood."
            </p>
          </div>
          
          {/* SOS Button */}
          <div className="flex justify-center mb-6">
            <SOSButton onPress={onSOS} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-6 mt-4">
        <EmergencyServices />
        <EmergencyPrescription />
        <MedicineDelivery />
        <ConsultationCard />
        <HospitalPreBooking />
        <EmergencyFund />

        {/* Trust Indicators */}
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
    </>
  );
};

export default HomeTab;
