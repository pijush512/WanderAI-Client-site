// "use client";

// import React, { useState } from "react";
// import { 
//   Sparkles, MapPin, Loader2, CheckCircle2, 
//   Info, ArrowLeft, Navigation, Compass, Timer, Wallet,
//   CalendarDays, ExternalLink, Map
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "../app/lib/alerts";

// export default function AIPromptBox() {
//   const [prompt, setPrompt] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [generatedPlan, setGeneratedPlan] = useState<any>(null);

//   const handleAISearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     setGeneratedPlan(null);
    
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ai/generate-trip`, {
//         destination: prompt,
//         days: 3, 
//         travelers: 1,
//         budget: "moderate"
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });

//       if (response.data.success) {
//         setGeneratedPlan(response.data.data);
//         toast("Your adventure is ready!", "success");
//       }
//     } catch (error: any) {
//       toast(error.response?.data?.message || "Please login to use AI Planner", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBack = () => {
//     setGeneratedPlan(null);
//     setPrompt("");
//   };

//   return (
//     <section className="relative py-28 px-6 overflow-hidden min-h-screen flex items-center bg-white dark:bg-[#020617]">
//       {/* Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
//       </div>

//       <div className="max-w-6xl mx-auto w-full relative z-10">
//         {!generatedPlan ? (
//           /* --- Input UI with Enhanced Typography --- */
//           <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-8">
//               <Sparkles className="text-blue-600" size={16} />
//               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">AI Engine V3.0</span>
//             </div>
            
//             <h2 className="text-5xl md:text-8xl font-black mb-8 text-slate-900 dark:text-white leading-[0.85] tracking-tighter uppercase">
//               Plan your trip <br />
//               <span className="text-blue-600">in seconds.</span>
//             </h2>

//             <form onSubmit={handleAISearch} className="relative mt-12 group max-w-3xl mx-auto">
//               <div className={`relative flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 border-2 p-2 rounded-[2.5rem] transition-all duration-500 shadow-2xl ${isLoading ? 'border-blue-600 ring-4 ring-blue-600/10 scale-[0.98]' : 'border-slate-100 dark:border-slate-800 focus-within:border-blue-500/50 focus-within:shadow-blue-500/10'}`}>
//                 <div className="flex-1 flex items-center w-full px-6 py-4 md:py-0">
//                   <Navigation className={`mr-4 transition-colors ${isLoading ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} size={24} />
//                   <input
//                     type="text"
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     disabled={isLoading}
//                     placeholder="E.g. 5 days in Rome with art focus"
//                     className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white font-bold text-lg md:text-xl placeholder:text-slate-400/50 placeholder:font-medium"
//                   />
//                 </div>
//                 <button 
//                   type="submit"
//                   disabled={isLoading || !prompt.trim()}
//                   className="w-full md:w-auto bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
//                 >
//                   {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Compass size={18} />}
//                   {isLoading ? "Analyzing..." : "Forge Plan"}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
//                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Personalized</span>
//                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Optimized</span>
//                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Instant</span>
//             </div>
//           </div>
//         ) : (
//           /* --- Result UI Refined --- */
//           <div className="animate-in fade-in zoom-in-95 duration-700">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
//               <button 
//                 onClick={handleBack}
//                 className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest hover:border-blue-500 transition-all shadow-sm"
//               >
//                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Search
//               </button>
//               <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
//                 <CheckCircle2 size={16} /> Strategy Confirmed
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-12 gap-8">
//               {/* Sidebar */}
//               <div className="lg:col-span-4 space-y-6">
//                 <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
//                   <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
//                     <Map size={24} />
//                   </div>
//                   <h3 className="text-3xl font-black dark:text-white leading-none uppercase tracking-tighter mb-8">
//                     {generatedPlan.plan.title}
//                   </h3>
                  
//                   <div className="space-y-3">
//                     <DetailItem icon={<Timer size={16} />} label="Duration" value={`${generatedPlan.days} Days`} />
//                     <DetailItem icon={<Wallet size={16} />} label="Budget" value={generatedPlan.budget} />
//                     <div className="mt-6 p-6 rounded-3xl bg-slate-900 text-white">
//                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Estimate</p>
//                        <p className="text-3xl font-black">{generatedPlan.plan.estimated_cost}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
//                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
//                     <Info size={16} /> Traveler's Memo
//                   </h4>
//                   <ul className="space-y-4">
//                     {generatedPlan.plan.travel_tips.map((tip: string, i: number) => (
//                       <li key={i} className="text-sm font-bold leading-relaxed flex gap-3 opacity-90">
//                         <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
//                         {tip}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Main Itinerary */}
//               <div className="lg:col-span-8 space-y-6">
//                 {generatedPlan.plan.itinerary.map((item: any, idx: number) => (
//                   <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
//                     <div className="flex items-center gap-4 mb-8">
//                       <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-900 dark:text-white">
//                         0{item.day}
//                       </div>
//                       <div>
//                         <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter">Day Schedule</h4>
//                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Planned Milestones</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid md:grid-cols-1 gap-3">
//                       {item.activities.map((act: string, i: number) => (
//                         <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-transparent hover:border-blue-500/20 hover:bg-white dark:hover:bg-slate-800 transition-all">
//                           <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
//                             <Compass size={16} />
//                           </div>
//                           <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
//                             {act}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// // Reusable Detail Component
// function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
//   return (
//     <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
//       <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
//         {icon} {label}
//       </div>
//       <span className="font-black dark:text-white text-sm capitalize">{value}</span>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { 
  Sparkles, MapPin, Loader2, CheckCircle2, 
  Info, ArrowLeft, Navigation, Compass, Timer, Wallet,
  CalendarDays, ExternalLink, Map
} from "lucide-react";
import axios from "axios";
import { toast } from "../app/lib/alerts";

