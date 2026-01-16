export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      allergies: {
        Row: {
          allergy_name: string
          created_at: string
          id: string
          notes: string | null
          severity: string | null
          user_id: string
        }
        Insert: {
          allergy_name: string
          created_at?: string
          id?: string
          notes?: string | null
          severity?: string | null
          user_id: string
        }
        Update: {
          allergy_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          severity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          medicine_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          medicine_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          medicine_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean | null
          name: string
          phone: string
          relationship: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          name: string
          phone: string
          relationship: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string
          relationship?: string
          user_id?: string
        }
        Relationships: []
      }
      medical_history: {
        Row: {
          condition_name: string
          created_at: string
          diagnosis_date: string | null
          id: string
          is_ongoing: boolean | null
          notes: string | null
          user_id: string
        }
        Insert: {
          condition_name: string
          created_at?: string
          diagnosis_date?: string | null
          id?: string
          is_ongoing?: boolean | null
          notes?: string | null
          user_id: string
        }
        Update: {
          condition_name?: string
          created_at?: string
          diagnosis_date?: string | null
          id?: string
          is_ongoing?: boolean | null
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      medicines: {
        Row: {
          category: string
          created_at: string
          description: string | null
          generic_name: string | null
          id: string
          image_url: string | null
          is_otc: boolean | null
          manufacturer: string | null
          mrp: number
          name: string
          price: number
          requires_prescription: boolean | null
          stock_quantity: number | null
          unit: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          generic_name?: string | null
          id?: string
          image_url?: string | null
          is_otc?: boolean | null
          manufacturer?: string | null
          mrp: number
          name: string
          price: number
          requires_prescription?: boolean | null
          stock_quantity?: number | null
          unit?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          generic_name?: string | null
          id?: string
          image_url?: string | null
          is_otc?: boolean | null
          manufacturer?: string | null
          mrp?: number
          name?: string
          price?: number
          requires_prescription?: boolean | null
          stock_quantity?: number | null
          unit?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          medicine_id: string
          medicine_name: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          medicine_id: string
          medicine_name: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          medicine_id?: string
          medicine_name?: string
          order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          created_at: string
          id: string
          message: string | null
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          order_id: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivered_at: string | null
          delivery_address_id: string | null
          delivery_address_text: string | null
          delivery_fee: number | null
          discount: number | null
          estimated_delivery: string | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string
          payment_status: string
          prescription_url: string | null
          status: string
          subtotal: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          delivery_address_id?: string | null
          delivery_address_text?: string | null
          delivery_fee?: number | null
          discount?: number | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_method: string
          payment_status?: string
          prescription_url?: string | null
          status?: string
          subtotal: number
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          delivery_address_id?: string | null
          delivery_address_text?: string | null
          delivery_fee?: number | null
          discount?: number | null
          estimated_delivery?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string
          payment_status?: string
          prescription_url?: string | null
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "saved_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          blood_group: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          blood_group?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          blood_group?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string
          id: string
          is_default: boolean | null
          label: string
          landmark: string | null
          pincode: string
          state: string
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label: string
          landmark?: string | null
          pincode: string
          state: string
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string
          landmark?: string | null
          pincode?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
