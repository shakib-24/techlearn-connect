"use client";

import { useState } from "react";
import type { Instructor } from "@/data/instructors";
import { useCustomInstructors } from "@/hooks/useCustomInstructors";
import RegisterSuccessModal from "./RegisterSuccessModal";

const CATEGORIES: Instructor["category"][] = [
  "Frontend",
  "Backend",
  "Infrastructure",
  "UI/UX Design",
  "AI/Data Science",
];
const FORMATS: Instructor["format"][] = ["オンライン", "対面", "両方対応"];

interface Values {
  name: string;
  category: Instructor["category"] | "";
  skillsRaw: string;
  tagline: string;
  format: Instructor["format"] | "";
  price: string;
  bio: string;
  curriculumRaw: string;
}

interface Errors {
  name?: string;
  category?: string;
  skillsRaw?: string;
  tagline?: string;
  format?: string;
  price?: string;
}

const EMPTY: Values = {
  name: "",
  category: "",
  skillsRaw: "",
  tagline: "",
  format: "",
  price: "",
  bio: "",
  curriculumRaw: "",
};

function generateInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "名前は必須です";
  if (!v.category) e.category = "カテゴリを選択してください";
  const skills = v.skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
  if (skills.length === 0) e.skillsRaw = "スキルタグを1つ以上入力してください";
  if (!v.tagline.trim()) e.tagline = "一言アピールは必須です";
  if (!v.format) e.format = "対応形式を選択してください";
  if (!v.price.trim()) e.price = "費用目安は必須です";
  return e;
}

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
  }`;

const selectClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82C4] transition-colors ${
    hasError
      ? "border-red-400 bg-red-50 text-[#1E3A5F]"
      : "border-gray-200 bg-white text-[#64748B]"
  }`;

export default function RegisterForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [modalName, setModalName] = useState("");
  const { addInstructor } = useCustomInstructors();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
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

    const skills = values.skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const curriculum = values.curriculumRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const instructor: Instructor = {
      id: `custom-${Date.now()}`,
      name: values.name.trim(),
      category: values.category as Instructor["category"],
      skills,
      tagline: values.tagline.trim(),
      format: values.format as Instructor["format"],
      price: values.price.trim(),
      bio: values.bio.trim() || "詳細情報は準備中です。",
      achievements: [],
      curriculum,
      initials: generateInitials(values.name),
    };

    addInstructor(instructor);
    setModalName(instructor.name);
    setValues(EMPTY);
    setErrors({});
  };

  const errorKeys = Object.values(errors).filter(Boolean);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
            placeholder="田中 健太"
            className={inputClass(!!errors.name)}
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className={selectClass(!!errors.category)}
          >
            <option value="">選択してください</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* スキルタグ */}
        <div>
          <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
            スキルタグ <span className="text-red-500">*</span>
            <span className="text-[#64748B] font-normal ml-1">（カンマ区切り）</span>
          </label>
          <input
            type="text"
            name="skillsRaw"
            value={values.skillsRaw}
            onChange={handleChange}
            placeholder="React, TypeScript, Next.js"
            className={inputClass(!!errors.skillsRaw)}
          />
        </div>

        {/* 一言アピール */}
        <div>
          <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
            一言アピール <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tagline"
            value={values.tagline}
            onChange={handleChange}
            placeholder="モダンWebの最前線を走るフロントエンドエンジニア"
            className={inputClass(!!errors.tagline)}
          />
        </div>

        {/* 対応形式 + 費用目安 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              対応形式 <span className="text-red-500">*</span>
            </label>
            <select
              name="format"
              value={values.format}
              onChange={handleChange}
              className={selectClass(!!errors.format)}
            >
              <option value="">選択してください</option>
              {FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
              費用目安 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="¥10,000 / 時間"
              className={inputClass(!!errors.price)}
            />
          </div>
        </div>

        {/* 経歴・自己紹介 */}
        <div>
          <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
            経歴・自己紹介
            <span className="text-[#64748B] font-normal ml-1">（任意）</span>
          </label>
          <textarea
            name="bio"
            value={values.bio}
            onChange={handleChange}
            rows={4}
            placeholder="経歴や強み、研修への思いなどを自由にご記入ください"
            className={`${inputClass(false)} resize-none`}
          />
        </div>

        {/* カリキュラム例 */}
        <div>
          <label className="block text-xs font-semibold text-[#1E3A5F] mb-1">
            カリキュラム例
            <span className="text-[#64748B] font-normal ml-1">（任意・カンマ区切り）</span>
          </label>
          <input
            type="text"
            name="curriculumRaw"
            value={values.curriculumRaw}
            onChange={handleChange}
            placeholder="React基礎, Hooks 入門, 状態管理パターン"
            className={inputClass(false)}
          />
        </div>

        {/* Submit + error list */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-xl text-sm transition-colors"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            プロフィールを登録する
          </button>

          {errorKeys.length > 0 && (
            <div className="mt-2 space-y-0.5" role="alert">
              {errors.name && (
                <p className="text-red-500 text-xs">• {errors.name}</p>
              )}
              {errors.category && (
                <p className="text-red-500 text-xs">• {errors.category}</p>
              )}
              {errors.skillsRaw && (
                <p className="text-red-500 text-xs">• {errors.skillsRaw}</p>
              )}
              {errors.tagline && (
                <p className="text-red-500 text-xs">• {errors.tagline}</p>
              )}
              {errors.format && (
                <p className="text-red-500 text-xs">• {errors.format}</p>
              )}
              {errors.price && (
                <p className="text-red-500 text-xs">• {errors.price}</p>
              )}
            </div>
          )}
        </div>
      </form>

      {modalName && (
        <RegisterSuccessModal
          instructorName={modalName}
          onClose={() => setModalName("")}
        />
      )}
    </>
  );
}
