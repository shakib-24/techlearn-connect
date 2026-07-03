import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ブラウザ / クライアントコンポーネントから使う。RLS ポリシーの制約を受ける。
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

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
