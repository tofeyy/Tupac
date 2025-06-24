
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('tupac_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    console.log('محاولة تسجيل دخول:', { email, password });
    
    if (email === 'kazmabbas554@gmail.com' && password === '1997219972@@aaa') {
      const userData = { email, isAdmin: true };
      setUser(userData);
      localStorage.setItem('tupac_user', JSON.stringify(userData));
      console.log('تم تسجيل الدخول بنجاح');
      return true;
    }
    console.log('فشل في تسجيل الدخول');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tupac_user');
    console.log('تم تسجيل الخروج');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
