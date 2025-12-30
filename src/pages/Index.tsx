import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import MedicineTab from "@/components/tabs/MedicineTab";
import ConsultTab from "@/components/tabs/ConsultTab";
import HospitalTab from "@/components/tabs/HospitalTab";
import MoreTab from "@/components/tabs/MoreTab";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleSOS = () => {
    toast({
      title: "🚨 SOS Activated",
      description: "Alerting nearby ambulances, hospitals, and your emergency contacts...",
      variant: "destructive",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onSOS={handleSOS} />;
      case "medicine":
        return <MedicineTab />;
      case "consult":
        return <ConsultTab />;
      case "hospital":
        return <HospitalTab />;
      case "more":
        return <MoreTab />;
      default:
        return <HomeTab onSOS={handleSOS} />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "medicine": return "Order Medicines";
      case "consult": return "Online Consultation";
      case "hospital": return "Find Hospitals";
      case "more": return "More";
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      {/* Page Title for non-home tabs */}
      {getPageTitle() && (
        <div className="container px-4 pt-4">
          <h1 className="text-xl font-bold text-foreground">{getPageTitle()}</h1>
        </div>
      )}
      
      {/* Tab Content */}
      <main className="container px-4 py-4">
        {renderTabContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
