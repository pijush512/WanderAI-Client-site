"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  MapPin, Calendar, Star, ArrowRight, Sparkles, Search, ChevronLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";

export default function ExplorePage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/ai/all-trips`);
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

  // Filter trips based on search
  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredTrips.length / cardsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <ExploreSkeleton />;

  return (
    <section className="min-h-screen py-24 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-left space-y-2">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Explore <span className="text-blue-600">All Journeys</span>
            </h1>
            <p className="text-slate-500 font-medium">Found {filteredTrips.length} amazing adventures for you.</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        {/* Trips Grid */}
        {currentTrips.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentTrips.map((trip, idx) => (
                <div 
                  key={trip._id} 
                  className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 transition-all hover:-translate-y-2 hover:shadow-2xl shadow-slate-200/50"
                >
                  <div className="relative h-48 w-full rounded-[2rem] overflow-hidden mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 opacity-90 group-hover:scale-110 transition-transform duration-700`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                      <MapPin size={24} className="mb-2 opacity-70" />
                      <h3 className="text-xl font-black uppercase tracking-tighter">{trip.destination}</h3>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-80">{trip.budget}</span>
                    </div>
                  </div>

                  <div className="px-2 space-y-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                      <div className="flex items-center gap-1"><Calendar size={12} /> {trip.days} Days</div>
                      <div className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor" /> 4.9</div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2 flex-grow">
                      Explore {trip.destination} with our AI optimized plans.
                    </p>
                    <Link 
                      href={`/public-trips/${trip._id}`}
                      className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all"
                    >
                      View Trip <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${
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
                  className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:text-blue-600 transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center font-black uppercase tracking-widest text-slate-400">
            No Destinations Found.
          </div>
        )}
      </div>
    </section>
  );
}

function ExploreSkeleton() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-96 bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2.5rem]" />
      ))}
    </div>
  );
}