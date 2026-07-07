"use client";

import { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface FormValues {
  company: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

const EMPTY: FormValues = {
  company: "",
  name: "",
  email: "",
  inquiryType: "",
  message: "",
};

const INQUIRY_TYPES = [
  "講師登録について",
  "企業での利用について",
  "料金について",
  "その他",
];

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = "お名前は必須です";
  if (!v.email.trim()) {
    e.email = "メールアドレスは必須です";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    e.email = "有効なメールアドレスを入力してください";
  }
  if (!v.inquiryType) e.inquiryType = "お問い合わせ種別を選択してください";
  if (!v.message.trim()) {
    e.message = "メッセージは必須です";
  } else if (v.message.trim().length < 10) {
    e.message = "メッセージは10文字以上で入力してください";
  }
  return e;
}

const fieldClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
  }`;

export default function ContactPageForm() {
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});

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
    showToast("お問い合わせを受け付けました");
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* 会社名 */}
      <div>
        <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
          会社名
        </label>
        <input
          type="text"
          name="company"
          value={values.company}
          onChange={handleChange}
          placeholder="株式会社サンプル"
          className={fieldClass(false)}
        />
      </div>

      {/* お名前 */}
      <div>
        <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
          お名前 <span className="text-red-500">*</span>
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

      {/* お問い合わせ種別 */}
      <div>
        <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
          お問い合わせ種別 <span className="text-red-500">*</span>
        </label>
        <select
          name="inquiryType"
          value={values.inquiryType}
          onChange={handleChange}
          className={fieldClass(!!errors.inquiryType)}
        >
          <option value="">選択してください</option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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
          rows={5}
          placeholder="お問い合わせ内容をご記入ください（10文字以上）"
          className={`${fieldClass(!!errors.message)} resize-none`}
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full py-3 text-white font-bold rounded-xl text-sm transition-colors bg-gradient-to-r from-[#1E3A5F] to-[#3B82C4]"
        >
          送信する
        </button>

        {errorCount > 0 && (
          <div className="mt-2 space-y-0.5" role="alert">
            {errors.name && <p className="text-red-500 text-xs">• {errors.name}</p>}
            {errors.email && <p className="text-red-500 text-xs">• {errors.email}</p>}
            {errors.inquiryType && (
              <p className="text-red-500 text-xs">• {errors.inquiryType}</p>
            )}
            {errors.message && <p className="text-red-500 text-xs">• {errors.message}</p>}
          </div>
        )}
      </div>
    </form>
  );
}
