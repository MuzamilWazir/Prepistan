"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";
import ExamCategories from "./ExamCategories";
import QuizInterface from "./QuizInterface";
import AIPortal from "./AIPortal";
import LeaderboardPage from "./LeaderboardPage";
import AdminPanel from "./AdminPanel";
import BlogCMS from "./BlogCMS";
import NotesPage from "./NotesPage";
import BookmarksPage from "./BookmarksPage";
import PricingModal from "./PricingModal";
import CoursesPage, { initialCourses, initialCategories } from "./CoursesPage";
import PublicLandingPage from "./PublicLandingPage";
import {
  Globe,
  Mail,
  Lock,
  User,
  ArrowRight,
  Shield,
  Crown,
  Sun,
  Moon,
  Check,
  Loader2,
  Sparkles,
  Award,
  BookOpen,
  HelpCircle,
  Trophy,
  Newspaper,
  ArrowLeft,
  ExternalLink,
  Lock as LockIcon,
  CheckCircle2,
} from "lucide-react";

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

interface AppProps {
  initialTab?: string;
}

export default function App({ initialTab = "dashboard" }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();

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
    setCurrentUser({
      name: "",
      email: "",
      isLoggedIn: false,
      provider: "",
    });
    setRole("Student");
    setPremium(false);
  };

  const [currentRole, setRole] = useState<UserRole>("Student");
  const [isPremium, setPremium] = useState(false);
  const [language, setLanguage] = useState<"EN" | "UR">("EN");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const saved = window.localStorage.getItem("prepistan_dark_mode");
    if (saved) {
      return saved === "dark";
    }

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
      if (!merged.some((m) => m.id === extra.id)) {
        merged.push(extra);
      }
    });
    return merged;
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["css-pa-01", "css-is-01"]);
  const [pricingOpen, setPricingOpen] = useState(false);

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([
    {
      id: "hist-1",
      quizMode: "Practice Mode",
      category: "CSS",
      subject: "Pakistan Affairs",
      totalQuestions: 10,
      correctAnswers: 6,
      wrongAnswers: 4,
      timeSpentSeconds: 120,
      date: "2026-07-08",
    },
    {
      id: "hist-2",
      quizMode: "Timed Test",
      category: "FPSC",
      subject: "Islamic Studies",
      totalQuestions: 10,
      correctAnswers: 7,
      wrongAnswers: 3,
      timeSpentSeconds: 150,
      date: "2026-07-09",
    },
    {
      id: "hist-3",
      quizMode: "Mock Test",
      category: "PMS",
      subject: "Geography",
      totalQuestions: 10,
      correctAnswers: 5,
      wrongAnswers: 5,
      timeSpentSeconds: 180,
      date: "2026-07-10",
    },
    {
      id: "hist-4",
      quizMode: "Timed Test",
      category: "PPSC",
      subject: "English",
      totalQuestions: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      timeSpentSeconds: 110,
      date: "2026-07-11",
    },
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
    {
      id: "not-1",
      title: "🔥 Daily Streak Guard",
      message: "Keep your 5-day streak alive! Complete a quick Islamic history test today.",
      date: "1 hour ago",
      type: "warning",
      read: false,
    },
    {
      id: "not-2",
      title: "🚀 CSS Mock Updated",
      message: "A new Pakistan Studies compendium has been added to FPSC syllabus.",
      date: "Yesterday",
      type: "success",
      read: false,
    },
  ]);

  const [discussions, setDiscussions] = useState<QuestionDiscussion[]>([
    {
      id: "disc-1",
      questionId: "css-pa-01",
      userName: "Sajid Khan",
      userRole: "Student",
      comment: "Is it true that Lahore Resolution was originally called the 'Lahore Resolution' or did newspapers brand it as Pakistan Resolution first?",
      date: "2026-07-11",
      likes: 12,
    },
    {
      id: "disc-2",
      questionId: "css-pa-01",
      userName: "Zia-ur-Rehman",
      userRole: "Premium Student",
      comment: "Yes! Hindu newspapers initially labeled it as the 'Pakistan Resolution' in a critical manner, but Muslim League happily adopted the title.",
      date: "2026-07-11",
      likes: 8,
    },
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
    const initialCats = Array.from(new Set([...initialMCQs, ...extraMCQs].flatMap((q: MCQ) => q.category.split(",").map((c: string) => c.trim()))));
    return initialCats;
  });

  const [mcqSubjects, setMcqSubjects] = useState<string[]>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("prepistan_mcq_subjects") : null;
    if (saved) return JSON.parse(saved);
    const initialSubs = Array.from(new Set([...initialMCQs, ...extraMCQs].map((q) => q.subject)));
    return initialSubs;
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
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
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
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
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
      if (subjectPool.length > 0) {
        pool = subjectPool;
      }
    }

    if (pool.length === 0) {
      pool = mcqs.filter((q) => q.subject.toUpperCase() === "PAKISTAN AFFAIRS");
    }

    let shuffled = [...pool].sort(() => 0.5 - Math.random());

    if (shuffled.length < questionCount) {
      const others = mcqs.filter((q) => !shuffled.some((s) => s.id === q.id));
      const shuffledOthers = [...others].sort(() => 0.5 - Math.random());

      while (shuffled.length < questionCount && shuffledOthers.length > 0) {
        const nextQ = shuffledOthers.pop();
        if (nextQ) {
          shuffled.push({
            ...nextQ,
            category,
          });
        }
      }
    }

    const finalQuestions = shuffled.slice(0, questionCount);

    setQuizConfig({
      category,
      subject: subject || "Comprehensive Syllabus",
      mode,
      questions: finalQuestions,
    });
    setActiveTab("quiz");
  };

  const handleNavigateToQuiz = (category: string, subject: string, customMcqs: MCQ[]) => {
    setQuizConfig({
      category,
      subject,
      mode: "Practice Mode",
      questions: customMcqs,
    });
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

      const newNotif: SystemNotification = {
        id: `not-win-${Date.now()}`,
        title: "🏆 Test Completed!",
        message: `You earned +${rewardXp} XP and +${rewardCoins} Coins. Keep it up!`,
        date: "Just Now",
        type: "success",
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      setAttemptRegistered(attempt.id);
    }

    if (exitImmediately) {
      setActiveTab("dashboard");
      setQuizConfig(null);
      setAttemptRegistered(null);
    }
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((x) => x !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
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
      text
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const normNew = normalize(mcq.question);
    const existingDuplicate = mcqs.find((q) => normalize(q.question) === normNew);

    if (existingDuplicate && !force) {
      return { success: false, duplicate: existingDuplicate };
    }

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

  const [publicTab, setPublicTab] = useState<"home" | "auth">("home");
  const [sampleMptSelectedOption, setSampleMptSelectedOption] = useState<number | null>(null);
  const [sampleMptAnswered, setSampleMptAnswered] = useState(false);
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

  const handleSocialSubmit = (name: string, email: string) => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }
    setSocialStep("loading");
    setTimeout(() => {
      setSocialStep("success");
      setTimeout(() => {
        setCurrentUser({
          name,
          email,
          isLoggedIn: true,
          provider: socialProvider || "Google",
        });
        setRole(regRole || "Student");
        setPremium(regRole === "Premium Student" || regRole === "Super Admin");
        setShowSocialPopup(false);
        setSocialStep("choose");
        setCustomSocialName("");
        setCustomSocialEmail("");

        setNotifications((prev) => [
          {
            id: `welcome-${Date.now()}`,
            title: `Welcome, ${name}!`,
            message: `You have successfully registered to Prepistan via ${socialProvider}! 500 XP Welcome Bonus has been credited.`,
            type: "success",
            date: "Today",
            read: false,
          },
          ...prev,
        ]);
        setUserXp((prev) => prev + 500);
      }, 1000);
    }, 1500);
  };

  const handleTraditionalRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      alert("Please fill in all details.");
      return;
    }
    setCurrentUser({
      name: regName,
      email: regEmail,
      isLoggedIn: true,
      provider: "Email",
    });
    setRole(regRole);
    setPremium(regRole === "Premium Student" || regRole === "Super Admin");
    setNotifications((prev) => [
      {
        id: `welcome-${Date.now()}`,
        title: "Account Registered Successfully!",
        message: `Welcome to Prepistan, ${regName}! Enjoy offline civil service mock tests and live AI tutoring.`,
        type: "success",
        date: "Today",
        read: false,
      },
      ...prev,
    ]);
    setUserXp((prev) => prev + 250);
  };

  const handleTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      alert("Please fill in both email and password.");
      return;
    }
    const extractedName = loginEmail.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    setCurrentUser({
      name: formattedName || "Murtaza Syed",
      email: loginEmail,
      isLoggedIn: true,
      provider: "Email",
    });
    if (loginEmail.includes("admin")) {
      setRole("Super Admin");
      setPremium(true);
    } else if (loginEmail.includes("manager") || loginEmail.includes("editor")) {
      setRole("Content Manager");
      setPremium(false);
    } else {
      setRole("Student");
      setPremium(false);
    }
  };

  const handleDemoBypass = (role: UserRole) => {
    setCurrentUser({
      name: "Murtaza Syed",
      email: "murtaza@prepistan.pk",
      isLoggedIn: true,
      provider: "Simulation Bypass",
    });
    setRole(role);
    setPremium(role === "Premium Student" || role === "Super Admin");
  };

  if (!currentUser.isLoggedIn) {
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
                    onClick={() => {
                      setSocialProvider("Google");
                      setSocialStep("choose");
                      setShowSocialPopup(true);
                    }}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm font-bold text-xs transition-all group"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.82z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" /><path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 4.95 12c0-.79.13-1.57.37-2.31V6.54H1.21A11.95 11.95 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.11-3.22z" /><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.54l4.11 3.22c.94-2.85 3.57-4.96 6.68-4.96z" /></svg>
                    <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-slate-700 dark:text-slate-300">Sign up with Google</span>
                  </button>
                  <button
                    onClick={() => {
                      setSocialProvider("Gmail");
                      setSocialStep("choose");
                      setShowSocialPopup(true);
                    }}
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
                <form onSubmit={handleTraditionalRegister} className="space-y-4">
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
                <form onSubmit={handleTraditionalLogin} className="space-y-4">
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
                    <button onClick={() => handleSocialSubmit("Murtaza Syed", "murtaza@prepistan.pk")} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-all">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">MS</div>
                      <div><span className="text-xs font-bold text-slate-800 dark:text-white block leading-none">Murtaza Syed</span><span className="text-[10px] text-slate-400 block mt-1">murtaza@prepistan.pk</span></div>
                      <span className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Active CSS</span>
                    </button>
                    <button onClick={() => handleSocialSubmit("Competitive Aspirant", "aspirant.css2026@gmail.com")} className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-all">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xs uppercase">CA</div>
                      <div><span className="text-xs font-bold text-slate-800 dark:text-white block leading-none">Competitive Aspirant</span><span className="text-[10px] text-slate-400 block mt-1">aspirant.css2026@gmail.com</span></div>
                    </button>
                  </div>
                  <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800" /></div><div className="relative flex justify-center text-[10px]"><span className="px-2 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-widest text-[8px]">Or Enter New Account</span></div></div>
                  <div className="space-y-3">
                    <div><label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Aspirant Full Name</label><input type="text" value={customSocialName} onChange={(e) => setCustomSocialName(e.target.value)} placeholder="e.g., Syed Murtaza" className="w-full px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 animate-in fade-in duration-100" /></div>
                    <div><label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{socialProvider === "Google" ? "Google Mail Address" : "Gmail Address"}</label><input type="email" value={customSocialEmail} onChange={(e) => setCustomSocialEmail(e.target.value)} placeholder="yourname@gmail.com" className="w-full px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 animate-in fade-in duration-100" /></div>
                    <button onClick={() => handleSocialSubmit(customSocialName, customSocialEmail)} type="button" className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"><Globe className="w-3.5 h-3.5" /><span>Proceed {socialProvider} Authorization</span></button>
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-slate-200 transition-colors duration-200">
      <Navbar
        currentRole={currentRole}
        setRole={setRole}
        isPremium={isPremium}
        setPremium={setPremium}
        xp={userXp}
        coins={userCoins}
        streak={userStreak}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        markNotificationsAsRead={handleMarkNotificationsAsRead}
        onOpenPricing={() => setPricingOpen(true)}
        onNavigate={handleNavigate}
        activeTab={activeTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-20 max-w-7xl">
          {activeTab === "dashboard" && (
            <DashboardHome
              attempts={quizHistory}
              bookmarks={bookmarkedIds}
              mcqs={mcqs}
              xp={userXp}
              streak={userStreak}
              longestStreak={7}
              coins={userCoins}
              language={language}
              onNavigate={handleNavigate}
              onOpenPricing={() => setPricingOpen(true)}
            />
          )}

          {activeTab === "exams" && (
            <ExamCategories categories={uniqueCategories} subjects={mcqSubjects} mcqs={mcqs} onStartQuiz={handleStartQuiz} language={language} />
          )}

          {activeTab === "quiz" && quizConfig && (
            <QuizInterface
              category={quizConfig.category}
              subject={quizConfig.subject}
              mode={quizConfig.mode}
              questions={quizConfig.questions}
              onFinishQuiz={handleFinishQuiz}
              bookmarks={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onPostDiscussion={handlePostDiscussion}
              discussions={discussions}
              language={language}
              isPremium={isPremium}
              onOpenPricing={() => setPricingOpen(true)}
              aiConfig={aiConfig}
            />
          )}

          {activeTab === "courses" && (
            <CoursesPage
              currentRole={currentRole}
              isPremium={isPremium}
              onOpenPricing={() => setPricingOpen(true)}
              language={language}
              courses={courses}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              categories={courseCategories}
              onAddCategory={handleAddCourseCategory}
            />
          )}

          {activeTab === "ai-portal" && (
            <AIPortal
              onAddCustomMCQ={handleAddMCQ}
              language={language}
              isPremium={isPremium}
              isAdmin={currentRole === "Super Admin" || currentRole === "Admin"}
              onOpenPricing={() => setPricingOpen(true)}
              onNavigateToQuiz={handleNavigateToQuiz}
              aiConfig={aiConfig}
            />
          )}

          {activeTab === "leaderboard" && (
            <LeaderboardPage userXp={userXp} userCoins={userCoins} userStreak={userStreak} language={language} />
          )}

          {activeTab === "notes" && <NotesPage isPremium={isPremium} onOpenPricing={() => setPricingOpen(true)} language={language} />}

          {activeTab === "bookmarks" && (
            <BookmarksPage bookmarkedIds={bookmarkedIds} mcqs={mcqs} onToggleBookmark={handleToggleBookmark} onNavigateToQuiz={handleNavigateToQuiz} language={language} />
          )}

          {activeTab === "blog" && (
            <BlogCMS articles={articles} onAddArticle={handleAddArticle} onUpdateArticle={handleUpdateArticle} onDeleteArticle={handleDeleteArticle} currentRole={currentRole} language={language} adsenseConfig={adsenseConfig} />
          )}

          {activeTab === "admin" && (
            <AdminPanel
              mcqs={mcqs}
              onAddMCQ={handleAddMCQ}
              onDeleteMCQ={handleDeleteMCQ}
              language={language}
              courses={courses}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              courseCategories={courseCategories}
              onAddCourseCategory={handleAddCourseCategory}
              paymentConfig={paymentConfig}
              onUpdatePaymentConfig={handleUpdatePaymentConfig}
              mcqCategories={mcqCategories}
              onAddMcqCategory={handleAddMcqCategory}
              onDeleteMcqCategory={handleDeleteMcqCategory}
              mcqSubjects={mcqSubjects}
              onAddMcqSubject={handleAddMcqSubject}
              onDeleteMcqSubject={handleDeleteMcqSubject}
              aiConfig={aiConfig}
              onUpdateAIConfig={setAiConfig}
              adsenseConfig={adsenseConfig}
              onUpdateAdSenseConfig={handleUpdateAdSenseConfig}
            />
          )}
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900 dark:text-gray-300">Prepistan Arena</span>
              <span>• Pakistan Competitive Exams Platform</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleNavigate("notes")} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Revision Notes</button>
              <button onClick={() => handleNavigate("bookmarks")} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Saved Vault</button>
              <button onClick={() => setPricingOpen(true)} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Premium Plans</button>
            </div>
          </div>
        </footer>
      </div>

      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onUpgradeSuccess={() => {
          setPremium(true);
          setRole("Premium Student");
          setUserCoins((prev) => prev + 500);
          alert("🎉 Congratulations! Your account has been upgraded to Premium Student.");
        }}
        language={language}
        paymentConfig={paymentConfig}
      />
    </div>
  );
}
