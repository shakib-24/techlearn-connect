import type { Metadata } from "next";
import Link from "next/link";
import { Laptop, Layers, Users } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import InstructorAvatar from "@/components/InstructorAvatar";
import LPHeader from "@/components/LPHeader";
import { instructors } from "@/data/instructors";
import { CATEGORY_BADGE, CATEGORY_ICON } from "@/lib/categoryStyles";

export const metadata: Metadata = {
  title: "TechLearn Connect | 研修講師マッチングサービス",
  description:
    "最適な研修講師がすぐ見つかる。IT研修に特化したプロ講師マッチングサービス。フロントエンド・Backend・AI/MLなど5カテゴリ対応。",
};

const STEPS = [
  { step: 1, icon: "🔍", title: "条件を入力", desc: "カテゴリ・対応形式・予算などの希望条件を指定してください" },
  { step: 2, icon: "📋", title: "講師を比較", desc: "スキルや実績・カリキュラムを見比べてお気に入りに追加" },
  { step: 3, icon: "💬", title: "相談・調整", desc: "気になる講師へ直接コンタクトして日程・内容を調整" },
  { step: 4, icon: "🚀", title: "研修スタート", desc: "合意が取れたらいよいよ研修開始。効果的な学びを提供" },
];

// Hero装飾用のおすすめ講師カード。マッチング/レコメンドロジックではなく固定表示。
const FEATURED_INSTRUCTOR = instructors[0];
const FEATURED_REVIEWS = FEATURED_INSTRUCTOR.reviews ?? [];
const FEATURED_RATING =
  FEATURED_REVIEWS.length > 0
    ? Math.round((FEATURED_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / FEATURED_REVIEWS.length) * 10) / 10
    : 0;
const FeaturedCategoryIcon = CATEGORY_ICON[FEATURED_INSTRUCTOR.category];

