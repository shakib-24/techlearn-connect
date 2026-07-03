import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { ToastProvider } from "@/hooks/useToast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TechLearn Connect | 研修講師マッチングサービス",
    template: "%s | TechLearn Connect",
  },
  description:
    "IT研修に特化したプロ講師マッチングサービス。フロントエンドからAI/MLまで、最適な講師を素早く検索・比較できます。",
  openGraph: {
    siteName: "TechLearn Connect",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <FavoritesProvider>
            <ToastProvider>{children}</ToastProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
