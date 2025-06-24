
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
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
    
    // التحقق من الحساب الأساسي للأدمن
    if (email === 'kazmabbas554@gmail.com' && password === '1997219972@@aaa') {
      const userData = { email, isAdmin: true };
      setUser(userData);
      localStorage.setItem('tupac_user', JSON.stringify(userData));
      console.log('تم تسجيل الدخول بنجاح');
      return true;
    }

    // التحقق من الحسابات المسجلة في localStorage
    const savedAccounts = localStorage.getItem('tupac_accounts');
    if (savedAccounts) {
      const accounts = JSON.parse(savedAccounts);
      const account = accounts.find((acc: any) => acc.email === email && acc.password === password);
      if (account) {
        const userData = { email, isAdmin: false };
        setUser(userData);
        localStorage.setItem('tupac_user', JSON.stringify(userData));
        console.log('تم تسجيل الدخول بنجاح');
        return true;
      }
    }

    console.log('فشل في تسجيل الدخول');
    return false;
  };

  const register = (email: string, password: string): boolean => {
    console.log('محاولة إنشاء حساب:', { email, password });
    
    // التحقق من وجود الحساب مسبقاً
    const savedAccounts = localStorage.getItem('tupac_accounts');
    let accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
    
    const existingAccount = accounts.find((acc: any) => acc.email === email);
    if (existingAccount || email === 'kazmabbas554@gmail.com') {
      console.log('الحساب موجود مسبقاً');
      return false;
    }

    // إضافة الحساب الجديد
    const newAccount = { email, password };
    accounts.push(newAccount);
    localStorage.setItem('tupac_accounts', JSON.stringify(accounts));

    // تسجيل دخول تلقائي
    const userData = { email, isAdmin: false };
    setUser(userData);
    localStorage.setItem('tupac_user', JSON.stringify(userData));
    
    console.log('تم إنشاء الحساب وتسجيل الدخول بنجاح');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tupac_user');
    console.log('تم تسجيل الخروج');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
