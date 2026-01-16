import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Clock, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void;
}

const CartPage = ({ onBack, onCheckout }: CartPageProps) => {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  
  const deliveryFee = subtotal > 199 ? 0 : 29;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal - discount + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="container px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Your Cart</h1>
          </div>
        </div>
        
        <div className="container px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">Add medicines to your cart and they will appear here</p>
          <Button onClick={onBack}>Browse Medicines</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Your Cart</h1>
            <p className="text-xs text-muted-foreground">{totalItems} items</p>
          </div>
        </div>
      </div>

      {/* Delivery Banner */}
      <div className="container px-4 pt-4">
        <Card variant="success" className="bg-success/5 border-success/20">
          <CardContent className="p-3 flex items-center gap-3">
            <Clock className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Delivery in 10 minutes</p>
              <p className="text-xs text-muted-foreground">From nearby verified store</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Items */}
      <div className="container px-4 py-4 space-y-3">
        {items.map((item) => (
          <Card key={item.id} variant="elevated">
            <CardContent className="p-3 flex gap-3">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-secondary/30"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground line-clamp-1">{item.name}</h3>
                <p className="text-[10px] text-muted-foreground">{item.genericName}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{item.unit}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                    <span className="text-[10px] text-muted-foreground line-through ml-1">
                      ₹{item.mrp * item.quantity}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bill Details */}
      <div className="container px-4">
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
                <span className="text-foreground">
                  {deliveryFee === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  Add ₹{199 - subtotal} more for free delivery
                </p>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 safe-area-bottom">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-foreground">₹{total}</p>
          </div>
          <Button size="lg" className="flex-1 max-w-xs" onClick={onCheckout}>
            <Truck className="h-5 w-5" />
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
