import { instructors } from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";

export default function Home() {
  const sample = instructors[0];

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <span className="font-bold text-lg">TechLearn Connect</span>
          <span className="text-blue-300 text-sm ml-3">研修講師マッチングサービス</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">講師を探す</h1>
        <p className="text-[#64748B] text-sm mb-6">
          Phase 3 検証: 1件のカードから詳細への遷移を確認
        </p>

        <InstructorCard instructor={sample} />
      </main>
    </div>
  );
}
