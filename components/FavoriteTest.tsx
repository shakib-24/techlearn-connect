"use client";

import { useFavorites } from "@/hooks/useFavorites";

const DUMMY_INSTRUCTORS = [
  { id: "test-1", name: "田中 健太", category: "Frontend" },
  { id: "test-2", name: "Sarah Williams", category: "UI/UX Design" },
];

function FavoriteButton({ id }: { id: string }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const active = isFavorited(id);

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
        active
          ? "bg-red-50 border-red-300 text-red-600"
          : "bg-white border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500"
      }`}
      aria-label={active ? "お気に入りを解除" : "お気に入りに追加"}
    >
      <span>{active ? "♥" : "♡"}</span>
      <span>{active ? "お気に入り済み" : "お気に入り"}</span>
    </button>
  );
}

function FavoriteSummary() {
  const { favorites } = useFavorites();
  return (
    <div className="mt-6 p-4 bg-[#1E3A5F] text-white rounded-lg text-sm">
      <p className="font-semibold mb-1">お気に入り状態（別コンポーネントから参照）</p>
      <p className="text-blue-200">
        {favorites.length === 0
          ? "まだお気に入りはありません"
          : `お気に入り中: ${favorites.join(", ")} （計${favorites.length}件）`}
      </p>
      <p className="text-blue-300 text-xs mt-1">
        ※ リロードしても同じIDが表示されれば localStorage 永続化は成功
      </p>
    </div>
  );
}

export default function FavoriteTest() {
  return (
    <div className="mt-10 p-6 bg-white rounded-xl shadow border border-gray-100 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">
        Phase 2 — お気に入り機能テスト
      </h2>
      <div className="space-y-3">
        {DUMMY_INSTRUCTORS.map((inst) => (
          <div
            key={inst.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-800">{inst.name}</p>
              <p className="text-xs text-gray-500">{inst.category}</p>
            </div>
            <FavoriteButton id={inst.id} />
          </div>
        ))}
      </div>
      <FavoriteSummary />
    </div>
  );
}
