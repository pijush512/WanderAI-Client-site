"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  MapPin, Star, ArrowRight, Sparkles, ChevronRight, Clock, ShieldCheck 
} from "lucide-react";
import Link from "next/link";

const getCategoryByDest = (destination: string): string => {
  const dest = (destination || "").toLowerCase();
  if (dest.includes("cox") || dest.includes("beach") || dest.includes("sea") || dest.includes("kuakata")) return "beach";
  if (dest.includes("sajek") || dest.includes("hill") || dest.includes("mountain") || dest.includes("sylhet")) return "hill";
  if (dest.includes("forest") || dest.includes("sundarban")) return "forest";
  if (dest.includes("camp") || dest.includes("adventure")) return "camping";
  return "city"; 
};

export default function PopularTrips({ activeCategory }: { activeCategory: string }) {
  const [trips, setTrips] = useState<any[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/ai/all-trips`);
        if (response.data.success) {
          setTrips(response.data.data);
          setFilteredTrips(response.data.data.slice(0, 8)); 
        }
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    const currentCategory = activeCategory?.toLowerCase() || "all";
    if (currentCategory === "all") {
      setFilteredTrips(trips.slice(0, 8));
    } else {
      const filtered = trips.filter((trip: any) => getCategoryByDest(trip.destination) === currentCategory);
      setFilteredTrips(filtered);
    }
  }, [activeCategory, trips]);

  if (loading) return <PopularTripsSkeleton />;

  return (
    <section className="py-24 bg-white dark:bg-[#020617] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Header Section */}
        <div id="popular-destini" className="flex flex-col items-center text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">
              {activeCategory === 'all' ? 'Top Recommendations' : `${activeCategory} Collection`}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Popular <span className="text-blue-600">Trips</span>
          </h2>
          
          <p className="max-w-2xl text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base uppercase tracking-widest leading-relaxed">
            Expertly crafted itineraries for your next big adventure
          </p>
        </div>

        {/* Professional Minimalist Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {filteredTrips.map((trip) => (
              <div 
                key={trip._id} 
                className="group flex flex-col bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/20"
              >
                {/* Simplified Card Top */}
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

                {/* Content Body */}
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
        ) : (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 mb-20">
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">No itineraries found in this category</p>
          </div>
        )}

        {/* Standard Action Button */}
        <div className="flex justify-center">
          <Link href="/explore" className="group flex items-center gap-4 px-10 py-5 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-full font-black text-[10px] uppercase tracking-[0.25em] transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900">
            Explore All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PopularTripsSkeleton() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-80 bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2rem]" />
      ))}
    </div>
  );
}