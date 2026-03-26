// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/src/context/AuthContext";
// import { 
//   LayoutDashboard, User, Map, Star, Users, 
//   Settings, BarChart3, LogOut, Plane, 
//   Sparkles
// } from "lucide-react";

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//   // ইউজার রোল অনুযায়ী মেনু আইটেম
//   const userLinks = [
//     { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
//     { name: "My Profile", href: "/profile", icon: User },
//     { name: "Plan New Trip", href: "/dashboard/create-trip", icon: Sparkles },
//     { name: "My Trips", href: "/dashboard/my-trips", icon: Map },
//     { name: "My Reviews", href: "/dashboard/my-reviews", icon: Star },
//   ];

//   const adminLinks = [
//     { name: "Admin Stats", href: "/dashboard/admin", icon: BarChart3 },
//     { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
//     { name: "Manage Content", href: "/dashboard/admin/content", icon: Plane },
//     { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
//   ];

//   const links = user?.role === "admin" ? [...userLinks, ...adminLinks] : userLinks;

//   return (
//     <div className="h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
//       <div className="p-6">
//         <h1 className="text-2xl font-black text-blue-600 tracking-tighter">Wander AI</h1>
//       </div>

//       <nav className="flex-1 px-4 space-y-2">
//         {links.map((link) => {
//           const Icon = link.icon;
//           const isActive = pathname === link.href;
//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
//                 isActive 
//                 ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none" 
//                 : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
//               }`}
//             >
//               <Icon size={20} />
//               {link.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-slate-100 dark:border-slate-800">
//         <button 
//           onClick={logout}
//           className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { 
  LayoutDashboard, User, Map, Star, 
  LogOut, Sparkles, ShieldCheck, ArrowRight
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // শুধুমাত্র ইউজারের পার্সোনাল মেনু আইটেম
  const userLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Plan New Trip", href: "/dashboard/create-trip", icon: Sparkles },
    { name: "My Trips", href: "/dashboard/my-trips", icon: Map },
    { name: "My Reviews", href: "/dashboard/my-reviews", icon: Star },
  ];

  return (
    <div className="h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">WANDER <span className="text-slate-900 dark:text-white">AI</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {/* জেনারাল ইউজার লিংকস */}
        {userLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none" 
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}

        {/* --- অ্যাডমিন মোড বাটন (শুধুমাত্র অ্যাডমিনদের জন্য) --- */}
        {user?.role === "admin" && (
          <div className="pt-6">
            <div className="px-4 mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</p>
            </div>
            <Link 
              href="/dashboard/admin" 
              className="group relative flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 relative z-10">
                <ShieldCheck size={20} className="text-blue-400 dark:text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-tight">Admin Mode</span>
                </div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}