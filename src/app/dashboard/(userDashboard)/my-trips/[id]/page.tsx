"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  Star,
  Info,
  Download,
  Share2,
  Clock,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState<any[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const rawToken = localStorage.getItem("token");
      if (!rawToken) {
        console.log("No token → skipping reviews fetch");
        return;
      }
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
      const response = await axios.get(
        `https://wander-ai-server-site.vercel.app/api/v1/ai/my-reviews`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const tripReviews = response.data.data.filter(
        (r: any) => r.trip?._id === id,
      );
      setReviews(tripReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const rawToken = localStorage.getItem("token");
        if (!rawToken) {
          router.push("/auth/login");
          return;
        }
        const token = rawToken.startsWith('"')
          ? JSON.parse(rawToken)
          : rawToken;

        const response = await axios.get(
          `https://wander-ai-server-site.vercel.app/api/v1/ai/my-trips`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          const foundTrip = response.data.data.find((t: any) => t._id === id);
          setTrip(foundTrip);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
    if (id && rawToken) {
      fetchReviews();
    }
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const rawToken = localStorage.getItem("token");
      const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

      await axios.post(
        `https://wander-ai-server-site.vercel.app/api/v1/ai/create-review`,
        {
          trip: id,
          rating: newRating,
          comment: newComment,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewComment("");
      setNewRating(5);
      fetchReviews();
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={50} />
        <p className="text-slate-400 font-black tracking-widest animate-pulse uppercase">
          Generating Insights...
        </p>
      </div>
    );

  if (!trip)
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] m-10 border border-slate-100 dark:border-slate-800 shadow-2xl">
        <h2 className="text-2xl font-black text-rose-500 tracking-tighter uppercase">
          No Plan Found!
        </h2>
        <Link
          href="/dashboard/my-trips"
          className="text-blue-600 font-bold underline mt-4 inline-block italic"
        >
          Back to List
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:py-10 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/my-trips"
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-xs tracking-[0.2em] uppercase transition-all group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-2 transition-transform"
          />{" "}
          Back to Wanderings
        </Link>
        <div className="flex gap-3">
          <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-slate-900 rounded-[3.5rem] p-8 md:p-16 text-white border border-slate-800 shadow-2xl">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black text-blue-300 uppercase tracking-widest">
            <Sparkles size={14} /> AI Destination Analysis
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
            {trip.destination}
          </h1>
          <p className="max-w-2xl text-slate-400 font-medium text-lg leading-relaxed">
            Welcome to your personalized guide for {trip.destination}. Our AI
            has curated a {trip.days}-day adventure optimized for a{" "}
            {trip.budget.toLowerCase()} budget.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Duration",
            value: `${trip.days} Days`,
            icon: <Calendar className="text-blue-500" />,
          },
          {
            label: "Budget",
            value: trip.budget,
            icon: <Wallet className="text-emerald-500" />,
          },
          {
            label: "Travelers",
            value: `${trip.travelers || 1} Person`,
            icon: <Users className="text-orange-500" />,
          },
          {
            label: "Trip Rating",
            value: "4.8 / 5.0",
            icon: <Star className="text-yellow-500" />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5">
              {item.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {item.label}
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <Info className="text-blue-600" /> Itinerary Overview
              </h3>
              <div className="px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Scroll to Read
              </div>
            </div>

            <div className="space-y-6">
              {trip.plan ? (
                <div className="space-y-10">
                  {typeof trip.plan === "object" ? (
                    Object.entries(trip.plan).map(
                      ([day, description]: [string, any], index) => (
                        <div
                          key={index}
                          className="relative pl-10 border-l-2 border-slate-100 dark:border-slate-800 pb-10 last:pb-0 group"
                        >
                          <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform shadow-md" />

                          <div className="space-y-3">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                              {day}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed text-justify">
                              {typeof description === "object"
                                ? JSON.stringify(description).replace(
                                    /[{}"]/g,
                                    "",
                                  )
                                : description}
                            </p>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                      <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-2">
                        {trip.plan}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                  <Clock
                    className="mx-auto mb-4 text-slate-300 animate-pulse"
                    size={48}
                  />
                  <p className="text-slate-400 font-black uppercase tracking-widest">
                    No detailed plan found.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 space-y-10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 tracking-tight">
                <Sparkles className="text-blue-600" size={20} /> Rate Your AI
                Experience
              </h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`${newRating >= star ? "text-yellow-500" : "text-slate-300"} transition-all duration-200 hover:scale-125`}
                    >
                      <Star
                        size={28}
                        fill={newRating >= star ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How helpful was this plan? Write your thoughts..."
                  className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 dark:text-slate-300 font-medium"
                  rows={3}
                />
                <button
                  disabled={submitting}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center gap-2 disabled:bg-slate-400"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tighter uppercase">
                <CheckCircle2 className="text-emerald-500" /> Community Insights
                ({reviews.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                  reviews.map((rev, index) => (
                    <div
                      key={index}
                      className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="flex gap-1 text-yellow-500 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={rev.rating > i ? "currentColor" : "none"}
                            className={rev.rating > i ? "" : "text-slate-200"}
                          />
                        ))}
                      </div>
                      <p className="text-slate-500 font-medium italic text-sm leading-relaxed">
                        "{rev.comment}"
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600 uppercase">
                          {rev.user?.name?.[0] || "W"}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {rev.user?.name || "Anonymous"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center text-slate-400 font-medium italic">
                    No reviews yet. Be the first to share your thoughts!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Sparkles className="text-blue-600" size={22} /> Suggested Next
            </h3>
            <div className="space-y-4">
              {["Tangail", "Sylhet", "Sajek Valley"].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-600 hover:text-white cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-bold text-blue-600 group-hover:text-blue-600 group-hover:bg-white">
                      {item[0]}
                    </div>
                    <span className="font-bold tracking-tight">{item}</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-white transition-transform group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <MapPin className="mb-6 text-blue-400" size={40} />
              <h4 className="text-2xl font-black mb-4 leading-none uppercase">
                Found a bug?
              </h4>
              <p className="text-slate-400 text-sm mb-8 font-medium">
                Help us improve the AI by reporting any incorrect routes.
              </p>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black hover:scale-105 transition-all uppercase text-xs tracking-widest shadow-xl">
                Contact Support
              </button>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
