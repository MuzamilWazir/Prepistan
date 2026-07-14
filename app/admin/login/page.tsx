"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, Sun, Moon } from "lucide-react";
import { useApp } from "../../../components/AppContext";
import { apiAdminLogin } from "../../../lib/api";
import ToastContainer from "../../../components/ToastContainer";

export default function AdminLoginPage() {
  const router = useRouter();
  const { darkMode, setDarkMode, currentUser, currentRole } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser.isLoggedIn && (currentRole === "Admin" || currentRole === "Super Admin")) {
      router.replace("/admin/dashboard");
    }
  }, [currentUser.isLoggedIn, currentRole, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiAdminLogin({ email, password });
      localStorage.setItem("prepistan_token", res.accessToken);
      localStorage.setItem("prepistan_user", JSON.stringify({
        name: res.user.name,
        email: res.user.email,
        isLoggedIn: true,
        provider: "Admin Login",
      }));
      window.location.href = "/admin/dashboard";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Admin login failed";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <>
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-[#0F172A]" : "bg-slate-950"} transition-colors`}>
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-4 right-4 p-2.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:scale-105 transition-transform z-10">
        {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">Admin Control Room</h1>
          <p className="text-xs text-slate-400 mt-2">Authorized personnel only. Admin credentials required.</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs text-rose-400 font-semibold">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prepistan.pk"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>
                  <span>Access Admin Panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <a href="/login" className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors font-semibold">
              ← Back to Student Login
            </a>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
