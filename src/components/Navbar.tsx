// "use client";
// import { Moon, Sun } from 'lucide-react'
// import { useTheme } from 'next-themes'
// import Link from 'next/link'
// import React from 'react'


// const Navbar = () => {
//    const {theme, setTheme} = useTheme();
  

//   return (
//     <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
//         {/* লোগো */}
//         <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
//           Wander<span className="text-slate-800">AI</span>
//         </Link>

//         {/* মেনু আইটেম */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//           <Link href="/" className="hover:text-blue-600 transition">Home</Link>
//           <Link href="/explore" className="hover:text-blue-600 transition">Explore</Link>
//           <Link href="/about" className="hover:text-blue-600 transition">About</Link>
//           <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
//         </div>

//         {/* অ্যাকশন বাটন */}
//         <div className="flex items-center gap-4">
          

//           <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors"
//     >
//       <Sun className="h-5 w-5 hidden dark:block text-yellow-400" />
//       <Moon className="h-5 w-5 block dark:hidden text-slate-700" />
//     </button>


//           <Link href="/auth/login" className="text-sm font-semibold text-slate-700 hidden sm:block">
//             Login
//           </Link>
//           <Link href="/auth/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md">
//             Get Started
//           </Link>
//         </div>
        
//       </div>
//     </nav>
//   )
// }

// export default Navbar




"use client";
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch এড়ানোর জন্য মাউন্ট স্টেট চেক করা জরুরি
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          Wander<span className="text-slate-800 dark:text-white">AI</span>
        </Link>

        {/* মেনু আইটেম */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          <Link href="/explore" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Explore</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="flex items-center gap-4">
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <Link href="/auth/login" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden sm:block">
            Login
          </Link>
          <Link href="/auth/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md">
            Get Started
          </Link>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar