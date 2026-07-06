"use client";

import { useState } from "react";
import Link from "next/link";
import type { Instructor } from "@/data/instructors";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/useToast";
import { CATEGORY_BADGE, CATEGORY_ICON } from "@/lib/categoryStyles";
import InstructorAvatar from "@/components/InstructorAvatar";

export default function InstructorCard({ instructor }: { instructor: Instructor }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorited = isFavorited(instructor.id);
  const CategoryIcon = CATEGORY_ICON[instructor.category];
  const [justToggled, setJustToggled] = useState(false);

  return (
    <article className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
      {/* カード全体をリンクにする（絶対配置）*/}
      <Link
        href={`/instructors/${instructor.id}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`${instructor.name}の詳細を見る`}
      />

      <div className="p-6">
        {/* ヘッダー: アバター + 名前 + カテゴリバッジ */}
        <div className="flex items-start gap-4">
          <InstructorAvatar instructor={instructor} size={48} textSizeClass="text-base" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[#1E3A5F] text-lg leading-tight">
                {instructor.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_BADGE[instructor.category]}`}
              >
                <CategoryIcon className="w-3 h-3" strokeWidth={2.5} />
                {instructor.category}
              </span>
              {instructor.id.startsWith("custom-") && (
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: "#10B981" }}>
                  NEW
                </span>
              )}
            </div>
            <p className="text-[#64748B] text-sm mt-1 line-clamp-2">
              {instructor.tagline}
            </p>
          </div>
        </div>

        {/* スキルタグ */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {instructor.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
          {instructor.skills.length > 4 && (
            <span className="text-xs text-[#64748B]">
              +{instructor.skills.length - 4}
            </span>
          )}
        </div>

        {/* フッター: フォーマット・価格・お気に入り */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <span>{instructor.format}</span>
            <span>·</span>
            <span className="font-semibold text-[#1E3A5F]">{instructor.price}</span>
          </div>
          {/* z-10 でリンクより手前に出してクリックを横取り */}
          <button
            className={`relative z-10 flex items-center gap-1 text-sm font-medium transition-colors ${
              favorited
                ? "text-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
            onClick={async (e) => {
              e.preventDefault();
              const result = await toggleFavorite(instructor.id);
              if (result.requiresLogin) {
                showToast("お気に入りを使うにはログインが必要です");
                return;
              }
              if (result.error) {
                showToast("お気に入りの更新に失敗しました");
                return;
              }
              setJustToggled(false);
              requestAnimationFrame(() => setJustToggled(true));
              showToast(
                favorited ? "お気に入りを解除しました" : "お気に入りに追加しました"
              );
            }}
            aria-label={favorited ? "お気に入りを解除" : "お気に入りに追加"}
          >
            <span
              className={`text-base inline-block ${justToggled ? "animate-bounce-scale" : ""}`}
              onAnimationEnd={() => setJustToggled(false)}
            >
              {favorited ? "♥" : "♡"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
