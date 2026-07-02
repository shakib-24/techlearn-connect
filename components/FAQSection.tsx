"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "利用料金はかかりますか？",
    a: "講師の検索・比較・お気に入り登録はすべて無料でご利用いただけます。研修費用は講師ごとに設定された料金に基づき、依頼が成立した際に講師と直接やり取りいただきます。",
  },
  {
    q: "どのように講師を選べばよいですか？",
    a: "カテゴリ・対応形式・予算などの条件で絞り込み、講師の詳細プロフィールでスキルや実績、カリキュラム、受講者の声を確認しながら比較検討いただけます。気になる講師にはそのまま依頼フォームからご相談ください。",
  },
  {
    q: "オンライン研修は対応していますか？",
    a: "はい、多くの講師がオンライン形式に対応しています。講師一覧の「対応形式」から「オンライン」「対面」「両方対応」で絞り込んで検索できます。",
  },
  {
    q: "研修のキャンセルはできますか？",
    a: "研修の日程・内容は講師との個別のやり取りで調整いただくため、キャンセルについても依頼時に講師と直接ご確認ください。予定変更が分かり次第、早めのご連絡にご協力をお願いしています。",
  },
  {
    q: "講師として登録するにはどうすればいいですか？",
    a: "「講師登録」ページから、お名前・専門カテゴリ・スキル・研修内容などの情報を入力するだけで簡単にプロフィールを掲載できます。入力後すぐに講師一覧へ公開されます。",
  },
  {
    q: "講師の報酬（料金）はどのように決まりますか？",
    a: "料金は講師ご自身で自由に設定いただけます。スキルや実績、研修内容のボリュームに応じて時間単価を決め、プロフィールに掲載してください。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-20 px-6 bg-[#F1F5F9]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#1E3A5F] mb-2">
          よくある質問
        </h2>
        <p className="text-center text-[#64748B] text-sm mb-12">
          ご不明な点はこちらをご確認ください
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={q}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#1E3A5F] text-sm">{q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform duration-200"
                    style={{
                      backgroundColor: "#3B82C4",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[#64748B] text-sm leading-relaxed">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