const HERO_STATS = [
  { icon: Users, label: "7名の講師" },
  { icon: Layers, label: "5つの専門分野" },
  { icon: Laptop, label: "オンライン・対面・両方対応" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ─── */}
      <LPHeader />

      {/* ─── Hero ─── */}
      <section
        className="text-white py-20 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #3B82C4 100%)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-5">
              IT研修講師マッチングサービス
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              最適な研修講師が、
              <br className="hidden sm:block" />
              すぐ見つかる
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              フロントエンドから AI / ML まで、IT 研修に特化したプロ講師を素早く検索・比較。
              貴社のニーズにぴったりの講師を見つけましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/instructors"
                className="px-8 py-4 font-bold rounded-xl text-base shadow-lg transition-colors"
                style={{ backgroundColor: "#10B981", color: "white" }}
              >
                講師を探す →
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 font-semibold rounded-xl text-base border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
              >
                講師として登録する
              </Link>
            </div>
          </div>

          {/* Right: おすすめ講師カード（装飾用の固定表示） + 統計バッジ */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl pb-10 lg:pb-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-left">
                <p
                  className="text-sm font-semibold uppercase tracking-widest mb-6"
                  style={{ color: "#3B82C4" }}
                >
                  おすすめ講師
                </p>
                <div className="flex items-center gap-4 sm:gap-6 mb-6">
                  <InstructorAvatar
                    instructor={FEATURED_INSTRUCTOR}
                    size={120}
                    textSizeClass="text-4xl"
                  />
                  <div>
                    <p className="font-extrabold text-[#1E3A5F] text-2xl sm:text-3xl leading-tight">
                      {FEATURED_INSTRUCTOR.name}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium mt-2 ${CATEGORY_BADGE[FEATURED_INSTRUCTOR.category]}`}
                    >
                      <FeaturedCategoryIcon className="w-4 h-4" strokeWidth={2.5} />
                      {FEATURED_INSTRUCTOR.category}
                    </span>
                  </div>
                </div>

                {FEATURED_RATING > 0 && (
                  <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="text-2xl"
                        style={{ color: i <= Math.round(FEATURED_RATING) ? "#F59E0B" : "#D1D5DB" }}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-[#1E3A5F] text-lg font-bold ml-1">{FEATURED_RATING}</span>
                    <span className="text-[#64748B] text-sm">（{FEATURED_REVIEWS.length}件）</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {FEATURED_INSTRUCTOR.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-sm bg-[#F1F5F9] text-[#64748B] px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 統計バッジ: デスクトップではカード下辺に浮かせて配置、モバイルでは通常のブロック表示 */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-0 lg:absolute lg:-bottom-2 lg:left-1/2 lg:flex-nowrap lg:w-max lg:-translate-x-1/2">
                {HERO_STATS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-2 text-xs font-semibold shadow-md"
                    style={{ color: "#1E3A5F" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: "#3B82C4" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why choose us ─── */}
      <section id="service" className="scroll-mt-20 py-20 px-6 bg-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#3B82C4" }}
          >
            WHY US
          </p>
          <h2 className="text-2xl font-bold text-center text-[#1E3A5F] mb-2">
            なぜ選ばれるのか
          </h2>
          <p className="text-center text-[#64748B] text-sm mb-12">
            企業・講師の双方に選ばれる理由があります
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* 企業向け */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-xl">
                🏢
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-5">企業のご担当者様へ</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "カテゴリ・形式で素早く絞り込み",
                    desc: "5つの専門分野と3つの受講形式から最適な講師を即座に検索",
                  },
                  {
                    title: "実績・カリキュラムを事前確認",
                    desc: "講師の詳細プロフィールで研修内容をしっかり比較検討できる",
                  },
                  {
                    title: "英語・やさしい日本語にも対応",
                    desc: "グローバルチームや外国籍社員への研修も柔軟にサポート",
                  },
                  {
                    title: "料金・形式をオープンに比較",
                    desc: "料金・対応形式を一覧で確認してコストを最適化",
                  },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-[#10B981] mt-0.5 flex-shrink-0 font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-[#1E3A5F] text-sm">{title}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 講師向け */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-xl">
                👨‍🏫
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-5">講師の方へ</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "スキルとカリキュラムをアピール",
                    desc: "専門領域・実績・研修メニューを詳しくプロフィールに掲載",
                  },
                  {
                    title: "自分のペースで案件を選択",
                    desc: "オンライン・対面・両方対応など希望スタイルで柔軟に活動",
                  },
                  {
                    title: "初心者から上級者まで幅広く対応",
                    desc: "受講者レベルに応じたカリキュラム設計で信頼を獲得できる",
                  },
                  {
                    title: "登録・掲載は完全無料",
                    desc: "初期費用ゼロでプロフィールを公開、マッチング成立後のみ手数料",
                  },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-[#10B981] mt-0.5 flex-shrink-0 font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-[#1E3A5F] text-sm">{title}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="flow" className="scroll-mt-20 py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#3B82C4" }}
          >
            HOW IT WORKS
          </p>
          <h2 className="text-2xl font-bold text-center text-[#1E3A5F] mb-2">
            ご利用の流れ
          </h2>
          <p className="text-center text-[#64748B] text-sm mb-14">最短4ステップで研修開始</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
            {/* connector line (desktop only) */}
            <div
              className="hidden sm:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px"
              style={{ backgroundColor: "#3B82C4", opacity: 0.25 }}
            />

            {STEPS.map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center relative">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-2xl border-2 border-[#3B82C4]/20">
                    {icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#3B82C4] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-[#1E3A5F] text-sm mb-2">{title}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/instructors"
              className="inline-block px-10 py-4 text-white font-bold rounded-xl text-base shadow-md transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1E3A5F" }}
            >
              さっそく講師を探す →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── Footer ─── */}
      <footer style={{ backgroundColor: "#1E3A5F" }} className="text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="font-bold text-lg">TechLearn Connect</p>
              <p className="text-blue-300 text-sm mt-1">IT研修講師マッチングサービス</p>
            </div>
            <nav className="flex flex-wrap gap-6 text-sm text-blue-200">
              <Link href="/instructors" className="hover:text-white transition-colors">
                講師を探す
              </Link>
              <Link href="/register" className="hover:text-white transition-colors">
                講師登録
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                利用規約
              </Link>
            </nav>
          </div>
          <p className="text-blue-300/50 text-xs text-center">
            © 2026 TechLearn Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
