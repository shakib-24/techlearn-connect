"use client";

import { useEffect, useRef } from "react";

interface Props {
  instructorName: string;
  onClose: () => void;
}

export default function SuccessModal({ instructorName, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the modal panel on open
    modalRef.current?.focus();
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap: cycle only within modal focusable elements
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

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center outline-none"
      >
        {/* Check icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#D1FAE5" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 id="modal-title" className="text-xl font-bold text-[#1E3A5F] mb-2">
          送信完了しました！
        </h2>
        <p className="text-[#64748B] text-sm leading-relaxed mb-1">
          <span className="font-medium text-[#1E3A5F]">{instructorName}</span> さんへの
        </p>
        <p className="text-[#64748B] text-sm leading-relaxed mb-6">
          お問い合わせを受け付けました。
          <br />
          確認メールをお送りしますので、しばらくお待ちください。
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 font-bold rounded-xl text-white text-sm transition-colors"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          閉じる
        </button>
        <p className="text-[#64748B] text-xs mt-3">
          ESC キーまたは背景クリックでも閉じられます
        </p>
      </div>
    </div>
  );
}
