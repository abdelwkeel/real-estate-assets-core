"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Home,
  Building2,
  Gavel,
  FileText,
  Layers,
  ShieldCheck,
  Users,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname() || "";
  const { collapsed, toggleSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const links = [
    {
      href: "/dashboard",
      label: "لوحة التحكم",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "إدارة الأصول",
      icon: <Building2 className="w-5 h-5" />,
      submenu: [
        { href: "/assets", label: "كل الأصول" },
        { href: "/assets/new", label: "إضافة أصل" },
      ],
    },
    {
      href: "/companies",
      label: "إدارة الشركات",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      href: "/auctions",
      label: "إدارة المزادات",
      icon: <Gavel className="w-5 h-5" />,
    },
    {
      href: "/letters",
      label: "إدارة الخطابات",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      href: "/board-extracts",
      label: "إدارة المستخرجات",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      href: "/board-decisions",
      label: "إدارة القرارات",
      icon: <ShieldCheck className="w-5 h-5" />,
    },

    {
      href: "/users",
      label: "إدارة المستخدمين",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 250 }}
      animate={{ width: collapsed ? 80 : 250 }}
      transition={{ duration: 0.3 }}
      className="h-screen fixed top-0 right-0 bg-white shadow-xl border-l rtl:border-l-0 rtl:border-r rtl:border-gray-300 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        {!collapsed && (
          <span className="text-lg font-bold text-gray-700">القائمة</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          {collapsed ? (
            <ChevronsLeft className="w-6 h-6" />
          ) : (
            <ChevronsRight className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
        {links.map((link) => (
          <div key={link.label}>
            {link.href && (
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition",
                  pathname.startsWith(link.href)
                    ? "bg-gray-200 font-bold text-blue-600"
                    : "text-gray-700"
                )}
              >
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </Link>
            )}

            {link.submenu && (
              <div>
                <button
                  onClick={() => toggleSubmenu(link.label)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-100 transition w-full",
                    openSubmenu === link.label
                      ? "bg-gray-200 font-bold text-blue-600"
                      : "text-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {!collapsed && <span>{link.label}</span>}
                  </div>
                  {!collapsed &&
                    (openSubmenu === link.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                <AnimatePresence>
                  {openSubmenu === link.label && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col pr-6 gap-2 mt-1"
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "p-2 rounded-lg hover:bg-gray-100 transition text-sm",
                            pathname === sub.href
                              ? "bg-gray-200 font-bold text-blue-600"
                              : "text-gray-600"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ))}

        <form action="/api/auth/signout" method="POST" className="mt-4">
          <button
            type="submit"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 transition w-full"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </form>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
