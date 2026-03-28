"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { 
  LayoutDashboard, User, Map, Star, 
  LogOut, Sparkles, ShieldCheck, ArrowRight,
  Home, X 
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const userLinks = [
    { name: "Home", href: "/", icon: Home }, 
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Plan New Trip", href: "/dashboard/create-trip", icon: Sparkles },
    { name: "My Trips", href: "/dashboard/my-trips", icon: Map },
    { name: "My Reviews", href: "/dashboard/my-reviews", icon: Star },
  ];

  return (
    <>
      {/* মোবাইল ব্যাকড্রপ (Overlay): সাইডবার খোলা থাকলে বাইরের অংশে কালো শ্যাডো পড়বে */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* মেইন সাইডবার কন্টেইনার */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0
      `}>
        
        {/* লোগো এবং মোবাইল ক্লোজ বাটন */}
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">
            WANDER <span className="text-slate-900 dark:text-white">AI</span>
          </h1>
          {/* মোবাইলে বন্ধ করার জন্য 'X' বাটন */}
          <button 
            onClick={onClose} 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* নেভিগেশন লিঙ্কস */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {userLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose} // লিঙ্কে ক্লিক করলে মোবাইলে সাইডবার অটো বন্ধ হবে
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none" 
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm">{link.name}</span>
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <div className="pt-6">
              <div className="px-4 mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</p>
              </div>
              <Link 
                href="/dashboard/admin" 
                onClick={onClose}
                className="group relative flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 overflow-hidden transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 relative z-10">
                  <ShieldCheck size={20} className="text-blue-400 dark:text-blue-600" />
                  <span className="text-[11px] font-black uppercase tracking-tight">Admin Mode</span>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </nav>

        {/* লগআউট সেকশন */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}