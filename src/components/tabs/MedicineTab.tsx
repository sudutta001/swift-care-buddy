import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, ShieldCheck, Pill, ChevronRight, Plus, Star, ShoppingCart, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { dummyMedicines, categories } from "@/data/medicines";
import PrescriptionUpload from "@/components/PrescriptionUpload";

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
      {/* Search Bar with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl -m-1" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input
            placeholder="Search Paracetamol, Pan D, Rhus Tox..."
            className="pl-12 pr-12 h-14 text-base rounded-2xl bg-background border-primary/20 focus:border-primary shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Delivery Banner */}
      <Card className="border-success/30 bg-gradient-to-r from-success/5 to-success/10 overflow-hidden">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 shadow-inner">
            <Clock className="h-7 w-7 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              10-Minute Delivery 
              <Sparkles className="h-4 w-4 text-success" />
            </h3>
            <p className="text-sm text-muted-foreground">From verified nearby stores</p>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-foreground">Shop by Category</h2>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all min-w-[85px] shadow-sm ${
              selectedCategory === null 
                ? 'bg-primary text-primary-foreground shadow-primary' 
                : 'bg-card hover:bg-secondary border'
            }`}
          >
            <span className="text-2xl">🏥</span>
            <span className="text-[10px] font-semibold whitespace-nowrap">All</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all min-w-[85px] shadow-sm ${
                selectedCategory === category.name 
                  ? 'bg-primary text-primary-foreground shadow-primary' 
                  : 'bg-card hover:bg-secondary border'
              }`}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-[10px] font-semibold whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery || selectedCategory) && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredMedicines.length}</span> {filteredMedicines.length === 1 ? 'result' : 'results'}
            {searchQuery && <span> for "<span className="text-primary font-medium">{searchQuery}</span>"</span>}
            {selectedCategory && <span> in <span className="text-primary font-medium">{selectedCategory}</span></span>}
          </p>
          {(searchQuery || selectedCategory) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
              className="text-primary"
            >
              Clear
            </Button>
          )}
        </div>
      )}

      {/* Medicines Grid */}
      <div>
        {!searchQuery && !selectedCategory && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              Popular Medicines
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Top Selling</span>
            </h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {filteredMedicines.length === 0 ? (
          <Card variant="default" className="border-dashed">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Pill className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No medicines found</h3>
              <p className="text-sm text-muted-foreground">Try a different search term or category</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredMedicines.map((medicine, index) => {
              const inCartQty = getItemQuantity(medicine.id);
              return (
                <Card 
                  key={medicine.id} 
                  className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/50 p-3">
                    <img 
                      src={medicine.image} 
                      alt={medicine.name}
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop";
                      }}
                    />
                    {medicine.isOtc && (
                      <span className="absolute top-2 left-2 text-[8px] px-2 py-0.5 rounded-full bg-success text-white font-bold shadow-sm">
                        OTC
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/95 rounded-full px-2 py-1 shadow-sm">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold">{medicine.rating}</span>
                    </div>
                    {/* Discount badge */}
                    {medicine.mrp > medicine.price && (
                      <span className="absolute bottom-2 left-2 text-[8px] px-2 py-0.5 rounded-full bg-destructive text-white font-bold shadow-sm">
                        {Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-foreground line-clamp-1">{medicine.name}</h3>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{medicine.genericName}</p>
                    </div>
                    <p className="text-[9px] text-muted-foreground/80">{medicine.unit}</p>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="font-bold text-foreground text-lg">₹{medicine.price}</span>
                        <span className="text-[10px] text-muted-foreground line-through ml-1">₹{medicine.mrp}</span>
                      </div>
                      {inCartQty > 0 ? (
                        <span className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full">
                          ✓ {inCartQty}
                        </span>
                      ) : (
                        <Button 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-full shadow-md hover:shadow-lg transition-all"
                          onClick={() => handleAddToCart(medicine)}
                        >
                          <Plus className="h-5 w-5" />
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

      {/* AI Prescription Upload */}
      <PrescriptionUpload 
        onMedicinesExtracted={(medicines) => {
          console.log("Extracted medicines:", medicines);
          toast.success("Medicines extracted! Review and add to cart.");
        }}
      />

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-slide-up">
          <Button 
            className="w-full h-16 shadow-2xl rounded-2xl gradient-primary hover:opacity-95 transition-opacity" 
            size="lg"
            onClick={onCartClick}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span className="font-bold text-lg">View Cart</span>
            </div>
            <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold ml-auto">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MedicineTab;
