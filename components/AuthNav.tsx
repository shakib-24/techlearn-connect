"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthNavProps {
  theme?: "light" | "dark";
  stacked?: boolean;
  onNavigate?: () => void;
}

export default function AuthNav({
  theme = "dark",
  stacked = false,
  onNavigate,
}: AuthNavProps) {
  const { user, isLoggedIn, logout } = useAuth();
  const pathname = usePathname();

  const loginHref =
    pathname && pathname !== "/login"
      ? `/login?redirect=${encodeURIComponent(pathname)}`
      : "/login";

  const loginLinkClass = stacked
    ? "text-sm font-medium text-[#1E3A5F] hover:text-[#3B82C4] transition-colors py-2 border-b border-gray-50"
    : theme === "light"
    ? "text-sm font-medium text-[#64748B] hover:text-[#1E3A5F] transition-colors"
    : "text-sm text-blue-200 hover:text-white transition-colors";

  if (!isLoggedIn) {
    return (
      <Link href={loginHref} onClick={onNavigate} className={loginLinkClass}>
        ログイン
      </Link>
    );
  }

  const userClass = stacked
    ? "text-sm font-medium text-[#1E3A5F] py-2 border-b border-gray-50"
    : theme === "light"
    ? "text-sm font-medium text-[#1E3A5F]"
    : "text-sm text-white/90";

  const logoutClass = stacked
    ? "text-sm font-medium text-red-500 hover:text-red-600 transition-colors py-2 text-left"
    : theme === "light"
    ? "text-sm font-medium text-[#64748B] hover:text-red-500 transition-colors"
    : "text-sm text-blue-200 hover:text-white transition-colors";

  const handleLogout = () => {
    logout();
    onNavigate?.();
  };

  return (
    <div className={stacked ? "flex flex-col" : "flex items-center gap-3"}>
      <span className={userClass}>{user?.name} さん</span>
      <button type="button" onClick={handleLogout} className={logoutClass}>
        ログアウト
      </button>
    </div>
  );
}
