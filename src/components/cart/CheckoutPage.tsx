import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ArrowLeft, MapPin, Clock, CreditCard, Smartphone, 
  Banknote, CheckCircle, Package, Truck as TruckIcon 
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CheckoutPageProps {
  onBack: () => void;
  onOrderPlaced: (orderId: string) => void;
}

const paymentMethods = [
  { id: "upi", name: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
  { id: "card", name: "Debit/Credit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
];

const CheckoutPage = ({ onBack, onOrderPlaced }: CheckoutPageProps) => {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    landmark: "",
    pincode: ""
  });

  const deliveryFee = subtotal > 199 ? 0 : 29;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.addressLine || !address.pincode) {
      toast.error("Please fill in all required address fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD${Date.now().toString().slice(-8)}`;
    clearCart();
    setIsProcessing(false);
    onOrderPlaced(orderId);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container px-4 py-4 space-y-4">
        {/* Delivery Time */}
        <Card variant="success" className="bg-success/5 border-success/20">
          <CardContent className="p-3 flex items-center gap-3">
            <Clock className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Delivery in 10 minutes</p>
              <p className="text-xs text-muted-foreground">Order now, receive by {new Date(Date.now() + 10 * 60000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card variant="elevated">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Delivery Address</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Full Name *</Label>
                <Input 
                  id="name"
                  placeholder="John Doe"
                  value={address.name}
                  onChange={(e) => setAddress(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">Phone *</Label>
                <Input 
                  id="phone"
                  placeholder="9876543210"
                  value={address.phone}
                  onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs">Address *</Label>
              <Input 
                id="address"
                placeholder="House/Flat No., Building, Street"
                value={address.addressLine}
                onChange={(e) => setAddress(prev => ({ ...prev, addressLine: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="landmark" className="text-xs">Landmark</Label>
                <Input 
                  id="landmark"
                  placeholder="Near..."
                  value={address.landmark}
                  onChange={(e) => setAddress(prev => ({ ...prev, landmark: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pincode" className="text-xs">Pincode *</Label>
                <Input 
                  id="pincode"
                  placeholder="400001"
                  value={address.pincode}
                  onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card variant="elevated">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Order Summary</h3>
            </div>
            
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-secondary/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card variant="elevated">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Payment Method</h3>
            </div>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === method.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <method.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Bill Details */}
        <Card variant="elevated">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Bill Details</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Total</span>
                <span className="text-foreground">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Discount (5%)</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-success" : "text-foreground"}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-base">
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Place Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 safe-area-bottom">
        <div className="container">
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Place Order • ₹{total}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
