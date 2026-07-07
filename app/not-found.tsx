import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-[#3B82C4] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">
          ページが見つかりません
        </h1>
        <p className="text-[#64748B] text-sm mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="text-sm font-semibold text-white bg-[#3B82C4] px-5 py-2.5 rounded-lg hover:bg-[#1E3A5F] transition-colors"
          >
            ホームに戻る
          </Link>
          <Link
            href="/instructors"
            className="text-sm font-semibold text-[#1E3A5F] border border-[#1E3A5F] px-5 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
          >
            講師を探す
          </Link>
        </div>
      </div>
    </div>
  );
}
