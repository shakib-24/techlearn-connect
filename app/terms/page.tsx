import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約",
  description: "TechLearn Connectの利用規約。サービス概要、利用条件、禁止事項、免責事項について定めています。",
};

const SECTIONS = [
  {
    title: "第1条（サービス概要）",
    body: [
      "TechLearn Connect（以下「本サービス」といいます）は、TechLearn Connect運営事務局（以下「運営者」といいます）が提供する、IT研修講師と企業・個人利用者を結びつけるマッチングサービスです。",
      "利用者は本サービスを通じて講師のプロフィールを閲覧し、研修に関する問い合わせ・依頼を行うことができます。",
    ],
  },
  {
    title: "第2条（利用条件）",
    body: [
      "本サービスの利用を希望する方は、本規約に同意の上、所定の方法により利用登録を行うものとします。",
      "登録情報に虚偽、誤記、または記載漏れがあった場合、運営者は利用者に事前の通知なく登録を取り消すことができます。",
      "未成年者が利用する場合は、親権者等の同意を得た上でご利用ください。",
    ],
  },
  {
    title: "第3条（禁止事項）",
    body: [
      "利用者は、本サービスの利用にあたり、以下の行為を行ってはならないものとします。",
      "・法令または公序良俗に違反する行為",
      "・運営者、他の利用者、または第三者の権利・利益を侵害する行為",
      "・虚偽の情報を登録・掲載する行為",
      "・本サービスの運営を妨害する行為",
      "・本サービスを通じて得た情報を目的外に利用する行為",
    ],
  },
  {
    title: "第4条（免責事項）",
    body: [
      "運営者は、本サービスに掲載される講師の情報の正確性、有用性について保証するものではありません。",
      "利用者と講師との間で生じた研修内容、料金、日程等に関するトラブルについて、運営者は一切の責任を負わないものとします。",
      "運営者は、システムメンテナンス、障害、その他やむを得ない事由により、本サービスの全部または一部を予告なく停止することがあります。",
    ],
  },
  {
    title: "第5条（規約の変更・サービスの終了）",
    body: [
      "運営者は、必要と判断した場合、利用者への事前の通知なく本規約の内容を変更することができるものとします。変更後の規約は、本サービス上に掲示した時点から効力を生じるものとします。",
      "運営者は、利用者への事前の通知をもって、本サービスの提供を終了することができるものとします。",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-blue-300 hover:text-white transition-colors text-sm">
              ← ホーム
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-bold text-base">TechLearn Connect</span>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">利用規約</h1>
          <p className="text-[#64748B] text-xs mt-1">施行日: 2026年4月1日</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8">
          <p className="text-[#1E3A5F] text-sm leading-relaxed">
            この利用規約（以下「本規約」といいます）は、TechLearn Connect運営事務局が提供する「TechLearn
            Connect」（以下「本サービス」といいます）の利用条件を定めるものです。利用者は本規約に同意した上で本サービスをご利用ください。
          </p>

          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-bold text-[#1E3A5F] text-base mb-3">{section.title}</h2>
              <div className="space-y-2">
                {section.body.map((line, i) => (
                  <p key={i} className="text-[#64748B] text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <p className="text-[#64748B] text-xs text-right pt-4 border-t border-gray-100">
            TechLearn Connect運営事務局
          </p>
        </div>
      </main>
    </div>
  );
}
