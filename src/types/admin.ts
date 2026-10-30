import { ComponentType } from "react";
import { LucideProps } from "lucide-react";

  export type AdminPage =
  | "profile"
  | "services"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "metrics"
  | "seo"
  | "settings";

export interface AdminPageConfig {
  id: AdminPage;
  label: string;
  icon: ComponentType<LucideProps>;
}

export interface AdminNotification {
  type: "success" | "error";
  message: string;
}

