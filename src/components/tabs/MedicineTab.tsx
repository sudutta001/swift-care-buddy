import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, ShieldCheck, FileCheck, Camera, Pill, ChevronRight, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const categories = [
  { name: "Fever & Pain", emoji: "🌡️", items: ["Paracetamol", "Ibuprofen", "Aspirin"] },
  { name: "Cold & Cough", emoji: "🤧", items: ["Cetirizine", "Cough Syrup", "Nasal Spray"] },
  { name: "Acidity & Gas", emoji: "💊", items: ["Antacids", "Omeprazole", "Eno"] },
  { name: "Allergy", emoji: "🌿", items: ["Antihistamines", "Loratadine"] },
  { name: "Body Pain", emoji: "💪", items: ["Pain Balm", "Muscle Relaxant"] },
  { name: "Vitamins", emoji: "✨", items: ["Multivitamins", "Vitamin C", "Calcium"] },
];

const dummyMedicines = [
  {
    id: "1",
    name: "Dolo 650",
    genericName: "Paracetamol 650mg",
    price: 35,
    mrp: 42,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
    rating: 4.8,
    isOtc: true,
    unit: "Strip of 15 tablets"
  },
  {
    id: "2",
    name: "Crocin Advance",
    genericName: "Paracetamol 500mg",
    price: 28,
    mrp: 35,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "Strip of 10 tablets"
  },
  {
    id: "3",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride",
    price: 18,
    mrp: 25,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
    rating: 4.6,
    isOtc: true,
    unit: "Strip of 10 tablets"
  },
  {
    id: "4",
    name: "Vitamin C 500",
    genericName: "Ascorbic Acid 500mg",
    price: 85,
    mrp: 110,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop",
    rating: 4.9,
    isOtc: true,
    unit: "Bottle of 60 tablets"
  },
  {
    id: "5",
    name: "Digene Gel",
    genericName: "Antacid Gel",
    price: 75,
    mrp: 95,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop",
    rating: 4.5,
    isOtc: true,
    unit: "200ml Bottle"
  },
  {
    id: "6",
    name: "Volini Spray",
    genericName: "Diclofenac Spray",
    price: 185,
    mrp: 225,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "100ml Spray"
  },
];

const MedicineTab = () => {
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);

  const addToCart = (medicineId: string, medicineName: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicineId);
      if (existing) {
        return prev.map(item => 
          item.id === medicineId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: medicineId, quantity: 1 }];
    });
    toast.success(`${medicineName} added to cart`);
  };

  const getCartQuantity = (medicineId: string) => {
    return cart.find(item => item.id === medicineId)?.quantity || 0;
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search medicines, health products..."
          className="pl-12 h-14 text-base rounded-2xl bg-secondary/50 border-0"
        />
      </div>

      {/* Quick Delivery Banner */}
      <Card variant="success" className="border-success/20 bg-success/5">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <Clock className="h-6 w-6 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">10-Minute Delivery</h3>
            <p className="text-xs text-muted-foreground">From verified nearby stores</p>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-success" />
          <h2 className="font-bold text-foreground">Shop by Category</h2>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors min-w-[80px]"
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-[10px] font-medium text-foreground whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Medicines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Popular Medicines</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {dummyMedicines.map((medicine) => (
            <Card key={medicine.id} variant="elevated" className="overflow-hidden">
              <div className="relative aspect-square bg-secondary/30 p-3">
                <img 
                  src={medicine.image} 
                  alt={medicine.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {medicine.isOtc && (
                  <span className="absolute top-2 left-2 text-[8px] px-1.5 py-0.5 rounded bg-success/90 text-white font-medium">
                    OTC
                  </span>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-background/90 rounded px-1.5 py-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-medium">{medicine.rating}</span>
                </div>
              </div>
              <CardContent className="p-3 space-y-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1">{medicine.name}</h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{medicine.genericName}</p>
                </div>
                <p className="text-[9px] text-muted-foreground">{medicine.unit}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground">₹{medicine.price}</span>
                    <span className="text-[10px] text-muted-foreground line-through ml-1">₹{medicine.mrp}</span>
                  </div>
                  {getCartQuantity(medicine.id) > 0 ? (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                      {getCartQuantity(medicine.id)} in cart
                    </span>
                  ) : (
                    <Button 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => addToCart(medicine.id, medicine.name)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Prescription Upload */}
      <Card variant="elevated">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Upload Prescription</CardTitle>
              <p className="text-xs text-muted-foreground">For antibiotics, steroids & controlled medicines</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full h-14 border-dashed">
            <Camera className="h-5 w-5" />
            Take Photo or Upload
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">
            Your prescription will be verified by our pharmacists
          </p>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Reorder Medicines</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Card variant="default">
          <CardContent className="p-4 text-center text-muted-foreground text-sm">
            <Pill className="h-8 w-8 mx-auto mb-2 opacity-50" />
            Your previous orders will appear here
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicineTab;
