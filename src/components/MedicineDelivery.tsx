import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Pill, FileCheck, ShieldCheck, ChevronRight } from "lucide-react";

const otcMedicines = [
  { name: "Fever & Pain", items: ["Paracetamol", "Ibuprofen"], icon: "🌡️" },
  { name: "Cold & Cough", items: ["Cetirizine", "Cough Syrup"], icon: "🤧" },
  { name: "Acidity", items: ["Antacids", "Omeprazole"], icon: "💊" },
  { name: "Allergy", items: ["Antihistamines"], icon: "🌿" },
];

const MedicineDelivery = () => {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <Clock className="h-6 w-6 text-success" />
          </div>
          <div>
            <CardTitle className="text-lg">10-Min Delivery</CardTitle>
            <p className="text-xs text-muted-foreground">From verified nearby stores</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* OTC Medicines Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-foreground">No Prescription Needed</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
              Doctor Certified
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {otcMedicines.map((category) => (
              <button
                key={category.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
              >
                <span className="text-2xl">{category.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{category.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {category.items.join(", ")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Prescription Required */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Upload Prescription</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Required for antibiotics, steroids & controlled medicines
          </p>
        </div>
        
        <Button className="w-full" size="lg">
          <Pill className="h-5 w-5" />
          Order Medicines
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicineDelivery;
