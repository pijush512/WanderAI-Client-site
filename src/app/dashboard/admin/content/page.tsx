"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  FileText, Search, Trash2, RefreshCw, 
  Loader2, User as UserIcon, DollarSign, Calendar,
  ChevronLeft, ChevronRight
} from "lucide-react";
import axiosInstance from "@/src/app/lib/axiosInstance";
import { showAlert } from "@/src/app/lib/alerts";

export default function ManageContentPage() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // প্রতি পেজে কয়টি ডাটা দেখাবে

  const fetchContents = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/contents");
      if (res.data.success) {
        // নতুন কন্টেন্ট আগে দেখানোর জন্য সর্টিং (Latest First)
        const sortedData = res.data.data.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setContents(sortedData);
      }
    } catch (err: any) {
      showAlert("Failed to load live data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContents(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      try {
        await axiosInstance.delete(`/admin/contents/${id}`);
        setContents(prev => prev.filter(c => c._id !== id));
        showAlert("Content deleted", "success");
      } catch (err) { showAlert("Deletion failed", "error"); }
    }
  };

  // ১. সার্চ ফিল্টারিং
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const title = item.title || item.destination || "";
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [contents, searchTerm]);

  // ২. প্যাগিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Syncing Database...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Content <span className="text-rose-600">Archive</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Manage all database records</p>
        </div>
        
        <button onClick={fetchContents} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl text-slate-500 hover:text-rose-600 transition-all shadow-sm active:scale-90">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* --- Search --- */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Quick search..." 
          className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 rounded-2xl outline-none text-[11px] font-bold border border-slate-200 dark:border-slate-800 focus:border-rose-500 transition-all shadow-sm"
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* --- Table --- */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Details</th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentItems.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group">
                <td className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 dark:text-white uppercase text-sm leading-tight">
                        {item.title || item.destination}
                      </p>
                      <div className="flex flex-wrap gap-x-4 mt-2">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                          <UserIcon size={10} className="text-rose-500" /> {item.user?.name || "Explorer"}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                          <DollarSign size={10} className="text-emerald-500" /> {item.budget || "N/A"}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase">
                          <Calendar size={10} className="text-amber-500" /> {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="p-8 text-right">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- Pagination Controls --- */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContents.length)} of {filteredContents.length}
          </p>
          
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-white transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-white transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}