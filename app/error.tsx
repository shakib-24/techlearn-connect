"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">
          エラーが発生しました
        </h1>
        <p className="text-[#64748B] text-sm mb-8">
          予期せぬエラーが発生しました。しばらく時間をおいてから再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={reset}
            className="text-sm font-semibold text-white bg-[#3B82C4] px-5 py-2.5 rounded-lg hover:bg-[#1E3A5F] transition-colors"
          >
            再試行
          </button>
          <Link
            href="/"
            className="text-sm font-semibold text-[#1E3A5F] border border-[#1E3A5F] px-5 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
