import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "講師登録",
  description: "TechLearn Connect に講師として登録する。プロフィール・スキル・カリキュラムを公開して研修案件を受け付けましょう。",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-blue-300 hover:text-white transition-colors text-sm"
            >
              ← ホーム
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-bold text-base">TechLearn Connect</span>
          </div>
          <Link
            href="/instructors"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            講師を探す
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">講師として登録する</h1>
          <p className="text-[#64748B] text-sm mt-1">
            プロフィールを公開して研修依頼を受け付けましょう
          </p>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-[#1E3A5F] text-xs font-medium mb-1">デモ版について</p>
          <p className="text-[#64748B] text-xs leading-relaxed">
            登録情報はこのブラウザの localStorage に保存されます。
            サービス本番リリース後は、アカウント連携による永続保存が可能になります。
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
