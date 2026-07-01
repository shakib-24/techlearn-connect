"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Instructor } from "@/data/instructors";
import { getCustomInstructors } from "@/lib/customInstructors";
import DetailContent from "./DetailContent";

export default function CustomDetailWrapper({ id }: { id: string }) {
  const [instructor, setInstructor] = useState<Instructor | null | undefined>(
    undefined
  );

  useEffect(() => {
    const found = getCustomInstructors().find((i) => i.id === id) ?? null;
    setInstructor(found);
  }, [id]);

  if (instructor === undefined) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <p className="text-[#64748B] text-sm">読み込み中...</p>
      </div>
    );
  }

  if (instructor === null) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-[#1E3A5F] font-bold text-lg">
          講師が見つかりませんでした
        </p>
        <p className="text-[#64748B] text-sm">
          このプロフィールは別のブラウザで登録されたか、データが削除された可能性があります。
        </p>
        <Link
          href="/instructors"
          className="text-[#3B82C4] hover:text-[#1E3A5F] transition-colors text-sm font-medium"
        >
          ← 一覧に戻る
        </Link>
      </div>
    );
  }

  return <DetailContent instructor={instructor} />;
}
