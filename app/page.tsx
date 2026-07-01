import Link from "next/link";

const STEPS = [
  { step: 1, icon: "🔍", title: "条件を入力", desc: "カテゴリ・対応形式・予算などの希望条件を指定してください" },
  { step: 2, icon: "📋", title: "講師を比較", desc: "スキルや実績・カリキュラムを見比べてお気に入りに追加" },
  { step: 3, icon: "💬", title: "相談・調整", desc: "気になる講師へ直接コンタクトして日程・内容を調整" },
  { step: 4, icon: "🚀", title: "研修スタート", desc: "合意が取れたらいよいよ研修開始。効果的な学びを提供" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-[#1E3A5F] text-lg">TechLearn Connect</span>
            <span className="text-[#64748B] text-xs ml-2 hidden sm:inline">研修講師マッチング</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/instructors"
              className="text-sm font-medium text-[#64748B] hover:text-[#1E3A5F] transition-colors"
            >
              講師を探す
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-white bg-[#3B82C4] px-4 py-2 rounded-lg hover:bg-[#1E3A5F] transition-colors"
            >
              講師登録
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section
        className="text-white py-24 px-6"
        style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #3B82C4 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-5">
            IT研修講師マッチングサービス
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            最適な研修講師が、
            <br className="hidden sm:block" />
            すぐ見つかる
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            フロントエンドから AI / ML まで、IT 研修に特化したプロ講師を素早く検索・比較。
            貴社のニーズにぴったりの講師を見つけましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/instructors"
              className="px-8 py-4 font-bold rounded-xl text-base shadow-lg transition-colors"
              style={{ backgroundColor: "#10B981", color: "white" }}
            >
              講師を探す →
            </Link>
            <Link
              href="#"
              className="px-8 py-4 font-semibold rounded-xl text-base border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
            >
              講師として登録する
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex justify-center gap-10 mt-14 pt-10 border-t border-white/20">
            {[
              { value: "7名+", label: "登録講師" },
              { value: "5分野", label: "専門カテゴリ" },
              { value: "3形式", label: "受講スタイル" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-blue-200 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why choose us ─── */}
      <section className="py-20 px-6 bg-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
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

      {/* ─── Footer ─── */}
      <footer style={{ backgroundColor: "#1E3A5F" }} className="text-white py-12 px-6">
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
              <Link href="#" className="hover:text-white transition-colors">
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
