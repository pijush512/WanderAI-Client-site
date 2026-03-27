"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User,
  Plane,
  Menu,
  X,
  Moon,
  Sun,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { toast } from "../app/lib/alerts";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to end your session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Logout",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast("Logged out successfully", "info");
      }
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/howItWorks" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-[100] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-blue-600 text-white rounded-xl group-hover:rotate-[360deg] transition-transform duration-700">
            <Plane size={20} className="rotate-45" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white uppercase">
            Wander<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-widest transition-colors relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 dark:text-slate-400 hover:text-blue-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-[25px] left-0 w-full h-[3px] bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block" />

          {token ? (
            /* Profile Section */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
              >
                <div className="relative">
                  <img
                    src={
                      user?.image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`
                        : `https://ui-avatars.com/api/?name=${user?.name}&background=0284c7&color=fff`
                    }
                    alt="User"
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-white dark:ring-slate-950 shadow-sm"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Enhanced Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-[110] animate-in fade-in slide-in-from-top-3">
                  <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">
                      Explorer Account
                    </p>
                    <p className="text-sm font-bold dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="px-2 space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <User size={18} className="text-slate-400" /> My Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <LayoutDashboard size={18} className="text-slate-400" />{" "}
                      Dashboard
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 px-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Buttons */
            // <div className="hidden md:flex items-center gap-3">
            //   <Link href="/auth/login" className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-blue-600">
            //     Login
            //   </Link>
            // </div>
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="relative flex items-center justify-center px-8 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-[0.15em] text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 active:scale-[0.96] overflow-hidden group"
              >
                {/* হালকা একটা শাইন ইফেক্ট মাউস নিলে স্লাইড করবে */}
                <span className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>

                <span className="relative">Login</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-6 py-8 flex flex-col gap-5 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-black uppercase tracking-tighter ${pathname === link.href ? "text-blue-600" : "text-slate-800 dark:text-white"}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!token && (
            <div className="flex flex-col gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/auth/login"
                className="w-full py-4 text-center font-bold uppercase tracking-widest text-slate-600 border border-slate-200 rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="w-full py-4 text-center font-bold uppercase tracking-widest bg-blue-600 text-white rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                Join WanderAI
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