export default function AIPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedPlan(null);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ai/generate-trip`, {
        destination: prompt,
        days: 3, 
        travelers: 1,
        budget: "moderate"
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data.success) {
        setGeneratedPlan(response.data.data);
        toast("Your adventure is ready!", "success");
      }
    } catch (error: any) {
      toast(error.response?.data?.message || "Please login to use AI Planner", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setGeneratedPlan(null);
    setPrompt("");
  };

  return (
    // ১. হাইট min-h-screen থেকে কমিয়ে min-h-[70vh] এবং প্যাডিং কমানো হয়েছে
    <section className="relative py-16 px-6 overflow-hidden min-h-[70vh] flex items-center bg-white dark:bg-[#020617]">
      {/* Background Orbs - Slightly smaller for compact look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {!generatedPlan ? (
          /* --- Input UI --- */
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="ai-planner" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-6">
              <Sparkles className="text-blue-600" size={14} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">AI Engine V3.0</span>
            </div>
            
            {/* ২. টেক্সট সাইজ ৮xl থেকে কমিয়ে ৬xl করা হয়েছে */}
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
              Plan your trip <br />
              <span className="text-blue-600">in seconds.</span>
            </h2>

            <form onSubmit={handleAISearch} className="relative mt-8 group max-w-2xl mx-auto">
              <div className={`relative flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 border-2 p-1.5 rounded-[2rem] transition-all duration-500 shadow-xl ${isLoading ? 'border-blue-600 ring-2 ring-blue-600/10' : 'border-slate-100 dark:border-slate-800 focus-within:border-blue-500/50'}`}>
                <div className="flex-1 flex items-center w-full px-5 py-3 md:py-0">
                  <Navigation className={`mr-3 ${isLoading ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} size={20} />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    placeholder="E.g. 5 days in Rome with art focus"
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white font-bold text-base md:text-lg placeholder:text-slate-400/50"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full md:w-auto bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Compass size={16} />}
                  {isLoading ? "Analyzing..." : "Forge Plan"}
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 font-bold text-[9px] uppercase tracking-[0.15em]">
               <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Personalized</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Optimized</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Instant</span>
            </div>
          </div>
        ) : (
          /* --- Result UI (Itinerary) --- */
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* রেজাল্ট সেকশনেও গ্যাপ কমানো হয়েছে */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <button 
                onClick={handleBack}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-black text-[9px] uppercase tracking-widest hover:border-blue-500 transition-all shadow-sm"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-black text-[9px] uppercase tracking-widest">
                <CheckCircle2 size={14} /> Plan Ready
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                    <Map size={20} />
                  </div>
                  <h3 className="text-2xl font-black dark:text-white leading-tight uppercase tracking-tighter mb-6">
                    {generatedPlan.plan.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <DetailItem icon={<Timer size={14} />} label="Duration" value={`${generatedPlan.days} Days`} />
                    <DetailItem icon={<Wallet size={14} />} label="Budget" value={generatedPlan.budget} />
                    <div className="mt-4 p-5 rounded-2xl bg-slate-900 text-white">
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Estimate</p>
                       <p className="text-2xl font-black">{generatedPlan.plan.estimated_cost}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[2rem] p-6 text-white">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                    <Info size={14} /> Memo
                  </h4>
                  <ul className="space-y-3">
                    {generatedPlan.plan.travel_tips.slice(0, 3).map((tip: string, i: number) => (
                      <li key={i} className="text-[13px] font-bold leading-snug flex gap-2 opacity-90">
                        <div className="w-1 h-1 rounded-full bg-white mt-1.5 shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Itinerary */}
              <div className="lg:col-span-8 space-y-4">
                {generatedPlan.plan.itinerary.map((item: any, idx: number) => (
                  <div key={idx} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-900 dark:text-white text-sm">
                        0{item.day}
                      </div>
                      <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter">Day Schedule</h4>
                    </div>
                    
                    <div className="grid gap-2">
                      {item.activities.map((act: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-transparent">
                          <Compass size={14} className="text-blue-600" />
                          <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                            {act}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Reusable Detail Component (Adjusted Padding)
function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
      <div className="flex items-center gap-2 text-slate-400 font-black text-[9px] uppercase tracking-widest">
        {icon} {label}
      </div>
      <span className="font-black dark:text-white text-xs capitalize">{value}</span>
    </div>
  );
}