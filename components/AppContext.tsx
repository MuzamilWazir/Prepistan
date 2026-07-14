"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  MCQ,
  UserRole,
  QuizAttempt,
  BlogArticle,
  SystemNotification,
  QuestionDiscussion,
  Course,
  PaymentConfig,
  AITutorApiConfig,
  AdSenseConfig,
} from "../types";
import { initialMCQs } from "../data/mockMcqs";
import { extraMCQs } from "../data/extraMcqs";
import { initialCourses, initialCategories } from "./CoursesPage";

const defaultAIConfig: AITutorApiConfig = {
  activeApi: "gemini",
  apis: {
    gemini: {
      enabled: true,
      apiKey: "",
      model: "gemini-3.5-flash",
      systemPrompt: "You are the Prepistan AI Tutor, an elite competitive exam specialist for Pakistan's civil service exams (CSS, PMS, FPSC, PPSC). Keep your response professional, accurate, highly helpful, and targeted at a civil service candidate.",
    },
    openai: {
      enabled: false,
      apiKey: "",
      model: "gpt-4o-mini",
      systemPrompt: "You are the Prepistan AI Tutor powered by OpenAI. You help Pakistani students excel in competitive public exams (CSS, PMS) with logical breakdowns.",
    },
    deepseek: {
      enabled: false,
      apiKey: "",
      model: "deepseek-chat",
      systemPrompt: "You are the Prepistan AI Tutor powered by DeepSeek. Solve Pakistani competitive exam queries with speed and deep historical depth.",
    },
    claude: {
      enabled: false,
      apiKey: "",
      model: "claude-3-5-sonnet",
      systemPrompt: "You are the Prepistan AI Tutor powered by Claude. Give elegant, highly structured essay guidance and precise explanations for CSS and PMS.",
    },
    simulated: {
      enabled: true,
      apiKey: "",
      model: "local-simulation",
      systemPrompt: "You are the offline Simulated AI Tutor. Respond with high-quality, pre-computed patterns for civil service prep.",
    },
  },
};

