"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/data/instructors";
import { addCustomReview, getCustomReviews } from "@/lib/reviews";

export function useReviews(instructorId: string, staticReviews: Review[]) {
  // Capture staticReviews in a ref so useEffect doesn't depend on the array reference
  const staticRef = useRef(staticReviews);

  // Initialize state with static reviews — rendered immediately, no flash
  const [reviews, setReviews] = useState<Review[]>(staticReviews);

  // Merge localStorage reviews on mount (custom reviews only)
  useEffect(() => {
    const custom = getCustomReviews(instructorId);
    if (custom.length > 0) {
      setReviews([...staticRef.current, ...custom]);
    }
  }, [instructorId]);

  const addReview = useCallback(
    (review: Review) => {
      addCustomReview(instructorId, review);
      setReviews((prev) => [...prev, review]);
    },
    [instructorId]
  );

  return { reviews, addReview };
}
