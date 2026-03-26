

"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, Globe, Zap, Activity, 
  BarChart3, MapPin, ShieldCheck, Clock
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
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:5000/api/v1/ai/admin-stats", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 tracking-widest uppercase text-xs">Syncing Live Data...</p>
      </div>
    </div>
  );

  const statsCards = [
    { label: "Total Explorers", value: data?.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "AI Trip Gen", value: data?.totalTrips || 0, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Active Regions", value: `${data?.activeRegions || 0} Cities`, icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Server Status", value: data?.serverStatus || "Active", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700">
      
      {/* --- Header --- */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
          Command <span className="text-blue-600 font-black">Center</span>
        </h2>
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck size={14} className="text-emerald-500" />
          <p className="text-[10px] font-bold uppercase tracking-widest">Real-time Platform Intelligence</p>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-xl ${stat.bg} dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon size={20} />
               </div>
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            {/* truncate and break-words ensures long text stays inside */}
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1 truncate uppercase tracking-tighter">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Usage Chart --- */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
           <h4 className="text-sm font-black dark:text-white uppercase tracking-widest flex items-center gap-3 mb-8">
             <BarChart3 size={18} className="text-blue-600" /> Neural Activity Graph
           </h4>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data?.chartData || []}>
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
                 <YAxis hide />
                 <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                 <Area type="monotone" dataKey="trips" stroke="#2563eb" strokeWidth={3} fill="url(#chartGradient)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* --- Live Activity Feed --- */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col shadow-xl">
           <h4 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
             <Clock size={18} className="text-blue-400" /> Live Logs
           </h4>
           
           <div className="space-y-4 flex-1 z-10">
             {data?.recentLogs && data.recentLogs.length > 0 ? (
               data.recentLogs.map((log, i) => (
                 <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                     {log.user?.name?.charAt(0) || "U"}
                   </div>
                   <div className="min-w-0">
                     <p className="text-[11px] leading-tight font-bold tracking-tight truncate">
                       {log.user?.name || "Explorer"} <span className="text-blue-400">generated</span> {log.destination}
                     </p>
                     <span className="text-[9px] text-slate-500 font-bold uppercase">
                       {log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently"}
                     </span>
                   </div>
                 </div>
               ))
             ) : (
               <div className="flex flex-col items-center justify-center h-full opacity-20">
                  <MapPin size={40} />
                  <p className="text-[10px] font-bold mt-2 uppercase tracking-widest">No Active Logs</p>
               </div>
             )}
           </div>

           {/* Background Icon Decoration */}
           <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
              <MapPin size={200} />
           </div>
        </div>

      </div>
    </div>
  );
}