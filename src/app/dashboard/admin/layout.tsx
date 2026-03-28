"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Map,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Globe,
  Home,
  User,
  Compass,
  FileText,
  Activity,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { logout, user } = useAuth();  
  const primaryNav = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Compass, path: "/explore", label: "Explore" },
    { icon: Shield, path: "/dashboard/admin", label: "Admin Mode" },
    { icon: User, path: "/profile", label: "My Profile" },
  ];

  const adminMenuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard/admin" },
    { name: "User Base", icon: Users, path: "/dashboard/admin/users" },
    { name: "Content Hub", icon: FileText, path: "/dashboard/admin/content" },
    { name: "System Status", icon: Activity, path: "/dashboard/admin/status" },
    { name: "AI Trip Logs", icon: Map, path: "/dashboard/admin/engine" },
    {
      name: "System Config",
      icon: Settings,
      path: "/dashboard/admin/ai-config",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans selection:bg-blue-100 text-slate-900 dark:text-slate-100">
      <aside className="hidden lg:flex flex-col items-center py-8 w-20 bg-slate-900 border-r border-slate-800 space-y-8">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Globe size={24} />
        </div>

        <nav className="flex flex-col gap-6">
          {primaryNav.map((item, i) => {
            const isActive =
              pathname.startsWith(item.path) &&
              (item.path !== "/" || pathname === "/");
            return (
              <Link
                key={i}
                href={item.path}
                title={item.label}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                    : "text-slate-500 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={22} />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pb-4">
          <button
            onClick={logout}
            className="p-3 text-slate-500 hover:text-rose-500 transition-colors"
            title="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6 pt-10">
          <div className="px-2 mb-12">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Operational Area
            </span>
            <h1 className="text-xl font-black dark:text-white uppercase tracking-tighter italic mt-1">
              Admin<span className="text-blue-600">Core</span>
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            {adminMenuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-r-4 border-blue-600 rounded-r-none"
                      : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={`${
                      isActive ? "text-blue-600" : "group-hover:scale-110 transition-transform"
                    }`}
                    strokeWidth={isActive ? 3 : 2}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-slate-500"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Cloud Node: Active
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-black dark:text-white uppercase leading-none">
                {user?.name || "Admin User"}
              </p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {user?.role || "System Root"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center">
              {user?.image ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <User size={20} className="text-slate-400" />
              )}
              {!user?.image && <User size={20} className="text-slate-400" />}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#F8FAFC] dark:bg-slate-950">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}