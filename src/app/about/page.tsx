"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, Users, Target, ShieldCheck, Globe, Zap, Heart, ArrowRight } from "lucide-react";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import Link from "next/link";

export default function AboutPage() {
  const [stats, setStats] = useState({ users: 0, trips: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const response = await axios.get(`${apiUrl}/ai/admin-stats`);
        if (response.data.success) {
          setStats({
            users: response.data.data.totalUsers || 1200, // ফলব্যাক ভ্যালু যদি API না থাকে
            trips: response.data.data.totalTrips || 850
          });
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <SkeletonLoader />;

  return (
    <section className="min-h-screen bg-white dark:bg-[#020617] transition-all duration-500 overflow-hidden">
      
      {/* --- Hero Section --- */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg mb-8 animate-fade-in">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Our Story</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] mb-10">
                Beyond <span className="text-blue-600 italic">Ordinary</span> <br /> Journeys.
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg font-medium leading-relaxed">
                WanderAI isn&apos;t just a travel planner. We are a team of explorers and engineers redefining how humans discover the world through the power of artificial intelligence.
              </p>
            </div>
            
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] transform hover:-translate-y-2 transition-transform duration-500">
                <Users className="text-blue-600 mb-4" size={28} />
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.users}+</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-1">Explorers</p>
              </div>
              <div className="p-8 bg-blue-600 rounded-[2.5rem] transform translate-y-8 hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-blue-500/20">
                <Target className="text-white mb-4" size={28} />
                <h3 className="text-3xl font-black text-white">{stats.trips}+</h3>
                <p className="text-blue-100 font-bold text-[9px] uppercase tracking-widest mt-1">AI Plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Vision Section*/}
      <div className="py-24 bg-slate-900 dark:bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -mr-64 -mt-64"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
              Our Vision is to make <span className="text-blue-500">World-Class</span> Travel accessible to everyone, everywhere.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 font-medium">
              <p>
                We started with a simple question: Why is travel planning so stressful? In a world of infinite choices, WanderAI filters the noise to bring you experiences that truly matter.
              </p>
              <p>
                By blending real-time data with personalized AI, we ensure every trip you take is optimized for joy, safety, and discovery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Features / Values Section --- */}
      <div className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Core Values</h2>
          <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">What Drives Us Forward</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
              <Zap className="text-blue-600 group-hover:text-white transition-colors" size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">Hyper-Personalization</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              No two travelers are alike. Our AI learns your preferences to curate trips that reflect your unique personality.
            </p>
          </div>

          <div className="group">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
              <Globe className="text-blue-600 group-hover:text-white transition-colors" size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">Global Accessibility</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              From the hidden streets of Tangail to the skyscrapers of Tokyo, we bring the world&apos;s best destinations to your fingertips.
            </p>
          </div>

          <div className="group">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
              <Heart className="text-blue-600 group-hover:text-white transition-colors" size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">Human Centric</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Technology is our tool, but humans are our focus. We prioritize safety, ethics, and sustainability in every plan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 overflow-hidden text-center shadow-2xl shadow-blue-500/30">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              Ready to write your <br /> next chapter?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/auth/register" 
                className="px-8 py-4 bg-white text-blue-600 font-black uppercase text-xs tracking-widest rounded-full hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                Join WanderAI <ArrowRight size={16} />
              </Link>
              <Link 
                href="/events" 
                className="px-8 py-4 bg-blue-700/30 border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-blue-700/50 transition-all"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -ml-32 -mt-32"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -mr-32 -mb-32"></div>
        </div>
      </div>

    </section>
  );
}