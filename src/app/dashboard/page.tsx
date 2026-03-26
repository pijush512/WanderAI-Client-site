// "use client";

// import React from "react";
// import { useAuth } from "@/src/context/AuthContext";
// import { Plane, Map, Star, Plus, ArrowRight, TrendingUp } from "lucide-react";
// import Link from "next/link";

// // এই ফাংশনটি অবশ্যই 'export default' হতে হবে
// export default function DashboardOverview() {
//   const { user } = useAuth();

//   const stats = [
//     { label: "Total Trips", value: "12", icon: Plane, color: "bg-blue-500" },
//     { label: "Saved Places", value: "45", icon: Map, color: "bg-emerald-500" },
//     { label: "Reviews Given", value: "08", icon: Star, color: "bg-amber-500" },
//   ];

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
//             Welcome back, <span className="text-blue-600 capitalize">{user?.name?.split(' ')[0] || "Traveler"}</span>! 🌍
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
//             Where do you want to wander with AI today?
//           </p>
//         </div>
        
//         <Link 
//           href="/dashboard/plan-trip"
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-200 dark:shadow-none group"
//         >
//           <Plus size={22} className="group-hover:rotate-90 transition-transform" />
//           Plan New Trip with AI
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
//             <div className="flex items-center justify-between">
//               <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg`}>
//                 <stat.icon size={24} />
//               </div>
//               <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
//                 <TrendingUp size={14} /> +12%
//               </div>
//             </div>
//             <div className="mt-6">
//               <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
//               <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
//         <div className="flex items-center justify-between mb-8">
//           <h3 className="text-xl font-black dark:text-white">Recent Wanderings</h3>
//           <Link href="/dashboard/my-trips" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
//             View All <ArrowRight size={16} />
//           </Link>
//         </div>

//         <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
//           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
//             <Map size={32} />
//           </div>
//           <p className="text-slate-500 font-bold italic">No trips generated yet. Let&apos;s build one!</p>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/src/context/AuthContext";
// import axios from "axios";
// import { Plane, Map, Star, Plus, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
// import Link from "next/link";

// export default function DashboardOverview() {
//   const { user } = useAuth();
//   const [trips, setTrips] = useState<any[]>([]);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       // ইউজার না থাকলে বা আইডি না থাকলে থামুন
//       if (!user || !user._id) {
//         console.log("User not found in context yet...");
//         return;
//       }

//       try {
//         setLoading(true);
//         console.log("Fetching trips for user ID:", user._id);

//         const tripRes = await axios.get("http://localhost:5000/api/v1/ai/all-trips");
        
//         if (tripRes.data.success) {
//           const allData = tripRes.data.data;
          
//           // ফিক্সড ফিল্টারিং: টাইপ যাই হোক স্ট্রিং এ কনভার্ট করে চেক করা হচ্ছে
//           const userTrips = allData.filter((t: any) => {
//              const tripUserId = t.user?._id || t.user; // আপনার DB তে user অবজেক্ট নাকি শুধু আইডি তা চেক করছে
//              return String(tripUserId) === String(user._id);
//           });

//           console.log("Filtered Trips Count:", userTrips.length);
//           setTrips(userTrips);
//         }

//         // রিভিউ ফেচিং
//         try {
//           const reviewRes = await axios.get("http://localhost:5000/api/v1/reviews");
//           if (reviewRes.data.success) {
//             const userReviews = reviewRes.data.data.filter(
//               (r: any) => String(r.user?._id || r.user) === String(user._id)
//             );
//             setReviews(userReviews);
//           }
//         } catch (e) {
//           console.warn("Reviews API check failed.");
//         }

//       } catch (err) {
//         console.error("Dashboard Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [user?._id]); // ইউজার আইডির ওপর নজর রাখবে

//   // স্ট্যাটস ক্যালকুলেশন
//   const stats = [
//     { label: "Total Trips", value: trips.length.toString().padStart(2, '0'), icon: Plane, color: "bg-blue-600" },
//     { label: "Destinations", value: Array.from(new Set(trips.map(t => t.destination))).length.toString().padStart(2, '0'), icon: Map, color: "bg-emerald-600" },
//     { label: "Reviews Given", value: reviews.length.toString().padStart(2, '0'), icon: Star, color: "bg-amber-500" },
//   ];

//   if (loading) return <div className="p-20 text-center font-black animate-pulse uppercase tracking-widest text-blue-600">Syncing with AI...</div>;

//   return (
//     <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <div className="space-y-2 text-left">
//           <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
//             Welcome, <span className="text-blue-600">{user?.name?.split(' ')[0] || "Traveler"}</span>! 🌍
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
//             <Sparkles size={14} className="text-blue-600" /> AI-Powered Travel Dashboard
//           </p>
//         </div>
        
//         <Link 
//           href="/dashboard/plan-trip"
//           className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 hover:scale-105 text-white px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/20 group"
//         >
//           <Plus size={18} className="group-hover:rotate-90 transition-transform" />
//           Plan New Trip
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-500/30 transition-all">
//             <div className="flex items-center justify-between mb-8">
//               <div className={`p-5 rounded-3xl text-white ${stat.color} shadow-xl group-hover:scale-110 transition-transform`}>
//                 <stat.icon size={28} />
//               </div>
//               <div className="flex items-center gap-1 text-emerald-500 font-black text-[10px] bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full uppercase tracking-tighter">
//                 <TrendingUp size={14} /> Active
//               </div>
//             </div>
//             <div className="text-left">
//               <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</p>
//               <h2 className="text-5xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter">{stat.value}</h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-sm">
//         <div className="flex items-center justify-between mb-12">
//           <div className="text-left">
//             <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Recent Wanderings</h3>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Itineraries</p>
//           </div>
//           <Link href="/dashboard/my-trips" className="px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-blue-600 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
//             View All
//           </Link>
//         </div>

