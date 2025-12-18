"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const router = useRouter();

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
    <div className="flex min-h-screen pt-20 bg-gray-50">
      {/* Sidebar - Fixed on left for desktop */}
      <Sidebar />

      {/* Main Content Area - Scrollable on right */}
      <div className="flex-1 lg:ml-64 min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">CC</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Chef&apos;s Choice</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content - Scrollable */}
        <main className="pt-0 pb-20 lg:pt-0 h-full">
          <div className="p-4 lg:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}