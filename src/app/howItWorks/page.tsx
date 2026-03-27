"use client";

import React from "react";
import { Search, Brain, Rocket, ArrowRight, Sparkles, MapPin, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    { 
      title: "Define Your Vision", 
      desc: "Input your dream destination and preferred budget. Our intuitive interface captures every detail of your travel aspirations.", 
      icon: Search,
    },
    { 
      title: "AI Optimization", 
      desc: "The Groq-powered engine analyzes millions of data points to curate the most efficient routes and hidden gems just for you.", 
      icon: Brain,
    },
    { 
      title: "Launch Journey", 
      desc: "Save your personalized itinerary and embark on your adventure with real-time AI guidance at your fingertips.", 
      icon: Rocket,
    },
  ];

  const features = [
    { title: "Real-time Data", desc: "Live updates on weather, traffic, and local events.", icon: Zap },
    { title: "Global Coverage", desc: "Access to thousands of cities across all continents.", icon: Globe },
    { title: "Secure Planning", desc: "Your data and travel documents are encrypted & safe.", icon: ShieldCheck },
    { title: "Smart Routes", desc: "Optimized paths to save you time and travel costs.", icon: MapPin },
  ];

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#020617] transition-all duration-500 overflow-hidden">
      
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* --- Header Section --- */}
        <div className="max-w-4xl mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg mb-8">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">The Process</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.85] mb-8">
            The Science of <br /> <span className="text-blue-600 italic">Seamless</span> Travel.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
            We’ve simplified complex logistics into a three-step intuitive workflow. Powered by next-gen AI, WanderAI turns your travel ideas into actionable plans in seconds.
          </p>
        </div>

        {/* --- Main 3-Step Process --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative mb-48">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-[1px] bg-slate-100 dark:bg-slate-800 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col group z-10">
              <div className="relative w-24 h-24 mb-10 transition-all duration-500">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-full h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-500/50 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <step.icon size={36} strokeWidth={1.5} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-[10px] font-black border-4 border-white dark:border-[#020617]">
                    0{i+1}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                "{step.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* --- AI Integration Banner --- */}
        <div className="bg-slate-900 dark:bg-slate-900/50 rounded-[3rem] p-12 md:p-20 mb-48 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                Powered by <br /> <span className="text-blue-500 font-serif italic lowercase text-6xl">Groq Intelligence.</span>
              </h2>
              <p className="text-slate-400 font-medium mb-10">
                Our engine processes real-time geographical data and user preferences using low-latency AI models. This ensures your itinerary isn't just a list, but a smart schedule optimized for time, energy, and cost.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Low Latency</div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Neural Mapping</div>
              </div>
            </div>
            <div className="relative h-64 bg-blue-600/10 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
               <div className="animate-pulse flex flex-col items-center">
                  <Brain size={80} className="text-blue-500 mb-4 opacity-50" />
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- Why WanderAI Grid --- */}
        <div className="mb-48">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Core Strengths</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Engineered for Excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-3xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                <feature.icon className="text-blue-600 mb-6" size={24} />
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase mb-2">{feature.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Final CTA Section --- */}
        <div className="relative bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
              Start your <span className="text-blue-200 italic">Smart</span> <br /> journey today.
            </h2>
            <Link 
              href="/auth/register" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-100 transition-all shadow-xl active:scale-95"
            >
              Get Started Now <ArrowRight size={16} />
            </Link>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -ml-32 -mt-32"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -mr-32 -mb-32"></div>
        </div>
      </div>
    </section>
  );
}