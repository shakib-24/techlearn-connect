"use client";

import { Languages, Star, Users } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedNumber({ target, decimals = 0 }: { target: number; decimals?: number }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(target);
  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

export default function TrustBadges({
  instructorCount,
  categoryCount,
  avgRating,
}: {
  instructorCount: number;
  categoryCount: number;
  avgRating: number;
}) {
  const badges = [
    {
      icon: Users,
      title: "登録講師",
      value: (
        <>
          <AnimatedNumber target={instructorCount} />
          名 / <AnimatedNumber target={categoryCount} />
          分野
        </>
      ),
    },
    {
      icon: Languages,
      title: "対応言語",
      value: "日本語・英語・やさしい日本語",
    },
    {
      icon: Star,
      title: "平均満足度",
      value: (
        <>
          ★ <AnimatedNumber target={avgRating} decimals={1} /> / 5.0
        </>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
      {badges.map(({ icon: Icon, title, value }) => (
        <div
          key={title}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <Icon className="w-5 h-5" style={{ color: "#3B82C4" }} />
          </div>
          <p className="text-lg font-bold" style={{ color: "#1E3A5F" }}>
            {value}
          </p>
          <p className="text-[#64748B] text-sm mt-1">{title}</p>
        </div>
      ))}
    </div>
  );
}
