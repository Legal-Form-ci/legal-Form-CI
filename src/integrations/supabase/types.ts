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
      blog_comments: {
        Row: {
          author_name: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          post_id: string
          user_id?: string | null
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          post_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          ai_generated: boolean | null
          author_name: string | null
          category: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          ai_generated?: boolean | null
          author_name?: string | null
          category?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          ai_generated?: boolean | null
          author_name?: string | null
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      company_associates: {
        Row: {
          address: string | null
          birth_date: string | null
          company_request_id: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          marital_regime: string | null
          marital_status: string | null
          nationality: string | null
          phone: string | null
          profession: string | null
          request_id: string | null
          residence_address: string | null
          role_in_company: string | null
          shares_count: number | null
          shares_percentage: number | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          company_request_id?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          marital_regime?: string | null
          marital_status?: string | null
          nationality?: string | null
          phone?: string | null
          profession?: string | null
          request_id?: string | null
          residence_address?: string | null
          role_in_company?: string | null
          shares_count?: number | null
          shares_percentage?: number | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          company_request_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          marital_regime?: string | null
          marital_status?: string | null
          nationality?: string | null
          phone?: string | null
          profession?: string | null
          request_id?: string | null
          residence_address?: string | null
          role_in_company?: string | null
          shares_count?: number | null
          shares_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_associates_company_request_id_fkey"
            columns: ["company_request_id"]
            isOneToOne: false
            referencedRelation: "company_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_associates_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "company_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      company_requests: {
        Row: {
          activity: string | null
          activity_sector: string | null
          additional_services: string[] | null
          address: string | null
          admin_notes: string | null
          amount: number | null
          associates: Json | null
          bank: string | null
          bp: string | null
          capital: string | null
          city: string | null
          client_rating: number | null
          company_name: string
          company_type: string
          contact_name: string | null
          created_at: string
          discount_applied: number | null
          documents: Json | null
          email: string | null
          estimated_price: number | null
          id: string
          is_paid: boolean | null
          location: string | null
          manager_mandate_duration: string | null
          manager_marital_regime: string | null
          manager_marital_status: string | null
          manager_residence: string | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          phone: string | null
          promo_bonus: number | null
          referral_code: string | null
          referrer_code: string | null
          region: string | null
          request_number: string | null
          sigle: string | null
          status: string
          structure_type: string | null
          tracking_code: string | null
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activity?: string | null
          activity_sector?: string | null
          additional_services?: string[] | null
          address?: string | null
          admin_notes?: string | null
          amount?: number | null
          associates?: Json | null
          bank?: string | null
          bp?: string | null
          capital?: string | null
          city?: string | null
          client_rating?: number | null
          company_name: string
          company_type?: string
          contact_name?: string | null
          created_at?: string
          discount_applied?: number | null
          documents?: Json | null
          email?: string | null
          estimated_price?: number | null
          id?: string
          is_paid?: boolean | null
          location?: string | null
          manager_mandate_duration?: string | null
          manager_marital_regime?: string | null
          manager_marital_status?: string | null
          manager_residence?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          promo_bonus?: number | null
          referral_code?: string | null
          referrer_code?: string | null
          region?: string | null
          request_number?: string | null
          sigle?: string | null
          status?: string
          structure_type?: string | null
          tracking_code?: string | null
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activity?: string | null
          activity_sector?: string | null
          additional_services?: string[] | null
          address?: string | null
          admin_notes?: string | null
          amount?: number | null
          associates?: Json | null
          bank?: string | null
          bp?: string | null
          capital?: string | null
          city?: string | null
          client_rating?: number | null
          company_name?: string
          company_type?: string
          contact_name?: string | null
          created_at?: string
          discount_applied?: number | null
          documents?: Json | null
          email?: string | null
          estimated_price?: number | null
          id?: string
          is_paid?: boolean | null
          location?: string | null
          manager_mandate_duration?: string | null
          manager_marital_regime?: string | null
          manager_marital_status?: string | null
          manager_residence?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          promo_bonus?: number | null
          referral_code?: string | null
          referrer_code?: string | null
          region?: string | null
          request_number?: string | null
          sigle?: string | null
          status?: string
          structure_type?: string | null
          tracking_code?: string | null
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
          subject?: string | null
        }
        Relationships: []
      }
      created_companies: {
        Row: {
          activity_sector: string | null
          company_name: string
          company_type: string | null
          created_at: string
          district: string | null
          founder_name: string | null
          founder_photo_url: string | null
          id: string
          is_visible: boolean | null
          location: string | null
          logo_url: string | null
          name: string | null
          photo_url: string | null
          rating: number | null
          region: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          sector: string | null
          show_publicly: boolean | null
          testimonial: string | null
          testimonial_status: string
          type: string | null
          website: string | null
        }
        Insert: {
          activity_sector?: string | null
          company_name: string
          company_type?: string | null
          created_at?: string
          district?: string | null
          founder_name?: string | null
          founder_photo_url?: string | null
          id?: string
          is_visible?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          photo_url?: string | null
          rating?: number | null
          region?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          sector?: string | null
          show_publicly?: boolean | null
          testimonial?: string | null
          testimonial_status?: string
          type?: string | null
          website?: string | null
        }
        Update: {
          activity_sector?: string | null
          company_name?: string
          company_type?: string | null
          created_at?: string
          district?: string | null
          founder_name?: string | null
          founder_photo_url?: string | null
          id?: string
          is_visible?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          photo_url?: string | null
          rating?: number | null
          region?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          sector?: string | null
          show_publicly?: boolean | null
          testimonial?: string | null
          testimonial_status?: string
          type?: string | null
          website?: string | null
        }
        Relationships: []
      }
      ebook_downloads: {
        Row: {
          downloaded_at: string
          ebook_id: string | null
          id: string
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          downloaded_at?: string
          ebook_id?: string | null
          id?: string
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          downloaded_at?: string
          ebook_id?: string | null
          id?: string
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ebook_downloads_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      ebooks: {
        Row: {
          author: string | null
          category: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          download_count: number | null
          file_url: string | null
          id: string
          is_free: boolean | null
          is_published: boolean | null
          pages: number | null
          price: number | null
          slug: string
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          pages?: number | null
          price?: number | null
          slug: string
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          pages?: number | null
          price?: number | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      faq_items: {
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
      forum_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          is_pinned: boolean | null
          likes_count: number | null
          title: string
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          likes_count?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          likes_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      identity_documents: {
        Row: {
          back_url: string | null
          created_at: string
          document_type: string
          face_detected: boolean | null
          file_url: string
          front_url: string | null
          id: string
          rejection_reason: string | null
          request_id: string | null
          request_type: string | null
          status: string
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          back_url?: string | null
          created_at?: string
          document_type: string
          face_detected?: boolean | null
          file_url: string
          front_url?: string | null
          id?: string
          rejection_reason?: string | null
          request_id?: string | null
          request_type?: string | null
          status?: string
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          back_url?: string | null
          created_at?: string
          document_type?: string
          face_detected?: boolean | null
          file_url?: string
          front_url?: string | null
          id?: string
          rejection_reason?: string | null
          request_id?: string | null
          request_type?: string | null
          status?: string
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      lexia_conversations: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          message_count: number | null
          satisfaction_rating: number | null
          session_id: string | null
          started_at: string | null
          summary: string | null
          user_id: string | null
          visitor_email: string | null
          visitor_name: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          message_count?: number | null
          satisfaction_rating?: number | null
          session_id?: string | null
          started_at?: string | null
          summary?: string | null
          user_id?: string | null
          visitor_email?: string | null
          visitor_name?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          message_count?: number | null
          satisfaction_rating?: number | null
          session_id?: string | null
          started_at?: string | null
          summary?: string | null
          user_id?: string | null
          visitor_email?: string | null
          visitor_name?: string | null
        }
        Relationships: []
      }
      lexia_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
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
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          created_at: string
          details: Json | null
          event: string
          id: string
          payment_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event: string
          id?: string
          payment_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event?: string
          id?: string
          payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          metadata: Json | null
          payment_method: string | null
          request_id: string | null
          status: string
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          request_id?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          request_id?: string | null
          status?: string
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
          full_name: string | null
          id: string
          phone: string | null
          referral_balance: number | null
          referral_code: string | null
          referral_count: number | null
          referral_earnings: number | null
          referral_link: string | null
          referred_by: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          referral_balance?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referral_earnings?: number | null
          referral_link?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          referral_balance?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referral_earnings?: number | null
          referral_link?: string | null
          referred_by?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_withdrawals: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          id: string
          payment_details: Json | null
          payment_method: string | null
          processed_at: string | null
          requested_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          requested_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          requested_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      request_documents_exchange: {
        Row: {
          created_at: string
          description: string | null
          document_name: string | null
          document_type: string | null
          document_url: string | null
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          is_admin_upload: boolean | null
          message: string | null
          request_id: string | null
          request_type: string | null
          sender_id: string | null
          sender_role: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_name?: string | null
          document_type?: string | null
          document_url?: string | null
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          is_admin_upload?: boolean | null
          message?: string | null
          request_id?: string | null
          request_type?: string | null
          sender_id?: string | null
          sender_role?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          document_name?: string | null
          document_type?: string | null
          document_url?: string | null
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          is_admin_upload?: boolean | null
          message?: string | null
          request_id?: string | null
          request_type?: string | null
          sender_id?: string | null
          sender_role?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      request_messages: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean | null
          is_read: boolean | null
          message: string
          request_id: string | null
          request_type: string | null
          sender_id: string | null
          sender_role: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean | null
          is_read?: boolean | null
          message: string
          request_id?: string | null
          request_type?: string | null
          sender_id?: string | null
          sender_role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean | null
          is_read?: boolean | null
          message?: string
          request_id?: string | null
          request_type?: string | null
          sender_id?: string | null
          sender_role?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          admin_notes: string | null
          amount: number | null
          company_name: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          details: Json | null
          estimated_price: number | null
          id: string
          is_paid: boolean | null
          notes: string | null
          payment_status: string | null
          service_type: string
          status: string
          tracking_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          details?: Json | null
          estimated_price?: number | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          payment_status?: string | null
          service_type: string
          status?: string
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          company_name?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          details?: Json | null
          estimated_price?: number | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          payment_status?: string | null
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
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          category: string | null
          created_at: string
          id: string
          message: string
          priority: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          company_type: string | null
          created_at: string
          id: string
          is_approved: boolean | null
          location: string | null
          message: string
          name: string
          rating: number | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          company_type?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          message: string
          name: string
          rating?: number | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          company_type?: string | null
          created_at?: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          message?: string
          name?: string
          rating?: number | null
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
      whatsapp_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_type: string
          id: string
          message: string
          metadata: Json | null
          phone: string | null
          retry_count: number | null
          sent_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          message: string
          metadata?: Json | null
          phone?: string | null
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          message?: string
          metadata?: Json | null
          phone?: string | null
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
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
      increment_blog_views: { Args: { post_id: string }; Returns: undefined }
      is_admin_or_team: { Args: { _user_id: string }; Returns: boolean }
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
