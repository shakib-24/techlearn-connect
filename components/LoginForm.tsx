"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface FormValues {
  email: string;
  password: string;
}
interface FormErrors {
  email?: string;
  password?: string;
}

const EMPTY: FormValues = { email: "", password: "" };

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
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

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (authError) setAuthError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    const { error } = await login(values.email.trim(), values.password);
    setSubmitting(false);

    if (error) {
      setAuthError(error);
      return;
    }

    const redirect = searchParams.get("redirect") || "/";
    router.push(redirect);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {authError && (
        <div
          className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium"
          role="alert"
        >
          {authError}
        </div>
      )}

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
          placeholder="パスワード"
          className={fieldClass(!!errors.password)}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-60"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        {submitting ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  );
}
