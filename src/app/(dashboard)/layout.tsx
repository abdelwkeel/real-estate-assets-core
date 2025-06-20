"use client";

import DashboardContent from "@/components/DashboardContent";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </SessionProvider>
  );
}
