"use client";

import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/data/instructors";
import { supabase } from "@/lib/supabase";

interface ReviewRow {
  id: string;
  reviewer_type: string;
  rating: number;
  comment: string;
  review_date: string;
}

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    reviewerType: row.reviewer_type,
    rating: row.rating,
    comment: row.comment,
    date: row.review_date,
  };
}

export function useReviews(instructorId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("instructor_id", instructorId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch reviews:", error.message);
      return;
    }
    setReviews((data ?? []).map(toReview));
  }, [instructorId]);

  useEffect(() => {
    setLoading(true);
    fetchReviews().finally(() => setLoading(false));
  }, [fetchReviews]);

  const addReview = useCallback(
    async (input: { reviewerType: string; rating: number; comment: string }) => {
      const now = new Date();
      const reviewDate = `${now.getFullYear()}年${now.getMonth() + 1}月`;

      const { data, error } = await supabase
        .from("reviews")
        .insert({
          instructor_id: instructorId,
          reviewer_type: input.reviewerType,
          rating: input.rating,
          comment: input.comment,
          review_date: reviewDate,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to submit review:", error.message);
        return { error: error.message };
      }
      setReviews((prev) => [toReview(data as ReviewRow), ...prev]);
      return { error: null };
    },
    [instructorId]
  );

  return { reviews, loading, addReview };
}
