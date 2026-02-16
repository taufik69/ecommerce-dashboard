import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./page/dashboard";
import ThemeToggle from "@/components/theme-toggle";
import AddCategory from "./page/AddCategory";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-category" element={<AddCategory />} />
        </Routes>

        <ThemeToggle />
      </div>
    </BrowserRouter>
  );
}
