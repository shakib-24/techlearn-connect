import LPHeader from "@/components/LPHeader";
import { SkeletonPickupCard, SkeletonStatCard } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white">
      <LPHeader />

      {/* ヒーロー（ピックアップ講師カードのみスケルトン化） */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden bg-[#1E3A5F]">
        <SkeletonPickupCard />
      </section>

      {/* stat cards */}
      <section className="relative py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
      </section>
    </div>
  );
}
