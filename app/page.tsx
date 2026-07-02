import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Languages, Star, Users } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import LPHeader from "@/components/LPHeader";
import { instructors } from "@/data/instructors";

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

// トラストバッジ用の集計値。既存データから動的に算出し、実データと矛盾しないようにする。
const INSTRUCTOR_COUNT = instructors.length;
const CATEGORY_COUNT = new Set(instructors.map((i) => i.category)).size;
const ALL_REVIEWS = instructors.flatMap((i) => i.reviews ?? []);
const AVG_RATING =
  ALL_REVIEWS.length > 0
    ? Math.round((ALL_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / ALL_REVIEWS.length) * 10) / 10
    : 0;

const TRUST_BADGES = [
  {
    icon: Users,
    title: "登録講師",
    value: `${INSTRUCTOR_COUNT}名 / ${CATEGORY_COUNT}分野`,
  },
  {
    icon: Languages,
    title: "対応言語",
    value: "日本語・英語・やさしい日本語",
  },
  {
    icon: Star,
    title: "平均満足度",
    value: `★ ${AVG_RATING} / 5.0`,
  },
];

const QUICK_NAV = [
  { href: "/#service", label: "なぜ選ばれるのか" },
  { href: "/#flow", label: "ご利用の流れ" },
  { href: "/#faq", label: "よくある質問" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ─── */}
      <LPHeader />

      {/* ─── Hero ─── */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
        <Image
          src="/hero.png"
          alt="講師が受講者にオンラインでIT研修を行っている様子"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* グラデーションオーバーレイ（左が濃い紺色、右にいくほど透明） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(30,58,95,0.95) 0%, rgba(30,58,95,0.75) 45%, rgba(30,58,95,0.25) 75%, rgba(30,58,95,0.05) 100%)",
          }}
        />
        {/* モバイル用: 画像全体を覆う濃いオーバーレイ（可読性確保） */}
        <div className="absolute inset-0 sm:hidden" style={{ backgroundColor: "rgba(30,58,95,0.55)" }} />

        {/* テキスト（画像の上に重ねて配置） */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="max-w-[500px] text-left">
              <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-blue-200">
                IT研修講師マッチングサービス
              </p>
              <h1 className="leading-tight mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-lg text-3xl sm:text-4xl font-extrabold text-white"
                  style={{ backgroundColor: "#1E3A5F" }}
                >
                  実践力を育てる講師を、必要なときに。
                </span>
              </h1>
              <p className="text-blue-50 text-base sm:text-lg leading-relaxed mb-10">
                日本語も、英語も、やさしい日本語も。
                <br />
                初心者から即戦力まで、経験豊富な講師陣が
                <br />
                企業の研修も、個人のスキルアップも支えます。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link
                  href="/instructors"
                  className="px-8 py-4 font-bold rounded-xl text-base shadow-lg transition-colors text-white"
                  style={{ backgroundColor: "#10B981" }}
                >
                  講師を探す →
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-4 font-semibold rounded-xl text-base border-2 border-white text-white transition-colors hover:bg-white/10"
                >
                  講師登録
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── トラストバッジ・クイックナビ ─── */}
      <section className="py-16 px-6 bg-white overflow-hidden">
        {/* トラストバッジ */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRUST_BADGES.map(({ icon: Icon, title, value }) => (
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

        {/* クイックナビ */}
        <div className="max-w-3xl mx-auto mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {QUICK_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors"
              style={{ color: "#3B82C4" }}
            >
              {label} →
            </Link>
          ))}
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
