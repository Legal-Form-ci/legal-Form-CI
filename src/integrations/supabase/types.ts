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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          page_path: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string | null
          category: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          images: Json | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          images?: Json | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          images?: Json | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      companies_showcase: {
        Row: {
          city: string | null
          company_name: string
          company_type: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          logo: string | null
          region: string | null
          sector: string | null
          website: string | null
        }
        Insert: {
          city?: string | null
          company_name: string
          company_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          logo?: string | null
          region?: string | null
          sector?: string | null
          website?: string | null
        }
        Update: {
          city?: string | null
          company_name?: string
          company_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          logo?: string | null
          region?: string | null
          sector?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_requests: {
        Row: {
          activity: string | null
          assigned_to: string | null
          associates: Json | null
          capital: string | null
          city: string | null
          client_rating: number | null
          client_review: string | null
          company_name: string
          company_type: string
          created_at: string
          documents: Json | null
          id: string
          manager_email: string | null
          manager_name: string | null
          manager_phone: string | null
          notes: string | null
          payment_amount: number | null
          payment_reference: string | null
          payment_status: string | null
          referral_code: string | null
          region: string | null
          status: string
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activity?: string | null
          assigned_to?: string | null
          associates?: Json | null
          capital?: string | null
          city?: string | null
          client_rating?: number | null
          client_review?: string | null
          company_name: string
          company_type?: string
          created_at?: string
          documents?: Json | null
          id?: string
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          notes?: string | null
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          referral_code?: string | null
          region?: string | null
          status?: string
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activity?: string | null
          assigned_to?: string | null
          associates?: Json | null
          capital?: string | null
          city?: string | null
          client_rating?: number | null
          client_review?: string | null
          company_name?: string
          company_type?: string
          created_at?: string
          documents?: Json | null
          id?: string
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          notes?: string | null
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          referral_code?: string | null
          region?: string | null
          status?: string
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          replied: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          replied?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          replied?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      ebooks: {
        Row: {
          category: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          download_count: number | null
          file_url: string | null
          id: string
          is_published: boolean | null
          slug: string
          title: string
        }
        Insert: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          slug: string
          title: string
        }
        Update: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      faq: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_published: boolean | null
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          is_ai_generated: boolean | null
          topic_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          topic_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          topic_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          title: string
          updated_at: string
          user_id: string | null
          views: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          title: string
          updated_at?: string
          user_id?: string | null
          views?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string | null
          views?: number | null
        }
        Relationships: []
      }
      identity_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string | null
          file_url: string
          id: string
          rejection_reason: string | null
          request_id: string | null
          status: string | null
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          document_type?: string
          file_name?: string | null
          file_url: string
          id?: string
          rejection_reason?: string | null
          request_id?: string | null
          status?: string | null
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string | null
          file_url?: string
          id?: string
          rejection_reason?: string | null
          request_id?: string | null
          status?: string | null
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      lexia_conversations: {
        Row: {
          created_at: string
          id: string
          session_id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lexia_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "lexia_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "lexia_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_name: string | null
          category: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          metadata: Json | null
          provider: string | null
          request_id: string | null
          request_type: string | null
          status: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          provider?: string | null
          request_id?: string | null
          request_type?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          provider?: string | null
          request_id?: string | null
          request_type?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          referral_balance: number | null
          referral_code: string | null
          referred_by: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          referral_balance?: number | null
          referral_code?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          referral_balance?: number | null
          referral_code?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_withdrawals: {
        Row: {
          amount: number
          created_at: string
          id: string
          method: string | null
          phone: string | null
          processed_at: string | null
          processed_by: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          method?: string | null
          phone?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          method?: string | null
          phone?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      request_documents_exchange: {
        Row: {
          created_at: string
          direction: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          notes: string | null
          request_id: string
          request_type: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          direction?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          notes?: string | null
          request_id: string
          request_type?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          direction?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          notes?: string | null
          request_id?: string
          request_type?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      request_messages: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          request_id: string
          request_type: string
          sender_id: string | null
          sender_role: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          request_id: string
          request_type?: string
          sender_id?: string | null
          sender_role?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          request_id?: string
          request_type?: string
          sender_id?: string | null
          sender_role?: string | null
        }
        Relationships: []
      }
      search_results_cache: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          query: string
          results: Json
          sources: Json | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          query: string
          results?: Json
          sources?: Json | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          query?: string
          results?: Json
          sources?: Json | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          assigned_to: string | null
          client_rating: number | null
          client_review: string | null
          created_at: string
          details: Json | null
          id: string
          notes: string | null
          payment_amount: number | null
          payment_reference: string | null
          payment_status: string | null
          service_category: string | null
          service_type: string
          status: string
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          client_rating?: number | null
          client_review?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          service_category?: string | null
          service_type: string
          status?: string
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          client_rating?: number | null
          client_review?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: string | null
          service_category?: string | null
          service_type?: string
          status?: string
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          permissions: Json | null
          phone: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          comment: string
          company: string | null
          created_at: string
          id: string
          is_approved: boolean | null
          logo: string | null
          name: string
          rating: number
          region: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          company?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean | null
          logo?: string | null
          name: string
          rating?: number
          region?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          company?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean | null
          logo?: string | null
          name?: string
          rating?: number
          region?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "team" | "client"
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
      app_role: ["admin", "team", "client"],
    },
  },
} as const
