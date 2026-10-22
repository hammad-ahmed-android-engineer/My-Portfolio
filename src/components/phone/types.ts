export type DemoApp = "yamamacm" | "ecommerce" | "edgelighting" | "toolbox";

export type EcommerceStep =
  | "branch"
  | "dashboard"
  | "category_items"
  | "item_details"
  | "cart"
  | "checkout"
  | "order_details"
  | "rewards"
  | "profile";

export type BottomTab = "home" | "rewards" | "cart" | "orders" | "profile";

export type EdgeType =
  | "emojis"
  | "neon_glow"
  | "shapes"
  | "snake_run"
  | "dotted_chase"
  | "double_ring";

export type ColorPalette =
  | "rainbow"
  | "cyberpunk"
  | "sunset"
  | "cotton_candy"
  | "emerald"
  | "cyan"
  | "purple"
  | "amber";

export type EmojiBorder = "⭐" | "❤️" | "🔥" | "⚡" | "🌸" | "🦋" | "💎" | "✨";
export type ShapeBorder = "★" | "♥" | "●" | "▲" | "⬡" | "◆";
export type NotchStyle = "punch_hole" | "infinity_u" | "infinity_v" | "dynamic_island";

export interface SarCandidate {
  id: string;
  name: string;
  role: string;
  station: string;
  shift: string;
  status: "present" | "absent" | "break";
  checkInTime: string;
}
