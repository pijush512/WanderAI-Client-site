// // "use client";

// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // interface AuthContextType {
// //   user: any;
// //   token: string | null;
// //   loading: boolean;
// //   login: (token: string, userData: any) => void;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [user, setUser] = useState<any>(null);
// //   const [token, setToken] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const savedToken = localStorage.getItem('token');
// //     const savedUser = localStorage.getItem('user');

// //     if (savedToken && savedUser) {
// //       setToken(savedToken);
// //       try {
// //         setUser(JSON.parse(savedUser)); // স্ট্রিং থেকে অবজেক্টে রূপান্তর
// //       } catch (error) {
// //         console.error("Error parsing user from localStorage", error);
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// //   // --- Login Function Update ---
// //   const login = (newToken: string, userData: any) => {
// //     setToken(newToken);
// //     setUser(userData);
// //     localStorage.setItem('token', newToken);
// //     // ১. ইউজার ডাটা অবশ্যই লোকাল স্টোরেজে সেভ করতে হবে স্ট্রিং বানিয়ে
// //     localStorage.setItem('user', JSON.stringify(userData));
// //     router.push('/');
// //   };

// //   // --- Logout Function Update ---
// //   const logout = () => {
// //     setToken(null);
// //     setUser(null);
// //     localStorage.removeItem('token');
// //     // ২. লগআউট করার সময় ইউজার ডাটাও রিমুভ করতে হবে
// //     localStorage.removeItem('user');
// //     router.push('/');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) throw new Error("useAuth must be used within an AuthProvider");
// //   return context;
// // };

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  // ১. অ্যাপ লোড হওয়ার সময় লোকাল স্টোরেজ চেক করা
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // ডাটা করাপ্টেড হলে ক্লিন করে দেওয়া ভালো
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ২. লগইন ফাংশন
  const login = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // টোকেন সেভ হওয়ার পর রিডাইরেক্ট করা ভালো
    router.replace("/");
  };

  // ৩. লগআউট ফাংশন
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // লগআউট করার পর ইউজারকে হোমপেজে বা লগইন পেজে পাঠানো
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {/* লোডিং অবস্থায় থাকলে সাদা স্ক্রিন বা স্পিনার দেখানো ভালো */}
      {!loading ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-blue-600 font-bold uppercase tracking-widest text-[10px]">
          WanderAI Loading...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};



