"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default function AuthTabs() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("tab") === "signup" ? "signup" : "login"
  );
  const isLogin = mode === "login";

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">
          {isLogin ? "ログイン" : "新規登録"}
        </h1>
        <p className="text-[#64748B] text-sm mt-1">
          {isLogin
            ? "アカウントにログインして依頼・レビュー投稿を行いましょう"
            : "アカウントを作成して依頼・レビュー投稿を行いましょう"}
        </p>
      </div>

      {isLogin && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-[#1E3A5F] text-xs font-medium mb-1">デモアカウントについて</p>
          <p className="text-[#64748B] text-xs leading-relaxed">
            以下のデモアカウントでログインできます（本番の認証機能ではありません）。
            <br />
            メールアドレス: demo@techlearn.jp
            <br />
            パスワード: demo1234
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {isLogin ? <LoginForm /> : <SignupForm />}

        <p className="text-center text-sm text-[#64748B] mt-5">
          {isLogin ? (
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="font-medium hover:text-[#1E3A5F] transition-colors"
            >
              アカウントをお持ちでない方はこちら
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-medium hover:text-[#1E3A5F] transition-colors"
            >
              すでにアカウントをお持ちの方はこちら
            </button>
          )}
        </p>
      </div>
    </>
  );
}
