"use client";

import React from "react";
import { Cookie, Info, Settings, ShieldCheck, Database, MousePointer2 } from "lucide-react";

const CookiePolicy = () => {
  const lastUpdated = "March 28, 2026";

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-6">
            <Cookie className="text-blue-600" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Digital Footprint</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
            Cookie <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <div className="space-y-12 text-slate-700 dark:text-slate-300">
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">What are Cookies?</h2>
            </div>
            <p className="leading-relaxed pl-14">
              Cookies are small text files stored on your device that help <strong>WanderAI</strong> remember your preferences. They allow us to recognize you when you return and provide a seamless AI-driven experience.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Database size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Types of Cookies</h2>
            </div>
            
            <div className="pl-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h3 className="font-black uppercase tracking-tighter text-blue-600 mb-2">Essential</h3>
                <p className="text-sm opacity-80">Necessary for the website to function. These allow you to log in and access secure areas.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h3 className="font-black uppercase tracking-tighter text-blue-600 mb-2">Performance</h3>
                <p className="text-sm opacity-80">Help us understand how visitors interact with our AI tools so we can improve the UI/UX.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h3 className="font-black uppercase tracking-tighter text-blue-600 mb-2">Preference</h3>
                <p className="text-sm opacity-80">Remember your language settings, dark/light mode, and recent travel searches.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h3 className="font-black uppercase tracking-tighter text-blue-600 mb-2">Analytics</h3>
                <p className="text-sm opacity-80">Anonymously collect data on popular destinations and tool usage patterns.</p>
              </div>
            </div>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Settings size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Your Control</h2>
            </div>
            <p className="leading-relaxed pl-14">
              Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to your travel style.
            </p>
          </section>
          <section className="group border-t border-slate-100 dark:border-slate-800 pt-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <ShieldCheck size={32} className="text-blue-600" />
              <p className="max-w-md mx-auto italic text-sm opacity-70">
                This Cookie Policy is part of our comprehensive Privacy commitment. We never use cookies to track your sensitive personal data.
              </p>
            </div>
          </section>

        </div>
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-[10px]">
            <MousePointer2 size={14} />
            Adjust Preferences
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Always Respecting Your Choice
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;