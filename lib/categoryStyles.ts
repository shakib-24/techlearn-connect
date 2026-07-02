import { Brain, Cloud, Code, Palette, Server, type LucideIcon } from "lucide-react";
import type { Instructor } from "@/data/instructors";

export const CATEGORY_ICON: Record<Instructor["category"], LucideIcon> = {
  Frontend: Code,
  Backend: Server,
  Infrastructure: Cloud,
  "UI/UX Design": Palette,
  "AI/Data Science": Brain,
};

export const CATEGORY_BADGE: Record<Instructor["category"], string> = {
  Frontend: "bg-blue-100 text-blue-700",
  Backend: "bg-green-100 text-green-700",
  Infrastructure: "bg-orange-100 text-orange-700",
  "UI/UX Design": "bg-purple-100 text-purple-700",
  "AI/Data Science": "bg-teal-100 text-teal-700",
};

export const CATEGORY_AVATAR_COLOR: Record<Instructor["category"], string> = {
  Frontend: "#3B82F6",
  Backend: "#22C55E",
  Infrastructure: "#F97316",
  "UI/UX Design": "#A855F7",
  "AI/Data Science": "#14B8A6",
};
