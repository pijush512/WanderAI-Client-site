"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Loader2, Plus, Eye, Trash2, Search, 
  MapPin, Calendar, Filter, ChevronLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast"; // নোটিফিকেশনের জন্য (অপশনাল)

export default function MyTripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem("token");
      if (!rawToken) return;
      const token = rawToken.startsWith('"') ? JSON.parse(rawToken) : rawToken;

      const response = await axios.get(`http://localhost:5000/api/v1/ai/my-trips`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setTrips(response.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Delete Function (Requirement 8 এর জন্য জরুরি)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

      await axios.delete(`http://localhost:5000/api/v1/ai/my-trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTrips(trips.filter((trip: any) => trip._id !== id));
      alert("Trip deleted successfully!");
    } catch (err) {
      alert("Failed to delete trip. Check backend connection.");
    }
  };

  const filteredTrips = trips.filter((trip: any) =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      {/* হেডার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Manage <span className="text-blue-600">Trips</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">View and manage your AI-generated travel data.</p>
        </div>
        <Link 
          href="/dashboard/create-trip" 
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} /> Plan New Trip
        </Link>
      </div>

      {/* ফিল্টারিং ও সার্চ (Requirement 6 & 8) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 ring-blue-500/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* ডাটা টেবিল (Requirement 8: Data Tables) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">Destination</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">Duration</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">Budget</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">Created At</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTrips.map((trip: any) => (
                <tr key={trip._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs uppercase">
                        {trip.destination[0]}
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{trip.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{trip.days} Days</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {trip.budget}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        href={`/dashboard/my-trips/${trip._id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(trip._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                        title="Delete Trip"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* পেজিনেশন (Requirement 8: Pagination) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase">Showing {filteredTrips.length} entries</p>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}