import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, ShieldCheck, FileCheck, Camera, Pill, ChevronRight } from "lucide-react";

const categories = [
  { name: "Fever & Pain", emoji: "🌡️", items: ["Paracetamol", "Ibuprofen", "Aspirin"] },
  { name: "Cold & Cough", emoji: "🤧", items: ["Cetirizine", "Cough Syrup", "Nasal Spray"] },
  { name: "Acidity & Gas", emoji: "💊", items: ["Antacids", "Omeprazole", "Eno"] },
  { name: "Allergy", emoji: "🌿", items: ["Antihistamines", "Loratadine"] },
  { name: "Body Pain", emoji: "💪", items: ["Pain Balm", "Muscle Relaxant"] },
  { name: "Vitamins", emoji: "✨", items: ["Multivitamins", "Vitamin C", "Calcium"] },
];

const MedicineTab = () => {
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

      {/* No Prescription Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-success" />
          <h2 className="font-bold text-foreground">No Prescription Needed</h2>
          <span className="text-[10px] px-2 py-1 rounded-full bg-success/10 text-success font-semibold">
            Doctor Certified
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Card key={category.name} variant="interactive" className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{category.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-1 truncate">
                      {category.items.join(", ")}
                    </p>
                  </div>
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
