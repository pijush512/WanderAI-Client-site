"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import axios from "axios";
import { 
  BarChart3, Activity, Globe, Calendar, 
  Hash, ShieldCheck, Database, Zap 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveData = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.trim().startsWith("token="))
        ?.split("=")[1] || localStorage.getItem("token");

      if (!user?._id || !token) {
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [tripRes, reviewRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/ai/my-trips", config),
          axios.get("http://localhost:5000/api/v1/ai/my-reviews", config)
        ]);

        if (tripRes.data.success) setTrips(tripRes.data.data || []);
        if (reviewRes.data.success) setReviews(reviewRes.data.data || []);
      } catch (err: any) {
        console.error("Live Data Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchLiveData();
  }, [user?._id]);

  const liveChartData = trips.map(trip => ({
    name: trip.destination.split(',')[0], 
    budget: parseInt(trip.budget?.replace(/[^0-9]/g, '')) || 0, // "$500" -> 500
    days: trip.days
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Accessing Live Database...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-12 bg-white dark:bg-slate-950 min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-900 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-full text-emerald-600 text-[9px] font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System Connected
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            System <span className="font-light text-slate-400 text-3xl">/ Overview</span>
          </h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Record Reference</p>
          <p className="text-xs font-mono mt-1 text-slate-600 dark:text-slate-500 uppercase">UID: {user?._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Total Records", val: trips.length, icon: Database, color: "text-blue-600" },
          { label: "Total Destinations", val: new Set(trips.map(t => t.destination)).size, icon: Globe, color: "text-indigo-600" },
          { label: "Active Logs", val: reviews.length, icon: Zap, color: "text-amber-500" },
          { label: "Security Status", val: "Verified", icon: ShieldCheck, color: "text-emerald-600" },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4">
            <div className={`p-3 w-fit rounded-xl bg-white dark:bg-slate-800 shadow-sm ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{item.label}</p>
              <h3 className="text-3xl font-bold tracking-tighter mt-1">{item.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <BarChart3 size={18} className="text-slate-400" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Expenditure Analysis (Live)</h3>
          </div>
          <div className="h-[350px] w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            {trips.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liveChartData}>
                  <defs>
                    <linearGradient id="colorLive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: '700', fill: '#94a3b8'}} 
                    dy={10} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}} 
                  />
                  <Area type="monotone" dataKey="budget" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorLive)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-300 text-[10px] font-bold uppercase tracking-widest italic">No Data to Visualize</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Activity size={18} className="text-slate-400" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Record Split</h3>
          </div>
          <div className="h-[350px] w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={liveChartData}
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={5}
                  dataKey="days"
                >
                  {liveChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="space-y-8 pt-4">
        <div className="flex items-center gap-3 px-2">
          <Database size={18} className="text-slate-400" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Master Record Ledger</h3>
        </div>
        
        <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-10 py-5">System Entry</th>
                <th className="px-10 py-5">Duration</th>
                <th className="px-10 py-5">Resource Allocation</th>
                <th className="px-10 py-5 text-right">Reference ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {trips.length > 0 ? trips.slice(0, 10).map((trip, i) => (
                <tr key={i} className="text-sm">
                  <td className="px-10 py-6 font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    {trip.destination}
                  </td>
                  <td className="px-10 py-6 text-slate-500 font-medium">
                    {trip.days} Plan Units
                  </td>
                  <td className="px-10 py-6 font-mono text-xs text-blue-600 dark:text-blue-400">
                    {trip.budget}
                  </td>
                  <td className="px-10 py-6 text-right font-mono text-[10px] text-slate-300">
                    {trip._id.toUpperCase()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">
                    No Live Data Records Found in System
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}