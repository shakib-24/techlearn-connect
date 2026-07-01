import type { Instructor } from "@/data/instructors";

const KEY = "techlearn_custom_instructors";

export function getCustomInstructors(): Instructor[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Instructor[]) : [];
  } catch {
    return [];
  }
}

export function addCustomInstructor(instructor: Instructor): void {
  const existing = getCustomInstructors();
  localStorage.setItem(KEY, JSON.stringify([...existing, instructor]));
}
