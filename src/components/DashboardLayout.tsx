"use client";

import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "mr-20" : "mr-64"
        }`}
      >
        <Header />
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6 min-h-[calc(100vh-100px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
