import type { Review } from "@/data/instructors";

const KEY = "techlearn_custom_reviews";

type ReviewMap = { [instructorId: string]: Review[] };

function getMap(): ReviewMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReviewMap) : {};
  } catch {
    return {};
  }
}

export function getCustomReviews(instructorId: string): Review[] {
  return getMap()[instructorId] ?? [];
}

export function addCustomReview(instructorId: string, review: Review): void {
  const map = getMap();
  map[instructorId] = [...(map[instructorId] ?? []), review];
  localStorage.setItem(KEY, JSON.stringify(map));
}
