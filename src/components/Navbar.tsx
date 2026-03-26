
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogOut, User, Plane, Menu, X, Moon, Sun, LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { toast } from "../app/lib/alerts";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile Dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ক্লোজ ড্রপডাউন যখন বাইরে ক্লিক করা হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      title: "Are you sure?",
      text: "You will be logged out of your session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
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
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <Plane className="rotate-45" /> Wander<span className="text-slate-900 dark:text-white">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle (Desktop) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:block p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-blue-100 transition-all"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Trigger Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                >
                  {user?.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                      <User size={18} />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Account</p>
                      <p className="text-sm font-bold truncate dark:text-white">{user?.email}</p>
                    </div>

                    <div className="p-2">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-all">
                        <User size={18} /> My Profile
                      </Link>
                      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-all">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-all">
                        <Settings size={18} /> Settings
                      </Link>
                      
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2 md:hidden" />
                      
                      {/* Theme Toggle (Mobile Dropdown only) */}
                      <button 
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-full md:hidden flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                      >
                        {theme === "dark" ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
                        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                      </button>
                    </div>

                    <div className="p-2 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl font-bold transition-all"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                  Login
                </Link>
                <Link href="/auth/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 shadow-md transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-medium text-slate-600 dark:text-slate-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!token && (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link onClick={() => setIsOpen(false)} href="/auth/login" className="w-full text-center py-2.5 font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl">
                Login
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/auth/register" className="w-full text-center py-2.5 font-bold bg-blue-600 text-white rounded-xl">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}