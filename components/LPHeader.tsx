"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function LPHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav
        ref={navRef}
        className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <div>
          <span className="font-bold text-[#1E3A5F] text-lg">TechLearn Connect</span>
          <span className="text-[#64748B] text-xs ml-2 hidden sm:inline">研修講師マッチング</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/instructors"
            className="text-sm font-medium text-[#64748B] hover:text-[#1E3A5F] transition-colors"
          >
            講師を探す
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-white bg-[#3B82C4] px-4 py-2 rounded-lg hover:bg-[#1E3A5F] transition-colors"
          >
            講師登録
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-0.5 bg-[#1E3A5F] transition-transform duration-200 origin-center ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1E3A5F] transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1E3A5F] transition-transform duration-200 origin-center ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            <Link
              href="/instructors"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#1E3A5F] hover:text-[#3B82C4] transition-colors py-2 border-b border-gray-50"
            >
              講師を探す
            </Link>
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-white bg-[#3B82C4] px-4 py-3 rounded-lg hover:bg-[#1E3A5F] transition-colors text-center"
            >
              講師登録
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
