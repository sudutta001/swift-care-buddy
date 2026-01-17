import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use tool calling for structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a medical prescription analyzer. Analyze the prescription image and extract medicine details.
            
IMPORTANT GUIDELINES:
- Extract all medicines mentioned in the prescription
- For each medicine, provide the name, dosage, frequency, and duration
- Identify if the prescription is valid and from a registered doctor
- Note any warnings or special instructions
- If handwriting is unclear, indicate which parts are uncertain
- Always prioritize patient safety in your analysis`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this prescription image and extract all medicine details. Provide a structured analysis including patient info if visible, doctor details if visible, and list of medicines with their dosages."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_prescription",
              description: "Extract structured information from a medical prescription",
              parameters: {
                type: "object",
                properties: {
                  isValid: {
                    type: "boolean",
                    description: "Whether the prescription appears to be valid and from a registered medical practitioner"
                  },
                  doctorName: {
                    type: "string",
                    description: "Name of the prescribing doctor if visible"
                  },
                  doctorRegistration: {
                    type: "string",
                    description: "Medical registration number of the doctor if visible"
                  },
                  patientName: {
                    type: "string",
                    description: "Patient name if visible"
                  },
                  prescriptionDate: {
                    type: "string",
                    description: "Date on the prescription if visible"
                  },
                  medicines: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          description: "Name of the medicine"
                        },
                        genericName: {
                          type: "string",
                          description: "Generic/salt name of the medicine if known"
                        },
                        dosage: {
                          type: "string",
                          description: "Dosage strength (e.g., 500mg, 10ml)"
                        },
                        frequency: {
                          type: "string",
                          description: "How often to take (e.g., twice daily, before meals)"
                        },
                        duration: {
                          type: "string",
                          description: "Duration of treatment (e.g., 5 days, 1 week)"
                        },
                        quantity: {
                          type: "number",
                          description: "Total quantity prescribed"
                        },
                        instructions: {
                          type: "string",
                          description: "Special instructions for this medicine"
                        },
                        isControlled: {
                          type: "boolean",
                          description: "Whether this is a controlled substance"
                        }
                      },
                      required: ["name"]
                    },
                    description: "List of medicines prescribed"
                  },
                  diagnosis: {
                    type: "string",
                    description: "Diagnosis or condition mentioned if any"
                  },
                  specialInstructions: {
                    type: "string",
                    description: "Any special instructions or notes from the doctor"
                  },
                  warnings: {
                    type: "array",
                    items: { type: "string" },
                    description: "Any warnings or concerns about the prescription"
                  },
                  confidence: {
                    type: "string",
                    enum: ["high", "medium", "low"],
                    description: "Confidence level in the analysis based on image clarity"
                  },
                  uncertainParts: {
                    type: "array",
                    items: { type: "string" },
                    description: "Parts of the prescription that were unclear or uncertain"
                  }
                },
                required: ["isValid", "medicines", "confidence"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_prescription" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall && toolCall.function?.arguments) {
      const analysis = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify({ success: true, analysis }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback to content if no tool call
    const content = data.choices?.[0]?.message?.content;
    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: {
          isValid: true,
          medicines: [],
          confidence: "low",
          rawContent: content,
          warnings: ["Could not parse structured data. Please review the raw content."]
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Prescription analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
