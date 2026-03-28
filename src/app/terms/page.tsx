"use client";

import React from "react";
import { Scale, ShieldAlert, Zap, Ban, RefreshCcw, HeartHandshake } from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "March 28, 2026";

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-6">
            <Scale className="text-blue-600" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
            Terms of <span className="text-blue-600">Service</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">
            Last Updated: {lastUpdated}
          </p>
        </div>
        <div className="space-y-12 text-slate-700 dark:text-slate-300">
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <HeartHandshake size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Agreement</h2>
            </div>
            <p className="leading-relaxed pl-14">
              By accessing or using <strong>WanderAI</strong>, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our AI-powered travel services.
            </p>
          </section>
          <section className="group border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/30 dark:bg-blue-900/10 rounded-r-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Zap size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">AI Predictions & Accuracy</h2>
            </div>
            <p className="leading-relaxed pl-4 text-sm md:text-base italic">
              Our service uses advanced AI models to generate travel plans. While we strive for accuracy, AI results may contain errors or outdated information regarding prices, availability, or local safety. Always verify critical information with primary sources.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-red-500 group-hover:text-white transition-all">
                <Ban size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Prohibited Uses</h2>
            </div>
            <div className="pl-14 space-y-4">
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5 opacity-90">
                <li>Attempt to "jailbreak" or manipulate our AI to produce harmful content.</li>
                <li>Use automated scripts to scrape data from our platform.</li>
                <li>Impersonate others or provide false travel documentation.</li>
              </ul>
            </div>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ShieldAlert size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Limitation of Liability</h2>
            </div>
            <p className="leading-relaxed pl-14">
              WanderAI shall not be liable for any indirect, incidental, or consequential damages resulting from your travel decisions, missed flights, or hotel cancellations based on our AI recommendations. Use the service at your own discretion.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <RefreshCcw size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Modifications</h2>
            </div>
            <p className="leading-relaxed pl-14">
              We reserve the right to modify or discontinue any feature of WanderAI at any time. Your continued use after terms have been updated constitutes acceptance of the new terms.
            </p>
          </section>

        </div>
        <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            By clicking "Accept", you acknowledge that you have read and understood our legal guidelines.
          </p>
          <button 
            className="px-12 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all active:scale-95 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
          >
            I Accept the Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;