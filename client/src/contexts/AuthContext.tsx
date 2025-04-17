
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("mediAiUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("mediAiUser");
      }
    }
    setLoading(false);
  }, []);

  // Simulate Google sign in
  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      // Simulate a successful Google login
      // In a real app, this would use Firebase, Supabase, or another auth provider
      const mockUser: User = {
        uid: `user-${Date.now()}`,
        displayName: "Demo User",
        email: "user@example.com",
        photoURL: "https://ui-avatars.com/api/?name=Demo+User&background=2970ff&color=fff",
      };
      
      setUser(mockUser);
      localStorage.setItem("mediAiUser", JSON.stringify(mockUser));
      
      toast({
        title: "Welcome to Medi AI",
        description: "You've successfully signed in!",
      });
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Failed to sign in with Google. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem("mediAiUser");
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign-out error:", error);
      toast({
        variant: "destructive",
        title: "Sign-out failed",
        description: "Failed to sign out. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
