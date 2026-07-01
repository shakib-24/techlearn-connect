"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Props {
  instructorName: string;
  onClose: () => void;
}

export default function RegisterSuccessModal({ instructorName, onClose }: Props) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleViewList = () => {
    onClose();
    router.push("/instructors");
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center outline-none"
      >
        {/* Check icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#D1FAE5" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 id="reg-modal-title" className="text-xl font-bold text-[#1E3A5F] mb-2">
          登録完了しました！
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-6">
          <span className="font-medium text-[#1E3A5F]">{instructorName}</span>{" "}
          さんのプロフィールが一覧に追加されました。
        </p>

        <button
          onClick={handleViewList}
          className="w-full py-3 font-bold rounded-xl text-white text-sm transition-colors mb-2"
          style={{ backgroundColor: "#10B981" }}
        >
          一覧を見る →
        </button>
        <button
          onClick={onClose}
          className="w-full py-2 text-xs text-[#64748B] hover:text-[#1E3A5F] transition-colors"
        >
          このページに留まる
        </button>
        <p className="text-[#64748B] text-xs mt-2">
          ESC キーまたは背景クリックでも閉じられます
        </p>
      </div>
    </div>
  );
}
