"use client";

import React, { useState } from "react";
import {
  Globe,
  Mail,
  Lock,
  User,
  ArrowRight,
  Shield,
  Sun,
  Moon,
  Check,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { UserRole } from "../types";
import { useApp } from "./AppContext";
import PublicLandingPage from "./PublicLandingPage";

export default function AuthPage() {
  const { darkMode, setDarkMode, handleSocialSubmit, handleTraditionalRegister, handleTraditionalLogin, handleDemoBypass } = useApp();

  const [publicTab, setPublicTab] = useState<"home" | "auth">("home");
  const [authTab, setAuthTab] = useState<"signup" | "signin">("signup");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState<UserRole>("Student");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showSocialPopup, setShowSocialPopup] = useState(false);
  const [socialProvider, setSocialProvider] = useState<"Google" | "Gmail" | null>(null);
  const [socialStep, setSocialStep] = useState<"choose" | "loading" | "success">("choose");
  const [customSocialName, setCustomSocialName] = useState("");
  const [customSocialEmail, setCustomSocialEmail] = useState("");

  const handleSocialSubmitWithAnimation = (name: string, email: string) => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setSocialStep("loading");
    setTimeout(() => {
      setSocialStep("success");
      setTimeout(() => {
        handleSocialSubmit(name, email, socialProvider, regRole);
        setShowSocialPopup(false);
        setSocialStep("choose");
        setCustomSocialName("");
        setCustomSocialEmail("");
      }, 1000);
    }, 1500);
  };

  const onTraditionalRegister = (e: React.FormEvent) => {
    e.preventDefault();
    handleTraditionalRegister(regName, regEmail, regPassword, regRole);
  };

  const onTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleTraditionalLogin(loginEmail, loginPassword);
  };

  if (publicTab === "home") {
    return (
      <PublicLandingPage
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onStartPrep={(tab) => {
          setAuthTab(tab);
          setPublicTab("auth");
        }}
        onDemoBypass={handleDemoBypass}
      />
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ${darkMode ? "dark bg-[#0F172A]" : "bg-slate-50"} transition-colors duration-200 font-sans`}>
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setPublicTab("home")}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-800 to-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-slate-500/15 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-500/20">P</div>
              <div>
                <h2 className="font-display font-black text-xl tracking-tight leading-none">Prepistan</h2>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 font-bold">Competitive Arena</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight leading-snug mb-6">Pakistan&apos;s Premier CSS & PMS Competitive Hub</h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-400" /></div>
                <div><h3 className="text-xs font-bold text-slate-200">Simulated AI Tutor</h3><p className="text-[11px] text-slate-300 leading-normal">Interactive guidelines with offline preloaded templates for fast pacing.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-400" /></div>
                <div><h3 className="text-xs font-bold text-slate-200">Syllabus & Past Exams Trackers</h3><p className="text-[11px] text-slate-300 leading-normal">Dynamic progress indicators for compulsory & optional competitive subjects.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5 text-emerald-400" /></div>
                <div><h3 className="text-xs font-bold text-slate-200">Interactive Quiz Engine</h3><p className="text-[11px] text-slate-300 leading-normal">Test current affairs knowledge, score coins, climb leaderboard ranks.</p></div>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-8 mt-8 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs font-mono uppercase">MS</div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider block text-emerald-400 font-bold leading-none">Senior CSS Consultant</span>
                <span className="text-xs font-semibold text-slate-100 block mt-1">Murtaza Syed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
              <button
                onClick={() => setAuthTab("signup")}
                className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${authTab === "signup" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"}`}
              >Create Account (New Register)</button>
              <button
                onClick={() => setAuthTab("signin")}
                className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${authTab === "signin" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"}`}
              >Sign In (Existing Student)</button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-[11px] text-center font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Authentication Services</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { setSocialProvider("Google"); setSocialStep("choose"); setShowSocialPopup(true); }}
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm font-bold text-xs transition-all group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.82z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" /><path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.95 12c0-.79.13-1.57.37-2.31V6.54H1.21A11.95 11.95 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.11-3.22z" /><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.54l4.11 3.22c.94-2.85 3.57-4.96 6.68-4.96z" /></svg>
                  <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-slate-700 dark:text-slate-300">Sign up with Google</span>
                </button>
                <button
                  onClick={() => { setSocialProvider("Gmail"); setSocialStep("choose"); setShowSocialPopup(true); }}
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200/50 dark:border-red-950 bg-red-50/25 dark:bg-red-950/10 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:shadow-sm font-bold text-xs transition-all group"
                >
                  <Mail className="w-4 h-4 text-red-500" />
                  <span>Sign up with Gmail</span>
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-slate-900 text-slate-400 font-semibold uppercase tracking-wider text-[9px]">Or Use Traditional Credentials</span></div>
            </div>

            {authTab === "signup" ? (
              <form onSubmit={onTraditionalRegister} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="e.g., Syed Murtaza" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Initial Competitive Role Setup</label>
                  <div className="relative"><Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><select value={regRole} onChange={(e) => setRegRole(e.target.value as UserRole)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none"><option value="Student">Normal Student (Free Account)</option><option value="Premium Student">Premium CSS Student (Locked Features Open)</option><option value="Content Manager">Content Editor / Manager (CMS Access)</option><option value="Super Admin">System Administrator (Full Control Panel)</option></select></div>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 group"><span>Create Free Account</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></button>
              </form>
            ) : (
              <form onSubmit={onTraditionalLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required /></div>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">Tip: Enter <code className="font-mono text-emerald-600">admin@prepistan.pk</code> to auto-login as Super Admin!</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required /></div>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 group"><span>Sign In to Arena</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></button>
              </form>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block mb-2.5">Developer Simulation & Testing bypass</span>
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={() => handleDemoBypass("Super Admin")} className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-bold transition-all border border-amber-500/15">Super Admin</button>
              <button onClick={() => handleDemoBypass("Student")} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold transition-all border border-emerald-500/15">Standard Student</button>
              <button onClick={() => handleDemoBypass("Premium Student")} className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg text-[10px] font-bold transition-all border border-purple-500/15">Premium Student</button>
            </div>
          </div>
        </div>
      </div>

      {showSocialPopup && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 font-sans">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">{socialProvider === "Google" ? <svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.82z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" /></svg> : <Mail className="w-3 h-3 text-red-500" />}</div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Secure {socialProvider} Portal Connection</span>
              <button onClick={() => setShowSocialPopup(false)} className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold">Close</button>
            </div>

            {socialStep === "choose" && (
              <div className="p-6 space-y-5">
                <div className="text-center">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white">Choose an Account</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">to continue registration on <strong className="text-slate-600 dark:text-slate-300">Prepistan Arena</strong></p>
                </div>
                <div className="space-y-2">
                  <button onClick={() => handleSocialSubmitWithAnimation("Murtaza Syed", "murtaza@prepistan.pk")} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-all">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">MS</div>
                    <div><span className="text-xs font-bold text-slate-800 dark:text-white block leading-none">Murtaza Syed</span><span className="text-[10px] text-slate-400 block mt-1">murtaza@prepistan.pk</span></div>
                    <span className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Active CSS</span>
                  </button>
                  <button onClick={() => handleSocialSubmitWithAnimation("Competitive Aspirant", "aspirant.css2026@gmail.com")} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-all">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xs uppercase">CA</div>
                    <div><span className="text-xs font-bold text-slate-800 dark:text-white block leading-none">Competitive Aspirant</span><span className="text-[10px] text-slate-400 block mt-1">aspirant.css2026@gmail.com</span></div>
                  </button>
                </div>
                <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800" /></div><div className="relative flex justify-center text-[10px]"><span className="px-2 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[8px]">Or Enter New Account</span></div></div>
                <div className="space-y-3">
                  <div><label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Aspirant Full Name</label><input type="text" value={customSocialName} onChange={(e) => setCustomSocialName(e.target.value)} placeholder="e.g., Syed Murtaza" className="w-full px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 animate-in fade-in duration-100" /></div>
                  <div><label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{socialProvider === "Google" ? "Google Mail Address" : "Gmail Address"}</label><input type="email" value={customSocialEmail} onChange={(e) => setCustomSocialEmail(e.target.value)} placeholder="yourname@gmail.com" className="w-full px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 animate-in fade-in duration-100" /></div>
                  <button onClick={() => handleSocialSubmitWithAnimation(customSocialName, customSocialEmail)} type="button" className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"><Globe className="w-3.5 h-3.5" /><span>Proceed {socialProvider} Authorization</span></button>
                </div>
              </div>
            )}

            {socialStep === "loading" && (
              <div className="p-10 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center mx-auto text-emerald-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
                <div><h3 className="text-sm font-black text-slate-800 dark:text-white">Establishing Secure Session...</h3><p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 leading-normal">Handshaking credentials securely through standard encrypted {socialProvider} Auth Services. Please wait.</p></div>
              </div>
            )}

            {socialStep === "success" && (
              <div className="p-10 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20"><Check className="w-6 h-6" /></div>
                <div><h3 className="text-sm font-black text-slate-800 dark:text-white">Successfully Authenticated!</h3><p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 leading-normal">Prepistan Competitive Database synchronized. Loading your dashboard arena...</p></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
