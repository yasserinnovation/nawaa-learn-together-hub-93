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
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      user_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          ip_address: unknown
          revoked: boolean
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          ip_address?: unknown
          revoked?: boolean
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          ip_address?: unknown
          revoked?: boolean
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: Database["public"]["Enums"]["auth_provider_type"]
          avatar_url: string | null
          created_at: string
          email: string
          email_verified_at: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          auth_provider?: Database["public"]["Enums"]["auth_provider_type"]
          avatar_url?: string | null
          created_at?: string
          email: string
          email_verified_at?: string | null
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          auth_provider?: Database["public"]["Enums"]["auth_provider_type"]
          avatar_url?: string | null
          created_at?: string
          email?: string
          email_verified_at?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_spaces: {
        Row: {
          address: string | null
          availability: Json | null
          capacity: number | null
          city: string | null
          coordinates: Json | null
          created_at: string | null
          description: string | null
          equipment: string[] | null
          id: string | null
          images: string[] | null
          name: string | null
          price_per_hour: number | null
          rating: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          capacity?: number | null
          city?: string | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string | null
          images?: string[] | null
          name?: string | null
          price_per_hour?: number | null
          rating?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          capacity?: number | null
          city?: string | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string | null
          images?: string[] | null
          name?: string | null
          price_per_hour?: number | null
          rating?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_tools: {
        Row: {
          availability_status: string | null
          category: string | null
          condition: string | null
          created_at: string | null
          description: string | null
          id: string | null
          images: string[] | null
          location: string | null
          name: string | null
          purchase_price: number | null
          rental_price_per_day: number | null
          specifications: Json | null
          updated_at: string | null
        }
        Insert: {
          availability_status?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          images?: string[] | null
          location?: string | null
          name?: string | null
          purchase_price?: number | null
          rental_price_per_day?: number | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Update: {
          availability_status?: string | null
          category?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string | null
          images?: string[] | null
          location?: string | null
          name?: string | null
          purchase_price?: number | null
          rental_price_per_day?: number | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_user_session: {
        Args: { _ip_address?: unknown; _user_agent?: string }
        Returns: string
      }
      get_admin_dashboard_stats: { Args: never; Returns: Json }
      get_admin_profile_stats: { Args: never; Returns: Json }
      get_current_user_role: { Args: never; Returns: string }
      get_public_profile: {
        Args: { profile_user_id: string }
        Returns: {
          avatar_url: string
          city: string
          created_at: string
          full_name: string
          id: string
          interests: string[]
          rating: number
          total_courses_completed: number
          total_hours_learned: number
          user_type: string
        }[]
      }
      get_user_profile: {
        Args: never
        Returns: {
          active_sessions: number
          auth_provider: Database["public"]["Enums"]["auth_provider_type"]
          avatar_url: string
          created_at: string
          email: string
          email_verified_at: string
          id: string
          name: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      log_admin_activity: {
        Args: {
          _action: string
          _details?: Json
          _resource_id?: string
          _resource_type: string
        }
        Returns: undefined
      }
      log_user_action: {
        Args: {
          _action: string
          _ip_address?: unknown
          _metadata?: Json
          _user_agent?: string
        }
        Returns: undefined
      }
      revoke_user_session: { Args: { _session_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      auth_provider_type: "password" | "google" | "linked"
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
      auth_provider_type: ["password", "google", "linked"],
    },
  },
} as const
