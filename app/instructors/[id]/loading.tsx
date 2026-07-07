import { SkeletonDetailHeader, SkeletonSectionCard } from "@/components/ui/Skeleton";

export default function InstructorDetailLoading() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-blue-200 text-sm">← 一覧に戻る</span>
          <span className="font-bold text-sm">TechLearn Connect</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <SkeletonDetailHeader />

        {/* スキル */}
        <SkeletonSectionCard lineWidthClasses={["w-2/3"]} />
        {/* プロフィール */}
        <SkeletonSectionCard lineWidthClasses={["w-full", "w-full", "w-3/5"]} />
        {/* 実績 */}
        <SkeletonSectionCard lineWidthClasses={["w-full", "w-4/5", "w-2/3"]} />
        {/* カリキュラム */}
        <SkeletonSectionCard lineWidthClasses={["w-full", "w-full", "w-3/4", "w-1/2"]} />
        {/* 受講者の声 */}
        <SkeletonSectionCard lineWidthClasses={["w-full", "w-3/5", "w-full", "w-2/5"]} />
        {/* お問い合わせフォーム */}
        <SkeletonSectionCard lineWidthClasses={["w-full", "w-full", "w-full", "w-1/3"]} />
      </main>
    </div>
  );
}
