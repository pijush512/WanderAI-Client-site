// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   Search, Filter, MoreVertical, 
//   Trash2, ShieldCheck, UserMinus, Mail, 
//   Calendar, CheckCircle2, XCircle
// } from "lucide-react";
// import axiosInstance from "@/src/app/lib/axiosInstance";
// import { showAlert } from "@/src/app/lib/alerts";

// export default function ManageUsersPage() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ডেমো ডাটা (এপিআই রেডি না থাকলে এটি দেখাবে)
//   const demoUsers = [
//     { _id: "1", name: "Anisur Rahman", email: "anis@example.com", role: "admin", status: "active", createdAt: "2026-01-15" },
//     { _id: "2", name: "Sumiya Akter", email: "sumiya@travel.com", role: "user", status: "active", createdAt: "2026-02-20" },
//     { _id: "3", name: "Rakib Hasan", email: "rakib@nomad.com", role: "user", status: "suspended", createdAt: "2026-03-01" },
//   ];

//   // ১. ইউজার ডাটা ফেচ করার ফাংশন
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/admin/users");
//       // যদি ডাটাবেজে ইউজার থাকে তবে সেগুলো দেখাবে, নাহলে ডেমো ডাটা
//       setUsers(res.data.data && res.data.data.length > 0 ? res.data.data : demoUsers);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       setUsers(demoUsers); // এরর হলে ডেমো ডাটা দেখাবে
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to remove this explorer?")) {
//       try {
//         await axiosInstance.delete(`/admin/users/${id}`);
//         setUsers(users.filter(u => u._id !== id));
//         showAlert("User removed successfully", "success");
//       } catch (err) {
//         showAlert("Failed to delete user", "error");
//       }
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-8">
      
//       {/* --- Header Section --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//         <div>
//           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
//             User <span className="text-blue-600">Base</span>
//           </h2>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Manage platform access and permissions</p>
//         </div>
        
//         <div className="flex items-center gap-3">
//            <div className="relative group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search by name or email..." 
//                 className="pl-12 pr-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 outline-none text-[11px] font-bold w-full md:w-80 focus:ring-4 ring-blue-500/10 transition-all"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//            </div>
//            <button className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
//               <Filter size={20} />
//            </button>
//         </div>
//       </div>

//       {/* --- Users Table --- */}
//       <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
//                 <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Explorer Identity</th>
//                 <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Level</th>
//                 <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
//                 <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined Date</th>
//                 <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
//                 <tr key={u._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group">
//                   <td className="p-8">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
//                         {u.name.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{u.name}</p>
//                         <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
//                           <Mail size={12} />
//                           <span className="text-[10px] font-bold">{u.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-8">
//                     <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
//                       u.role === 'admin' 
//                         ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30' 
//                         : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
//                     }`}>
//                       <ShieldCheck size={12} /> {u.role}
//                     </div>
//                   </td>
//                   <td className="p-8">
//                     <div className={`flex items-center gap-2 text-[9px] font-black uppercase ${
//                       u.status === 'active' ? 'text-emerald-500' : 'text-rose-500'
//                     }`}>
//                       {u.status === 'active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
//                       {u.status}
//                     </div>
//                   </td>
//                   <td className="p-8">
//                     <div className="flex items-center gap-2 text-slate-500">
//                       <Calendar size={14} />
//                       <span className="text-[10px] font-bold">{u.createdAt}</span>
//                     </div>
//                   </td>
//                   <td className="p-8 text-right">
//                     <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button 
//                         onClick={() => handleDelete(u._id)}
//                         className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
//                         title="Delete User"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                       <button 
//                         className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white transition-all shadow-sm"
//                         title="User Details"
//                       >
//                         <MoreVertical size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Empty State */}
//         {users.length === 0 && !loading && (
//           <div className="p-20 text-center space-y-4">
//             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
//               <UserMinus size={40} />
//             </div>
//             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No explorers found in the database</p>
//           </div>
//         )}
//       </div>

