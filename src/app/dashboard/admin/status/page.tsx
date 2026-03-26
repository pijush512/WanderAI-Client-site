// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   Activity, Server, Database, Cpu, 
//   Globe, ShieldCheck, AlertCircle, RefreshCw,
//   CheckCircle2, HardDrive, Zap
// } from "lucide-react";

// export default function AdminStatusPage() {
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // ডেমো স্ট্যাটাস ডাটা (পরবর্তীতে এপিআই থেকে আসবে)
//   const systemNodes = [
//     { name: "Main API Server", status: "Operational", uptime: "99.99%", latency: "42ms", icon: Server, color: "text-emerald-500" },
//     { name: "PostgreSQL Database", status: "Operational", uptime: "100%", latency: "12ms", icon: Database, color: "text-blue-500" },
//     { name: "AI Inference Engine", status: "High Load", uptime: "98.5%", latency: "450ms", icon: Cpu, color: "text-amber-500" },
//     { name: "CDN / Edge Network", status: "Operational", uptime: "99.95%", latency: "5ms", icon: Globe, color: "text-purple-500" },
//     { name: "Security Firewall", status: "Active", uptime: "100%", latency: "1ms", icon: ShieldCheck, color: "text-emerald-500" },
//     { name: "Storage Bucket (S3)", status: "Operational", uptime: "99.99%", latency: "85ms", icon: HardDrive, color: "text-blue-500" },
//   ];

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     setTimeout(() => setIsRefreshing(false), 1500);
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-10">
      
//       {/* Header with Refresh */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <div>
//           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
//             System <span className="text-blue-600">Health</span>
//           </h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
//             <Activity size={12} className="text-emerald-500" /> Live Infrastructure Monitoring
//           </p>
//         </div>
//         <button 
//           onClick={handleRefresh}
//           disabled={isRefreshing}
//           className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
//         >
//           <RefreshCw size={16} className={isRefreshing ? "animate-spin text-blue-600" : ""} />
//           {isRefreshing ? "Syncing..." : "Refresh Status"}
//         </button>
//       </div>

//       {/* Main Status Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {systemNodes.map((node, i) => (
//           <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
//             <div className="relative z-10 space-y-6">
//               <div className="flex justify-between items-start">
//                 <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 ${node.color}`}>
//                   <node.icon size={24} />
//                 </div>
//                 <div className="text-right">
//                   <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
//                     node.status === "Operational" ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10" : "bg-amber-50 text-amber-500 dark:bg-amber-500/10"
//                   }`}>
//                     {node.status}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">{node.name}</h3>
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div className="space-y-1">
//                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Uptime</p>
//                     <p className="text-sm font-bold dark:text-slate-200">{node.uptime}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Latency</p>
//                     <p className="text-sm font-bold dark:text-slate-200">{node.latency}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Status Bar */}
//               <div className="pt-2">
//                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                     <div className={`h-full rounded-full ${node.status === "Operational" ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: '100%' }}></div>
//                  </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Active Incidents / Logs Section */}
//       <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 text-white relative overflow-hidden">
//         <div className="relative z-10">
//           <div className="flex items-center gap-4 mb-10">
//             <div className="p-3 bg-blue-600 rounded-2xl"><Zap size={20} /></div>
//             <h3 className="text-2xl font-black uppercase tracking-tighter">Event Logs</h3>
//           </div>

//           <div className="space-y-6">
//             {[
//               { time: "14:20:05", msg: "User registration node scaled up automatically", type: "info" },
//               { time: "13:45:12", msg: "AI Model latency spike detected in Region US-East", type: "warning" },
//               { time: "12:00:00", msg: "Weekly database backup completed successfully", type: "success" },
//             ].map((log, idx) => (
//               <div key={idx} className="flex items-start gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
//                 <span className="text-[10px] font-black text-blue-400 font-mono mt-1">{log.time}</span>
//                 <div className="flex-grow">
//                   <p className="text-xs font-bold uppercase tracking-wide leading-relaxed">{log.msg}</p>
//                 </div>
//                 {log.type === "warning" ? <AlertCircle size={16} className="text-amber-500" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
//               </div>
//             ))}
//           </div>

//           <button className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">
//             View full technical logs &rarr;
//           </button>
//         </div>
        
//         {/* Background Decor */}
//         <Activity size={400} className="absolute -bottom-20 -right-20 text-white opacity-[0.02] pointer-events-none" />
//       </div>

//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, Server, Database, Cpu, 
  Globe, ShieldCheck, AlertCircle, RefreshCw,
  CheckCircle2, HardDrive, Zap, Loader2
} from "lucide-react";
import axiosInstance from "@/src/app/lib/axiosInstance";
import { showAlert } from "@/src/app/lib/alerts";

export default function AdminStatusPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemData, setSystemData] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // লাইভ ডাটা ফেচ করার ফাংশন
  const fetchStatus = async () => {
    try {
      setIsRefreshing(true);
      const res = await axiosInstance.get("/admin/system-status");
      if (res.data.success) {
        setSystemData(res.data.systemNodes);
        setLogs(res.data.recentLogs);
      }
    } catch (err) {
      showAlert("Failed to sync infrastructure data", "error");
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 italic font-black text-slate-400 uppercase tracking-widest">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      Pinging Infrastructure...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            System <span className="text-blue-600">Health</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
            <Activity size={12} className="text-emerald-500" /> Live Monitoring
          </p>
        </div>
        <button 
          onClick={fetchStatus}
          disabled={isRefreshing}
          className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin text-blue-600" : ""} />
          {isRefreshing ? "Syncing..." : "Refresh Status"}
        </button>
      </div>

      {/* Dynamic Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemData?.map((node: any, i: number) => {
          // আইকন ম্যাপিং (সার্ভার থেকে আসা নামের ওপর ভিত্তি করে)
          const icons: any = { Server, Database, Cpu, Globe, ShieldCheck, HardDrive };
          const IconComponent = icons[node.iconType] || Server;

          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 ${node.status === 'Operational' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                    node.status === "Operational" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500"
                  }`}>
                    {node.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">{node.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Uptime</p>
                      <p className="text-sm font-bold dark:text-slate-200">{node.uptime}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Latency</p>
                      <p className="text-sm font-bold dark:text-slate-200">{node.latency}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full rounded-full transition-all duration-1000 ${node.status === "Operational" ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: node.healthScore + '%' }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Event Logs */}
      <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-blue-600 rounded-2xl"><Zap size={20} /></div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Live Event Logs</h3>
          </div>

          <div className="space-y-4">
            {logs?.map((log: any, idx: number) => (
              <div key={idx} className="flex items-start gap-6 p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
                <span className="text-[10px] font-black text-blue-400 font-mono mt-1">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <p className="flex-grow text-xs font-bold uppercase tracking-wide">{log.message}</p>
                {log.type === "warning" ? <AlertCircle size={16} className="text-amber-500" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}