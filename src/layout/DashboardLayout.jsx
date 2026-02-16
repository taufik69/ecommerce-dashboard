import React from 'react'
import { Outlet } from "react-router-dom";
import ThemeToggle from "@/components/theme-toggle";
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <AppSidebar className="flex-shrink-0" />

        {/* Main content */}
        <main className="flex-1 min-h-screen p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          <Outlet />
        </main>

        {/* Theme Toggle (fixed on top right) */}
        <ThemeToggle className="fixed top-4 right-4 z-50" />
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout