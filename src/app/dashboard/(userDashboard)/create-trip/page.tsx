"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  Send,
  MapPin,
  Calendar,
  Wallet,
  Users,
} from "lucide-react";
import { showAlert, toast } from "@/src/app/lib/alerts";

export default function CreateTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "Mid-range",
    travelers: "1",
  });

  // AI genarate function
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.days) {
      toast("Please provide destination and duration!", "warning");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://wander-ai-server-site.vercel.app/api/v1/ai/generate-trip",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        showAlert(
          "Success!",
          "AI has successfully crafted your journey.",
          "success",
        );
        const tripId = response.data.data._id;
        router.push(`/dashboard/my-trips/${tripId}`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "AI is currently busy. Try again!";
      toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
          <Sparkles size={14} /> AI Powered Travel Planner
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
          Where do you want to <span className="text-blue-600">wander?</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          Just give us some clues, and our AI will build a personalized
          itinerary for you.
        </p>
      </div>

      <form
        onSubmit={handleGenerate}
        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 space-y-10"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
              <MapPin size={14} className="text-blue-500" /> Destination
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Paris, Tokyo, Cox's Bazar"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-[1.5rem] focus:ring-2 ring-blue-500 outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
              <Calendar size={14} className="text-emerald-500" /> Duration
              (Days)
            </label>
            <input
              type="number"
              required
              min="1"
              max="30"
              placeholder="How many days?"
              value={formData.days}
              onChange={(e) =>
                setFormData({ ...formData, days: e.target.value })
              }
              className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-[1.5rem] focus:ring-2 ring-blue-500 outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
              <Wallet size={14} className="text-purple-500" /> Budget Level
            </label>
            <select
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-[1.5rem] focus:ring-2 ring-blue-500 outline-none font-bold text-slate-700 dark:text-white appearance-none cursor-pointer"
            >
              <option value="Budget">Cheap / Budget-Friendly</option>
              <option value="Mid-range">Standard / Mid-range</option>
              <option value="Luxury">Luxury / High-end</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-2">
              <Users size={14} className="text-orange-500" /> Travelers
            </label>
            <input
              type="number"
              min="1"
              value={formData.travelers}
              onChange={(e) =>
                setFormData({ ...formData, travelers: e.target.value })
              }
              className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-[1.5rem] focus:ring-2 ring-blue-500 outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-6 bg-slate-900 dark:bg-blue-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-xl shadow-blue-500/10"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              AI is Thinking...
            </>
          ) : (
            <>
              Generate My Dream Trip <Send size={20} />
            </>
          )}
        </button>
      </form>
      <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        Powered by Groq AI Engine
      </p>
    </div>
  );
}
