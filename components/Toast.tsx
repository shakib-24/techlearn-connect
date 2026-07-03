"use client";

export default function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="animate-fade-in-up bg-[#1E3A5F] text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg"
    >
      {message}
    </div>
  );
}
