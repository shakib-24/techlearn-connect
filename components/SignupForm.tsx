"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface FormValues {
  name: string;
  email: string;
  password: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const EMPTY: FormValues = { name: "", email: "", password: "" };

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (!v.name.trim()) e.name = "名前は必須です";
  if (!v.email.trim()) {
    e.email = "メールアドレスは必須です";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    e.email = "有効なメールアドレスを入力してください";
  }
  if (!v.password) e.password = "パスワードは必須です";
  return e;
}

const fieldClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
  }`;

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // モック認証: パスワードは保存せず、名前とメールアドレスのみで即ログイン状態にする
    login({ name: values.name.trim(), email: values.email.trim() });
    const redirect = searchParams.get("redirect") || "/";
    router.push(redirect);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* 名前 */}
      <div>
        <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
          名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="山田 太郎"
          className={fieldClass(!!errors.name)}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
          placeholder="you@example.com"
          className={fieldClass(!!errors.email)}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* パスワード */}
      <div>
        <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
          パスワード <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="8文字以上"
          className={fieldClass(!!errors.password)}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 text-white font-bold rounded-xl text-sm transition-colors"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        新規登録
      </button>
    </form>
  );
}
