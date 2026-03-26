"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Loader2, Star, Trash2, MessageSquare, 
  Search, Filter, Calendar, MapPin, ExternalLink 
} from "lucide-react";
import Link from "next/link";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const rawToken = localStorage.getItem("token");
        const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

        // আপনার ব্যাকএন্ড এপিআই অনুযায়ী কল করুন
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
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

      await axios.delete(`http://localhost:5000/api/v1/ai/my-reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter((r) => r._id !== id));
      alert("Review deleted!");
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  const filteredReviews = reviews.filter((r) =>
    r.tripId?.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            My <span className="text-blue-600">Reviews</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Manage and track all your feedback for AI trips.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest">
          <MessageSquare size={16} /> Total: {reviews.length} Reviews
        </div>
      </div>

      {/* সার্চ ও ফিল্টার */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search reviews by destination or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 ring-blue-500/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={18} /> Sort
        </button>
      </div>

      {/* রিভিউ লিস্ট/টেবিল (Requirement 8 Compliance) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Destination</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Comment</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review: any) => (
                  <tr key={review._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs uppercase">
                          {review.tripId?.destination?.[0] || "T"}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">{review.tripId?.destination || "Unknown Trip"}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Calendar size={10} /> {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < review.rating ? "currentColor" : "none"} 
                            className={i < review.rating ? "text-yellow-500" : "text-slate-200 dark:text-slate-700"}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 max-w-xs">
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic truncate" title={review.comment}>
                        "{review.comment}"
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <Link 
                          href={`/dashboard/my-trips/${review.tripId?._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                          title="View Trip"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDeleteReview(review._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                          title="Delete Review"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <MessageSquare size={48} className="mb-4 opacity-20" />
                      <p className="font-black uppercase tracking-widest text-xs">No reviews found!</p>
                    </div>
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