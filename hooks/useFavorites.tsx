"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFavorites, saveFavorites } from "@/lib/favorites";

interface FavoritesContextValue {
  favorites: string[];
  isFavorited: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 初期値は空配列 — マウント後に localStorage から読み込む（hydration mismatch 対策）
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorited = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
