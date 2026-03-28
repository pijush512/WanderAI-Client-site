"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Loader2,
  Plus,
  Eye,
  Trash2,
  Search,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function MyTripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [budgetFilter, setBudgetFilter] = useState<
    "all" | "cheap" | "mid" | "high"
  >("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const getBudgetStyle = (budget: string) => {
    const b = budget?.toLowerCase() || "";

    if (b === "budget" || b.includes("cheap")) {
      return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800";
    }

    if (b.includes("mid") || b.includes("moderate")) {
      return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800";
    }

    if (b.includes("luxury") || b.includes("high")) {
      return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800";
    }

    return "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:border-slate-700";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const rawToken = localStorage.getItem("token");
      if (!rawToken) return;
      const token = rawToken.startsWith('"') ? JSON.parse(rawToken) : rawToken;

      const response = await axios.get(
        `https://wander-ai-server-site.vercel.app/api/v1/ai/my-trips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
      await axios.delete(
        `https://wander-ai-server-site.vercel.app/api/v1/ai/my-trips/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTrips(trips.filter((trip: any) => trip._id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const processedTrips = trips
    .filter((trip: any) => {
      const matchesSearch = trip.destination
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const b = trip.budget?.toLowerCase() || "";

      let matchesBudget = true;
      if (budgetFilter === "cheap") {
        matchesBudget = b === "budget" || b.includes("cheap");
      } else if (budgetFilter === "mid") {
        matchesBudget = b.includes("mid");
      } else if (budgetFilter === "high") {
        matchesBudget = b.includes("luxury") || b.includes("high");
      }

      return matchesSearch && matchesBudget;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center text-blue-600">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My <span className="text-blue-600">Trips</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Managing your travel history for Tangail & beyond.
          </p>
        </div>
        <Link
          href="/dashboard/create-trip"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-sm"
        >
          <Plus size={18} /> New Trip
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 ring-blue-500/5 transition-all font-medium text-sm"
          />
        </div>

        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border rounded-2xl font-bold transition-all text-sm ${
              budgetFilter !== "all"
                ? "border-blue-600 text-blue-600 shadow-lg shadow-blue-500/10"
                : "border-slate-200 dark:border-slate-800 text-slate-600"
            }`}
          >
            <Filter size={18} />
            {budgetFilter === "all"
              ? "All Budgets"
              : `${budgetFilter.toUpperCase()}`}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-2 space-y-1 animate-in zoom-in-95">
              {[
                { id: "all", label: "All Trips" },
                { id: "cheap", label: "Cheap (Budget)" },
                { id: "mid", label: "Mid Range" },
                { id: "high", label: "High (Luxury)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setBudgetFilter(opt.id as any);
                    setIsFilterOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  {opt.label}
                  {budgetFilter === opt.id && (
                    <Check size={14} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-6">Trip Details</th>
                <th className="px-8 py-6">Duration & Travelers</th>
                <th className="px-8 py-6">Budget Status</th>
                <th className="px-8 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {processedTrips.length > 0 ? (
                processedTrips.map((trip: any) => (
                  <tr
                    key={trip._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/20">
                          {trip.destination[0]}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1.5">
                            {trip.destination}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar size={12} className="text-blue-500" />{" "}
                            {new Date(trip.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                          <Clock size={14} className="text-slate-400" />{" "}
                          {trip.days} Days
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                          <Users size={14} className="text-slate-400" />{" "}
                          {trip.travelers} Traveler(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-4 py-2 border rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit shadow-sm ${getBudgetStyle(trip.budget)}`}
                      >
                        <DollarSign size={12} /> {trip.budget}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/dashboard/my-trips/${trip._id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(trip._id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <p className="text-slate-300 font-black uppercase text-xs tracking-[0.2em]">
                      No trips found
                    </p>
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
