"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useReviews } from "@/hooks/useReviews";
import LoginRequiredNotice from "@/components/LoginRequiredNotice";

const REVIEWER_TYPES = ["企業研修担当者", "個人受講者", "国際学生", "その他"] as const;

function Stars({ rating, interactive = false, onSelect }: {
  rating: number;
  interactive?: boolean;
  onSelect?: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || rating) : rating;

  if (!interactive) {
    return (
      <span>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ color: i <= display ? "#F59E0B" : "#D1D5DB" }}>★</span>
        ))}
      </span>
    );
  }

  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect?.(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 leading-none"
          style={{ color: i <= display ? "#F59E0B" : "#D1D5DB" }}
          aria-label={`${i}点`}
        >
          ★
        </button>
      ))}
    </span>
  );
}

interface FormValues {
  reviewerType: string;
  rating: number;
  comment: string;
}
interface FormErrors {
  reviewerType?: string;
  rating?: string;
  comment?: string;
}

const EMPTY: FormValues = { reviewerType: "", rating: 0, comment: "" };

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.reviewerType) e.reviewerType = "受講者タイプを選択してください";
  if (v.rating === 0) e.rating = "評価を選択してください";
  if (v.comment.trim().length < 10) e.comment = "コメントは10文字以上入力してください";
  return e;
}

export default function ReviewSection({
  instructorId,
}: {
  instructorId: string;
}) {
  const { reviews, addReview } = useReviews(instructorId);
  const { isLoggedIn } = useAuth();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const INITIAL_COUNT = 2;
  const visibleReviews = expanded ? reviews : reviews.slice(0, INITIAL_COUNT);
  const remaining = reviews.length - INITIAL_COUNT;

  const avgRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const { error } = await addReview({
      reviewerType: values.reviewerType,
      rating: values.rating,
      comment: values.comment.trim(),
    });
    setSubmitting(false);

    if (error) {
      setSubmitError("レビューの投稿に失敗しました。時間をおいて再度お試しください");
      return;
    }

    setValues(EMPTY);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputBase =
    "w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* ヘッダー + 平均評価 */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#1E3A5F]">受講者の声</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <Stars rating={Math.round(avgRating)} />
            <span className="font-bold text-[#1E3A5F] text-sm">{avgRating}</span>
            <span className="text-[#64748B] text-xs">（{reviews.length}件）</span>
          </div>
        )}
      </div>

      {/* レビュー一覧 */}
      {reviews.length === 0 ? (
        <p className="text-[#64748B] text-sm mb-6">まだレビューがありません。最初の投稿者になりましょう。</p>
      ) : (
        <div className="mb-6">
          <ul className="space-y-4">
            {visibleReviews.map((r) => (
              <li key={r.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} />
                    <span className="text-xs text-[#64748B] font-medium px-2 py-0.5 bg-[#F1F5F9] rounded-full">
                      {r.reviewerType}
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B]">{r.date}</span>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">{r.comment}</p>
              </li>
            ))}
          </ul>
          {reviews.length > INITIAL_COUNT && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 text-sm font-medium text-[#3B82C4] hover:text-[#1E3A5F] transition-colors"
            >
              {expanded ? "閉じる" : `もっと見る（あと${remaining}件）`}
            </button>
          )}
        </div>
      )}

      {/* 投稿フォーム */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="font-semibold text-[#1E3A5F] text-sm mb-4">レビューを投稿する</h3>

        {!isLoggedIn ? (
          <LoginRequiredNotice
            message="レビューを投稿するにはログインが必要です"
            redirectTo={`/instructors/${instructorId}`}
          />
        ) : (
          <>
            {submitted && (
              <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm font-medium">
                ✓ レビューを投稿しました。ありがとうございます！
              </div>
            )}
            {submitError && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* 受講者タイプ */}
              <div>
                <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
                  受講者タイプ <span className="text-red-500">*</span>
                </label>
                <select
                  value={values.reviewerType}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, reviewerType: e.target.value }));
                    if (errors.reviewerType) setErrors((err) => ({ ...err, reviewerType: undefined }));
                  }}
                  className={`${inputBase} ${
                    errors.reviewerType
                      ? "border-red-400 bg-red-50 text-[#1E3A5F]"
                      : "border-gray-200 bg-white text-[#64748B]"
                  }`}
                >
                  <option value="">選択してください</option>
                  {REVIEWER_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.reviewerType && (
                  <p className="text-red-500 text-xs mt-1">{errors.reviewerType}</p>
                )}
              </div>

              {/* 評価（星） */}
              <div>
                <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
                  評価 <span className="text-red-500">*</span>
                </label>
                <Stars
                  rating={values.rating}
                  interactive
                  onSelect={(v) => {
                    setValues((prev) => ({ ...prev, rating: v }));
                    if (errors.rating) setErrors((err) => ({ ...err, rating: undefined }));
                  }}
                />
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                )}
              </div>

              {/* コメント */}
              <div>
                <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
                  コメント <span className="text-red-500">*</span>
                  <span className="text-[#64748B] font-normal ml-1">（10文字以上）</span>
                </label>
                <textarea
                  value={values.comment}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, comment: e.target.value }));
                    if (errors.comment) setErrors((err) => ({ ...err, comment: undefined }));
                  }}
                  rows={4}
                  placeholder="研修の感想、学んだこと、おすすめできる点などをお書きください"
                  className={`${inputBase} resize-none ${
                    errors.comment ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.comment ? (
                    <p className="text-red-500 text-xs">{errors.comment}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs ml-auto ${
                      values.comment.trim().length >= 10 ? "text-emerald-600" : "text-[#64748B]"
                    }`}
                  >
                    {values.comment.trim().length} / 10+
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 text-white font-bold rounded-xl text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#1E3A5F" }}
              >
                {submitting ? "投稿中..." : "レビューを投稿する"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
