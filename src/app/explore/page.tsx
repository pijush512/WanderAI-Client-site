// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   MapPin, Star, ArrowRight, Sparkles, Clock, ShieldCheck, Search, ChevronLeft, ChevronRight 
// } from "lucide-react";
// import Link from "next/link";
// import SkeletonLoader from "@/src/components/SkeletonLoader";


// export default function ExplorePage() {
//   const [trips, setTrips] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 12;

//   useEffect(() => {
//     const fetchAllTrips = async () => {
//       try {
//         setLoading(true);
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
//         const response = await axios.get(`${baseUrl}/api/v1/ai/all-trips`);
//         if (response.data.success) {
//           setTrips(response.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllTrips();
//   }, []);

//   // সার্চ ফিল্টার লজিক
//   const filteredTrips = trips.filter((trip) =>
//     trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // পেজিনেশন লজিক
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentTrips = filteredTrips.slice(indexOfFirstCard, indexOfLastCard);
//   const totalPages = Math.ceil(filteredTrips.length / cardsPerPage);

//   const paginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // লোডিং স্টেট হ্যান্ডলিং
//   if (loading) return <SkeletonLoader />;

//   return (
//     <section className="min-h-screen py-24 bg-white dark:bg-[#020617] transition-all duration-500">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header & Search Bar */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20 pb-10 border-b border-slate-100 dark:border-slate-800/50">
//           <div className="flex flex-col items-start space-y-3">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg">
//               <Sparkles size={14} className="text-blue-600" />
//               <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
//                 Global Destinations
//               </span>
//             </div>
//             <div className="space-y-1">
//               <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
//                 Explore <span className="text-blue-600">All Journeys</span>
//               </h1>
//               <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
//                 Found {filteredTrips.length} curated adventures
//               </p>
//             </div>
//           </div>

//           <div className="relative w-full md:w-[380px] group">
//             <div className="relative flex items-center bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-all group-focus-within:border-blue-500/50 group-focus-within:ring-4 group-focus-within:ring-blue-500/5">
//               <Search className="ml-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
//               <input 
//                 type="text"
//                 placeholder="SEARCH DESTINATION..."
//                 className="w-full px-4 py-4 bg-transparent focus:outline-none dark:text-white font-black text-[11px] uppercase tracking-widest placeholder:text-slate-400"
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Trips Grid */}
//         {currentTrips.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//               {currentTrips.map((trip) => (
//                 <div 
//                   key={trip._id} 
//                   className="group flex flex-col bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/20"
//                 >
//                   <div className="p-8 pb-4">
//                     <div className="flex justify-between items-start mb-6">
//                       <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
//                          <MapPin className="text-blue-600" size={22} />
//                       </div>
//                       <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
//                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
//                          <span className="text-[10px] font-black dark:text-white">4.9</span>
//                       </div>
//                     </div>

//                     <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">
//                       {trip.destination}
//                     </h3>
                    
//                     <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
//                       <div className="flex items-center gap-1.5">
//                         <Clock size={14} />
//                         <span className="text-[10px] font-bold uppercase tracking-widest">{trip.days} Days</span>
//                       </div>
//                       <div className="w-1 h-1 rounded-full bg-slate-300" />
//                       <div className="flex items-center gap-1.5">
//                         <ShieldCheck size={14} className="text-emerald-500" />
//                         <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{trip.budget}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-8 pt-0 flex flex-col flex-grow">
//                     <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 line-clamp-2 italic">
//                       "A unique {trip.budget} journey through the heart of {trip.destination}."
//                     </p>

//                     <Link 
//                       href={`/public-trips/${trip._id}`}
//                       className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-blue-600 dark:hover:bg-blue-700 hover:gap-5"
//                     >
//                       View Plan <ArrowRight size={14} />
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination Component */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-4">
//                 <button 
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
                
//                 <div className="flex gap-2">
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => paginate(i + 1)}
//                       className={`w-12 h-12 rounded-2xl font-black text-[10px] transition-all ${
//                         currentPage === i + 1 
//                         ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
//                         : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500"
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <button 
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
//             <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">No itineraries found</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  MapPin, Star, ArrowRight, Sparkles, Clock, ShieldCheck, Search, ChevronLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import SkeletonLoader from "@/src/components/SkeletonLoader";

export default function ExplorePage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        setLoading(true);
        // আপনার .env অনুযায়ী NEXT_PUBLIC_API_URL ব্যবহার করা হলো
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const response = await axios.get(`${apiUrl}/ai/all-trips`);
        
        if (response.data.success) {
          setTrips(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTrips();
  }, []);

  // সার্চ ফিল্টার লজিক (নিরাপদ চেকসহ)
  const filteredTrips = trips.filter((trip) =>
    trip.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // পেজিনেশন লজিক
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredTrips.length / cardsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="min-h-screen py-24 bg-white dark:bg-[#020617] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20 pb-10 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex flex-col items-start space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                Global Destinations
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                Explore <span className="text-blue-600">All Journeys</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                Found {filteredTrips.length} curated adventures
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-[380px] group">
            <div className="relative flex items-center bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm transition-all group-focus-within:border-blue-500/50 group-focus-within:ring-4 group-focus-within:ring-blue-500/5">
              <Search className="ml-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="SEARCH DESTINATION..."
                className="w-full px-4 py-4 bg-transparent focus:outline-none dark:text-white font-black text-[11px] uppercase tracking-widest placeholder:text-slate-400"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        {currentTrips.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {currentTrips.map((trip) => (
                <div 
                  key={trip._id} 
                  className="group flex flex-col bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/20"
                >
                  <div className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                         <MapPin className="text-blue-600" size={22} />
                      </div>
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                         <Star size={12} className="fill-yellow-400 text-yellow-400" />
                         <span className="text-[10px] font-black dark:text-white">4.9</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">
                      {trip.destination}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{trip.days} Days</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{trip.budget}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 flex flex-col flex-grow">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 line-clamp-2 italic">
                      "A unique {trip.budget} journey through the heart of {trip.destination}."
                    </p>

                    <Link 
                      href={`/public-trips/${trip._id}`}
                      className="mt-auto flex items-center justify-center gap-3 w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-blue-600 dark:hover:bg-blue-700 hover:gap-5"
                    >
                      View Plan <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black text-[10px] transition-all ${
                        currentPage === i + 1 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                        : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">No itineraries found</p>
          </div>
        )}
      </div>
    </section>
  );
}