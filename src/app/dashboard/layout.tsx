"use client";
import DashboardNavbar from "@/src/components/dashboard/DashboardNavbar";
import Sidebar from "@/src/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">

        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}