import Link from "next/link";

export default function InstructorNotFound() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">
          講師が見つかりません
        </h1>
        <p className="text-[#64748B] text-sm mb-8">
          お探しの講師は存在しないか、登録が取り消された可能性があります。
        </p>
        <Link
          href="/instructors"
          className="inline-block text-sm font-semibold text-white bg-[#3B82C4] px-5 py-2.5 rounded-lg hover:bg-[#1E3A5F] transition-colors"
        >
          講師一覧に戻る
        </Link>
      </div>
    </div>
  );
}
