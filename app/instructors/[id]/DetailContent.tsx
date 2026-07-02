"use client";

import Link from "next/link";
import type { Instructor } from "@/data/instructors";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { CATEGORY_BADGE, CATEGORY_AVATAR_COLOR } from "@/lib/categoryStyles";
import AuthNav from "@/components/AuthNav";
import ContactForm from "@/components/ContactForm";
import GatedContent from "@/components/GatedContent";
import ReviewSection from "@/components/ReviewSection";

export default function DetailContent({ instructor }: { instructor: Instructor }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const favorited = isFavorited(instructor.id);

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* ナビゲーションバー */}
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <Link
            href="/instructors"
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm"
          >
            ← 一覧に戻る
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
            <span className="font-semibold text-sm">TechLearn Connect</span>
            <AuthNav theme="dark" />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* プロフィールヘッダー */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
              style={{ backgroundColor: CATEGORY_AVATAR_COLOR[instructor.category] }}
              >
                {instructor.initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E3A5F]">
                  {instructor.name}
                </h1>
                <span
                  className={`inline-block mt-1 text-sm px-3 py-0.5 rounded-full font-medium ${CATEGORY_BADGE[instructor.category]}`}
                >
                  {instructor.category}
                </span>
                <p className="text-[#64748B] mt-2">{instructor.tagline}</p>
              </div>
            </div>

            {/* お気に入りボタン */}
            <button
              onClick={() => toggleFavorite(instructor.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                favorited
                  ? "border-red-300 bg-red-50 text-red-600"
                  : "border-gray-200 bg-white text-gray-400 hover:border-red-300 hover:text-red-500"
              }`}
            >
              <span className="text-2xl">{favorited ? "♥" : "♡"}</span>
              <span className="text-xs font-medium whitespace-nowrap">
                {favorited ? "お気に入り済み" : "お気に入り"}
              </span>
            </button>
          </div>

          {/* 基本情報 */}
          <div className="flex gap-4 mt-5 pt-5 border-t border-gray-100 text-sm">
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <span>🖥</span>
              <span>{instructor.format}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#10B981] font-bold text-base">¥</span>
              <span className="font-semibold text-[#1E3A5F]">{instructor.price}</span>
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <DetailSections instructor={instructor} />
        ) : (
          <GatedContent redirectTo={`/instructors/${instructor.id}`}>
            <DetailSections instructor={instructor} />
          </GatedContent>
        )}
      </main>
    </div>
  );
}

function DetailSections({ instructor }: { instructor: Instructor }) {
  return (
    <>
      {/* スキル */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-[#1E3A5F] mb-3">スキル・専門領域</h2>
        <div className="flex flex-wrap gap-2">
          {instructor.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 自己紹介 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-[#1E3A5F] mb-3">プロフィール</h2>
        <p className="text-[#64748B] leading-relaxed">{instructor.bio}</p>
      </div>

      {/* 実績 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-[#1E3A5F] mb-3">主な実績</h2>
        <ul className="space-y-2">
          {instructor.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-[#64748B] text-sm">
              <span className="text-[#10B981] mt-0.5 flex-shrink-0">✓</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* カリキュラム */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-[#1E3A5F] mb-3">カリキュラム</h2>
        <ol className="space-y-2">
          {instructor.curriculum.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-[#3B82C4] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-[#64748B]">{c}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 受講者の声 */}
      <ReviewSection
        instructorId={instructor.id}
        staticReviews={instructor.reviews ?? []}
      />

      {/* お問い合わせフォーム */}
      <ContactForm instructorName={instructor.name} />
    </>
  );
}
