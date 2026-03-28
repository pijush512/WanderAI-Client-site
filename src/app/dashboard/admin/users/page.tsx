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
// user role
  const handleToggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole.toLowerCase() === "admin" ? "user" : "admin";
    try {
        const res = await axiosInstance.patch(`/admin/users/${id}/role`, { role: newRole });
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
        showAlert(`Role updated to ${newRole.toUpperCase()}`, "success");
      }
    } catch (err) {
      showAlert("Role update failed", "error");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
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

  // Delete user
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            User <span className="text-blue-600">Base</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Direct Database Access</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
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
      
      {filteredUsers.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
          <UserMinus className="mx-auto text-slate-200" size={48} />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">No explorers found in grid</p>
        </div>
      )}
    </div>
  );
}