import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "TechLearn Connectのプライバシーポリシー。収集する個人情報、利用目的、第三者提供、開示・訂正・削除の手続きについて定めています。",
};

const SECTIONS = [
  {
    title: "1. 収集する個人情報",
    body: [
      "TechLearn Connect運営事務局（以下「運営者」といいます）は、本サービスの提供にあたり、以下の個人情報を取得することがあります。",
      "・氏名、会社名、メールアドレス",
      "・お問い合わせ・お申し込みの内容",
      "・講師登録時に登録されるプロフィール情報（経歴、スキル、実績等）",
      "・本サービスの利用履歴（アクセスログ、Cookie等）",
    ],
  },
  {
    title: "2. 利用目的",
    body: [
      "取得した個人情報は、以下の目的の範囲内で利用します。",
      "・本サービスの提供、運営、維持、改善のため",
      "・お問い合わせへの対応、必要な連絡を行うため",
      "・利用者と講師とのマッチングを円滑に行うため",
      "・利用規約に違反する行為への対応のため",
    ],
  },
  {
    title: "3. 第三者提供",
    body: [
      "運営者は、以下の場合を除き、あらかじめ利用者の同意を得ることなく、第三者に個人情報を提供することはありません。",
      "・法令に基づく場合",
      "・人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき",
      "・国の機関等が法令の定める事務を遂行することに対して協力する必要がある場合",
    ],
  },
  {
    title: "4. 開示・訂正・削除の手続き",
    body: [
      "利用者は、運営者が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を求めることができます。",
      "ご希望の場合は、下記のお問い合わせ先までご連絡ください。運営者は、本人確認の上、法令に従い合理的な期間内に対応いたします。",
    ],
  },
];

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold text-[#1E3A5F]">プライバシーポリシー</h1>
          <p className="text-[#64748B] text-xs mt-1">施行日: 2026年4月1日</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8">
          <p className="text-[#1E3A5F] text-sm leading-relaxed">
            TechLearn Connect運営事務局（以下「運営者」といいます）は、個人情報の保護に関する法律（個人情報保護法）その他関連法令を遵守し、利用者の個人情報を適切に取り扱います。
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

          <section>
            <h2 className="font-bold text-[#1E3A5F] text-base mb-3">5. お問い合わせ先</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
              <br />
              TechLearn Connect運営事務局
              <br />
              メールアドレス: <span className="text-[#1E3A5F]">contact@techlearn-connect.example.com</span>
            </p>
          </section>

          <p className="text-[#64748B] text-xs text-right pt-4 border-t border-gray-100">
            TechLearn Connect運営事務局
          </p>
        </div>
      </main>
    </div>
  );
}
