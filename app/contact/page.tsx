import type { Metadata } from "next";
import Link from "next/link";
import ContactPageForm from "@/components/ContactPageForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "TechLearn Connect運営へのお問い合わせはこちら。講師登録、企業でのご利用、料金についてなどお気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1E3A5F] text-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-blue-300 hover:text-white transition-colors text-sm"
            >
              ← ホーム
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-bold text-base">TechLearn Connect</span>
          </div>
          <Link
            href="/instructors"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            講師を探す
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">お問い合わせ</h1>
          <p className="text-[#64748B] text-sm mt-1">
            TechLearn Connect運営に関するお問い合わせを受け付けています。
            <br />
            講師個人へのご依頼は、各講師の詳細ページからお願いいたします。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <ContactPageForm />
        </div>
      </main>
    </div>
  );
}
