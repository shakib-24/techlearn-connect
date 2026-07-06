import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ブラウザ / クライアントコンポーネントから使う。RLS ポリシーの制約を受ける。
// モジュールレベルで一度だけ生成し、アプリ全体で共有する。呼び出し側ごとに
// 生成すると同一ストレージキーに対して複数の GoTrueClient インスタンスが
// でき、警告や認証状態の不整合を招くため。
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// サーバー側専用（Route Handler / Server Action）。RLS をバイパスするため
// クライアントコンポーネントや公開バンドルには絶対に持ち込まないこと。
export function createAdminClient() {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
