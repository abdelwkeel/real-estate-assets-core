"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Mail, Layers, Users } from "lucide-react";

const navItems = [
  { label: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { label: "الشركات", href: "/companies", icon: Building2 },
  { label: "الخطابات", href: "/letters", icon: Mail },
  { label: "المستخرجات", href: "/extracts", icon: Layers },
  { label: "القرارات", href: "/decisions", icon: Users },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-e shadow-sm fixed right-0 top-0">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-indigo-600">إدارة الأصول</h1>
        <p className="text-xs text-gray-400">لوحة تحكم النظام</p>
      </div>

      <nav className="mt-6 space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
