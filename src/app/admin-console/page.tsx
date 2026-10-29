import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Panel | Portfolio Content Management",
  description: "Portfolio Admin Panel for Content Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminConsolePage() {
  return <AdminDashboard />;
}
