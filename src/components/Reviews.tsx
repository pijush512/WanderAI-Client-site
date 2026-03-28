"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Quote, MapPin, Sparkles, MessageSquareQuote } from 'lucide-react';

interface Review {
  _id: string;
  user: { name: string; image: string };
  trip: { destination: string };
  rating: number;
  comment: string;
}

const LiveReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/ai/all-reviews`);
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [BASE_URL]);

  if (loading) return (
    <div className="flex justify-center items-center py-32 bg-white dark:bg-slate-950">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
          <Sparkles className="text-blue-600 animate-spin" size={24} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Stories</span>
      </div>
    </div>
  );

  const marqueeReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative py-28 bg-white dark:bg-[#020617] transition-all overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center text-center mb-20 px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl shadow-sm">
            <MessageSquareQuote size={16} className="text-blue-600" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Wall of Love</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Voices of <span className="text-blue-600">Explorers</span>
          </h2>
          
          <p className="max-w-2xl text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base uppercase tracking-widest">
            Real experiences from travelers around the globe
          </p>
        </div>
        {reviews.length > 0 ? (
          <div className="relative flex overflow-hidden py-10">
            <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {marqueeReviews.map((review, idx) => {
                const userImg = review.user?.image 
                  ? `${BASE_URL}/${review.user.image.replace(/^\//, '')}`
                  : `https://ui-avatars.com/api/?name=${review.user?.name}&background=random`;

                return (
                  <div 
                    key={`${review._id}-${idx}`} 
                    className="w-[350px] md:w-[450px] shrink-0 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-900 group shadow-sm"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14}
                              className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 dark:text-slate-700'}`} 
                            />
                          ))}
                        </div>
                        <Quote className="text-slate-200 dark:text-slate-800 group-hover:text-blue-500/20 transition-colors" size={32} />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg font-bold leading-relaxed italic whitespace-normal mb-8">
                        "{review.comment}"
                      </p>

                      <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                        <img 
                          src={userImg} 
                          alt={review.user?.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-white dark:border-slate-800 shadow-sm"
                        />
                        <div className="flex flex-col overflow-hidden">
                          <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tighter truncate">
                            {review.user?.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                            <MapPin size={10} />
                            <span className="text-[9px] font-black uppercase tracking-widest truncate">
                              {review.trip?.destination || "Global Nomad"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-20 pointer-events-none" />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20 px-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-12">
               <MessageSquareQuote className="text-slate-300 mx-auto mb-4" size={40} />
               <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">No reviews found yet.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LiveReviews;