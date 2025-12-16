"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const router = useRouter();

  // ✅ Sidebar state here
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-cream-50 pt-20">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      {/* <div className="  z-[50]">
      </div> */}

      <main
        className={`
          flex-1 p-6 md:p-8 transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
