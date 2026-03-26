"use client";

import React, { useEffect, useState } from "react";
import {
  Cpu,
  Activity,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface TripLog {
  _id: string;
  userName: string;
  destination: string;
  budget: string;
  status: "Success" | "Failed" | "Processing";
  createdAt: string;
  modelUsed: string;
}

export default function WanderEngine() {
  const [logs, setLogs] = useState<TripLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEngineLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/v1/ai/all-trips"); 
      if (!response.ok) throw new Error("Neural Core connection failed (Check Backend)");
      const result = await response.json();

      if (result.success) {
        const formattedTrips = result.data.map((trip: any) => ({
          _id: trip._id,
          userName: trip.user?.name || "Unknown Explorer",
          destination: trip.destination,
          budget: trip.budget || "Mid-range",
          status: "Success",
          createdAt: trip.createdAt,
          modelUsed: "Llama-3.1"
        }));
        setLogs(formattedTrips);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEngineLogs(); }, []);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-rose-500">
        <AlertCircle size={48} className="mb-4" />
        <p className="font-black uppercase tracking-widest text-center">{error}</p>
        <button onClick={fetchEngineLogs} className="mt-6 px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
          Retry Connection
        </button>
      </div>
    );

  return (
    <div className="space-y-10 transition-colors duration-300">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Cpu size={20} />
            </div>
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em]">
              Neural Core v3.0
            </span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Wander <span className="text-blue-600">Engine</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Streaming Real-time Operations
          </p>
        </div>

        <button
          onClick={fetchEngineLogs}
          disabled={loading}
          className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] shadow-sm hover:shadow-md dark:hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={`${loading ? "animate-spin" : ""} text-blue-600`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
            Sync Engine
          </span>
        </button>
      </div>

      {/* --- Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 dark:bg-blue-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group transition-all">
          <Activity className="absolute right-[-10px] top-[-10px] text-white/5 group-hover:text-white/10 transition-colors" size={120} />
          <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Total Logs</p>
          <h3 className="text-4xl font-black italic">{loading ? "..." : logs.length}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">System Health</p>
          <h3 className="text-4xl font-black italic text-emerald-500">ACTIVE</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Model</p>
          <h3 className="text-4xl font-black italic text-blue-600 dark:text-blue-400 tracking-tighter uppercase">Llama-3.1</h3>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Recent Traces</h4>
          <div className="text-[9px] font-bold text-slate-400 uppercase italic">Live Feed</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Explorer</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Target Vector</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Time Trace</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse"><td colSpan={4} className="px-10 py-8 bg-slate-50/10 dark:bg-slate-800/10"></td></tr>
                ))
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase group-hover:text-blue-600 transition-colors">
                          {log.userName}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase italic">Budget: {log.budget}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="text-xs font-bold">{log.destination}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          {new Date(log.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                        <CheckCircle2 size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">PROCESSED</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}