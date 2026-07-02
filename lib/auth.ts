// これはプロトタイプ用のモック認証（UIデモ）であり、実際のセキュリティを提供しません。
// パスワードは入力値としてのみ検証に使用し、localStorage を含むどこにも保存しません。
const STORAGE_KEY = "techlearn_auth_user";

export interface User {
  name: string;
  email: string;
}

export function getUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

export function login(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

export function logout(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
