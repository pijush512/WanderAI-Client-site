// "use client";

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axiosInstance from '@/lib/axiosInstance';
// import { useRouter } from 'next/navigation';

// interface AuthContextType {
//   user: any;
//   token: string | null;
//   loading: boolean;
//   login: (token: string, userData: any) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//   const savedToken = localStorage.getItem('token');
//   // Local storage থেকে ইউজার ডাটাও নিতে হবে (যদি আগে সেভ করে থাকেন)
//   const savedUser = localStorage.getItem('user'); 

//   if (savedToken) {
//     setToken(savedToken);
//     if (savedUser) {
//       setUser(JSON.parse(savedUser)); // স্ট্রিং থেকে অবজেক্টে রূপান্তর
//     }
//   }
//   setLoading(false);
// }, []);

//   const login = (newToken: string, userData: any) => {
//     setToken(newToken);
//     setUser(userData);
//     localStorage.setItem('token', newToken);
//     router.push('/'); 
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     router.push('/');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };



"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user'); 

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser)); // স্ট্রিং থেকে অবজেক্টে রূপান্তর
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
    setLoading(false);
  }, []);

  // --- Login Function Update ---
  const login = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    // ১. ইউজার ডাটা অবশ্যই লোকাল স্টোরেজে সেভ করতে হবে স্ট্রিং বানিয়ে
    localStorage.setItem('user', JSON.stringify(userData)); 
    router.push('/'); 
  };

  // --- Logout Function Update ---
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    // ২. লগআউট করার সময় ইউজার ডাটাও রিমুভ করতে হবে
    localStorage.removeItem('user'); 
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};