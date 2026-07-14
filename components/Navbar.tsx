
"use client";
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Coins, 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  LogOut, 
  Shield, 
  Crown,
  Menu,
  X,
  Search,
  BookMarked,
  LayoutDashboard,
  Home,
  GraduationCap,
  Trophy,
  Newspaper,
  BookOpenCheck,
  Video,
  Users,
  FileSpreadsheet,
  CreditCard,
  Brain
} from "lucide-react";
import { UserRole, SystemNotification } from "../app/types";
import {useState} from "react";

interface NavbarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  isPremium: boolean;
  setPremium: (premium: boolean) => void;
  xp: number;
  coins: number;
  streak: number;
  language: "EN" | "UR";
  setLanguage: (lang: "EN" | "UR") => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  notifications: SystemNotification[];
  markNotificationsAsRead: () => void;
  onOpenPricing: () => void;
  onNavigate: (tab: string) => void;
  activeTab: string;
  currentUser: { name: string; email: string; isLoggedIn: boolean; provider?: string };
  onLogout: () => void;
}

export default function Navbar({
  currentRole,
  setRole,
  isPremium,
  setPremium,
  xp,
  coins,
  streak,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  notifications,
  markNotificationsAsRead,
  onOpenPricing,
  onNavigate,
  activeTab,
  currentUser,
  onLogout
}: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const rolesList: UserRole[] = ["Student", "Premium Student"];

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    if (role === "Premium Student" || role === "Super Admin") {
      setPremium(true);
    } else {
      setPremium(false);
    }
    setProfileOpen(false);
  };

  // Shared navigation items configuration
  const navItems = [
    { id: "dashboard", labelEN: "Dashboard", labelUR: "ڈیش بورڈ", icon: LayoutDashboard },
    { id: "exams", labelEN: "Exams & Subjects", labelUR: "امتحانات", icon: GraduationCap },
    { id: "courses", labelEN: "Video Academy", labelUR: "ویڈیو اکیڈمی", icon: Video, highlight: true },
    { id: "ai-portal", labelEN: "AI Tutor", labelUR: "اے آئی ٹیوٹر", icon: Sparkles },
    { id: "leaderboard", labelEN: "Leaderboard", labelUR: "لیڈر بورڈ", icon: Trophy },
    { id: "blog", labelEN: "Blog & Alerts", labelUR: "بلاگ اور الرٹس", icon: Newspaper },
    { id: "notes", labelEN: "Revision Notes", labelUR: "ریویژن نوٹس", icon: BookOpenCheck },
    { id: "bookmarks", labelEN: "Saved Vault", labelUR: "محفوظ کردہ", icon: BookMarked },
  ];

  return (
    <>
      {/* ----------------- DESKTOP SIDEBAR ----------------- */}
      <aside className="hidden md:flex w-64 fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col z-30 font-sans">
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate("dashboard")} 
          className="p-6 flex items-center gap-3 cursor-pointer group"
          id="sidebar-logo"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <span className="font-display text-lg font-bold">P</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Prepistan
            </span>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold leading-none">
              Competitive Arena
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 py-2 tracking-wider">
            {language === "EN" ? "Main Menu" : "مین مینو"}
          </div>

          {navItems.map(item => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm border border-emerald-500/10"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${
                  isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
                } ${item.highlight ? "animate-pulse" : ""}`} />
                <span>{language === "EN" ? item.labelEN : item.labelUR}</span>
                {item.highlight && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>
            );
          })}

          {/* Admin Room Option */}
          {(currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager") && (
            <div className="pt-4">
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 py-2 tracking-wider">
                Management
              </div>
              <button
                onClick={() => onNavigate("admin")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all border ${
                  activeTab === "admin"
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
                    : "bg-amber-50/20 dark:bg-amber-950/10 text-amber-600 dark:text-amber-400 border-transparent hover:bg-amber-50 dark:hover:bg-amber-950/30"
                }`}
              >
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Admin Room</span>
              </button>
            </div>
          )}
        </nav>

        {/* Pro / Subscription Sidebar Card */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-4 border border-emerald-500/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-1.5 relative z-10">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md">
                {isPremium ? "PREMIUM ACTIVE" : "PREMIUM"}
              </span>
              {!isPremium && (
                <button 
                  onClick={onOpenPricing}
                  className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Plans
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal mb-3 relative z-10">
              {isPremium 
                ? "Full access to AI Explanations & 5,000+ Premium Pakistan GK MCQs unlocked."
                : "Unlock AI explanations, custom smart mock exams and full syllabus prep."}
            </p>
            {!isPremium ? (
              <button 
                onClick={onOpenPricing}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/10 active:scale-[0.98] transition-all relative z-10"
              >
                Upgrade to Pro
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold justify-center py-1">
                <Crown className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span>Premium Student Account</span>
              </div>
            )}
            {/* Ambient visual balance glow */}
            <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </aside>

      {/* ----------------- DESKTOP TOP HEADER ----------------- */}
      <header className="hidden md:flex h-16 fixed top-0 left-64 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 items-center justify-between px-8 z-20 font-sans transition-colors">
        {/* Search simulation styled for Geometric Balance */}
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-slate-700 dark:text-slate-200 placeholder-slate-400" 
            placeholder={language === "EN" ? "Search exams, MCQs or topics..." : "امتحانات یا سوالات تلاش کریں..."}
          />
        </div>

        {/* Global Stats and Utility Controls */}
        <div className="flex items-center gap-6">
          {/* Gamification Stats */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-orange-500 stroke-orange-500" />
              <div className="flex flex-col leading-none">
                <span>{streak} Days</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Streak</span>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-950/40 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Coins className="w-4 h-4 fill-amber-500 stroke-amber-500" />
              <div className="flex flex-col leading-none">
                <span>{coins}</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Gold Coins</span>
              </div>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <div className="w-4 h-4 rounded bg-emerald-600 text-white font-mono flex items-center justify-center text-[8px]">XP</div>
              <div className="flex flex-col leading-none">
                <span>{xp}</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Points</span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "EN" ? "UR" : "EN")}
              title="Switch Language"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1 text-xs font-bold transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Notifications Panel */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                  if (!notifOpen) markNotificationsAsRead();
                }}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 relative transition-all"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2.5 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden py-2 text-xs text-slate-800 dark:text-slate-200 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <span className="font-bold">Notifications</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Latest Updates</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-slate-400">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <div className="flex items-center space-x-1.5 mb-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              notif.type === "alert" ? "bg-red-500" :
                              notif.type === "warning" ? "bg-amber-500" :
                              notif.type === "success" ? "bg-emerald-500" : "bg-sky-500"
                            }`} />
                            <span className="font-semibold text-xs text-slate-900 dark:text-white">{notif.title}</span>
                            <span className="text-[9px] text-slate-400 ml-auto">{notif.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-emerald-600/10 uppercase">
                  {currentUser.name ? currentUser.name[0] : currentRole[0]}
                </div>
                <div className="hidden xl:flex flex-col pr-1">
                  <span className="text-xs font-bold leading-none text-slate-800 dark:text-white truncate max-w-[100px]">{currentUser.name}</span>
                  <span className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">{currentRole}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-60 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden py-2 text-xs text-slate-800 dark:text-slate-200 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="font-bold flex items-center space-x-1">
                      <span className="truncate">{currentUser.name}</span>
                      {isPremium && <Crown className="w-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-bold text-[9px] uppercase">
                        {currentRole}
                      </span>
                      {currentUser.provider && (
                        <span className="text-[9px] font-mono text-slate-400 uppercase">
                          Via {currentUser.provider}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="block px-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Swap Simulator Role
                    </span>
                    <div className="space-y-0.5">
                      {rolesList.map(role => (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(role)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                            currentRole === role
                              ? "bg-emerald-600 text-white font-semibold"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span>{role}</span>
                          {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Admin Management Links */}
                  {(currentRole === "Admin" || currentRole === "Super Admin") && (
                    <div className="p-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="block px-3 text-[9px] font-bold text-amber-500 uppercase tracking-wider mb-1">
                        Admin Management
                      </span>
                      <div className="space-y-0.5">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-semibold"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          <span>Admin Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Manage Users</span>
                        </button>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                          <span>Manage MCQs</span>
                        </button>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <Video className="w-3.5 h-3.5 text-slate-400" />
                          <span>Manage Courses</span>
                        </button>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          <span>Payment Settings</span>
                        </button>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            window.location.href = "/admin/dashboard";
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <Brain className="w-3.5 h-3.5 text-slate-400" />
                          <span>AI Tutor Config</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-1">
                    <button
                      onClick={() => {
                        setPremium(!isPremium);
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/20 flex items-center gap-2"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>{isPremium ? "Disable Premium Flag" : "Enable Premium Flag"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setRole("Student");
                        setPremium(false);
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[11px] text-orange-600 dark:text-orange-400 font-semibold hover:bg-orange-50 dark:hover:bg-orange-950/20 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Reset Simulator Roles</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[11px] text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ----------------- MOBILE RESPONSIVE TOP HEADER ----------------- */}
      <div className="flex md:hidden h-16 w-full sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 items-center justify-between px-4 z-40 font-sans transition-colors">
        {/* Toggle Burger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand center */}
        <div 
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-1.5 cursor-pointer font-display font-bold text-slate-800 dark:text-white"
        >
          <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center text-white text-[11px] font-bold">P</div>
          <span className="text-base">Prepistan</span>
        </div>

        {/* Right tools (Dark Mode & Quick Profile drop) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg text-slate-500"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
              className="w-7 h-7 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] uppercase"
            >
              {currentUser.name ? currentUser.name[0] : currentRole[0]}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl py-1 z-50 text-xs text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="truncate">{currentUser.name}</span>
                    {isPremium && <Crown className="w-3 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal truncate">{currentUser.email}</div>
                </div>
                <div className="p-1">
                  {(currentRole === "Admin" || currentRole === "Super Admin") && (
                    <>
                      <div className="px-2.5 py-1 text-[9px] font-bold text-amber-500 uppercase tracking-wider">Admin</div>
                      <button
                        onClick={() => { setProfileOpen(false); window.location.href = "/admin/dashboard"; }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin Dashboard
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); window.location.href = "/admin/dashboard"; }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-2"
                      >
                        <Users className="w-3.5 h-3.5" />
                        Manage Users
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); window.location.href = "/admin/dashboard"; }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-2"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        Manage MCQs
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); window.location.href = "/admin/dashboard"; }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-2"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Manage Courses
                      </button>
                      <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                    </>
                  )}
                  <button
                    onClick={() => {
                      setPremium(!isPremium);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold"
                  >
                    Toggle Premium
                  </button>
                  <button
                    onClick={onOpenPricing}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    View Pricing
                  </button>
                  <button
                    onClick={() => {
                      setRole("Student");
                      setPremium(false);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-orange-600 font-semibold"
                  >
                    Reset Roles
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-rose-500 font-semibold border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5"
                  >
                    Logout Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ----------------- MOBILE MENU SLIDEOUT DRAWER ----------------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-slate-900 p-5 flex flex-col z-40 border-r border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Top Close */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                <span className="font-display font-bold text-slate-800 dark:text-white">Prepistan Menu</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 space-y-1.5">
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-2 px-2">Main Navigation</div>
              {navItems.map(item => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                    <span>{language === "EN" ? item.labelEN : item.labelUR}</span>
                  </button>
                );
              })}

              {/* Admin Room */}
              {(currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager") && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <button
                    onClick={() => {
                      onNavigate("admin");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold border ${
                      activeTab === "admin"
                        ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200"
                        : "bg-amber-50/10 text-amber-600 border-transparent"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Room</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Quick Metrics at bottom of Mobile Drawer */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 space-y-3 shrink-0">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-orange-50 dark:bg-orange-950/20 p-2 rounded-xl text-center">
                  <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1 fill-orange-500" />
                  <span className="text-[10px] font-bold text-orange-600 block">{streak}d</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Streak</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-2 rounded-xl text-center">
                  <Coins className="w-4 h-4 text-amber-500 mx-auto mb-1 fill-amber-500" />
                  <span className="text-[10px] font-bold text-amber-600 block">{coins}</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Coins</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-2 rounded-xl text-center">
                  <span className="w-4 h-4 bg-emerald-600 text-white font-mono rounded flex items-center justify-center text-[8px] mx-auto mb-1">XP</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">{xp}</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
