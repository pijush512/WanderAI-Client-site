import DashboardNavbar from "@/src/components/dashboard/DashboardNavbar";
import Sidebar from "@/src/components/dashboard/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Top Navbar */}
        <DashboardNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}