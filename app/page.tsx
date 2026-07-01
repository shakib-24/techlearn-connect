import InstructorList from "@/components/InstructorList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">TechLearn Connect</span>
            <span className="text-blue-300 text-sm ml-3 hidden sm:inline">
              研修講師マッチングサービス
            </span>
          </div>
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
