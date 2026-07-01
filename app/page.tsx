import FavoriteTest from "@/components/FavoriteTest";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F5F9] px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
          Hello TechLearn Connect
        </h1>
        <p className="text-[#64748B] text-lg">
          研修講師マッチングサービス
        </p>
      </div>
      <FavoriteTest />
    </div>
  );
}
