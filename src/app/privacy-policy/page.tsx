"use client";

import React from "react";
import { ShieldCheck, Lock, Eye, FileText, Globe, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-6">
            <ShieldCheck className="text-blue-600" size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Trust & Safety</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-12 text-slate-700 dark:text-slate-300">
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Globe size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Introduction</h2>
            </div>
            <p className="leading-relaxed pl-14">
              At <strong>WanderAI</strong>, we value your trust above all else. This Privacy Policy explains how we collect, use, and protect your information when you use our AI-powered travel planning services. By using our platform, you agree to the practices described here.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FileText size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Information We Collect</h2>
            </div>
            <div className="pl-14 space-y-4">
              <p>We collect information to provide a better experience, including:</p>
              <ul className="list-disc space-y-2 pl-5 opacity-90">
                <li><strong>Personal Identifiers:</strong> Name, email address, and profile information when you register.</li>
                <li><strong>Travel Preferences:</strong> Destinations, budget, and interests provided for AI itinerary generation.</li>
                <li><strong>Usage Data:</strong> How you interact with our AI tools, search history, and technical log data.</li>
                <li><strong>Location Data:</strong> With your permission, we use location data to suggest nearby attractions.</li>
              </ul>
            </div>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Eye size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">How We Use Your Data</h2>
            </div>
            <p className="leading-relaxed pl-14">
              Your data is primarily used to train our AI models specifically for your needs, creating personalized travel plans, improving our algorithms, and sending important updates regarding your account or bookings.
            </p>
          </section>
          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Data Security</h2>
            </div>
            <p className="leading-relaxed pl-14">
              We implement industry-standard encryption and security protocols to ensure your data stays private. We do not sell your personal data to third parties for marketing purposes.
            </p>
          </section>

          <section className="group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Bell size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Policy Updates</h2>
            </div>
            <p className="leading-relaxed pl-14">
              We may update this policy from time to time to reflect changes in our AI technology or legal requirements. We will notify you of any significant changes via email or platform notifications.
            </p>
          </section>

        </div>
        <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
          <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2">Have Questions?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Our privacy team is here to help you understand your rights.</p>
          <a 
            href="mailto:support@wanderai.com" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all active:scale-95"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;