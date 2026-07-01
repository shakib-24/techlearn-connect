import type { Metadata } from "next";
import Link from "next/link";
import InstructorList from "@/components/InstructorList";

export const metadata: Metadata = {
  title: "講師を探す",
  description:
    "フロントエンド・Backend・Infrastructure・UI/UX Design・AI/Data Scienceなど5カテゴリのプロ講師を検索・比較。オンライン・対面・両方対応から選択可能。",
};

export default function InstructorsPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors text-sm"
            >
              ← ホーム
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-bold text-base">TechLearn Connect</span>
          </div>
          <Link
            href="/register"
            className="text-sm font-semibold text-white border border-white/30 px-4 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            講師登録
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">講師を探す</h1>
          <p className="text-[#64748B] text-sm mt-1">
            あなたのニーズに合ったプロ講師を見つけましょう
          </p>
        </div>
        <InstructorList />
      </main>
    </div>
  );
}
