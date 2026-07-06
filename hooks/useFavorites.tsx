"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

interface ToggleFavoriteResult {
  error: string | null;
  requiresLogin: boolean;
}

interface FavoritesContextValue {
  favorites: string[];
  isFavorited: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<ToggleFavoriteResult>;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    supabase
      .from("favorites")
      .select("instructor_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to fetch favorites:", error.message);
          return;
        }
        setFavorites((data ?? []).map((row) => row.instructor_id as string));
      });
  }, [user]);

  const toggleFavorite = useCallback(
    async (id: string): Promise<ToggleFavoriteResult> => {
      if (!user) {
        return { error: null, requiresLogin: true };
      }

      if (favorites.includes(id)) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("instructor_id", id);

        if (error) {
          console.error("Failed to remove favorite:", error.message);
          return { error: error.message, requiresLogin: false };
        }
        setFavorites((prev) => prev.filter((fid) => fid !== id));
        return { error: null, requiresLogin: false };
      }

      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, instructor_id: id });

      if (error) {
        console.error("Failed to add favorite:", error.message);
        return { error: error.message, requiresLogin: false };
      }
      setFavorites((prev) => [...prev, id]);
      return { error: null, requiresLogin: false };
    },
    [user, favorites]
  );

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
