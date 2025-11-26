import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  resendVerification: (email: string) => Promise<{ error: any }>;
  checkUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkUserRole = async () => {
    if (!user?.id) {
      console.log("❌ No user ID found in checkUserRole");
      setUserRole(null);
      return;
    }

    console.log("🔍 Manual role check for user:", user.id);

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role, is_active")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      console.log("📊 Manual role query result:", { data, error });

      if (error) {
        console.error("❌ Error fetching user role:", error);
        setUserRole("user");
        return;
      }

      const role = data?.role || "user";
      console.log("✅ Setting user role to:", role);
      setUserRole(role);
    } catch (error) {
      console.error("❌ Unexpected error checking user role:", error);
      setUserRole("user");
    }
  };

  useEffect(() => {
    const checkRole = async (userId: string): Promise<string> => {
      console.log("🔍 Checking role for user:", userId);
      
      try {
        // Use the secure RPC function that bypasses RLS with a timeout
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Role check timeout')), 5000)
        );
        
        const rpcPromise = supabase.rpc("get_current_user_role");
        
        const { data, error } = await Promise.race([rpcPromise, timeoutPromise]);

        if (error) {
          console.error("❌ Error fetching user role:", error);
          return "user";
        }

        const role = data || "user";
        console.log("✅ Role determined:", role);
        return role;
      } catch (error) {
        console.error("❌ Unexpected error checking user role:", error);
        return "user";
      }
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        // Check role immediately after state change
        if (session?.user) {
          const role = await checkRole(session.user.id);
          setUserRole(role);
          
          // Create session for sign-in events
          if (event === 'SIGNED_IN') {
            supabase.rpc('create_user_session', {
              _ip_address: null,
              _user_agent: navigator.userAgent
            });
          }
        } else {
          setUserRole(null);
        }
        
        // Set loading to false AFTER role check completes
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("🔑 Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const role = await checkRole(session.user.id);
        setUserRole(role);
      }
      
      // Set loading to false AFTER role check completes
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/auth/verify-email`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: fullName,
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Check Your Email",
        description: "We've sent you a verification link to complete your registration.",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome Back",
        description: "You have successfully signed in.",
      });
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signOut = async () => {
    // Log the sign out action BEFORE signing out (while still authenticated)
    if (session) {
      try {
        await supabase.rpc('log_user_action', {
          _action: 'signout',
          _metadata: { timestamp: new Date().toISOString() }
        });
      } catch (logError) {
        console.error("Failed to log sign out:", logError);
      }
    }
    
    const { error } = await supabase.auth.signOut();

    setUser(null);
    setSession(null);
    setUserRole(null);

    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions.",
      });
    }

    return { error };
  };

  const resendVerification = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/verify-email`
      }
    });

    if (error) {
      toast({
        title: "Resend failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Verification email sent",
        description: "We've sent you a new verification link.",
      });
    }

    return { error };
  };

  const isAdmin = userRole === "admin";

  const value: AuthContextType = {
    user,
    session,
    userRole,
    isAdmin,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    resendVerification,
    checkUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};