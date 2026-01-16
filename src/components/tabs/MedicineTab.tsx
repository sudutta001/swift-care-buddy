import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, ShieldCheck, FileCheck, Camera, Pill, ChevronRight, Plus, Star, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { dummyMedicines, categories } from "@/data/medicines";

interface MedicineTabProps {
  onCartClick: () => void;
}

const MedicineTab = ({ onCartClick }: MedicineTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart, getItemQuantity, totalItems } = useCart();

  const filteredMedicines = useMemo(() => {
    let filtered = dummyMedicines;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.genericName.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (medicine: typeof dummyMedicines[0]) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      genericName: medicine.genericName,
      price: medicine.price,
      mrp: medicine.mrp,
      image: medicine.image,
      unit: medicine.unit
    });
    toast.success(`${medicine.name} added to cart`);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search medicines, health products..."
          className="pl-12 pr-12 h-14 text-base rounded-2xl bg-secondary/50 border-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
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
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors min-w-[80px] ${
              selectedCategory === null 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary/50 hover:bg-secondary'
            }`}
          >
            <span className="text-2xl">🏥</span>
            <span className="text-[10px] font-medium whitespace-nowrap">All</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors min-w-[80px] ${
                selectedCategory === category.name 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 hover:bg-secondary'
              }`}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-[10px] font-medium whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery || selectedCategory) && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredMedicines.length} {filteredMedicines.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
          {(searchQuery || selectedCategory) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Medicines Grid */}
      <div>
        {!searchQuery && !selectedCategory && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">Popular Medicines</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {filteredMedicines.length === 0 ? (
          <Card variant="default">
            <CardContent className="p-8 text-center">
              <Pill className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <h3 className="font-medium text-foreground mb-1">No medicines found</h3>
              <p className="text-sm text-muted-foreground">Try a different search term or category</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredMedicines.map((medicine) => {
              const inCartQty = getItemQuantity(medicine.id);
              return (
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
                      {inCartQty > 0 ? (
                        <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                          {inCartQty} in cart
                        </span>
                      ) : (
                        <Button 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleAddToCart(medicine)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
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

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-24 left-4 right-4 z-50">
          <Button 
            className="w-full h-14 shadow-lg" 
            size="lg"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="flex-1 text-left ml-2">View Cart</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {totalItems} items
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicineTab;
