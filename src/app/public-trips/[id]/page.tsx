"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, Calendar, Star, Sparkles, Navigation, 
  Wallet, CheckCircle2, ArrowLeft, Lightbulb, MessageSquare, Bug, Users, Info
} from "lucide-react";

export default function PublicTripDetails() {
  const params = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/ai/all-trips`);
        if (response.data.success) {
          const foundTrip = response.data.data.find((t: any) => t._id === params.id);
          setTrip(foundTrip);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchDetails();
  }, [params.id]);

  if (loading) return <DetailsSkeleton />;
  if (!trip) return <div className="py-40 text-center font-black uppercase tracking-widest text-slate-400">Trip Not Found!</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 pb-20 selection:bg-blue-100 selection:text-blue-900">
      <div className="relative h-[70vh] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-indigo-900/60 to-slate-950 z-0" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />
        <button 
          onClick={() => router.back()}
          className="absolute top-10 left-10 z-30 flex items-center gap-2 text-white/50 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Wanderings
        </button>

        <div className="relative z-10 text-center px-6 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
            <Sparkles size={14} /> AI Destination Analysis
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
            {trip.destination}
          </h1>

          <p className="text-white/60 font-medium italic text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to your personalized guide for <span className="text-white font-bold not-italic underline decoration-blue-500 underline-offset-4">{trip.destination}</span>. 
            Our AI has curated a <span className="text-white font-bold">{trip.days}-day</span> adventure optimized for a <span className="text-white font-bold">{trip.budget}</span> budget.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Duration", value: `${trip.days} Days`, icon: <Calendar size={14} /> },
              { label: "Budget", value: trip.budget, icon: <Wallet size={14} /> },
              { label: "Travelers", value: "1 Person", icon: <Users size={14} /> },
              { label: "Trip Rating", value: "4.8 / 5.0", icon: <Star size={14} className="text-yellow-400" /> }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-3xl text-center">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xs font-black text-white uppercase flex items-center justify-center gap-1">
                   {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-8 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-20">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  Itinerary <span className="text-blue-600 font-medium">Overview</span>
                </h2>
                <div className="flex items-center gap-4 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                   <div className="h-[2px] w-12 bg-blue-600" /> Scroll to Read
                </div>
              </div>

              <div className="space-y-12">
                {trip.itinerary?.map((item: any, idx: number) => (
                  <div key={idx} className="group bg-slate-50 dark:bg-slate-800/30 rounded-[3.5rem] p-10 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-200 dark:hover:border-blue-900">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-200/50 dark:border-slate-700 pb-8">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-900 dark:bg-blue-600 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 transition-transform">
                            {item.day}
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Day Planning</h3>
                            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Adventure phase {idx + 1}</p>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Navigation size={12} /> Activities
                        </h4>
                        <ul className="space-y-3">
                          {item.activities?.map((act: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700 dark:text-slate-300 italic">
                               <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" /> {act}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                          <MapPin size={12} /> Target Locations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.locations?.map((loc: string, i: number) => (
                            <span key={i} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase text-slate-500 hover:text-blue-600 transition-colors">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review */}
              <div className="py-20 bg-slate-900 dark:bg-blue-600 rounded-[4rem] text-center px-10 space-y-8 text-white">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Rate Your AI Experience</h2>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={30} className="text-white/20 hover:text-yellow-400 cursor-pointer transition-colors" />)}
                </div>
                <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-black/20">
                  Submit Review
                </button>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Community Insights (0)</p>
                  <p className="text-sm italic opacity-40 uppercase tracking-widest font-bold">No reviews yet. Be the first to share!</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400">Estimated Cost</h4>
                  <Wallet size={18} className="text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                    {trip.estimated_cost || "BDT 15,000"}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Per person average</p>
                </div>
              </div>
              <div className="p-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[3.5rem] shadow-2xl">
                 <h4 className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest mb-8 border-b border-white/10 dark:border-slate-200 pb-4">
                   <Lightbulb className="text-yellow-400" size={16} /> Travel Tips
                 </h4>
                 <div className="space-y-6">
                    {trip.travel_tips?.map((tip: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                         <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</div>
                         <p className="text-xs font-bold leading-relaxed italic opacity-80">{tip}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-8 pt-8">
                 <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-slate-400 flex items-center gap-3">
                   <div className="h-[1px] flex-grow bg-slate-100 dark:bg-slate-800" /> Suggested Next
                 </h4>
                 <div className="grid grid-cols-1 gap-4">
                   {["Tangail", "Sylhet", "Sajek Valley"].map((place, i) => (
                     <div key={i} className="flex items-center gap-5 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-blue-500 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {place[0]}
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{place}</p>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="p-10 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-[3.5rem] space-y-4">
                 <div className="flex items-center gap-3 text-rose-600 font-black uppercase text-[10px] tracking-widest">
                   <Bug size={16} /> Found a bug?
                 </div>
                 <p className="text-[11px] font-bold text-rose-800/60 dark:text-rose-400 leading-relaxed italic">
                   Help us improve the AI by reporting any incorrect routes.
                 </p>
                 <button className="text-[10px] font-black uppercase text-rose-600 hover:text-rose-700 transition-colors">Contact Support &rarr;</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] animate-pulse">
      <div className="h-[70vh] bg-slate-200 dark:bg-slate-800" />
      <div className="max-w-7xl mx-auto px-6 -mt-20">
        <div className="h-screen bg-white dark:bg-slate-900 rounded-[4rem]" />
      </div>
    </div>
  );
}
