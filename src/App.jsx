import React from "react";
import Dashboard from "./page/dashboard";
import ThemeToggle from "@/components/theme-toggle";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Dashboard />
      <ThemeToggle />
    </div>
  );
}
