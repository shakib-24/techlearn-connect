import { SkeletonInstructorCard } from "@/components/ui/Skeleton";

export default function InstructorsLoading() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="text-blue-300 text-sm">← ホーム</span>
          <span className="text-white/20">|</span>
          <span className="font-bold text-base">TechLearn Connect</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">講師を探す</h1>
          <p className="text-[#64748B] text-sm mt-1">
            あなたのニーズに合ったプロ講師を見つけましょう
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonInstructorCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
