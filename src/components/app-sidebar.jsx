import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  LayoutGrid,
  Home,
  Box,
  PenLine,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const storedAdmin = localStorage.getItem("admin");
const admin = storedAdmin ? JSON.parse(storedAdmin) : null;

// Sample data
const data = {
  user: {
    name: admin?.name || "Admin",
    email: admin?.email || "admin@gmail.com",
    avatar: admin?.avatar || "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
      items: [{ title: "Home", url: "/home" }],
    },
    {
      title: "Category Management",
      url: "#",
      icon: LayoutGrid,
      isActive: true,
      items: [
        { title: "Add Category", url: "/add-category" },
        { title: "Category List", url: "/category-list" },
      ],
    },

    {
      title: "Product Management",
      url: "#",
      icon: Box,
      isActive: true,
      items: [
        { title: "Add Product", url: "/add-product" },
        { title: "Product List", url: "/product-list" },
      ],
    },
    {
      title: "Order Management",
      url: "#",
      icon: PenLine,
      isActive: true,
      items: [{ title: "Order List", url: "/order-list" }],
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
