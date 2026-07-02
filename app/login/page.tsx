import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AuthTabs from "@/components/AuthTabs";

export const metadata: Metadata = {
  title: "ログイン",
  description:
    "TechLearn Connect にログインまたは新規登録して、講師への依頼やレビュー投稿を行いましょう。",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-blue-300 hover:text-white transition-colors text-sm"
          >
            ← ホーム
          </Link>
          <span className="font-bold text-base">TechLearn Connect</span>
        </div>
      </nav>

      <main className="max-w-md mx-auto px-4 py-10">
        <Suspense fallback={null}>
          <AuthTabs />
        </Suspense>
      </main>
    </div>
  );
}
