"use client";

import { useSidebar } from "@/context/SidebarContext";

export default function SidebarSettingsPage() {
  const { collapsed, toggleSidebar, setSidebar } = useSidebar();

  return (
    <div className="text-right space-y-4">
      <h1 className="text-2xl font-bold mb-4">إعدادات Sidebar</h1>
      <p>الحالة الحالية: {collapsed ? "مصغر" : "مفتوح"}</p>
      <button
        onClick={toggleSidebar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        تبديل Sidebar
      </button>
      <button
        onClick={() => setSidebar(false)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        فتح Sidebar
      </button>
      <button
        onClick={() => setSidebar(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        تصغير Sidebar
      </button>
    </div>
  );
}
