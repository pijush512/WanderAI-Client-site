"use client";

import React, { useRef } from "react";
import { 
  Palmtree, Mountain, Building2, Tent, 
  Waves, TreePine, Anchor, Globe, Sparkles 
} from "lucide-react";

const categories = [
  { id: "all", label: "All Journeys", icon: Globe },
  { id: "beach", label: "Coastline", icon: Palmtree },
  { id: "hill", label: "Highlands", icon: Mountain },
  { id: "city", label: "Metropolis", icon: Building2 },
  { id: "forest", label: "Wilderness", icon: TreePine },
  { id: "camping", label: "Survival", icon: Tent },
  { id: "surfing", label: "Oceans", icon: Waves },
  { id: "heritage", label: "Ancient", icon: Anchor },
];

interface CategoryProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryScroll({ activeCategory, onCategoryChange }: CategoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (id: string, e: React.MouseEvent) => {
    onCategoryChange(id);
    (e.currentTarget as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="w-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl top-16 z-40 border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-16  overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex items-center justify-between gap-2 md:gap-0 overflow-x-auto py-6 no-scrollbar scroll-smooth snap-x px-4 md:px-10"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={(e) => handleCategoryClick(cat.id, e)}
                className={`group relative flex flex-col items-center flex-1 min-w-[90px] md:min-w-[110px] transition-all duration-500 snap-center outline-none ${
                  isActive ? "scale-105" : "hover:translate-y-[-2px]"
                }`}
              >
                <div className={`relative mb-3 p-4 rounded-[1.25rem] transition-all duration-500 overflow-hidden ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/20" 
                  : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:text-blue-600 group-hover:shadow-md"
                }`}>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 animate-pulse" />
                  )}
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} className="relative z-10" />
                </div>

                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 text-center ${
                  isActive 
                  ? "text-slate-900 dark:text-white" 
                  : "text-slate-400 dark:text-slate-500 group-hover:text-blue-500"
                }`}>
                  {cat.label}
                </span>

                <span className={`absolute -bottom-2 h-1 rounded-full transition-all duration-500 ${
                  isActive 
                  ? "w-6 bg-blue-600 shadow-lg shadow-blue-500/50" 
                  : "w-0 bg-transparent group-hover:w-3 group-hover:bg-blue-400/30"
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}