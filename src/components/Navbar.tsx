// // "use client";
// // import { Moon, Sun } from 'lucide-react'
// // import { useTheme } from 'next-themes'
// // import Link from 'next/link'
// // import React, { useEffect, useState } from 'react'

// // const Navbar = () => {
// //   const { theme, setTheme } = useTheme();
// //   const [mounted, setMounted] = useState(false);
// //   // Hydration mismatch এড়ানোর জন্য মাউন্ট স্টেট চেক করা জরুরি
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   if (!mounted) return null;

// //   return (
// //     <nav className="fixed top-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 z-50 transition-colors duration-300">
// //       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

// //         {/* লোগো */}
// //         <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
// //           Wander<span className="text-slate-800 dark:text-white">AI</span>
// //         </Link>

// //         {/* মেনু আইটেম */}
// //         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
// //           <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
// //           <Link href="/explore" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Explore</Link>
// //           <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
// //           <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
// //         </div>

// //         {/* অ্যাকশন বাটন */}
// //         <div className="flex items-center gap-4">

// //           <button
// //             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //             className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors"
// //           >
// //             {theme === "dark" ? (
// //               <Sun className="h-5 w-5 text-yellow-400" />
// //             ) : (
// //               <Moon className="h-5 w-5 text-slate-700" />
// //             )}
// //           </button>

// //           <Link href="/auth/login" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden sm:block">
// //             Login
// //           </Link>
// //           <Link href="/auth/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md">
// //             Get Started
// //           </Link>
// //         </div>

// //       </div>
// //     </nav>
// //   )
// // }

// // export default Navbar

// "use client";

// import Link from "next/link";
// import { LogOut, User, Plane } from "lucide-react"; // আইকন ব্যবহারের জন্য
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, token, logout } = useAuth();

//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-sm">
//       {/* লোগো */}
//       <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
//         <Plane className="rotate-45" /> WanderAI
//       </Link>

//       {/* মেনু আইটেম */}
//       <div className="flex items-center gap-6">
//         {token ? (
//           <div className="flex items-center gap-5">
//             {/* ইউজারের নাম দেখানো */}
//             <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
//               <User size={18} className="text-slate-500" />
//               <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
//                 {user?.name || "User"}
//               </span>
//             </div>

//             {/* আসল লগআউট বাটন */}
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-red-100"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <Link href="/auth/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600">
//               Login
//             </Link>
//             <Link href="/auth/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-md">
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, Plane, Menu, X, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import Swal from "sweetalert2";
import { toast } from "../app/lib/alerts";

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // --- Logout with Confirmation ---
  const handleLogoutClick = () => {
    setIsOpen(false); // Close mobile menu if open

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
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600"
        >
          <Plane className="rotate-45" /> Wander
          <span className="text-slate-900 dark:text-white">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  {/* <User size={16} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {user?.name?.split(" ")[0] || "User"}
                  </span> */}

                  {user?.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`}
                      alt="User Profile"
                      className="w-7 h-7 rounded-full object-cover border border-blue-200"
                    />
                  ) : (
                    /* ২. ইমেজ না থাকলে ডিফল্ট আইকন */
                    <div className="w-7 h-7 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500">
                      <User size={16} />
                    </div>
                  )}

                  {/* ৩. ইউজারের নাম */}
                  <span className="pr-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 text-red-500 font-bold text-sm hover:text-red-600 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 shadow-md"
                >
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

      {/* Mobile Dropdown */}
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
          <hr className="border-slate-100 dark:border-slate-800" />
          {token ? (
            <div className="space-y-4">
              <p className="text-sm font-bold text-blue-600">
                Welcome, {user?.name}
              </p>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 text-red-500 font-bold w-full"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                onClick={() => setIsOpen(false)}
                href="/auth/login"
                className="w-full text-center py-2 font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/auth/register"
                className="w-full text-center py-2 font-bold bg-blue-600 text-white rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
