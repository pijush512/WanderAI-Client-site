// "use client";

// import React, { useState } from 'react';
// import Link from "next/link";
// import { Mail, Lock, Github, Chrome } from "lucide-react";
// import { useAuth } from '@/src/context/AuthContext';
// import axiosInstance from '../../lib/axiosInstance';
// import { showAlert, toast } from '../../lib/alerts';

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);

//   // ১. ইনপুট স্টেট
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ২. লগইন হ্যান্ডেলার
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault(); // পেজ রিফ্রেশ বন্ধ করবে

//     if (!formData.email || !formData.password) {
//       toast("Please provide both email and password!", "warning");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axiosInstance.post('/users/login', formData);

//       if (response.data.success) {
//         // ৩. টোকেন ও ইউজার ডাটা কন্টেক্সটে পাঠানো
//         login(response.data.token, response.data.data);
//         toast("Login Successful! Welcome back.", "success");
//       }
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.message || "Login failed!";
//       showAlert("Login Failed", errorMsg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-6 transition-colors duration-300">
//       <div className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl">

//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
//             WanderAI-তে লগইন করুন আপনার পরবর্তী ভ্রমণের জন্য।
//           </p>
//         </div>

//         {/* ফর্ম */}
//         <form className="mt-8 space-y-4" onSubmit={handleLogin}>
//           <div className="relative">
//             <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
//             <input
//               name="email"
//               type="email"
//               onChange={handleChange}
//               placeholder="Email Address"
//               required
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//             />
//           </div>
//           <div className="relative">
//             <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
//             <input
//               name="password"
//               type="password"
//               onChange={handleChange}
//               placeholder="Password"
//               required
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${loading ? 'bg-slate-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-xl shadow-lg transition duration-300`}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-700"></span></div>
//           <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 dark:bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-black dark:text-white">
//             <Chrome size={18} /> Google
//           </button>
//           <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-black dark:text-white">
//             <Github size={18} /> GitHub
//           </button>
//         </div>

//         <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
//           No Account <Link href="/auth/register" className="text-blue-600 font-semibold">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Github,
  Chrome,
  ArrowRight,
  Loader2,
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { showAlert, toast } from "../../lib/alerts";
import axiosInstance from "../../lib/axiosInstance";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast("Please enter your credentials", "warning");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/users/login", formData);
      if (response.data.success) {
        login(response.data.token, response.data.data);
        toast("Welcome back to WanderAI", "success");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Authentication failed";
      showAlert("Error", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Demo Login Handler with Automatic Submission
  const handleDemoLogin = async (role: "user" | "admin") => {
    const creds =
      role === "admin"
        ? { email: "mika@gmail.com", password: "123456" }
        : { email: "liza@gmail.com", password: "123456" };

    // ১. প্রথমে ইনপুট স্টেট আপডেট করুন (ভিজুয়াল ফিডব্যাক এর জন্য)
    setFormData(creds);

    try {
      setLoading(true);
      toast(`Logging in as ${role}...`, "info");

      // ২. সরাসরি এপিআই কল করুন (স্টেট আপডেট হওয়ার অপেক্ষা না করেই)
      const response = await axiosInstance.post("/users/login", creds);

      if (response.data.success) {
        login(response.data.token, response.data.data);
        toast(`Logged in as ${role} successfully!`, "success");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Demo login failed";
      showAlert("Demo Error", errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-6 py-10 transition-all">
      <div className="w-full max-w-md border border-slate-100 dark:border-slate-900 rounded-3xl p-8 shadow-sm bg-slate-50/30 dark:bg-slate-900/20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sign In
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Access your WanderAI account
          </p>
        </div>

        {/* Demo Badges */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => handleDemoLogin("user")}
            className="text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800/50 hover:bg-blue-600 hover:text-white transition-all"
          >
            <User size={12} /> User Demo
          </button>
          <button
            onClick={() => handleDemoLogin("admin")}
            className="text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700 hover:bg-slate-900 hover:text-white transition-all"
          >
            <Shield size={12} /> Admin Demo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className={`w-full relative py-4 flex items-center justify-center gap-2 rounded-2xl font-bold text-white transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] overflow-hidden group ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-800"
            }`}
          >
            {/* মাউস নিলে ভেতর দিয়ে একটা হালকা শাইন স্লাইড করবে */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="tracking-wide">Sign In</span>
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
