// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "@/src/context/AuthContext";
// import { 
//   Bell, 
//   Search, 
//   User, 
//   Settings, 
//   LogOut, 
//   ChevronDown, 
//   Menu,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function DashboardNavbar() {
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-50">
//       <div className="flex items-center gap-4 flex-1 max-w-md">
//         <button className="md:hidden text-slate-500">
//           <Menu size={24} />
//         </button>
//         <form onSubmit={handleSearch} className="relative w-full hidden md:block">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search trips, places..." 
//             className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white"
//           />
//         </form>
//       </div>
//       <div className="flex items-center gap-3">
//         <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative">
//           <Bell size={20} />
//           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
//         </button>

//         <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block"></div>
//         <div className="relative">
//           <button 
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center gap-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
//           >
//             <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 overflow-hidden">
//               {user?.image ? (
//                 <img 
//                   src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`} 
//                   alt="User" 
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User size={20} />
//               )}
//             </div>
            
//             <div className="hidden md:block text-left">
//               <p className="text-sm font-bold text-slate-900 dark:text-white leading-none capitalize">
//                 {user?.name || "User Name"}
//               </p>
//               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
//                 {user?.role || "User"}
//               </p>
//             </div>
//             <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
//               <Link 
//                 href="/profile"
//                 className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 <User size={18} />
//                 My Profile
//               </Link>
//               <Link 
//                 href="/dashboard/settings"
//                 className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 <Settings size={18} />
//                 Account Settings
//               </Link>
//               <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>
//               <button 
//                 onClick={logout}
//                 className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold"
//               >
//                 <LogOut size={18} />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }




"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Layout থেকে আসা onMenuClick প্রপস রিসিভ করছি
export default function DashboardNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        {/* মোবাইল মেনু বাটন - এখন ক্লিক করলে সাইডবার খুলবে */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-slate-500 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <form onSubmit={handleSearch} className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips, places..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-blue-500 outline-none transition-all dark:text-white"
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block"></div>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 overflow-hidden">
              {user?.image ? (
                <img 
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`} 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none capitalize">
                {user?.name || "User Name"}
              </p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                {user?.role || "User"}
              </p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
              <Link 
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={18} />
                My Profile
              </Link>
              <Link 
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings size={18} />
                Account Settings
              </Link>
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}