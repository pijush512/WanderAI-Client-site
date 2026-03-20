"use client";

import Link from "next/link";
import { Mail, Lock, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl">
        
        {/* লোগো ও হেডার */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            WanderAI-তে লগইন করুন আপনার পরবর্তী ভ্রমণের জন্য।
          </p>
        </div>

        {/* ইনপুট ফর্ম */}
        <form className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300">
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-700"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 dark:bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
        </div>

        {/* সোশ্যাল লগইন */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Chrome size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Github size={18} /> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          No Account <Link href="/auth/register" className="text-blue-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}