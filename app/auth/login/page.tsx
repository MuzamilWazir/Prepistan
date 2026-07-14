"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Sun, Moon, ArrowLeft } from "lucide-react";
import { AppProvider, useApp } from "../../../components/AppContext";

function LoginForm() {
  const router = useRouter();
  const { darkMode, setDarkMode, handleTraditionalLogin, currentUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (currentUser.isLoggedIn) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTraditionalLogin(email, password);
    router.push("/dashboard");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ${darkMode ? "dark bg-[#0F172A]" : "bg-slate-50"} transition-colors duration-200 font-sans`}>
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => router.push("/")} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-all text-xs font-bold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform">
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-800 to-slate-950 p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-emerald-500/20">P</div>
            <div>
              <h2 className="font-display font-black text-xl tracking-tight leading-none">Prepistan</h2>
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 font-bold">Competitive Arena</span>
            </div>
          </div>
          <h1 className="text-xl font-black font-display tracking-tight">Welcome Back</h1>
          <p className="text-[11px] text-slate-300 mt-2">Sign in to continue your exam preparation</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" required />
              </div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">
                Tip: Enter <code className="font-mono text-emerald-600">admin@prepistan.pk</code> to auto-login as Super Admin!
              </p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" required />
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 group">
              <span>Sign In to Arena</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Don&apos;t have an account?{" "}
              <button onClick={() => router.push("/auth/signup")} className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">Create Free Account</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AppProvider initialTab="dashboard">
      <LoginForm />
    </AppProvider>
  );
}
