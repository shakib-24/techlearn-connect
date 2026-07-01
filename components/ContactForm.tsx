"use client";

import { useState } from "react";
import SuccessModal from "./SuccessModal";

interface FormValues {
  name: string;
  email: string;
  theme: string;
  timing: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  theme?: string;
  message?: string;
}

const EMPTY: FormValues = {
  name: "",
  email: "",
  theme: "",
  timing: "",
  budget: "",
  message: "",
};

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = "依頼者名は必須です";
  if (!v.email.trim()) {
    e.email = "メールアドレスは必須です";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    e.email = "有効なメールアドレスを入力してください";
  }
  if (!v.theme.trim()) e.theme = "研修テーマは必須です";
  if (!v.message.trim()) e.message = "メッセージは必須です";
  return e;
}

const fieldClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
  }`;

export default function ContactForm({ instructorName }: { instructorName: string }) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setValues(EMPTY);
    setErrors({});
    setShowModal(true);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-[#1E3A5F] mb-1">研修を依頼する</h2>
        <p className="text-[#64748B] text-xs mb-5">
          {instructorName} さんへのお問い合わせ
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* 依頼者名 */}
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              依頼者名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="山田 太郎"
              className={fieldClass(!!errors.name)}
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="taro@example.com"
              className={fieldClass(!!errors.email)}
            />
          </div>

          {/* 研修テーマ */}
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              研修テーマ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="theme"
              value={values.theme}
              onChange={handleChange}
              placeholder="React基礎研修、TypeScript入門 など"
              className={fieldClass(!!errors.theme)}
            />
          </div>

          {/* 予定時期 + 予算 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
                予定時期
              </label>
              <select
                name="timing"
                value={values.timing}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82C4]"
              >
                <option value="">未定</option>
                <option value="1ヶ月以内">1ヶ月以内</option>
                <option value="3ヶ月以内">3ヶ月以内</option>
                <option value="半年以内">半年以内</option>
                <option value="1年以内">1年以内</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
                予算
              </label>
              <select
                name="budget"
                value={values.budget}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82C4]"
              >
                <option value="">未定</option>
                <option value="〜10万円">〜10万円</option>
                <option value="10〜30万円">10〜30万円</option>
                <option value="30〜50万円">30〜50万円</option>
                <option value="50万円以上">50万円以上</option>
              </select>
            </div>
          </div>

          {/* メッセージ */}
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              rows={4}
              placeholder="研修の目的、受講者人数、ご希望の内容などをお聞かせください"
              className={`${fieldClass(!!errors.message)} resize-none`}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3 text-white font-bold rounded-xl text-sm transition-colors"
              style={{ backgroundColor: "#3B82C4" }}
            >
              依頼を送信する
            </button>

            {/* Errors below submit button */}
            {errorCount > 0 && (
              <div className="mt-2 space-y-0.5" role="alert">
                {errors.name && (
                  <p className="text-red-500 text-xs">• {errors.name}</p>
                )}
                {errors.email && (
                  <p className="text-red-500 text-xs">• {errors.email}</p>
                )}
                {errors.theme && (
                  <p className="text-red-500 text-xs">• {errors.theme}</p>
                )}
                {errors.message && (
                  <p className="text-red-500 text-xs">• {errors.message}</p>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      {showModal && (
        <SuccessModal
          instructorName={instructorName}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
