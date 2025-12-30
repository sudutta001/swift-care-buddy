import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Bed, Clock, Phone, Star, ChevronRight, Building2, AlertTriangle } from "lucide-react";

const hospitals = [
  { 
    name: "Apollo Hospital", 
    distance: "1.2 km", 
    beds: 12, 
    emergency: true, 
    rating: 4.8,
    address: "MG Road, Andheri West"
  },
  { 
    name: "Fortis Healthcare", 
    distance: "2.5 km", 
    beds: 8, 
    emergency: true, 
    rating: 4.7,
    address: "Link Road, Goregaon"
  },
  { 
    name: "Lilavati Hospital", 
    distance: "3.1 km", 
    beds: 5, 
    emergency: true, 
    rating: 4.9,
    address: "Bandra Reclamation"
  },
];

const HospitalTab = () => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search hospitals, specialties..."
          className="pl-12 h-14 text-base rounded-2xl bg-secondary/50 border-0"
        />
      </div>

      {/* Emergency Pre-Booking Banner */}
      <Card variant="emergency">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Emergency Pre-Booking</h3>
              <p className="text-xs text-muted-foreground">Skip paperwork, alert doctors before arrival</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {["All", "Emergency", "ICU Available", "Maternity", "Cardiac", "Ortho"].map((filter, i) => (
          <Button
            key={filter}
            variant={i === 0 ? "default" : "outline"}
            size="sm"
            className="shrink-0 rounded-full"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Nearby Hospitals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Nearby Hospitals</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs">
            Map View <MapPin className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {hospitals.map((hospital) => (
            <Card key={hospital.name} variant="elevated">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{hospital.name}</h3>
                      {hospital.emergency && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold shrink-0">
                          24/7
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{hospital.distance}</span>
                      <span>•</span>
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <span>{hospital.rating}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{hospital.address}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs">
                        <Bed className="h-3.5 w-3.5 text-success" />
                        <span className="font-medium text-success">{hospital.beds} beds</span>
                      </div>
                      <div className="flex-1" />
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                      <Button size="sm">
                        Pre-Book
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalTab;
