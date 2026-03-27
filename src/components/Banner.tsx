// import React from 'react'

// const Banner = () => {
//   return (
//     <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
//       {/* ১. ব্যাকগ্রাউন্ড ইমেজ ও ওভারলে */}
//       <div 
//         className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 hover:scale-105"
//       >
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900"></div>
//       </div>

//       {/* ২. কন্টেন্ট এরিয়া */}
//       <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in zoom-in duration-700">
//         <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
//           Your Smart AI Travel Partner
//         </span>
        
//         <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
//           Explore the World <br /> 
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
//             Guided by AI
//           </span>
//         </h1>

//         <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
//           WanderAI picks the best destinations, plans your itinerary, and finds 
//           the best deals so you can just pack your bags and go.
//         </p>

//         {/* ৩. কল টু অ্যাকশন বাটন */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-500/25 w-full sm:w-auto">
//             Start Your Journey
//           </button>
//           <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto">
//             Watch How it Works
//           </button>
//         </div>

//         {/* ৪. ট্রাস্ট ব্যাজ (ছোট করে) */}
//         <div className="mt-12 flex justify-center items-center gap-8 text-slate-400 text-sm font-medium opacity-80">
//           <div className="flex items-center gap-2">⭐ 4.9/5 Rating</div>
//           <div className="flex items-center gap-2">📍 500+ Destinations</div>
//         </div>
//       </div>

//       {/* নিচের দিকে একটি ডেকোরেটিভ শেপ */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//           <path d="M1200 120L0 120 309.19 8.18c403.15-112.5 790.81 0 890.81 0z" className="fill-slate-900"></path>
//         </svg>
//       </div>
//     </section>
//   )
// }

// export default Banner



"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Search, MapPin, Calendar, Sparkles, ArrowRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070",
    title: "Explore the World",
    subtitle: "Guided by Intelligence",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070",
    title: "Find Hidden Gems",
    subtitle: "Personalized for You",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
    title: "Peak Experiences",
    subtitle: "Plan Your Next Ascent",
  },
];

const Banner = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-110 group-[.swiper-slide-active]:scale-100"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-950/90" />
            </div>

            {/* Content Area */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                  <Sparkles size={14} className="animate-pulse" /> Your AI Travel Companion
                </span>

                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase">
                  {slide.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {slide.subtitle}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                  Let WanderAI craft your perfect itinerary in seconds. Discover, plan, and travel without the stress.
                </p>

                {/* Search Bar Integration */}
                <div className="max-w-4xl mx-auto w-full bg-white/10 dark:bg-slate-900/50 backdrop-blur-2xl p-2 rounded-2xl md:rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-2 mb-8">
                  <div className="flex flex-1 items-center gap-3 px-4 w-full border-b md:border-b-0 md:border-r border-white/10 py-2 md:py-0">
                    <MapPin className="text-blue-400" size={20} />
                    <input
                      type="text"
                      placeholder="Where to go?"
                      className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-3 px-4 w-full py-2 md:py-0">
                    <Calendar className="text-blue-400" size={20} />
                    <input
                      type="text"
                      placeholder="When?"
                      onFocus={(e) => (e.target.type = "date")}
                      className="bg-transparent border-none outline-none text-white placeholder-slate-400 w-full text-sm font-medium"
                    />
                  </div>
                  <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                    <Search size={18} /> <span>Explore Now</span>
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-white/60 text-xs font-bold uppercase tracking-widest mt-8">
                  <div className="flex items-center gap-2">⭐ 4.9 Global Rating</div>
                  <div className="flex items-center gap-2">📍 500+ AI Destinations</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M1200 120L0 120 309.19 8.18c403.15-112.5 790.81 0 890.81 0z"
            className="fill-slate-950"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Banner;