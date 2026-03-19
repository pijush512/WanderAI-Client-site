// import Link from 'next/link'
// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
//           {/* ১. ব্র্যান্ড ইনফো */}
//           <div className="col-span-1 md:col-span-1">
//             <Link href="/" className="text-2xl font-bold text-white tracking-tight">
//               Wander<span className="text-blue-500">AI</span>
//             </Link>
//             <p className="mt-4 text-sm leading-relaxed">
//               Your smart AI travel companion. Plan, explore, and discover the world's hidden gems with ease.
//             </p>
//           </div>

//           {/* ২. কুইক লিঙ্কস */}
//           <div>
//             <h4 className="text-white font-semibold mb-6">Explore</h4>
//             <ul className="space-y-4 text-sm">
//               <li><Link href="/destinations" className="hover:text-blue-400 transition">Destinations</Link></li>
//               <li><Link href="/ai-planner" className="hover:text-blue-400 transition">AI Planner</Link></li>
//               <li><Link href="/pricing" className="hover:text-blue-400 transition">Pricing Plans</Link></li>
//             </ul>
//           </div>

//           {/* ৩. কোম্পানি */}
//           <div>
//             <h4 className="text-white font-semibold mb-6">Company</h4>
//             <ul className="space-y-4 text-sm">
//               <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
//               <li><Link href="/blogs" className="hover:text-blue-400 transition">Travel Blogs</Link></li>
//               <li><Link href="/careers" className="hover:text-blue-400 transition">Careers</Link></li>
//             </ul>
//           </div>

//           {/* ৪. নিউজলেটার বা সাপোর্ট */}
//           <div>
//             <h4 className="text-white font-semibold mb-6">Support</h4>
//             <ul className="space-y-4 text-sm">
//               <li><Link href="/contact" className="hover:text-blue-400 transition">Help Center</Link></li>
//               <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
//               <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
//             </ul>
//           </div>

//         </div>

//         {/* নিচের কপিরাইট অংশ */}
//         <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-xs">
//             © {new Date().getFullYear()} WanderAI. All rights reserved.
//           </p>
//           <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
//             <a href="#" className="hover:text-white transition">FB</a>
//             <a href="#" className="hover:text-white transition">TW</a>
//             <a href="#" className="hover:text-white transition">IG</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer


"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* ১. ব্র্যান্ড সেকশন */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              Wander<span className="text-slate-800 dark:text-white">AI</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              আপনার ভ্রমণকে সহজ এবং স্মার্ট করতে আমাদের AI সবসময় আপনার পাশে আছে। নতুন জায়গা খুঁজুন এক ক্লিকেই।
            </p>
          </div>

          {/* ২. কুইক লিংকস */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/explore" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Explore Hotels</Link></li>
              <li><Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">AI Guide</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Support</Link></li>
            </ul>
          </div>

          {/* ৩. লিগ্যাল সেকশন */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link></li>
              <li><Link href="/cookie" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* ৪. নিউজলেটার/কন্টাক্ট */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:text-blue-600 transition"><Facebook size={18} /></Link>
              <Link href="#" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:text-blue-600 transition"><Twitter size={18} /></Link>
              <Link href="#" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:text-blue-600 transition"><Instagram size={18} /></Link>
              <Link href="#" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:text-blue-600 transition"><Github size={18} /></Link>
            </div>
          </div>
        </div>

        {/* বটম কপিরাইট */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} WanderAI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <Mail size={14} />
            <span>hello@wanderai.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
