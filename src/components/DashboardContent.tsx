"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PageLoader from "@/components/PageLoader";
import { useSidebar } from "@/context/SidebarContext";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();
  const { data: session, status } = useSession();

  if (status === "loading") return <PageLoader />;
  if (!session) return <div>غير مصرح لك بالدخول. الرجاء تسجيل الدخول.</div>;

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "mr-20" : "mr-60"
        }`}
      >
        <Header userName={session.user?.name || "مستخدم"} />
        <main className="p-6">
          <div className="bg-white text-black rounded-lg shadow p-6 min-h-[calc(100vh-100px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
