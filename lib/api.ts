const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

// ── Auth ──

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  isPremium: boolean;
  xp: number;
  coins: number;
  streak: number;
  longestStreak: number;
  level: number;
  bookmarkedIds: string[];
}

export async function apiRegister(data: {
  name: string;
  email: string;
  password: string;
}) {
  return request<{ message: string; user: AuthUser }>("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiLogin(data: { email: string; password: string }) {
  return request<{ message: string; user: AuthUser; accessToken: string }>(
    "/users/login",
    { method: "POST", body: JSON.stringify(data) }
  );
}

export async function apiAdminLogin(data: { email: string; password: string }) {
  return request<{ message: string; user: AuthUser; accessToken: string }>(
    "/users/admin/login",
    { method: "POST", body: JSON.stringify(data) }
  );
}

export async function apiGetCurrentUser(token: string) {
  return request<{ user: AuthUser }>("/users/me", {
    headers: authHeaders(token),
  });
}

export async function apiLogout() {
  return request<{ message: string }>("/users/logout", { method: "POST" });
}

// ── Admin User Management ──

export async function apiAdminGetUsers(
  token: string,
  params?: { page?: number; limit?: number; search?: string; role?: string }
) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  if (params?.role) query.set("role", params.role);

  return request<{
    users: AuthUser[];
    total: number;
    page: number;
    pages: number;
  }>(`/users/admin/users?${query.toString()}`, {
    headers: authHeaders(token),
  });
}

export async function apiAdminUpdateUserRole(
  token: string,
  data: { userId: string; role: string }
) {
  return request<{ message: string; user: AuthUser }>("/users/admin/users/role", {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function apiAdminDeleteUser(token: string, userId: string) {
  return request<{ message: string }>(`/users/admin/users/${userId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ── Questions ──

export interface QuestionData {
  _id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  referenceBook?: string;
  difficulty: string;
  category: string;
  subject: string;
  topic?: string;
  subtopic?: string;
  chapter?: string;
  tags: string[];
  negativeMarks?: number;
  timeLimitSeconds?: number;
  hints: string[];
  isPremium: boolean;
}

export async function apiGetQuestions(params?: {
  category?: string;
  subject?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.subject) query.set("subject", params.subject);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  return request<{
    questions: QuestionData[];
    total: number;
    page: number;
    pages: number;
  }>(`/questions?${query.toString()}`);
}

export async function apiGetCategories() {
  return request<{ categories: string[] }>("/questions/categories");
}

export async function apiGetSubjects(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request<{ subjects: string[] }>(`/questions/subjects${query}`);
}

// ── Quiz Attempts ──

export interface QuizAttemptData {
  _id: string;
  userId: string;
  quizMode: string;
  category: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpentSeconds: number;
  date: string;
}

export async function apiSubmitQuizAttempt(
  token: string,
  data: {
    quizMode: string;
    category: string;
    subject: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    timeSpentSeconds: number;
  }
) {
  return request<{
    attempt: QuizAttemptData;
    rewards: { xp: number; coins: number };
    streak: number;
    longestStreak: number;
    userXp: number;
    userCoins: number;
  }>(
    "/quiz/submit",
    { method: "POST", headers: authHeaders(token), body: JSON.stringify(data) }
  );
}

export async function apiGetQuizHistory(token: string) {
  return request<{ attempts: QuizAttemptData[] }>("/quiz/history", {
    headers: authHeaders(token),
  });
}

export async function apiGetLeaderboard(period?: string) {
  const query = period ? `?period=${encodeURIComponent(period)}` : "";
  return request<{ leaderboard: AuthUser[] }>(`/quiz/leaderboard${query}`);
}

export async function apiGetUserRank(token: string, period?: string) {
  const query = period ? `?period=${encodeURIComponent(period)}` : "";
  return request<{ user: AuthUser; rank: number }>(`/quiz/leaderboard/me${query}`, {
    headers: authHeaders(token),
  });
}

// ── Google OAuth ──

export function getGoogleAuthUrl(): string {
  return `${API_BASE}/users/auth/google`;
}

export function extractOAuthParams(): { token?: string; refresh?: string; user?: string; error?: string } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const refresh = params.get("refresh");
  const user = params.get("user");
  const error = params.get("error");

  if (!token && !error) return null;

  return {
    token: token || undefined,
    refresh: refresh || undefined,
    user: user || undefined,
    error: error || undefined,
  };
}

export function clearOAuthParams() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("token");
  url.searchParams.delete("refresh");
  url.searchParams.delete("user");
  url.searchParams.delete("error");
  window.history.replaceState({}, "", url.toString());
}
