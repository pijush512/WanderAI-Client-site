"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, Sparkles, MessageSquare, Globe, Linkedin, Twitter } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Mimicking API Call
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1500);
  };

  return (
    <section className="relative min-h-screen py-32 bg-white dark:bg-[#020617] transition-all duration-500 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mt-64"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -mr-32 -mb-32"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left Column: Info & Content */}
          <div className="space-y-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg mb-8">
                <Sparkles size={14} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Connect With Us</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-[ -0.05em] leading-[0.85] mb-8">
                Let&apos;s Build Your <br /> <span className="text-blue-600 italic">Next Adventure.</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
                Have questions about our AI-driven itineraries? Our team is ready to help you navigate the future of travel.
              </p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:border-blue-500/50 transition-all mb-4">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                <p className="text-sm font-bold dark:text-white">support@wanderai.com</p>
              </div>

              <div className="group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:border-blue-500/50 transition-all mb-4">
                  <Globe className="text-blue-600" size={20} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global HQ</p>
                <p className="text-sm font-bold dark:text-white">Tangail, Dhaka Division</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">Follow Us</p>
              <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl hover:text-blue-600 transition-colors"><Twitter size={18} /></button>
              <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl hover:text-blue-600 transition-colors"><Linkedin size={18} /></button>
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="relative group">
            {/* Background Glow behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3.1rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-2xl">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Message Received!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[250px]">
                    We&apos;ve successfully captured your message. Our team will reach out within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <MessageSquare size={18} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Drop us a line</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        required 
                        type="text" 
                        placeholder="FULL NAME" 
                        className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all" 
                      />
                      <input 
                        required 
                        type="email" 
                        placeholder="EMAIL ADDRESS" 
                        className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all" 
                      />
                    </div>
                    <div className="relative">
                      <textarea 
                        required 
                        placeholder="HOW CAN WE HELP YOU?" 
                        rows={5} 
                        className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all"
                      ></textarea>
                    </div>
                    
                    <button 
                      disabled={submitting} 
                      className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-blue-500/10"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">Processing <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div></span>
                      ) : (
                        <>Transmit Message <Send size={14} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}