interface AppContextType {
  currentUser: { name: string; email: string; isLoggedIn: boolean; provider: string };
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; isLoggedIn: boolean; provider: string }>>;
  currentRole: UserRole;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  isPremium: boolean;
  setPremium: React.Dispatch<React.SetStateAction<boolean>>;
  language: "EN" | "UR";
  setLanguage: React.Dispatch<React.SetStateAction<"EN" | "UR">>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  pricingOpen: boolean;
  setPricingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mcqs: MCQ[];
  bookmarkedIds: string[];
  quizHistory: QuizAttempt[];
  articles: BlogArticle[];
  notifications: SystemNotification[];
  discussions: QuestionDiscussion[];
  courses: Course[];
  courseCategories: string[];
  mcqCategories: string[];
  mcqSubjects: string[];
  uniqueCategories: string[];
  paymentConfig: PaymentConfig;
  adsenseConfig: AdSenseConfig;
  aiConfig: AITutorApiConfig;
  setAiConfig: React.Dispatch<React.SetStateAction<AITutorApiConfig>>;
  userXp: number;
  userCoins: number;
  setUserCoins: React.Dispatch<React.SetStateAction<number>>;
  userStreak: number;
  quizConfig: { category: string; subject: string; mode: "Practice Mode" | "Timed Test" | "Mock Test"; questions: MCQ[] } | null;
  handleLogout: () => void;
  handleNavigate: (page: string) => void;
  handleStartQuiz: (category: string, subject: string, mode: any, questionCount?: number) => void;
  handleNavigateToQuiz: (category: string, subject: string, customMcqs: MCQ[]) => void;
  handleFinishQuiz: (attempt: QuizAttempt, exitImmediately?: boolean) => void;
  handleToggleBookmark: (id: string) => void;
  handlePostDiscussion: (questionId: string, comment: string) => void;
  handleAddMCQ: (mcq: MCQ, force?: boolean) => { success: boolean; duplicate?: MCQ };
  handleDeleteMCQ: (id: string) => void;
  handleAddArticle: (post: BlogArticle) => void;
  handleUpdateArticle: (updated: BlogArticle) => void;
  handleDeleteArticle: (id: string) => void;
  handleMarkNotificationsAsRead: () => void;
  handleAddCourse: (newCourse: Course) => void;
  handleDeleteCourse: (id: string) => void;
  handleAddCourseCategory: (newCat: string) => void;
  handleUpdatePaymentConfig: (config: PaymentConfig) => void;
  handleUpdateAdSenseConfig: (config: AdSenseConfig) => void;
  handleAddMcqCategory: (newCat: string) => void;
  handleAddMcqSubject: (newSub: string) => void;
  handleDeleteMcqCategory: (catToDelete: string) => void;
  handleDeleteMcqSubject: (subToDelete: string) => void;
  handleSocialSubmit: (name: string, email: string, socialProvider: "Google" | "Gmail" | null, role: UserRole) => void;
  handleTraditionalRegister: (name: string, email: string, password: string, role: UserRole) => void;
  handleTraditionalLogin: (email: string, password: string) => void;
  handleDemoBypass: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children, initialTab = "dashboard" }: { children: ReactNode; initialTab?: string }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_user") : null;
    return saved
      ? JSON.parse(saved)
      : {
          name: "Murtaza Syed",
          email: "murtaza@prepistan.pk",
          isLoggedIn: true,
          provider: "Email",
        };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("prepistan_user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser({ name: "", email: "", isLoggedIn: false, provider: "" });
    setRole("Student");
    setPremium(false);
  };

  const [currentRole, setRole] = useState<UserRole>("Student");
  const [isPremium, setPremium] = useState(false);
  const [language, setLanguage] = useState<"EN" | "UR">("EN");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("prepistan_dark_mode");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [activeTab, setActiveTab] = useState(initialTab);

  const [aiConfig, setAiConfig] = useState<AITutorApiConfig>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_ai_config") : null;
    return saved ? JSON.parse(saved) : defaultAIConfig;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("prepistan_ai_config", JSON.stringify(aiConfig));
    }
  }, [aiConfig]);

  const [userXp, setUserXp] = useState(1420);
  const [userCoins, setUserCoins] = useState(380);
  const [userStreak, setUserStreak] = useState(5);
  const [attemptRegistered, setAttemptRegistered] = useState<string | null>(null);

  const [mcqs, setMcqs] = useState<MCQ[]>(() => {
    const merged = [...initialMCQs];
    extraMCQs.forEach((extra) => {
      if (!merged.some((m) => m.id === extra.id)) merged.push(extra);
    });
    return merged;
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["css-pa-01", "css-is-01"]);
  const [pricingOpen, setPricingOpen] = useState(false);

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([
    { id: "hist-1", quizMode: "Practice Mode", category: "CSS", subject: "Pakistan Affairs", totalQuestions: 10, correctAnswers: 6, wrongAnswers: 4, timeSpentSeconds: 120, date: "2026-07-08" },
    { id: "hist-2", quizMode: "Timed Test", category: "FPSC", subject: "Islamic Studies", totalQuestions: 10, correctAnswers: 7, wrongAnswers: 3, timeSpentSeconds: 150, date: "2026-07-09" },
    { id: "hist-3", quizMode: "Mock Test", category: "PMS", subject: "Geography", totalQuestions: 10, correctAnswers: 5, wrongAnswers: 5, timeSpentSeconds: 180, date: "2026-07-10" },
    { id: "hist-4", quizMode: "Timed Test", category: "PPSC", subject: "English", totalQuestions: 10, correctAnswers: 8, wrongAnswers: 2, timeSpentSeconds: 110, date: "2026-07-11" },
  ]);

  const [articles, setArticles] = useState<BlogArticle[]>([
    {
      id: "art-1",
      title: "FPSC Inspector FIA Recruitment Job Openings Announced",
      content: "The Federal Public Service Commission has officially advertised 45 openings for Inspector (Investigation) inside FIA (Federal Investigation Agency). The testing syllabus will emphasize the FIA Act 1974, General Ability Mathematics, Pre-Partition History, and English Vocabulary. Online application closes on August 25th, 2026.",
      author: "Prepistan News Desk",
      date: "2026-07-12",
      category: "Job Alert",
      tags: ["FIA", "FPSC", "Job Alert"],
      readTime: "2 min read",
    },
    {
      id: "art-2",
      title: "CSS 2027 Schedule & Core Syllabus Changes",
      content: "The Establishment Division of Pakistan is reviewing major modifications in the compulsory subjects curriculum for CSS 2027. Preliminary updates indicate a higher marking weight for General Science & Ability, and the addition of climate change modules to current affairs papers. Mock tests reflecting these amendments are being structured now.",
      author: "Murtaza Syed (Prepistan Director)",
      date: "2026-07-11",
      category: "Exam Alert",
      tags: ["CSS", "Syllabus Update"],
      readTime: "4 min read",
    },
    {
      id: "art-3",
      title: "China-Pakistan Economic Corridor (CPEC) Phase 2 Essay Points",
      content: "As CPEC transitions into Phase 2, candidates preparing for CSS/PMS English Essay and Pakistan Affairs papers should focus on Special Economic Zones (SEZs), agricultural optimization, and technological transfers. Be sure to reference the Gwadar smart port framework and the industrial relocation of textile mills from Shanghai to Punjab.",
      author: "Prof. Tariq (Senior CSS Trainer)",
      date: "2026-07-09",
      category: "Blog",
      tags: ["CPEC", "CSS Essay", "Pakistan Affairs"],
      readTime: "6 min read",
    },
  ]);

  const [notifications, setNotifications] = useState<SystemNotification[]>([
    { id: "not-1", title: "🔥 Daily Streak Guard", message: "Keep your 5-day streak alive! Complete a quick Islamic history test today.", date: "1 hour ago", type: "warning", read: false },
    { id: "not-2", title: "🚀 CSS Mock Updated", message: "A new Pakistan Studies compendium has been added to FPSC syllabus.", date: "Yesterday", type: "success", read: false },
  ]);

  const [discussions, setDiscussions] = useState<QuestionDiscussion[]>([
    { id: "disc-1", questionId: "css-pa-01", userName: "Sajid Khan", userRole: "Student", comment: "Is it true that Lahore Resolution was originally called the 'Lahore Resolution' or did newspapers brand it as Pakistan Resolution first?", date: "2026-07-11", likes: 12 },
    { id: "disc-2", questionId: "css-pa-01", userName: "Zia-ur-Rehman", userRole: "Premium Student", comment: "Yes! Hindu newspapers initially labeled it as the 'Pakistan Resolution' in a critical manner, but Muslim League happily adopted the title.", date: "2026-07-11", likes: 8 },
  ]);

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_courses") : null;
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [courseCategories, setCourseCategories] = useState<string[]>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_course_categories") : null;
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [mcqCategories, setMcqCategories] = useState<string[]>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_mcq_categories") : null;
    if (saved) return JSON.parse(saved);
    return Array.from(new Set([...initialMCQs, ...extraMCQs].flatMap((q: MCQ) => q.category.split(",").map((c: string) => c.trim()))));
  });

  const [mcqSubjects, setMcqSubjects] = useState<string[]>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_mcq_subjects") : null;
    if (saved) return JSON.parse(saved);
    return Array.from(new Set([...initialMCQs, ...extraMCQs].map((q) => q.subject)));
  });

  const handleAddMcqCategory = (newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (mcqCategories.some((c) => c.toUpperCase() === trimmed.toUpperCase())) return;
    const updated = [...mcqCategories, trimmed];
    setMcqCategories(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_mcq_categories", JSON.stringify(updated));
  };

  const handleAddMcqSubject = (newSub: string) => {
    const trimmed = newSub.trim();
    if (!trimmed) return;
    if (mcqSubjects.some((s) => s.toUpperCase() === trimmed.toUpperCase())) return;
    const updated = [...mcqSubjects, trimmed];
    setMcqSubjects(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_mcq_subjects", JSON.stringify(updated));
  };

  const handleDeleteMcqCategory = (catToDelete: string) => {
    const updated = mcqCategories.filter((c) => c !== catToDelete);
    setMcqCategories(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_mcq_categories", JSON.stringify(updated));
  };

  const handleDeleteMcqSubject = (subToDelete: string) => {
    const updated = mcqSubjects.filter((s) => s !== subToDelete);
    setMcqSubjects(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_mcq_subjects", JSON.stringify(updated));
  };

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_payment_config") : null;
    const defaults: PaymentConfig = {
      paymentLink: "https://buy.stripe.com/mock_prepistan_premium",
      easyPaisaNumber: "0345-6789101",
      easyPaisaName: "PREPISTAN PREP",
      jazzCashNumber: "0312-3456789",
      jazzCashName: "PREPISTAN JAZZ",
      enableCardPayment: true,
      enableEasyPaisa: true,
      enableJazzCash: true,
      monthlyPrice: 15,
      yearlyPrice: 99,
      lifetimePrice: 199,
      coupons: [
        { code: "PREPISTAN50", discount: 50 },
        { code: "PREP30", discount: 30 },
      ],
    };
    if (saved) {
      try {
        return { ...defaults, ...JSON.parse(saved) };
      } catch {
        return defaults;
      }
    }
    return defaults;
  });

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === newCourse.id);
      const updated = exists ? prev.map((c) => (c.id === newCourse.id ? newCourse : c)) : [newCourse, ...prev];
      if (typeof window !== "undefined") window.localStorage.setItem("prepistan_courses", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_courses", JSON.stringify(updated));
  };

  const handleAddCourseCategory = (newCat: string) => {
    if (courseCategories.includes(newCat)) return;
    const updated = [...courseCategories, newCat];
    setCourseCategories(updated);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_course_categories", JSON.stringify(updated));
  };

  const handleUpdatePaymentConfig = (config: typeof paymentConfig) => {
    setPaymentConfig(config);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_payment_config", JSON.stringify(config));
  };

  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_adsense_config") : null;
    const defaults: AdSenseConfig = {
      publisherId: "ca-pub-9876543210987654",
      adSlotBanner: "7765432109",
      adSlotSidebar: "8812345678",
      customHtmlCode: `<div class="p-4 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-xl text-center shadow-sm">\n  <p class="text-[9px] font-mono tracking-wider text-gray-400 uppercase mb-2">SPONSORED GOOGLE ADSENSE</p>\n  <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">Prepare FPSC & CSS with Prepistan Premium Premium Study Packs!</h4>\n  <p class="text-[11px] text-gray-500 mt-1">Unlock 15,000+ Topic-wise MCQs, High-yielding notes, and timed mock tests. Apply coupon code PREPISTAN50 for 50% discount.</p>\n  <button class="mt-2.5 px-3.5 py-1 text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow">Get Unlimited Access</button>\n</div>`,
      enableAds: true,
    };
    if (saved) {
      try {
        return { ...defaults, ...JSON.parse(saved) };
      } catch {
        return defaults;
      }
    }
    return defaults;
  });

  const handleUpdateAdSenseConfig = (config: AdSenseConfig) => {
    setAdsenseConfig(config);
    if (typeof window !== "undefined") window.localStorage.setItem("prepistan_adsense_config", JSON.stringify(config));
  };

  const [quizConfig, setQuizConfig] = useState<{
    category: string;
    subject: string;
    mode: "Practice Mode" | "Timed Test" | "Mock Test";
    questions: MCQ[];
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    const body = window.document.body;
    root.classList.toggle("dark", darkMode);
    body.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("prepistan_dark_mode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const routeMap: Record<string, string> = {
    dashboard: "/dashboard",
    exams: "/exams",
    quiz: "/quiz",
    courses: "/courses",
    "ai-portal": "/ai-portal",
    leaderboard: "/leaderboard",
    notes: "/notes",
    bookmarks: "/bookmarks",
    blog: "/blog",
    admin: "/admin",
  };

  const handleNavigate = (page: string) => {
    setActiveTab(page);
    setQuizConfig(null);
    const targetRoute = routeMap[page] ?? "/dashboard";
    if (typeof window !== "undefined" && window.location.pathname !== targetRoute) {
      window.history.pushState({}, "", targetRoute);
    }
  };

  const handleStartQuiz = (category: string, subject: string, mode: any, questionCount: number = 20) => {
    let pool = mcqs.filter((q) => q.category.toUpperCase().split(",").map((c) => c.trim()).includes(category.toUpperCase()));
    if (subject && subject !== "All Subjects") {
      const subjectPool = pool.filter((q) => q.subject.toUpperCase() === subject.toUpperCase());
      if (subjectPool.length > 0) pool = subjectPool;
    }
    if (pool.length === 0) pool = mcqs.filter((q) => q.subject.toUpperCase() === "PAKISTAN AFFAIRS");
    let shuffled = [...pool].sort(() => 0.5 - Math.random());
    if (shuffled.length < questionCount) {
      const others = mcqs.filter((q) => !shuffled.some((s) => s.id === q.id));
      const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
      while (shuffled.length < questionCount && shuffledOthers.length > 0) {
        const nextQ = shuffledOthers.pop();
        if (nextQ) shuffled.push({ ...nextQ, category });
      }
    }
    setQuizConfig({ category, subject: subject || "Comprehensive Syllabus", mode, questions: shuffled.slice(0, questionCount) });
    setActiveTab("quiz");
  };

  const handleNavigateToQuiz = (category: string, subject: string, customMcqs: MCQ[]) => {
    setQuizConfig({ category, subject, mode: "Practice Mode", questions: customMcqs });
    setActiveTab("quiz");
  };

  const handleFinishQuiz = (attempt: QuizAttempt, exitImmediately = true) => {
    if (!attemptRegistered || attemptRegistered !== attempt.id) {
      setQuizHistory((prev) => (prev.some((x) => x.id === attempt.id) ? prev : [...prev, attempt]));
      const rewardXp = attempt.correctAnswers * 10;
      const rewardCoins = attempt.correctAnswers * 2;
      setUserXp((prev) => prev + rewardXp);
      setUserCoins((prev) => prev + rewardCoins);
      setUserStreak((prev) => prev + 1);
      setNotifications((prev) => [
        { id: `not-win-${Date.now()}`, title: "🏆 Test Completed!", message: `You earned +${rewardXp} XP and +${rewardCoins} Coins. Keep it up!`, date: "Just Now", type: "success", read: false },
        ...prev,
      ]);
      setAttemptRegistered(attempt.id);
    }
    if (exitImmediately) {
      setActiveTab("dashboard");
      setQuizConfig(null);
      setAttemptRegistered(null);
    }
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) setBookmarkedIds(bookmarkedIds.filter((x) => x !== id));
    else setBookmarkedIds([...bookmarkedIds, id]);
  };

  const handlePostDiscussion = (questionId: string, comment: string) => {
    const d: QuestionDiscussion = {
      id: `user-disc-${Date.now()}`,
      questionId,
      userName: "Murtaza Syed",
      userRole: currentRole,
      comment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };
    setDiscussions((prev) => [d, ...prev]);
  };

  const handleAddMCQ = (mcq: MCQ, force: boolean = false): { success: boolean; duplicate?: MCQ } => {
    const normalize = (text: string) =>
      text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
    const normNew = normalize(mcq.question);
    const existingDuplicate = mcqs.find((q) => normalize(q.question) === normNew);
    if (existingDuplicate && !force) return { success: false, duplicate: existingDuplicate };
    setMcqs((prev) => {
      const isAlreadyAdded = prev.some((q) => normalize(q.question) === normNew);
      if (isAlreadyAdded && !force) return prev;
      return [mcq, ...prev];
    });
    return { success: true };
  };

  const handleDeleteMCQ = (id: string) => {
    setMcqs((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddArticle = (post: BlogArticle) => {
    setArticles((prev) => [post, ...prev]);
  };

  const handleUpdateArticle = (updated: BlogArticle) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleMarkNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const uniqueCategories = Array.from(new Set(mcqs.flatMap((q) => q.category.split(",").map((c) => c.trim())))) as string[];

  const handleSocialSubmit = (name: string, email: string, socialProvider: "Google" | "Gmail" | null, role: UserRole) => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setCurrentUser({ name, email, isLoggedIn: true, provider: socialProvider || "Google" });
    setRole(role || "Student");
    setPremium(role === "Premium Student" || role === "Super Admin");
    setNotifications((prev) => [
      { id: `welcome-${Date.now()}`, title: `Welcome, ${name}!`, message: `You have successfully registered to Prepistan via ${socialProvider}! 500 XP Welcome Bonus has been credited.`, type: "success", date: "Today", read: false },
      ...prev,
    ]);
    setUserXp((prev) => prev + 500);
  };

  const handleTraditionalRegister = (name: string, email: string, password: string, role: UserRole) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all details.");
      return;
    }
    setCurrentUser({ name, email, isLoggedIn: true, provider: "Email" });
    setRole(role);
    setPremium(role === "Premium Student" || role === "Super Admin");
    setNotifications((prev) => [
      { id: `welcome-${Date.now()}`, title: "Account Registered Successfully!", message: `Welcome to Prepistan, ${name}! Enjoy offline civil service mock tests and live AI tutoring.`, type: "success", date: "Today", read: false },
      ...prev,
    ]);
    setUserXp((prev) => prev + 250);
  };

  const handleTraditionalLogin = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in both email and password.");
      return;
    }
    const extractedName = email.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    setCurrentUser({ name: formattedName || "Murtaza Syed", email, isLoggedIn: true, provider: "Email" });
    if (email.includes("admin")) {
      setRole("Super Admin");
      setPremium(true);
    } else if (email.includes("manager") || email.includes("editor")) {
      setRole("Content Manager");
      setPremium(false);
    } else {
      setRole("Student");
      setPremium(false);
    }
  };

  const handleDemoBypass = (role: UserRole) => {
    setCurrentUser({ name: "Murtaza Syed", email: "murtaza@prepistan.pk", isLoggedIn: true, provider: "Simulation Bypass" });
    setRole(role);
    setPremium(role === "Premium Student" || role === "Super Admin");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser, setCurrentUser, currentRole, setRole, isPremium, setPremium,
        language, setLanguage, darkMode, setDarkMode, activeTab, setActiveTab,
        pricingOpen, setPricingOpen, mcqs, bookmarkedIds, quizHistory, articles,
        notifications, discussions, courses, courseCategories, mcqCategories, mcqSubjects,
        uniqueCategories, paymentConfig, adsenseConfig, aiConfig, setAiConfig,
        userXp, userCoins, setUserCoins, userStreak, quizConfig,
        handleLogout, handleNavigate, handleStartQuiz, handleNavigateToQuiz,
        handleFinishQuiz, handleToggleBookmark, handlePostDiscussion,
        handleAddMCQ, handleDeleteMCQ, handleAddArticle, handleUpdateArticle,
        handleDeleteArticle, handleMarkNotificationsAsRead,
        handleAddCourse, handleDeleteCourse, handleAddCourseCategory,
        handleUpdatePaymentConfig, handleUpdateAdSenseConfig,
        handleAddMcqCategory, handleAddMcqSubject,
        handleDeleteMcqCategory, handleDeleteMcqSubject,
        handleSocialSubmit, handleTraditionalRegister, handleTraditionalLogin, handleDemoBypass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