//         {trips.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {trips.slice(0, 2).map((trip) => (
//               <div key={trip._id} className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group hover:border-blue-500/50 transition-all">
//                 <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-lg group-hover:scale-110 transition-transform">
//                   {trip.destination[0]}
//                 </div>
//                 <div className="flex-grow text-left">
//                   <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{trip.destination}</h4>
//                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{trip.days} Days • {trip.budget}</p>
//                 </div>
//                 <Link href={`/dashboard/my-trips/${trip._id}`} className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-blue-600 shadow-sm">
//                   <ArrowRight size={20} />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] text-center">
//              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No matching trips found in database for your ID.</p>
//              <p className="text-[10px] text-blue-500 mt-2 font-mono">My ID: {user?._id}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import axios from "axios";
import { 
  Plane, Map, Star, Plus, ArrowRight, 
  TrendingUp, Sparkles, MapPin, Calendar, BarChart3 
} from "lucide-react";
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area 
} from 'recharts';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.trim().startsWith("token="))
        ?.split("=")[1] || localStorage.getItem("token");

      if (!user?._id || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [tripRes, reviewRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/ai/my-trips", config),
          axios.get("http://localhost:5000/api/v1/ai/my-reviews", config)
        ]);

        if (tripRes.data.success) setTrips(tripRes.data.data || []);
        if (reviewRes.data.success) setReviews(reviewRes.data.data || []);
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchDashboardData();
  }, [user?._id]);

  // চার্টের জন্য ডাইনামিক ডাটা প্রিপারেশন
  const chartData = trips.slice(0, 6).map(trip => ({
    name: trip.destination.split(',')[0],
    days: trip.days,
    // বাজেট স্ট্রিং থেকে নাম্বার বের করা (যেমন: "$500" -> 500)
    cost: parseInt(trip.budget?.replace(/[^0-9]/g, '')) || 0 
  }));

  const stats = [
    { label: "Total Trips", value: trips.length.toString().padStart(2, '0'), icon: Plane, color: "bg-blue-600" },
    { label: "Destinations", value: Array.from(new Set(trips.map(t => t.destination))).length.toString().padStart(2, '0'), icon: Map, color: "bg-emerald-600" },
    { label: "Reviews Given", value: reviews.length.toString().padStart(2, '0'), icon: Star, color: "bg-amber-500" },
  ];

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="font-black text-[10px] uppercase tracking-[0.4em] text-blue-600">Analyzing Your Travels...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 text-[9px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> AI Travel Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
            Welcome, <span className="text-blue-600">{user?.name?.split(' ')[0] || "Traveler"}</span>! 🌍
          </h1>
        </div>
        
        <Link 
          href="/dashboard/plan-trip"
          className="flex items-center justify-center gap-4 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] text-white px-12 py-6 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-500/20 group shrink-0"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          Plan New Trip
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-500/30 transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className={`p-6 rounded-[2rem] text-white ${stat.color} shadow-2xl`}>
                <stat.icon size={32} />
              </div>
              <div className="text-emerald-500 font-black text-[10px] bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full uppercase">Synced</div>
            </div>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">{stat.label}</p>
            <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* --- Dynamic Analytics Chart --- */}
      <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-600 rounded-2xl text-white">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter leading-none">Travel Analysis</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Budget vs Duration by Destination</p>
          </div>
        </div>

        <div className="h-[350px] w-full">
          {trips.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: '900', fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                />
                <Bar dataKey="cost" radius={[15, 15, 15, 15]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#10b981'} />
                  ))}
                </Bar>
                <Bar dataKey="days" fill="#cbd5e1" radius={[15, 15, 15, 15]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Analytics will appear after your first trip.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Trips Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[4.5rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none">Recent Wanderings</h3>
          <Link href="/dashboard/my-trips" className="px-8 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-blue-600 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            View All Journeys &rarr;
          </Link>
        </div>

        {trips.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trips.slice(0, 4).map((trip) => (
              <div key={trip._id} className="flex items-center gap-8 p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[3rem] border border-slate-100 dark:border-slate-800 group hover:border-blue-500/50 transition-all duration-500">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shrink-0 shadow-xl group-hover:rotate-6 transition-all duration-500">
                  {trip.destination[0]}
                </div>
                <div className="flex-grow text-left space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{trip.destination}</h4>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar size={14} className="text-blue-600" /> {trip.days} Days
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                      <MapPin size={14} className="text-blue-600" /> {trip.budget}
                    </span>
                  </div>
                </div>
                <Link href={`/dashboard/my-trips/${trip._id}`} className="p-5 bg-white dark:bg-slate-900 rounded-3xl text-slate-300 hover:text-blue-600 shadow-sm transition-all">
                  <ArrowRight size={24} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem] text-center">
             <Map size={40} className="mx-auto text-slate-200 mb-6" />
             <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">No Adventures Found</p>
          </div>
        )}
      </div>
    </div>
  );
}