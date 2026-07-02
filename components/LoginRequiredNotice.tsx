import Link from "next/link";

export default function LoginRequiredNotice({
  message,
  redirectTo,
}: {
  message: string;
  redirectTo?: string;
}) {
  const href = redirectTo
    ? `/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/login";

  return (
    <div className="text-center py-8 px-4 bg-[#F1F5F9] rounded-xl border border-gray-100">
      <p className="text-[#64748B] text-sm mb-3">{message}</p>
      <Link
        href={href}
        className="inline-block text-sm font-semibold text-white bg-[#3B82C4] px-5 py-2.5 rounded-lg hover:bg-[#1E3A5F] transition-colors"
      >
        ログインする
      </Link>
    </div>
  );
}
