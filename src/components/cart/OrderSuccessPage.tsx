import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, Package, Truck, Home, Clock, MapPin, Phone 
} from "lucide-react";

interface OrderSuccessPageProps {
  orderId: string;
  onBackToHome: () => void;
}

const orderStatuses = [
  { id: "confirmed", label: "Order Confirmed", icon: CheckCircle, time: "Just now" },
  { id: "preparing", label: "Preparing Order", icon: Package, time: "2 min" },
  { id: "picked", label: "Picked by Rider", icon: Truck, time: "5 min" },
  { id: "delivered", label: "Delivered", icon: Home, time: "10 min" },
];

const OrderSuccessPage = ({ orderId, onBackToHome }: OrderSuccessPageProps) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [progress, setProgress] = useState(10);

  // Simulate order status updates
  useEffect(() => {
    const statusIntervals = [3000, 5000, 7000];
    const timers: NodeJS.Timeout[] = [];
    
    statusIntervals.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setCurrentStatus(index + 1);
        setProgress((index + 2) * 25);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const estimatedTime = new Date(Date.now() + 10 * 60000).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Success Header */}
      <div className="bg-success/10 pt-12 pb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">Order Placed Successfully!</h1>
        <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
      </div>

      <div className="container px-4 py-4 space-y-4">
        {/* Delivery ETA */}
        <Card variant="elevated" className="overflow-hidden">
          <div className="bg-primary/5 p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="text-lg font-bold text-foreground">{estimatedTime}</p>
            </div>
          </div>
          
          <CardContent className="p-4">
            <Progress value={progress} className="h-2 mb-4" />
            
            <div className="space-y-4">
              {orderStatuses.map((status, index) => (
                <div key={status.id} className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    index <= currentStatus 
                      ? 'bg-success text-white' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    <status.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      index <= currentStatus ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {status.label}
                    </p>
                    {index <= currentStatus && (
                      <p className="text-xs text-muted-foreground">{status.time}</p>
                    )}
                  </div>
                  {index === currentStatus && index < orderStatuses.length - 1 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium animate-pulse">
                      In Progress
                    </span>
                  )}
                  {index < currentStatus && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Partner */}
        {currentStatus >= 2 && (
          <Card variant="elevated">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Delivery Partner</h3>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-lg font-bold">RS</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Rahul Singh</p>
                  <p className="text-xs text-muted-foreground">Honda Activa • MH 02 AB 1234</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Address */}
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Delivery Address</h3>
                <p className="text-sm text-muted-foreground">
                  123, Sample Street, Near Park<br />
                  Mumbai, Maharashtra - 400001
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button variant="outline" className="w-full" onClick={onBackToHome}>
            Back to Home
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Need help? Contact support at 1800-XXX-XXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
