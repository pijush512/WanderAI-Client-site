import React from 'react'

const Banner = () => {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* ১. ব্যাকগ্রাউন্ড ইমেজ ও ওভারলে */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900"></div>
      </div>

      {/* ২. কন্টেন্ট এরিয়া */}
      <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in zoom-in duration-700">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
          Your Smart AI Travel Partner
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Explore the World <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Guided by AI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          WanderAI picks the best destinations, plans your itinerary, and finds 
          the best deals so you can just pack your bags and go.
        </p>

        {/* ৩. কল টু অ্যাকশন বাটন */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-500/25 w-full sm:w-auto">
            Start Your Journey
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto">
            Watch How it Works
          </button>
        </div>

        {/* ৪. ট্রাস্ট ব্যাজ (ছোট করে) */}
        <div className="mt-12 flex justify-center items-center gap-8 text-slate-400 text-sm font-medium opacity-80">
          <div className="flex items-center gap-2">⭐ 4.9/5 Rating</div>
          <div className="flex items-center gap-2">📍 500+ Destinations</div>
        </div>
      </div>

      {/* নিচের দিকে একটি ডেকোরেটিভ শেপ */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 120 309.19 8.18c403.15-112.5 790.81 0 890.81 0z" className="fill-slate-900"></path>
        </svg>
      </div>
    </section>
  )
}

export default Banner
