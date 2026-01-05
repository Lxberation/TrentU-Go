import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  email: string;
  studentId: string;
  fullName: string;
  profilePicture?: string;
  cardNumber: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfilePicture: (pictureUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem("trentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    const users = [
      { email: "duckyduck@trentu.ca", studentId: "9438718", password: "duckyduck", fullName: "Ducky Duck", cardNumber: "9876543" },
      { email: "bilalie@trentu.ca", studentId: "2785821", password: "duckyduck", fullName: "Bilalie Bilalie", cardNumber: "1234567" }
    ];

    const user = users.find(u => (u.email === identifier || u.studentId === identifier) && u.password === password);

    if (!user) {
      toast({
        title: "Login Failed",
        description: "Invalid email, student ID, or password.",
        variant: "destructive",
      });
      throw new Error("Invalid credentials");
    }

    const { email, studentId, fullName, cardNumber } = user;
    const loggedInUser: User = { email, studentId, fullName, cardNumber };

    localStorage.setItem("trentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAuthenticated(true);

    toast({
      title: "Welcome!",
      description: `You have successfully logged in as ${fullName}.`,
    });
  };

  const updateProfilePicture = (pictureUrl: string) => {
    if (!user) return;
    const updatedUser = { ...user, profilePicture: pictureUrl };
    localStorage.setItem("trentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("trentUser");
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
