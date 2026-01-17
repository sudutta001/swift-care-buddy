import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import MedicineTab from "@/components/tabs/MedicineTab";
import ConsultTab from "@/components/tabs/ConsultTab";
import HospitalTab from "@/components/tabs/HospitalTab";
import MoreTab from "@/components/tabs/MoreTab";
import PhoneLogin from "@/components/auth/PhoneLogin";
import ProfilePage from "@/components/profile/ProfilePage";
import CartPage from "@/components/cart/CartPage";
import CheckoutPage from "@/components/cart/CheckoutPage";
import OrderSuccessPage from "@/components/cart/OrderSuccessPage";
import SplashScreen from "@/components/SplashScreen";
import { useToast } from "@/hooks/use-toast";

type ViewState = "main" | "profile" | "cart" | "checkout" | "order-success";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("main");
  const [orderId, setOrderId] = useState<string>("");
  const { toast } = useToast();

  const handleSOS = () => {
    toast({
      title: "🚨 SOS Activated",
      description: "Alerting nearby ambulances, hospitals, and your emergency contacts...",
      variant: "destructive",
    });
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    toast({
      title: "Welcome!",
      description: "You're now logged in. Complete your profile for better experience.",
    });
  };

  const handleOrderPlaced = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCurrentView("order-success");
    toast({
      title: "Order Placed!",
      description: `Your order ${newOrderId} has been confirmed.`,
    });
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Handle different views
  if (currentView === "profile") {
    return <ProfilePage onBack={() => setCurrentView("main")} />;
  }

  if (currentView === "cart") {
    return (
      <CartPage 
        onBack={() => setCurrentView("main")} 
        onCheckout={() => setCurrentView("checkout")} 
      />
    );
  }

  if (currentView === "checkout") {
    return (
      <CheckoutPage 
        onBack={() => setCurrentView("cart")} 
        onOrderPlaced={handleOrderPlaced} 
      />
    );
  }

  if (currentView === "order-success") {
    return (
      <OrderSuccessPage 
        orderId={orderId} 
        onBackToHome={() => {
          setCurrentView("main");
          setActiveTab("home");
        }} 
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onSOS={handleSOS} />;
      case "medicine":
        return <MedicineTab onCartClick={() => setCurrentView("cart")} />;
      case "consult":
        return <ConsultTab />;
      case "hospital":
        return <HospitalTab />;
      case "more":
        return (
          <MoreTab 
            onLoginClick={() => setShowLogin(true)} 
            onProfileClick={() => setCurrentView("profile")} 
          />
        );
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
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
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

      {/* Login Modal */}
      {showLogin && (
        <PhoneLogin 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleLoginSuccess} 
        />
      )}
    </div>
  );
};

export default Index;
