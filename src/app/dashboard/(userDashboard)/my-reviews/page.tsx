"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  Loader2, Star, Trash2, MessageSquare, 
  Search, Filter, Calendar, ExternalLink, Check 
} from "lucide-react";
import Link from "next/link";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const rawToken = localStorage.getItem("token");
        const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

        const response = await axios.get(`http://localhost:5000/api/v1/ai/my-reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
      await axios.delete(`http://localhost:5000/api/v1/ai/my-reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed!");
    }
  };

  const filteredReviews = reviews.filter((r) =>
    r.tripId?.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            My <span className="text-blue-600">Reviews</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium tracking-tight">Manage and track your feedback history.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest">
          <MessageSquare size={14} /> {reviews.length} Reviews
        </div>
      </div>

      {/* Search and Sort (Trips Page এর মতো ডিজাইন) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search destination or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 ring-blue-500/20 transition-all font-medium text-sm"
          />
        </div>
        
        {/* Sort Dropdown Section */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-xl font-bold transition-all active:scale-95 ${
              isSortOpen ? "border-blue-600 text-blue-600" : "border-slate-200 dark:border-slate-800 text-slate-600"
            }`}
          >
            <Filter size={18} /> Sort
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => { setSortOrder("newest"); setIsSortOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Newest First
                  {sortOrder === "newest" && <Check size={14} className="text-blue-600" />}
                </button>
                <button 
                  onClick={() => { setSortOrder("oldest"); setIsSortOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Oldest First
                  {sortOrder === "oldest" && <Check size={14} className="text-blue-600" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Destination</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Comment</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review: any) => (
                  <tr key={review._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs uppercase">
                          {review.tripId?.destination?.[0] || "T"}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{review.tripId?.destination || "Unknown"}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                            <Calendar size={10} /> {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-500" : "text-slate-200 dark:text-slate-700"} />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-xs italic text-slate-500 dark:text-slate-400 text-sm truncate font-medium">"{review.comment}"</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          href={`/dashboard/my-trips/${review.tripId?._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <button onClick={() => handleDeleteReview(review._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <p className="text-slate-300 font-black uppercase text-xs tracking-widest">No reviews found</p>
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