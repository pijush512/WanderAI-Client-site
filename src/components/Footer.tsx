"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail, Plane, MapPin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 tracking-tight">
              <Plane className="rotate-45" size={28} />
              Wander<span className="text-slate-900 dark:text-white">AI</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "Your intelligent travel companion. We use AI to craft personalized itineraries that turn your dream vacations into reality."
            </p>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
              <MapPin size={16} className="text-blue-600" />
              <span className="text-xs font-medium">Based in Tangail, Bangladesh</span>
            </div>
          </div>

          {/* 2. Exploration Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="/howItWorks" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support & Legal */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all hover:pl-1">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter & Social */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Get Updates</h3>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-3 px-4 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Send size={16} />
              </button>
            </div>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-900 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <Facebook size={18} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-900 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <Twitter size={18} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-900 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <Instagram size={18} />
              </Link>
              <Link href="https://github.com/pijush512" target="_blank" className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-900 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <Github size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} WanderAI Inc. Designed by Pijush Sarker.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Mail size={14} className="text-blue-600" />
              <span>support@wanderai.com</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 hidden md:block" />
            <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <span>English (US)</span>
              <span>USD ($)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;