import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileCheck, AlertTriangle, Loader2, CheckCircle, X, ShoppingCart, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Medicine {
  name: string;
  genericName?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  quantity?: number;
  instructions?: string;
  isControlled?: boolean;
}

interface PrescriptionAnalysis {
  isValid: boolean;
  doctorName?: string;
  doctorRegistration?: string;
  patientName?: string;
  prescriptionDate?: string;
  medicines: Medicine[];
  diagnosis?: string;
  specialInstructions?: string;
  warnings?: string[];
  confidence: "high" | "medium" | "low";
  uncertainParts?: string[];
  rawContent?: string;
}

interface PrescriptionUploadProps {
  onMedicinesExtracted?: (medicines: Medicine[]) => void;
  onAddToCart?: (medicine: { name: string; genericName?: string; price?: number }) => void;
}

const PrescriptionUpload = ({ onMedicinesExtracted, onAddToCart }: PrescriptionUploadProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setPreviewImage(base64);
      await analyzePrescription(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzePrescription = async (imageBase64: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-prescription", {
        body: { imageBase64 }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        
        if (data.analysis.medicines?.length > 0) {
          toast.success(`Found ${data.analysis.medicines.length} medicine(s) in prescription`);
          onMedicinesExtracted?.(data.analysis.medicines);
        } else {
          toast.warning("No medicines found in the prescription. Please try with a clearer image.");
        }
      }
    } catch (error) {
      console.error("Prescription analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze prescription");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">High Confidence</span>;
      case "medium":
        return <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">Medium Confidence</span>;
      case "low":
        return <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">Low Confidence</span>;
    }
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">AI Prescription Scanner</CardTitle>
            <CardDescription className="text-xs">
              Upload prescription for instant AI analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload buttons */}
        {!previewImage && !isAnalyzing && (
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-14 border-dashed"
              onClick={() => cameraInputRef.current?.click()}
            >
              <Camera className="h-5 w-5 mr-2" />
              Take Photo
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-14 border-dashed"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload
            </Button>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Image preview */}
        {previewImage && (
          <div className="relative rounded-lg overflow-hidden border">
            <img 
              src={previewImage} 
              alt="Prescription preview" 
              className="w-full h-40 object-cover"
            />
            {!isAnalyzing && (
              <button 
                onClick={clearAnalysis}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="flex flex-col items-center py-6 gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Analyzing Prescription</p>
              <p className="text-xs text-muted-foreground">AI is extracting medicine details...</p>
            </div>
          </div>
        )}

        {/* Analysis results */}
        {analysis && !isAnalyzing && (
          <div className="space-y-4 animate-slide-up">
            {/* Header with confidence */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {analysis.isValid ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                )}
                <span className="font-medium text-sm">
                  {analysis.isValid ? "Valid Prescription" : "Review Required"}
                </span>
              </div>
              {getConfidenceBadge(analysis.confidence)}
            </div>

            {/* Prescription details */}
            {(analysis.doctorName || analysis.prescriptionDate) && (
              <div className="p-3 rounded-lg bg-secondary/50 space-y-1">
                {analysis.doctorName && (
                  <p className="text-xs"><span className="text-muted-foreground">Doctor:</span> {analysis.doctorName}</p>
                )}
                {analysis.doctorRegistration && (
                  <p className="text-xs"><span className="text-muted-foreground">Reg No:</span> {analysis.doctorRegistration}</p>
                )}
                {analysis.patientName && (
                  <p className="text-xs"><span className="text-muted-foreground">Patient:</span> {analysis.patientName}</p>
                )}
                {analysis.prescriptionDate && (
                  <p className="text-xs"><span className="text-muted-foreground">Date:</span> {analysis.prescriptionDate}</p>
                )}
                {analysis.diagnosis && (
                  <p className="text-xs"><span className="text-muted-foreground">Diagnosis:</span> {analysis.diagnosis}</p>
                )}
              </div>
            )}

            {/* Medicines list */}
            {analysis.medicines && analysis.medicines.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Medicines ({analysis.medicines.length})
                </h4>
                <div className="space-y-2">
                  {analysis.medicines.map((medicine, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{medicine.name}</p>
                          {medicine.genericName && (
                            <p className="text-xs text-muted-foreground">{medicine.genericName}</p>
                          )}
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                            {medicine.dosage && (
                              <span className="text-xs text-primary">{medicine.dosage}</span>
                            )}
                            {medicine.frequency && (
                              <span className="text-xs text-muted-foreground">{medicine.frequency}</span>
                            )}
                            {medicine.duration && (
                              <span className="text-xs text-muted-foreground">{medicine.duration}</span>
                            )}
                          </div>
                          {medicine.instructions && (
                            <p className="text-xs text-muted-foreground mt-1 italic">{medicine.instructions}</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0 shrink-0"
                          onClick={() => {
                            onAddToCart?.({ 
                              name: medicine.name, 
                              genericName: medicine.genericName 
                            });
                            toast.success(`${medicine.name} added to cart`);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {medicine.isControlled && (
                        <div className="mt-2 flex items-center gap-1 text-warning">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="text-[10px]">Controlled substance - requires verification</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {analysis.warnings && analysis.warnings.length > 0 && (
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 space-y-1">
                <p className="text-xs font-medium text-warning flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Warnings
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {analysis.warnings.map((warning, i) => (
                    <li key={i}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special instructions */}
            {analysis.specialInstructions && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Instructions: </span>
                  {analysis.specialInstructions}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clearAnalysis}>
                Upload New
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  if (analysis?.medicines) {
                    analysis.medicines.forEach(medicine => {
                      onAddToCart?.({ 
                        name: medicine.name, 
                        genericName: medicine.genericName 
                      });
                    });
                    toast.success(`Added ${analysis.medicines.length} medicine(s) to cart`);
                  }
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>
        )}

        {/* Info text */}
        {!previewImage && !isAnalyzing && (
          <p className="text-[10px] text-center text-muted-foreground">
            Your prescription will be analyzed by AI and verified by our pharmacists
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionUpload;
