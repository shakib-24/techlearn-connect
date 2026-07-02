"use client";

import Link from "next/link";

export default function GatedContent({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: React.ReactNode;
}) {
  const loginHref = `/login?redirect=${encodeURIComponent(redirectTo)}`;
  const signupHref = `/login?tab=signup&redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="max-h-[520px] overflow-hidden blur-sm pointer-events-none select-none"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-b from-transparent via-white/70 to-[#F1F5F9]">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-sm w-full text-center">
          <p className="text-2xl mb-2">🔒</p>
          <p className="text-[#1E3A5F] font-bold mb-1">
            詳細を見るにはログインが必要です
          </p>
          <p className="text-[#64748B] text-sm mb-5">
            プロフィール詳細・実績・カリキュラム・受講者の声・依頼フォームをご覧いただくには、ログインまたは新規登録が必要です。
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href={loginHref}
              className="text-sm font-semibold text-white bg-[#3B82C4] px-5 py-2.5 rounded-lg hover:bg-[#1E3A5F] transition-colors"
            >
              ログイン
            </Link>
            <Link
              href={signupHref}
              className="text-sm font-semibold text-[#1E3A5F] border border-[#1E3A5F] px-5 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
            >
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
