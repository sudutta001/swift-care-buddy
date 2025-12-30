import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ambulance, Droplets, CreditCard, Heart, FileText, 
  History, Settings, HelpCircle, Shield, Bell, 
  User, ChevronRight, LogOut, Star
} from "lucide-react";

const quickActions = [
  { icon: Ambulance, label: "Book Ambulance", color: "text-destructive", bg: "bg-destructive/10" },
  { icon: Droplets, label: "Blood Bank", color: "text-destructive", bg: "bg-destructive/10" },
  { icon: CreditCard, label: "Emergency Fund", color: "text-warning", bg: "bg-warning/10" },
  { icon: Heart, label: "Health Records", color: "text-primary", bg: "bg-primary/10" },
];

const menuItems = [
  { icon: FileText, label: "My Prescriptions" },
  { icon: History, label: "Order History" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Insurance & Claims" },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: Settings, label: "Settings" },
];

const MoreTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg">Guest User</h3>
              <p className="text-sm text-muted-foreground">Sign in for personalized experience</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card key={action.label} variant="interactive" className="text-center">
              <CardContent className="p-3">
                <div className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl ${action.bg}`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground leading-tight block">
                  {action.label}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Menu Items */}
      <Card variant="elevated">
        <CardContent className="p-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Rate App */}
      <Card variant="default" className="border-accent/20">
        <CardContent className="p-4 text-center">
          <Star className="h-8 w-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold text-foreground">Enjoying Sahayak+?</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">Rate us on the Play Store</p>
          <Button variant="outline" size="sm">
            Rate Now
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
        <LogOut className="h-5 w-5" />
        Sign Out
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground">
        Version 1.0.0 • Made with ❤️ in India
      </p>
    </div>
  );
};

export default MoreTab;
