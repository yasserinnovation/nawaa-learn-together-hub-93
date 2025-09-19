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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          action: string
          admin_id: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      competitions: {
        Row: {
          age_group: string
          category: string
          competition_date: string
          created_at: string
          description: string
          entry_fee: number | null
          id: string
          image_url: string | null
          location: string | null
          max_participants: number | null
          prizes: Json | null
          registration_end_date: string
          registration_start_date: string
          requirements: string[] | null
          rules: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          age_group: string
          category: string
          competition_date: string
          created_at?: string
          description: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          prizes?: Json | null
          registration_end_date: string
          registration_start_date: string
          requirements?: string[] | null
          rules?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          age_group?: string
          category?: string
          competition_date?: string
          created_at?: string
          description?: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          prizes?: Json | null
          registration_end_date?: string
          registration_start_date?: string
          requirements?: string[] | null
          rules?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          age_group: string
          category: string
          created_at: string
          description: string
          duration_weeks: number
          id: string
          image_url: string | null
          learning_outcomes: string[] | null
          level: string
          price: number
          requirements: string[] | null
          syllabus: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          age_group: string
          category: string
          created_at?: string
          description: string
          duration_weeks?: number
          id?: string
          image_url?: string | null
          learning_outcomes?: string[] | null
          level?: string
          price?: number
          requirements?: string[] | null
          syllabus?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          age_group?: string
          category?: string
          created_at?: string
          description?: string
          duration_weeks?: number
          id?: string
          image_url?: string | null
          learning_outcomes?: string[] | null
          level?: string
          price?: number
          requirements?: string[] | null
          syllabus?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          full_name: string
          gender: string | null
          id: string
          interests: string[] | null
          phone: string | null
          rating: number | null
          total_courses_completed: number | null
          total_hours_learned: number | null
          updated_at: string
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          account_status?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          full_name: string
          gender?: string | null
          id?: string
          interests?: string[] | null
          phone?: string | null
          rating?: number | null
          total_courses_completed?: number | null
          total_hours_learned?: number | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          account_status?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          full_name?: string
          gender?: string | null
          id?: string
          interests?: string[] | null
          phone?: string | null
          rating?: number | null
          total_courses_completed?: number | null
          total_hours_learned?: number | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      spaces: {
        Row: {
          address: string
          availability: Json
          capacity: number
          city: string
          coordinates: Json
          created_at: string
          description: string
          equipment: string[] | null
          id: string
          images: string[] | null
          name: string
          owner: string
          price_per_hour: number
          rating: number | null
          type: string
          updated_at: string
        }
        Insert: {
          address: string
          availability?: Json
          capacity: number
          city: string
          coordinates?: Json
          created_at?: string
          description: string
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          name: string
          owner: string
          price_per_hour: number
          rating?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          address?: string
          availability?: Json
          capacity?: number
          city?: string
          coordinates?: Json
          created_at?: string
          description?: string
          equipment?: string[] | null
          id?: string
          images?: string[] | null
          name?: string
          owner?: string
          price_per_hour?: number
          rating?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          availability_status: string
          category: string
          condition: string
          created_at: string
          description: string
          id: string
          images: string[] | null
          location: string | null
          name: string
          owner_contact: string | null
          purchase_price: number | null
          rental_price_per_day: number
          specifications: Json | null
          updated_at: string
        }
        Insert: {
          availability_status?: string
          category: string
          condition?: string
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          location?: string | null
          name: string
          owner_contact?: string | null
          purchase_price?: number | null
          rental_price_per_day?: number
          specifications?: Json | null
          updated_at?: string
        }
        Update: {
          availability_status?: string
          category?: string
          condition?: string
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          location?: string | null
          name?: string
          owner_contact?: string | null
          purchase_price?: number | null
          rental_price_per_day?: number
          specifications?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      user_reviews: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          rating: number
          review_text: string | null
          reviewed_user_id: string
          reviewer_id: string
          space_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          rating: number
          review_text?: string | null
          reviewed_user_id: string
          reviewer_id: string
          space_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          rating?: number
          review_text?: string | null
          reviewed_user_id?: string
          reviewer_id?: string
          space_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_reviews_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          _action: string
          _details?: Json
          _resource_id?: string
          _resource_type: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
