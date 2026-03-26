// "use client";

// import React, { useState, useEffect } from "react";
// import { User, Mail, Shield, MapPin, Calendar, Edit3, Camera, X, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { useAuth } from "@/src/context/AuthContext";
// import axiosInstance from "../lib/axiosInstance";
// import { showAlert, toast } from "../lib/alerts";
// import SkeletonLoader from "@/src/components/SkeletonLoader";
// // import axiosInstance from "@/src/lib/axiosInstance"; // আপনার পাথ অনুযায়ী চেক করুন
// // import { toast } from "react-hot-toast"; // বা আপনার ব্যবহৃত টোস্ট লাইব্রেরি

// export default function ProfilePage() {
//   const { user, token, login, loading } = useAuth();

//   // --- States ---
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   // ইউজার ডাটা লোড হলে নাম সেট করা
//   useEffect(() => {
//     if (user) setName(user.name);
//   }, [user]);

//   // ইমেজ প্রিভিউ হ্যান্ডলার
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   // প্রোফাইল আপডেট ফাংশন
//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       const response = await axiosInstance.patch("/users/update-profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         login(token!, response.data.data); // Context আপডেট
//        showAlert("Success!", "Your profile has been updated.", "success");
//         setIsEditModalOpen(false);
//         setSelectedFile(null);
//       }
//     } catch (error: any) {
//       showAlert(
//       "Update Failed", 
//       error.response?.data?.message || "Something went wrong!", 
//       "error"
//     );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//        <SkeletonLoader></SkeletonLoader>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl font-bold text-slate-500">Please login to view profile.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
//       <div className="max-w-4xl mx-auto px-6">
        
//         {/* Profile Card */}
//         <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
//           <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 relative"></div>

//           <div className="px-8 pb-8 relative">
//             <div className="relative -mt-16 mb-6">
//               <div className="inline-block p-1 bg-white dark:bg-slate-900 rounded-full shadow-2xl">
//                 <img
//                   src={user?.image ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}` : "https://via.placeholder.com/150"}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-900"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{user?.name}</h1>
//                 <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
//                   <MapPin size={16} /> Traveler
//                 </p>
//               </div>
//               {/* Edit Button - এটি এখন মোডাল ওপেন করবে */}
//               <button 
//                 onClick={() => setIsEditModalOpen(true)}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
//               >
//                 <Edit3 size={18} /> Edit Profile
//               </button>
//             </div>

//             <hr className="my-8 border-slate-100 dark:border-slate-800" />

//             {/* Info Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl"><Mail size={20} /></div>
//                 <div>
//                   <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
//                   <p className="text-slate-700 dark:text-slate-200 font-semibold">{user?.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
//                 <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl"><Shield size={20} /></div>
//                 <div>
//                   <p className="text-xs font-bold text-slate-400 uppercase">Account Role</p>
//                   <p className="text-slate-700 dark:text-slate-200 font-semibold capitalize">{user?.role}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- Edit Profile Modal --- */}
//         {isEditModalOpen && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//             <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-200">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-black dark:text-white">Edit Profile</h2>
//                 <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X /></button>
//               </div>

//               <form onSubmit={handleUpdateProfile} className="space-y-5">
//                 {/* Name */}
//                 <div>
//                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
//                   <input 
//                     type="text" 
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full mt-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border-none focus:ring-2 ring-blue-500 outline-none dark:text-white"
//                     required
//                   />
//                 </div>

//                 {/* Profile Photo */}
//                 <div>
//                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Photo</label>
//                   <div className="mt-2 flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
//                       {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera className="text-slate-400" />}
//                     </div>
//                     <input 
//                       type="file" 
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
//                     />
//                   </div>
//                 </div>

//                 <button 
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
//                 >
//                   {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }





"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Mail, Shield, MapPin, Calendar, 
  Edit3, Camera, X, Loader2, Plane, Star, 
  Map, Sparkles, Award, Globe, Zap, BarChart3
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import axiosInstance from "../lib/axiosInstance";
import { showAlert } from "../lib/alerts";
import SkeletonLoader from "@/src/components/SkeletonLoader";
import axios from "axios";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid 
} from 'recharts';

