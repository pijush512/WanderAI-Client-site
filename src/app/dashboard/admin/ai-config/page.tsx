"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, Bot, Zap, Shield, Save, 
  RefreshCcw, Cpu, Database, Server, CheckCircle
} from "lucide-react";
import axiosInstance from "@/src/app/lib/axiosInstance";
import { showAlert } from "@/src/app/lib/alerts";

export default function AIConfigPage() {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    modelName: "llama-3.1-8b-instant",
    temperature: 0.7,
    maxTokens: 2048,
    systemStatus: "Active",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // এখানে আপনি চাইলে একটি নতুন API এন্ডপয়েন্ট বানাতে পারেন সেটিংস সেভ করার জন্য
      // আপাতত আমি একটি সাকসেস এলার্ট দিচ্ছি
      setTimeout(() => {
        showAlert("AI Configuration Updated Successfully", "success");
        setLoading(false);
      }, 1000);
    } catch (error) {
      showAlert("Failed to update config", "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            AI <span className="text-blue-600">Engine</span> Config
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Global LLM & Inference Settings
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
        >
          {loading ? <RefreshCcw className="animate-spin" size={14}/> : <Save size={14}/>}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
              <Bot className="text-blue-600" size={20} />
              <h3 className="font-black uppercase text-sm tracking-tight">Model Parameters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Primary Model</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-xs font-bold focus:ring-2 focus:ring-blue-500"
                  value={config.modelName}
                  onChange={(e) => setConfig({...config, modelName: e.target.value})}
                >
                  <option value="llama-3.1-8b-instant">Llama 3.1 8B (Fast)</option>
                  <option value="llama-3.1-70b-versatile">Llama 3.1 70B (Pro)</option>
                  <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Creativity (Temperature)</label>
                <input 
                  type="range" min="0" max="1" step="0.1"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={config.temperature}
                  onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Precise (0)</span>
                  <span>{config.temperature}</span>
                  <span>Creative (1)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Access */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-400" size={20} />
                <h3 className="font-black uppercase text-sm tracking-tight">Access Control</h3>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Limit AI generation per user to prevent API credit exhaustion.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/10 text-[10px] font-black uppercase">
                  Current Limit: 20/Day
                </div>
                <button className="text-[10px] font-black text-blue-400 uppercase hover:underline">Edit Limits</button>
              </div>
            </div>
            <Zap size={150} className="absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Mini Status Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-6 text-center">Inference Status</h3>
            <div className="space-y-6">
              {[
                { label: "API Gateway", icon: Server, status: "Connected", color: "text-emerald-500" },
                { label: "Database", icon: Database, status: "Syncing", color: "text-blue-500" },
                { label: "Groq Cloud", icon: Cpu, status: "Active", color: "text-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-slate-400" />
                    <span className="text-xs font-bold dark:text-white">{item.label}</span>
                  </div>
                  <CheckCircle size={14} className={item.color} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800">
             <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase leading-relaxed text-center">
               Note: Changes to the AI model might affect generation speed and quality for all users.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}