// src/context/SidebarContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext({
  collapsed: false,
  toggleSidebar: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCollapsed: (_value: boolean) => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Auto collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // لتطبيق الحالة عند تحميل الصفحة
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
