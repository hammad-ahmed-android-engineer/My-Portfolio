import { ComponentType } from "react";
import { LucideProps } from "lucide-react";

export type AdminTab =
  | "profile"
  | "services"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "metrics"
  | "seo"
  | "settings";

export interface AdminTabConfig {
  id: AdminTab;
  label: string;
  icon: ComponentType<LucideProps>;
}

export interface AdminNotification {
  type: "success" | "error";
  message: string;
}

