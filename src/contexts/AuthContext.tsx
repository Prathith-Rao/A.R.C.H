
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('arch_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simple mock authentication
    if (email && password.length >= 6) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName: email.split('@')[0]
      };
      setUser(user);
      localStorage.setItem('arch_user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Simple mock registration
    if (email && password.length >= 6 && fullName) {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        fullName
      };
      setUser(user);
      localStorage.setItem('arch_user', JSON.stringify(user));
    } else {
      throw new Error('Please fill all fields correctly');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('arch_user');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
