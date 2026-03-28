"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
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

  // Demo Login 
  const handleDemoLogin = async (role: "user" | "admin") => {
    const creds =
      role === "admin"
        ? { email: "mika@gmail.com", password: "123456" }
        : { email: "liza@gmail.com", password: "123456" };

    setFormData(creds);

    try {
      setLoading(true);
      toast(`Logging in as ${role}...`, "info");

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
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sign In
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Access your WanderAI account
          </p>
        </div>

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




