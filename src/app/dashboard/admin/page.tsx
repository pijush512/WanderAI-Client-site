"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, Globe, Zap, Activity, 
  BarChart3, MapPin, ShieldCheck, Clock, 
  ArrowUpRight, RefreshCcw
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

interface DashboardStats {
  totalUsers: number;
  totalTrips: number;
  activeRegions: number;
  serverStatus: string;
  chartData: { name: string; trips: number }[];
  recentLogs: any[];
}

export default function AdminOverview() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      
      const response = await fetch(`${baseUrl}/api/v1/ai/admin-stats`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();
      if (result.success) setData(result.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-indigo-500/20 rounded-full"></div>
        <div className="w-20 h-20 border-t-2 border-indigo-600 rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 font-black text-slate-400 tracking-[0.3em] uppercase text-[10px] animate-pulse">
        Initializing Command Center
      </p>
    </div>
  );

  const statsCards = [
    { label: "Total Explorers", value: data?.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100/50", border: "border-blue-200" },
    { label: "AI Trip Gen", value: data?.totalTrips || 0, icon: Zap, color: "text-amber-500", bg: "bg-amber-100/50", border: "border-amber-200" },
    { label: "Active Regions", value: `${data?.activeRegions || 0} Cities`, icon: Globe, color: "text-emerald-500", bg: "bg-emerald-100/50", border: "border-emerald-200" },
    { label: "System Health", value: data?.serverStatus || "Operational", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-100/50", border: "border-indigo-200" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 bg-slate-50/50 dark:bg-slate-950 min-h-screen animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-8 bg-indigo-600 rounded-full"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Admin Control</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Command <span className="text-indigo-600 not-italic">Center</span>
          </h2>
        </div>
        
        <button 
          onClick={fetchDashboardData}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
        >
          <RefreshCcw size={14} /> Refresh Intelligence
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border ${stat.border} dark:border-slate-800 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform`}></div>            
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className={`p-4 rounded-2xl ${stat.bg} dark:bg-slate-800 ${stat.color} ring-1 ring-inset ${stat.border}`}>
                  <stat.icon size={22} />
               </div>
               <div className="flex flex-col items-end">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <ArrowUpRight size={16} className="text-slate-300 mt-2" />
               </div>
            </div>
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">{stat.label}</p>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tighter truncate break-words relative z-10">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart3 size={120} />
            </div>
            
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-[11px] font-black dark:text-white uppercase tracking-[0.25em] flex items-center gap-3">
                <span className="p-2 bg-indigo-600 rounded-lg"><Zap size={14} className="text-white" /></span>
                Usage Propagation
              </h4>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-tighter italic">Last 7 Days</div>
              </div>
            </div>
            
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.chartData || []}>
                  <defs>
                    <linearGradient id="neuralGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: '900', fill: '#64748b'}} 
                    dy={15}
                  />
                  <YAxis hide />
                  <Tooltip 
                     cursor={{ stroke: '#4f46e5', strokeWidth: 1, strokeDasharray: '5 5' }}
                     contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px' }}
                  />
                  <Area 
                    type="step" 
                    dataKey="trips" 
                    stroke="#4f46e5" 
                    strokeWidth={4} 
                    fill="url(#neuralGradient)" 
                    animationDuration={2500}
                    dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-slate-900 dark:bg-black rounded-[3rem] p-8 text-white relative overflow-hidden flex flex-col shadow-2xl border border-slate-800">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>           
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] mb-10 flex items-center gap-3 relative z-10 text-indigo-400">
              <Clock size={18} className="animate-pulse" /> Live Telemetry
            </h4>
            
            <div className="space-y-4 flex-1 z-10 overflow-y-auto max-h-[380px] custom-scrollbar pr-2">
              {data?.recentLogs && data.recentLogs.length > 0 ? (
                data.recentLogs.map((log, i) => (
                  <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all group backdrop-blur-sm">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-sm shrink-0 shadow-lg group-hover:rotate-6 transition-transform overflow-hidden">
                        {log.user?.image ? (
                          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/${log.user.image}`} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <span className="text-white">{log.user?.name?.charAt(0)}</span>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <p className="text-xs leading-tight font-black tracking-tight">
                        <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors uppercase italic">{log.user?.name || "User"}</span> 
                        <span className="opacity-40 font-medium px-2 italic">deployed to</span> 
                        <span className="text-white uppercase tracking-tighter">{log.destination}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">
                          {log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just Now"}
                        </span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-30 italic">
                   <div className="w-16 h-16 border border-dashed border-slate-500 rounded-full flex items-center justify-center animate-spin-slow">
                     <Globe size={24} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Neural Link...</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 z-10">
              <div className="flex justify-between items-center text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                <span>Buffer Status: Stable</span>
                <span className="text-emerald-500">Encrypted</span>
              </div>
            </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.4);
          border-radius: 10px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}