export default function ProfilePage() {
  const { user, token, login, loading } = useAuth();

  // --- States ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [tripRes, reviewRes] = await Promise.all([
        axios.get("http://localhost:5000/api/v1/ai/my-trips", config),
        axios.get("http://localhost:5000/api/v1/ai/my-reviews", config)
      ]);
      setTrips(tripRes.data.data || []);
      setReviews(reviewRes.data.data || []);
    } catch (err) {
      console.error("Data fetch error");
    }
  };

  // চার্টের জন্য ডাটা প্রিপারেশন
  const budgetData = [
    { name: 'Luxury', value: trips.filter(t => t.budget?.toLowerCase().includes('luxury')).length || 1 },
    { name: 'Budget', value: trips.filter(t => t.budget?.toLowerCase().includes('budget')).length || 2 },
    { name: 'Mid-Range', value: trips.filter(t => !t.budget?.toLowerCase().includes('luxury') && !t.budget?.toLowerCase().includes('budget')).length || 1 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b'];

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-28 pb-20 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* --- Top Identity Section --- */}
        <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.07] -rotate-12 pointer-events-none">
            <Globe size={400} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-20 blur-xl"></div>
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-xl">
                <img
                  src={user?.image ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}` : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                <Zap size={12} fill="currentColor" /> Verified Explorer
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                {user?.name}
              </h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
                <MapPin size={14} className="text-blue-600" /> Digital Nomad • Level 12
              </p>
            </div>

            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:translate-y-[-2px] transition-all shadow-xl shadow-blue-500/10"
            >
              Modify Profile
            </button>
          </div>
        </div>

        {/* --- Stats & Charts Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <BarChart3 size={14} /> Travel Vitals
               </h3>
               <div className="space-y-6">
                  {[
                    { label: "Total Voyages", value: trips.length, icon: Plane, color: "text-blue-600" },
                    { label: "Community Reviews", value: reviews.length, icon: Star, color: "text-amber-500" },
                    { label: "Explorer Points", value: trips.length * 150, icon: Sparkles, color: "text-purple-600" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${s.color}`}><s.icon size={18}/></div>
                        <span className="text-[10px] font-black text-slate-500 uppercase">{s.label}</span>
                      </div>
                      <span className="text-xl font-black dark:text-white">{s.value.toString().padStart(2, '0')}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Progress Card */}
            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Next Badge Progress</p>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Master Wanderer</h4>
                  <div className="w-full h-2 bg-blue-400/30 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-white rounded-full"></div>
                  </div>
                  <p className="text-[9px] font-bold mt-3 opacity-80 uppercase">5 more trips to level up</p>
                </div>
                <Award className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 rotate-12" />
            </div>
          </div>

          {/* Center/Right: Charts */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pie Chart: Budget Preference */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 self-start">Budget Distribution</h3>
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '15px', border: 'none', fontSize: '10px', fontWeight: 'bold' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex gap-4 mt-2">
                  {budgetData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-[8px] font-black text-slate-400 uppercase">{d.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Area Chart: Trip Frequency (Dummy Trend) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Wandering Activity</h3>
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: 'Jan', trips: 1 }, { name: 'Feb', trips: 3 }, 
                      { name: 'Mar', trips: trips.length }, { name: 'Apr', trips: 2 }
                    ]}>
                      <defs>
                        <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="trips" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTrips)" />
                      <Tooltip contentStyle={{ borderRadius: '15px', border: 'none' }} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-[9px] font-bold text-center text-slate-400 uppercase mt-2">Monthly Engagement Trend</p>
            </div>

          </div>
        </div>

        {/* --- Account Info & Privacy --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400"><Shield size={20}/></div>
              <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Identity Details</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Connection</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-bold text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
                  {user?.email}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Member Since</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-bold text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
                  March 2026
                </div>
              </div>
           </div>

           <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/dashboard/settings" className="px-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Security Settings
              </Link>
              <Link href="/dashboard/my-trips" className="px-6 py-3 bg-blue-50 dark:bg-blue-600/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Download Travel Data
              </Link>
           </div>
        </div>

      </div>

      {/* --- Edit Modal --- */}
      {/* ... (পূর্বের মোডাল কোডটি এখানেও কাজ করবে, ডিজাইনের সাথে সামঞ্জস্য রেখে) ... */}
    </div>
  );
}