//       {/* --- Pagination --- */}
//       <div className="flex items-center justify-between px-8">
//         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {users.length} Total Users</p>
//         <div className="flex gap-2">
//           <button className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase disabled:opacity-50" disabled>Prev</button>
//           <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, Filter, Trash2, ShieldCheck, UserMinus, Mail, 
  CheckCircle2, XCircle, RefreshCw, UserCircle, ChevronDown, UserCog
} from "lucide-react";
import axiosInstance from "@/src/app/lib/axiosInstance";
import { showAlert } from "@/src/app/lib/alerts";
import Link from "next/link";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // ১. ডাটা লোড করা
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/users");
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      showAlert("Failed to connect to Database", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ২. রোল পরিবর্তন (Admin <-> User)
  const handleToggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole.toLowerCase() === "admin" ? "user" : "admin";
    try {
      // const res = await axiosInstance.patch(`/admin/users/${id}/role`, { role: newRole });
      // const res = await axiosInstance.patch(`/admin/users/${id}/role`, { role: newRole });
        const res = await axiosInstance.patch(`/admin/users/${id}/role`, { role: newRole });
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
        showAlert(`Role updated to ${newRole.toUpperCase()}`, "success");
      }
    } catch (err) {
      showAlert("Role update failed", "error");
    }
  };

  // ৩. স্ট্যাটাস পরিবর্তন (Active <-> Suspended)
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // যদি status undefined থাকে তবে default 'active' ধরবে
    const status = currentStatus ? currentStatus.toLowerCase() : "active";
    const newStatus = status === "active" ? "suspended" : "active";
    
    try {
      const res = await axiosInstance.patch(`/admin/users/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
        showAlert(`User is now ${newStatus}`, "success");
      }
    } catch (err) {
      showAlert("Status update failed", "error");
    }
  };

  // ৪. ইউজার ডিলিট
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
        showAlert("User removed successfully", "success");
      } catch (err) {
        showAlert("Deletion failed", "error");
      }
    }
  };

  // ৫. সার্চ এবং ফিল্টার লজিক
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const name = user.name || "";
      const email = user.email || "";
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, filterRole]);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Data...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            User <span className="text-blue-600">Base</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Direct Database Access</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           {/* Search */}
           <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search name/email..." 
                className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 outline-none text-[11px] font-bold w-full md:w-64 focus:ring-2 ring-blue-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           
           {/* Filter with Icon */}
           <div className="relative flex items-center">
             <Filter size={14} className="absolute left-4 text-slate-400" />
             <select 
               className="pl-10 pr-10 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase outline-none appearance-none cursor-pointer"
               value={filterRole}
               onChange={(e) => setFilterRole(e.target.value)}
             >
               <option value="all">All Roles</option>
               <option value="admin">Admins</option>
               <option value="user">Users</option>
             </select>
             <ChevronDown size={14} className="absolute right-4 text-slate-400 pointer-events-none" />
           </div>

           <button onClick={fetchUsers} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md">
             <RefreshCw size={18} />
           </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Explorer</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Access</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Protocol</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isStatusActive = (u.status || 'active').toLowerCase() === 'active';
                const isAdmin = (u.role || 'user').toLowerCase() === 'admin';

                return (
                  <tr key={u._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                          {u.name ? u.name.charAt(0) : "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 dark:text-white uppercase text-sm truncate">{u.name || "Unknown"}</p>
                          <p className="text-[10px] font-bold text-slate-400 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role Toggle Button */}
                    <td className="p-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleToggleRole(u._id, u.role || 'user')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all shadow-sm active:scale-95 ${
                            isAdmin ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          <UserCog size={12} /> {u.role || 'user'}
                        </button>
                      </div>
                    </td>

                    {/* Status Toggle Button */}
                    <td className="p-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleToggleStatus(u._id, u.status || 'active')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase transition-all ring-1 active:scale-95 ${
                            isStatusActive 
                              ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' 
                              : 'bg-rose-50 text-rose-500 ring-rose-100'
                          }`}
                        >
                          {isStatusActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {u.status || 'active'}
                        </button>
                      </div>
                    </td>

                    {/* Action Buttons (Always Visible) */}
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(u._id)}
                          className="p-2.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
          <UserMinus className="mx-auto text-slate-200" size={48} />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">No explorers found in grid</p>
        </div>
      )}
    </div>
  );
}