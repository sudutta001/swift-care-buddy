import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Phone, FileText, Clock, Star, ChevronRight, Stethoscope } from "lucide-react";

const doctors = [
  { name: "Dr. Priya Sharma", specialty: "General Physician", rating: 4.9, exp: "12 yrs", available: true },
  { name: "Dr. Rajesh Kumar", specialty: "Internal Medicine", rating: 4.8, exp: "15 yrs", available: true },
  { name: "Dr. Anjali Verma", specialty: "Pediatrician", rating: 4.7, exp: "8 yrs", available: false },
];

const specialties = [
  { name: "General Physician", icon: "🩺", wait: "2 min" },
  { name: "Pediatrician", icon: "👶", wait: "5 min" },
  { name: "Dermatologist", icon: "🧴", wait: "10 min" },
  { name: "Gynecologist", icon: "👩", wait: "8 min" },
];

const ConsultTab = () => {
  return (
    <div className="space-y-6">
      {/* Consultation Types */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="interactive" className="border-primary/20">
          <CardContent className="p-5 text-center">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 mb-3">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Audio Call</h3>
            <p className="text-xs text-muted-foreground mt-1">Talk to a doctor</p>
            <p className="text-lg font-bold text-primary mt-2">₹99</p>
          </CardContent>
        </Card>
        
        <Card variant="interactive" className="border-primary/20">
          <CardContent className="p-5 text-center">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-primary/10 mb-3">
              <Video className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Video Call</h3>
            <p className="text-xs text-muted-foreground mt-1">Face-to-face consult</p>
            <p className="text-lg font-bold text-primary mt-2">₹149</p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="flex items-center justify-center gap-6 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-4 w-4 text-success" />
          <span>Instant connect</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-4 w-4 text-primary" />
          <span>E-prescription</span>
        </div>
      </div>

      {/* Specialties */}
      <div>
        <h2 className="font-bold text-foreground mb-4">Select Specialty</h2>
        <div className="grid grid-cols-2 gap-3">
          {specialties.map((spec) => (
            <Card key={spec.name} variant="interactive">
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl">{spec.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm truncate">{spec.name}</h3>
                  <p className="text-[10px] text-success">~{spec.wait} wait</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Doctors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Available Doctors</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {doctors.map((doctor) => (
            <Card key={doctor.name} variant="elevated">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      {doctor.available && (
                        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{doctor.specialty} • {doctor.exp}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <span className="text-xs font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                  <Button size="sm" disabled={!doctor.available}>
                    Consult
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultTab;
