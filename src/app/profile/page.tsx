"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Mail, Shield, MapPin, Calendar, 
  Edit3, Camera, X, Loader2, Plane, Star, 
  Map, Sparkles, Award, Globe, Zap, BarChart3,
  TrendingUp, ShieldCheck, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import axiosInstance from "../lib/axiosInstance";
import { showAlert } from "../lib/alerts";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import axios from "axios";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  AreaChart, Area 
} from 'recharts';

export default function ProfilePage() {
  const { user, token, login, loading } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user) {
      setName(user.name);
      fetchProfileData();
    }
  }, [user, token]);

  const fetchProfileData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [tripRes, reviewRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ai/my-trips`, config),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ai/my-reviews`, config)
      ]);
      setTrips(tripRes.data.data || []);
      setReviews(reviewRes.data.data || []);
    } catch (err) { console.error("Data fetch error"); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (selectedFile) formData.append("image", selectedFile);
      const response = await axiosInstance.patch("/users/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        login(token!, response.data.data);
        showAlert("Updated!", "Identity refreshed successfully.", "success");
        setIsEditModalOpen(false);
      }
    } catch (error: any) { showAlert("Error", "Update failed", "error"); }
    finally { setIsLoading(false); }
  };

  const budgetData = [
    { name: 'Luxury', value: trips.length || 1 },
    { name: 'Budget', value: reviews.length || 2 },
    { name: 'Mid', value: 1 },
  ];
  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pt-24 pb-20 selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* --- Hero Header Section --- */}
        <div className="relative group overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent dark:from-indigo-900/10 pointer-events-none" />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-44 h-44 rounded-full p-1.5 bg-white dark:bg-slate-800 shadow-2xl">
                <img
                  src={user?.image ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}` : "https://api.dicebear.com/7.x/avataaars/svg?seed=Pijush"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow text-center md:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                  <Zap size={14} fill="currentColor" /> Pro Explorer
                </div>
                {/* Admin Status - Static, Non-Clickable */}
                {isAdmin && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> System Admin
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {user?.name}<span className="text-indigo-600">.</span>
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-2 text-sm"><MapPin size={16} className="text-indigo-500" /> Digital Nomad</span>
                <span className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-indigo-500" /> Member since 2026</span>
              </div>
            </div>

            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="group/btn relative px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Edit3 size={16} /> Edit Identity
              </span>
              <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* --- Bento Grid Analytics --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center justify-between">Vitals Overview <BarChart3 size={16} /></h3>
              <div className="space-y-8">
                {[
                  { label: "Voyages", value: trips.length, icon: Plane, color: "bg-blue-50 text-blue-600" },
                  { label: "Reviews", value: reviews.length, icon: Star, color: "bg-amber-50 text-amber-600" },
                  { label: "Status", value: isAdmin ? "Admin" : "User", icon: Shield, color: "bg-emerald-50 text-emerald-600" }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between group/stat">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${s.color}`}><s.icon size={20}/></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{s.label}</span>
                    </div>
                    <span className="text-2xl font-black dark:text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="p-3 bg-white/20 w-fit rounded-xl backdrop-blur-md"><Award size={24} /></div>
                <h4 className="text-xl font-bold">Master Wanderer</h4>
                <div className="h-2 bg-indigo-900/30 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white rounded-full"></div>
                </div>
              </div>
              <Sparkles className="absolute top-4 right-4 text-white/20 animate-pulse" />
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Activity Mix</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={budgetData} innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value">
                      {budgetData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Engagement History</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{n:'J',t:1},{n:'F',t:4},{n:'M',t:trips.length || 2},{n:'A',t:3}]}>
                    <Area type="monotone" dataKey="t" stroke="#6366f1" strokeWidth={4} fill="rgba(99, 102, 241, 0.1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl"><Mail className="text-indigo-500" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Universal Mail</p>
                  <p className="text-lg font-bold dark:text-white">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl"><Shield className="text-indigo-500" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Privilege</p>
                  <p className="text-lg font-bold dark:text-white uppercase">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Simple Identity Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden p-10 relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-400"><X size={20}/></button>
            <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-8">Update Info</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6 text-center">
              <div className="relative group w-32 h-32 mx-auto">
                <div className="w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden shadow-lg bg-slate-100">
                  <img src={previewUrl || (user?.image ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}` : "https://api.dicebear.com/7.x/avataaars/svg?seed=Pijush")} className="w-full h-full object-cover" />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-all"><Camera size={24} /><input type="file" className="hidden" accept="image/*" onChange={handleFileChange} /></label>
              </div>

              <div className="text-left space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-indigo-500/30 transition-all font-bold dark:text-white" required />
              </div>

              <button disabled={isLoading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 transition-transform active:scale-95">
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}