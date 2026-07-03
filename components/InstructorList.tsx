"use client";

import { useMemo, useState } from "react";
import type { Instructor } from "@/data/instructors";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomInstructors } from "@/hooks/useCustomInstructors";
import InstructorCard from "./InstructorCard";
import { CATEGORY_AVATAR_COLOR } from "@/lib/categoryStyles";

const CATEGORIES: Instructor["category"][] = [
  "Frontend",
  "Backend",
  "Infrastructure",
  "UI/UX Design",
  "AI/Data Science",
];

const FORMATS: Instructor["format"][] = ["オンライン", "対面", "両方対応"];

export default function InstructorList({ instructors }: { instructors: Instructor[] }) {
  const { favorites } = useFavorites();
  const { customInstructors } = useCustomInstructors();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Instructor["category"] | "">("");
  const [format, setFormat] = useState<Instructor["format"] | "">("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Merge fetched + custom instructors (custom appear after fetched)
  const allInstructors = useMemo(
    () => [...instructors, ...customInstructors],
    [instructors, customInstructors]
  );

  // 全条件 AND 結合 — 単一の derived array
  const filteredInstructors = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allInstructors.filter((inst) => {
      if (q) {
        const hit =
          inst.name.toLowerCase().includes(q) ||
          inst.tagline.toLowerCase().includes(q) ||
          inst.skills.some((s) => s.toLowerCase().includes(q));
        if (!hit) return false;
      }
      if (category && inst.category !== category) return false;
      if (format && inst.format !== format) return false;
      if (favoritesOnly && !favorites.includes(inst.id)) return false;
      return true;
    });
  }, [query, category, format, favoritesOnly, favorites, allInstructors]);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setFormat("");
    setFavoritesOnly(false);
  };

  const hasActiveFilter =
    query !== "" || category !== "" || format !== "" || favoritesOnly;

  // 表示中の結果セットが変わるたびに再マウントしてフェードインを再生するためのkey
  const resultsKey = filteredInstructors.map((inst) => inst.id).join(",");

  return (
    <div>
      {/* フィルターパネル */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        {/* 検索バー */}
        <div className="mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="名前・スキル・キーワードで検索..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82C4] focus:border-transparent shadow-sm text-sm"
          />
        </div>

        {/* カテゴリフィルタ */}
        <div className="mb-4">
          <p className="text-xs text-[#64748B] font-medium mb-2 uppercase tracking-wide">
            カテゴリ
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                category === ""
                  ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                  : "bg-white text-[#64748B] border-gray-200 hover:border-[#3B82C4] hover:text-[#3B82C4]"
              }`}
            >
              すべて
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(isActive ? "" : cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap"
                  style={
                    isActive
                      ? {
                          backgroundColor: CATEGORY_AVATAR_COLOR[cat],
                          color: "white",
                          borderColor: CATEGORY_AVATAR_COLOR[cat],
                        }
                      : {
                          backgroundColor: "white",
                          color: "#64748B",
                          borderColor: "#e5e7eb",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 対応形式フィルタ + お気に入りトグル */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide w-full sm:w-auto">
            対応形式
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFormat("")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                format === ""
                  ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                  : "bg-white text-[#64748B] border-gray-200 hover:border-[#3B82C4] hover:text-[#3B82C4]"
              }`}
            >
              すべて
            </button>
            {FORMATS.map((f) => {
              const isActive = format === f;
              return (
                <button
                  key={f}
                  onClick={() => setFormat(isActive ? "" : f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-[#3B82C4] text-white border-[#3B82C4]"
                      : "bg-white text-[#64748B] border-gray-200 hover:border-[#3B82C4] hover:text-[#3B82C4]"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* お気に入りトグル */}
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              favoritesOnly
                ? "bg-red-50 text-red-600 border-red-300"
                : "bg-white text-[#64748B] border-gray-200 hover:border-red-300 hover:text-red-500"
            }`}
          >
            <span>{favoritesOnly ? "♥" : "♡"}</span>
            <span>お気に入りのみ</span>
          </button>
        </div>
      </div>

      {/* 結果件数 + リセット */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#64748B]">
          {filteredInstructors.length === allInstructors.length ? (
            <span>{allInstructors.length}名の講師</span>
          ) : (
            <span>
              <span className="font-semibold text-[#1E3A5F]">
                {filteredInstructors.length}件
              </span>
              <span> / {allInstructors.length}名</span>
            </span>
          )}
        </p>
        {hasActiveFilter && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#3B82C4] hover:text-[#1E3A5F] underline transition-colors"
          >
            フィルタをリセット
          </button>
        )}
      </div>

      {/* カードグリッド or 空状態 */}
      {filteredInstructors.length > 0 ? (
        <div key={resultsKey} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredInstructors.map((inst, index) => (
            <div
              key={inst.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
            >
              <InstructorCard instructor={inst} />
            </div>
          ))}
        </div>
      ) : (
        <div
          key={resultsKey}
          className="animate-fade-in flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
        >
          <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4 text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">
            該当する講師が見つかりませんでした
          </h3>
          <p className="text-[#64748B] text-sm mb-5 max-w-xs">
            検索ワードやフィルタを変えてもう一度お試しください。
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 bg-[#3B82C4] text-white rounded-lg text-sm font-medium hover:bg-[#1E3A5F] transition-colors"
          >
            フィルタをリセット
          </button>
        </div>
      )}
    </div>
  );
}
