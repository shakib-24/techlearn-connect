export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />;
}

export function SkeletonCircle({ size }: { size: number }) {
  return (
    <div
      className="bg-gray-200 animate-pulse rounded-full flex-shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonPill({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded-full ${className}`} />;
}

/** 講師カード（InstructorCard）と同じレイアウトのスケルトン */
export function SkeletonInstructorCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-4">
        <SkeletonCircle size={48} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-28" />
            <SkeletonPill className="h-5 w-20" />
          </div>
          <Skeleton className="h-3.5 w-full max-w-[220px] mt-2" />
          <Skeleton className="h-3.5 w-3/5 mt-1.5" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonPill key={i} className="h-5 w-14 rounded" />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <Skeleton className="h-4 w-24" />
        <SkeletonCircle size={20} />
      </div>
    </div>
  );
}

/** トップページの stat カード（TrustBadges）と同じレイアウトのスケルトン */
export function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center">
      <SkeletonCircle size={44} />
      <div className="flex justify-center">
        <Skeleton className="h-5 w-20 mt-3" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-3.5 w-16 mt-2" />
      </div>
    </div>
  );
}

/** ヒーローの「今週のピックアップ講師」カードと同じレイアウトのスケルトン */
export function SkeletonPickupCard() {
  return (
    <div className="hidden sm:block absolute right-6 lg:right-16 bottom-10 w-64 backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl shadow-lg p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonCircle size={44} />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-16 mt-1.5" />
        </div>
      </div>
      <Skeleton className="h-3.5 w-28 mt-3" />
    </div>
  );
}

/** 講師詳細ページのプロフィールヘッダーと同じレイアウトのスケルトン */
export function SkeletonDetailHeader() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-5">
          <SkeletonCircle size={64} />
          <div>
            <Skeleton className="h-7 w-40" />
            <SkeletonPill className="h-5 w-24 mt-2" />
            <Skeleton className="h-4 w-56 mt-3" />
          </div>
        </div>
        <Skeleton className="w-20 h-16 rounded-xl flex-shrink-0" />
      </div>

      <div className="flex gap-4 mt-5 pt-5 border-t border-gray-100">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/** 詳細ページ内のセクションカード（スキル・プロフィール・実績など）共通のスケルトン */
export function SkeletonSectionCard({
  lineWidthClasses = ["w-full", "w-[90%]", "w-3/5"],
}: {
  lineWidthClasses?: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="space-y-2.5">
        {lineWidthClasses.map((w, i) => (
          <Skeleton key={i} className={`h-3.5 ${w}`} />
        ))}
      </div>
    </div>
  );
}
