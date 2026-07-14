import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Users, 
  BookOpen, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  FileSpreadsheet, 
  CreditCard, 
  TrendingUp, 
  Trash2, 
  Edit, 
  ArrowUpRight, 
  Activity, 
  Download, 
  UploadCloud,
  Coins,
  ShieldCheck,
  AlertTriangle,
  Brain,
  Sparkles,
  Cpu,
  Settings,
  Eye
} from "lucide-react";
import { MCQ, UserRole, Course, VideoLecture, PaymentConfig, Coupon, AITutorApiConfig, AdSenseConfig } from "../app/types";

interface AdminPanelProps {
  mcqs: MCQ[];
  onAddMCQ: (mcq: MCQ, force?: boolean) => { success: boolean; duplicate?: MCQ };
  onDeleteMCQ: (id: string) => void;
  language: "EN" | "UR";
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  courseCategories: string[];
  onAddCourseCategory: (cat: string) => void;
  paymentConfig: PaymentConfig;
  onUpdatePaymentConfig: (config: PaymentConfig) => void;
  mcqCategories: string[];
  onAddMcqCategory: (cat: string) => void;
  onDeleteMcqCategory: (cat: string) => void;
  mcqSubjects: string[];
  onAddMcqSubject: (sub: string) => void;
  onDeleteMcqSubject: (sub: string) => void;
  aiConfig?: AITutorApiConfig;
  onUpdateAIConfig?: (config: AITutorApiConfig) => void;
  adsenseConfig?: AdSenseConfig;
  onUpdateAdSenseConfig?: (config: AdSenseConfig) => void;
}

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Suspended";
  xp: number;
}

export default function AdminPanel({
  mcqs,
  onAddMCQ,
  onDeleteMCQ,
  language,
  courses,
  onAddCourse,
  onDeleteCourse,
  courseCategories,
  onAddCourseCategory,
  paymentConfig,
  onUpdatePaymentConfig,
  mcqCategories,
  onAddMcqCategory,
  onDeleteMcqCategory,
  mcqSubjects,
  onAddMcqSubject,
  onDeleteMcqSubject,
  aiConfig,
  onUpdateAIConfig,
  adsenseConfig,
  onUpdateAdSenseConfig
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "mcqs" | "csv" | "financials" | "academy" | "payments" | "ai" | "adsense">("analytics");

  // Google AdSense local states
  const [localPublisherId, setLocalPublisherId] = useState(adsenseConfig?.publisherId || "ca-pub-9876543210987654");
  const [localAdSlotBanner, setLocalAdSlotBanner] = useState(adsenseConfig?.adSlotBanner || "7765432109");
  const [localAdSlotSidebar, setLocalAdSlotSidebar] = useState(adsenseConfig?.adSlotSidebar || "8812345678");
  const [localCustomHtmlCode, setLocalCustomHtmlCode] = useState(adsenseConfig?.customHtmlCode || "");
  const [localEnableAds, setLocalEnableAds] = useState(adsenseConfig?.enableAds !== false);

  useEffect(() => {
    if (adsenseConfig) {
      setLocalPublisherId(adsenseConfig.publisherId);
      setLocalAdSlotBanner(adsenseConfig.adSlotBanner);
      setLocalAdSlotSidebar(adsenseConfig.adSlotSidebar);
      setLocalCustomHtmlCode(adsenseConfig.customHtmlCode);
      setLocalEnableAds(adsenseConfig.enableAds);
    }
  }, [adsenseConfig]);

  // Mock Users State
  const [users, setUsers] = useState<MockUser[]>([
    { id: "u1", name: "Fatima Jamil", email: "fatima@css.gov.pk", role: "Student", status: "Active", xp: 1450 },
    { id: "u2", name: "Zia-ur-Rehman", email: "zia@ppsctest.pk", role: "Premium Student", status: "Active", xp: 5800 },
    { id: "u3", name: "Hamza Abbasi", email: "hamza@nab.gov.pk", role: "Content Manager", status: "Active", xp: 2200 },
    { id: "u4", name: "Murtaza Syed", email: "murtazasyedsui@gmail.com", role: "Super Admin", status: "Active", xp: 1420 },
    { id: "u5", name: "Kamran Akmal", email: "kamran@cricket.pk", role: "Student", status: "Suspended", xp: 150 }
  ]);

  // Mock Payments State
  const [payments] = useState([
    { id: "pay-101", user: "Zia-ur-Rehman", amount: "$15.00", plan: "Monthly Premium", date: "2026-07-11", coupon: "PREPISTAN50" },
    { id: "pay-102", user: "Aliya Riaz", amount: "$99.00", plan: "Lifetime Premium", date: "2026-07-09", coupon: "None" },
    { id: "pay-103", user: "Mustafa Kamal", amount: "$15.00", plan: "Monthly Premium", date: "2026-07-08", coupon: "None" }
  ]);

  // MCQ Creator state
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  useEffect(() => {
    if (mcqCategories && mcqCategories.length > 0) {
      if (!newCategory) {
        setNewCategory(mcqCategories[0]);
      }
    } else {
      setNewCategory("");
    }
  }, [mcqCategories, newCategory]);

  useEffect(() => {
    if (mcqSubjects && mcqSubjects.length > 0) {
      if (!newSubject || !mcqSubjects.includes(newSubject)) {
        setNewSubject(mcqSubjects[0]);
      }
    } else {
      setNewSubject("");
    }
  }, [mcqSubjects, newSubject]);

  // CSV Importer state
  const [csvInput, setCsvInput] = useState("");
  const [csvLog, setCsvLog] = useState<string | null>(null);

  // Academy Video Course Management states
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCourseInstructor, setNewCourseInstructor] = useState("");
  const [newCoursePrice, setNewCoursePrice] = useState("29");
  const [newCourseCategory, setNewCourseCategory] = useState(courseCategories[0] || "General");
  const [newCourseThumbnail, setNewCourseThumbnail] = useState("");
  const [newCoursePremium, setNewCoursePremium] = useState(true);

  // Categories manager states
  const [newCatInput, setNewCatInput] = useState("");

  // MCQ Categories & Subjects manager states
  const [newMcqCatInput, setNewMcqCatInput] = useState("");
  const [newMcqSubInput, setNewMcqSubInput] = useState("");

  // Payment configuration states
  const [payLinkInput, setPayLinkInput] = useState(paymentConfig.paymentLink || "");
  const [epNumberInput, setEpNumberInput] = useState(paymentConfig.easyPaisaNumber || "");
  const [epNameInput, setEpNameInput] = useState(paymentConfig.easyPaisaName || "");
  const [jcNumberInput, setJcNumberInput] = useState(paymentConfig.jazzCashNumber || "");
  const [jcNameInput, setJcNameInput] = useState(paymentConfig.jazzCashName || "");

  // New enable/disable toggles
  const [enableCardInput, setEnableCardInput] = useState(paymentConfig.enableCardPayment !== false);
  const [enableEPInput, setEnableEPInput] = useState(paymentConfig.enableEasyPaisa !== false);
  const [enableJCInput, setEnableJCInput] = useState(paymentConfig.enableJazzCash !== false);

  // New plan pricing states
  const [monthlyPriceInput, setMonthlyPriceInput] = useState(String(paymentConfig.monthlyPrice ?? 15));
  const [yearlyPriceInput, setYearlyPriceInput] = useState(String(paymentConfig.yearlyPrice ?? 99));
  const [lifetimePriceInput, setLifetimePriceInput] = useState(String(paymentConfig.lifetimePrice ?? 199));

  // Coupon management states
  const [coupons, setCoupons] = useState<Coupon[]>(paymentConfig.coupons || []);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("50");

  // AI Configuration states
  const [localAiConfig, setLocalAiConfig] = useState<AITutorApiConfig>(() => {
    return aiConfig || {
      activeApi: "gemini",
      apis: {
        gemini: { enabled: true, apiKey: "", model: "gemini-3.5-flash", systemPrompt: "You are the Prepistan AI Tutor, an elite competitive exam specialist for Pakistan's civil service exams (CSS, PMS, FPSC, PPSC). Keep your response professional, accurate, highly helpful, and targeted at a civil service candidate." },
        openai: { enabled: false, apiKey: "", model: "gpt-4o-mini", systemPrompt: "You are the Prepistan AI Tutor powered by OpenAI. You help Pakistani students excel in competitive public exams (CSS, PMS) with logical breakdowns." },
        deepseek: { enabled: false, apiKey: "", model: "deepseek-chat", systemPrompt: "You are the Prepistan AI Tutor powered by DeepSeek. Solve Pakistani competitive exam queries with speed and deep historical depth." },
        claude: { enabled: false, apiKey: "", model: "claude-3-5-sonnet", systemPrompt: "You are the Prepistan AI Tutor powered by Claude. Give elegant, highly structured essay guidance and precise explanations for CSS and PMS." },
        simulated: { enabled: true, apiKey: "", model: "local-simulation", systemPrompt: "You are the offline Simulated AI Tutor. Respond with high-quality, pre-computed patterns for civil service prep." }
      }
    };
  });

  useEffect(() => {
    if (aiConfig) {
      setLocalAiConfig(aiConfig);
    }
  }, [aiConfig]);

  // States to add video lecture to an existing course
  const [activeLectureAddCourseId, setActiveLectureAddCourseId] = useState<string | null>(null);
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [newLectureDuration, setNewLectureDuration] = useState("");
  const [newLectureVideoUrl, setNewLectureVideoUrl] = useState("dQw4w9WgXcQ");
  const [newLecturePreview, setNewLecturePreview] = useState(false);

  // User Manager handlers
  const handleUpdateRole = (id: string, role: UserRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  // Syllabus Question insertion handler
  const handleCreateMCQ = () => {
    if (!newQuestion.trim() || newOptions.some(o => !o.trim())) {
      alert("Please fill in the question and all 4 options.");
      return;
    }

    if (!newCategory.trim()) {
      alert("Please select at least one Category.");
      return;
    }

    const mcq: MCQ = {
      id: "manual-" + Date.now(),
      question: newQuestion,
      options: newOptions,
      correctOptionIndex: correctIdx,
      explanation: newExplanation || "Standard answer key verification from Prepistan Syllabus Board.",
      difficulty: newDifficulty,
      category: newCategory,
      subject: newSubject,
      topic: "General Syllabus"
    };

    const res = onAddMCQ(mcq);
    if (!res.success && res.duplicate) {
      const dup = res.duplicate;
      const confirmAdd = confirm(
        `Duplicate MCQ detected!\n\nThis question already exists in the syllabus under:\nCategory: ${dup.category}\nSubject: ${dup.subject}\n\nQuestion:\n"${dup.question}"\n\nAre you sure you want to add this duplicate anyway?`
      );
      if (confirmAdd) {
        onAddMCQ(mcq, true);
        alert("New question added successfully (as an allowed duplicate)!");
      } else {
        return; // Skip adding
      }
    } else {
      alert("New question added successfully!");
    }
    
    // Reset form
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewExplanation("");
    setNewCategory("");
  };

  // CSV Bulk Parser
  const handleParseCSV = () => {
    if (!csvInput.trim()) {
      setCsvLog("Please input valid CSV data.");
      return;
    }

    try {
      const lines = csvInput.trim().split("\n");
      let count = 0;
      let duplicateCount = 0;

      const tempPool = [...mcqs];
      const normalize = (text: string) => {
        return text
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
          .replace(/\s+/g, " ")
          .trim();
      };
      
      lines.forEach((line, i) => {
        // Skip header
        if (i === 0 && line.toLowerCase().includes("question")) return;
        
        const parts = line.split("|");
        if (parts.length >= 6) {
          const question = parts[0].trim();
          const opt1 = parts[1].trim();
          const opt2 = parts[2].trim();
          const opt3 = parts[3].trim();
          const opt4 = parts[4].trim();
          const correct = parseInt(parts[5].trim()) || 0;
          const expl = parts[6] ? parts[6].trim() : "Standard Reference Explanation.";

          const normNew = normalize(question);
          const isDup = tempPool.some(q => normalize(q.question) === normNew);

          if (isDup) {
            duplicateCount++;
            return; // Skip duplicate to protect syllabus integrity
          }

          const mcq: MCQ = {
            id: `csv-${Date.now()}-${i}`,
            question,
            options: [opt1, opt2, opt3, opt4],
            correctOptionIndex: correct,
            explanation: expl,
            difficulty: "Medium",
            category: "FPSC",
            subject: "Pakistan Affairs"
          };

          onAddMCQ(mcq);
          tempPool.push(mcq);
          count++;
        }
      });

      if (duplicateCount > 0) {
        setCsvLog(`✅ Import finished: Successfully imported ${count} MCQs. Skipped ${duplicateCount} duplicate questions to prevent redundancy!`);
      } else {
        setCsvLog(`✅ Success: Successfully imported ${count} MCQs into category FPSC!`);
      }
      setCsvInput("");
    } catch (e) {
      setCsvLog("❌ Error: Failed to parse. Format must be: Question | OptA | OptB | OptC | OptD | CorrectIndex | Explanation");
    }
  };

  // Video Academy course creation handler
  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc || !newCourseInstructor) {
      alert("Please fill in all required fields.");
      return;
    }

    const course: Course = {
      id: "course-" + Date.now(),
      title: newCourseTitle,
      description: newCourseDesc,
      instructor: newCourseInstructor,
      price: Number(newCoursePrice) || 0,
      category: newCourseCategory,
      thumbnailUrl: newCourseThumbnail || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      lectures: [],
      isPremiumOnly: newCoursePremium
    };

    onAddCourse(course);
    alert("New video course created successfully! Now you can add lectures to it below.");
    
    // Reset form
    setNewCourseTitle("");
    setNewCourseDesc("");
    setNewCourseInstructor("");
    setNewCoursePrice("29");
    setNewCourseThumbnail("");
    setNewCoursePremium(true);
    setShowAddCourseForm(false);
  };

  // Add video lecture to course
  const handleAddLectureSubmit = (courseId: string) => {
    if (!newLectureTitle || !newLectureDuration) {
      alert("Please provide lecture title and duration.");
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newLec: VideoLecture = {
      id: "lec-" + Date.now() + Math.random().toString(36).substring(2, 5),
      title: newLectureTitle,
      duration: newLectureDuration,
      videoUrl: newLectureVideoUrl || "dQw4w9WgXcQ",
      isFreePreview: newLecturePreview
    };

    const updatedCourse: Course = {
      ...course,
      lectures: [...course.lectures, newLec]
    };

    onAddCourse(updatedCourse);
    alert(`Lecture "${newLectureTitle}" added to "${course.title}"!`);

    // Reset fields
    setNewLectureTitle("");
    setNewLectureDuration("");
    setNewLectureVideoUrl("dQw4w9WgXcQ");
    setNewLecturePreview(false);
    setActiveLectureAddCourseId(null);
  };

  // Delete lecture from course
  const handleDeleteLecture = (courseId: string, lectureId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (confirm("Are you sure you want to delete this lecture?")) {
      const updatedCourse: Course = {
        ...course,
        lectures: course.lectures.filter(l => l.id !== lectureId)
      };
      onAddCourse(updatedCourse);
      alert("Lecture deleted successfully!");
    }
  };

  // Category addition handler
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;

    if (courseCategories.includes(newCatInput.trim())) {
      alert("Category already exists!");
      return;
    }

    onAddCourseCategory(newCatInput.trim());
    setNewCourseCategory(newCatInput.trim());
    setNewCatInput("");
    alert("New category added successfully!");
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newCouponCode.trim().toUpperCase();
    const pct = parseInt(newCouponDiscount);
    if (!cleanCode) {
      alert("Please enter a valid coupon code.");
      return;
    }
    if (isNaN(pct) || pct < 1 || pct > 100) {
      alert("Please enter a valid discount percentage between 1 and 100.");
      return;
    }
    if (coupons.some(c => c.code === cleanCode)) {
      alert("This coupon code already exists!");
      return;
    }
    const updated = [...coupons, { code: cleanCode, discount: pct }];
    setCoupons(updated);
    setNewCouponCode("");
    alert(`Coupon "${cleanCode}" (${pct}% discount) added! Please make sure to click "Save Configurations" below to fully persist changes.`);
  };

  const handleDeleteCoupon = (codeToDel: string) => {
    const updated = coupons.filter(c => c.code !== codeToDel);
    setCoupons(updated);
  };

  // Payment update handler
  const handleUpdatePaymentsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePaymentConfig({
      paymentLink: payLinkInput,
      easyPaisaNumber: epNumberInput,
      easyPaisaName: epNameInput,
      jazzCashNumber: jcNumberInput,
      jazzCashName: jcNameInput,
      enableCardPayment: enableCardInput,
      enableEasyPaisa: enableEPInput,
      enableJazzCash: enableJCInput,
      monthlyPrice: Number(monthlyPriceInput) || 15,
      yearlyPrice: Number(yearlyPriceInput) || 99,
      lifetimePrice: Number(lifetimePriceInput) || 199,
      coupons: coupons
    });
    alert("✅ Success: All payment methods toggles, package pricing, and generated coupons have been updated and synchronized instantly!");
  };

  return (
    <div className="space-y-6" id="admin-panel">
      
      {/* Admin Title Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight">Prepistan Security & Management Room</h1>
            <span className="text-xs text-gray-400 font-mono">Super Admin Cleared Console</span>
          </div>
        </div>

        {/* Console tab controls */}
        <div className="flex flex-wrap bg-slate-800 p-1 rounded-xl text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "analytics" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "users" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("mcqs")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "mcqs" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            MCQ Syllabus
          </button>
          <button
            onClick={() => setActiveTab("csv")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "csv" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Bulk CSV
          </button>
          <button
            onClick={() => setActiveTab("financials")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "financials" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Financials
          </button>
          <button
            onClick={() => setActiveTab("academy")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "academy" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Video Academy
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "payments" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            Payment Config
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "ai" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Tutor Config</span>
          </button>
          <button
            onClick={() => setActiveTab("adsense")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "adsense" ? "bg-amber-500 text-slate-950" : "text-gray-300 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>AdSense & Ads</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Overview Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Seeded MCQs</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white block mt-1">{mcqs.length}</span>
              <span className="text-[10px] text-emerald-500 font-medium block mt-1">✓ Database Healthy</span>
            </div>

            {/* Stat 2 */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Monthly Revenue</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white block mt-1">$4,820.00</span>
              <span className="text-[10px] text-emerald-500 font-bold block mt-1">+18% vs last month</span>
            </div>

            {/* Stat 3 */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Registered Users</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white block mt-1">12,840</span>
              <span className="text-[10px] text-emerald-500 font-bold block mt-1">45% Premium upgrade rate</span>
            </div>

            {/* Stat 4 */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Average Accuracy Rate</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white block mt-1">68.5%</span>
              <span className="text-[10px] text-amber-500 font-bold block mt-1">Needs improvement study</span>
            </div>

          </div>

          {/* Simulated System Health and DB Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Security Log & Backups</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Schedule database updates or download immediate recovery files.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => alert("✅ Success: SQLite/PostgreSQL schema serialized to /backups/schema_latest.sql")}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup DB</span>
                </button>
                <button
                  onClick={() => alert("✅ Success: Cloud database system restored to checkpoint 2026-07-12 00:00:00.")}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-300 font-semibold text-xs rounded-xl"
                >
                  Restore System
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Discount Coupon Pools</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs p-2.5 bg-gray-50 dark:bg-gray-950 rounded-xl">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">PREPISTAN50</span>
                    <p className="text-[10px] text-gray-400">50% Off Monthly & Annual checkout</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 bg-gray-50 dark:bg-gray-950 rounded-xl">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">CSS2026</span>
                    <p className="text-[10px] text-gray-400">30% Off Lifetime Premium subscription</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: User Operations */}
      {activeTab === "users" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Competitor Identity & Roles</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Assigned Role</th>
                  <th className="p-4 font-semibold">Activity XP</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map(u => (
                  <tr key={u.id} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{u.name}</td>
                    <td className="p-4 font-mono">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u.id, e.target.value as UserRole)}
                        className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-medium"
                      >
                        <option value="Student">Student</option>
                        <option value="Premium Student">Premium Student</option>
                        <option value="Content Manager">Content Manager</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </td>
                    <td className="p-4 font-mono font-semibold text-emerald-600">{u.xp} XP</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          u.status === "Active" 
                            ? "bg-rose-50 text-rose-600 hover:bg-rose-100" 
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }`}
                      >
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: MCQ Syllabus manager */}
      {activeTab === "mcqs" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Question addition panel and management wrappers */}
          <div className="space-y-6">
            
            {/* Question addition panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-4 h-fit">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              <span>Draft MCQ to Syllabus</span>
            </h3>

            {/* Question Text */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Question Text</label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What is the official language of..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950 focus:outline-none"
                rows={3}
              />
              {(() => {
                if (!newQuestion.trim()) return null;
                const normalize = (text: string) => {
                  return text
                    .toLowerCase()
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
                    .replace(/\s+/g, " ")
                    .trim();
                };
                const normNew = normalize(newQuestion);
                const duplicate = mcqs.find(m => normalize(m.question) === normNew);
                if (!duplicate) return null;
                return (
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-xl flex items-start gap-2 text-rose-800 dark:text-rose-300 text-[10px] leading-relaxed animate-pulse mt-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-[9px] text-rose-950 dark:text-rose-200 uppercase tracking-wider block">⚠️ Duplicate MCQ Detected</span>
                      Already exists in <strong className="font-bold">{duplicate.category} &gt; {duplicate.subject}</strong>.
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">4 Answer Options</label>
              {newOptions.map((opt, i) => (
                <div key={i} className="flex space-x-1.5 items-center">
                  <span className="text-xs font-mono font-bold text-gray-400 w-4">{["A", "B", "C", "D"][i]}</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...newOptions];
                      updated[i] = e.target.value;
                      setNewOptions(updated);
                    }}
                    placeholder={`Option ${["A", "B", "C", "D"][i]}`}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950"
                  />
                  <input
                    type="radio"
                    name="correct-option"
                    checked={correctIdx === i}
                    onChange={() => setCorrectIdx(i)}
                    className="accent-emerald-600 cursor-pointer w-4 h-4"
                    title="Mark as correct answer"
                  />
                </div>
              ))}
            </div>

            {/* Category / Subject */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">
                  Categories (Select Multiple Options)
                </label>
                <div className="flex flex-wrap gap-1.5 p-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl max-h-36 overflow-y-auto">
                  {mcqCategories && mcqCategories.length > 0 ? (
                    mcqCategories.map(cat => {
                      const isSelected = newCategory.split(',').map(c => c.trim()).includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => {
                            const currentCats = newCategory ? newCategory.split(',').map(c => c.trim()).filter(Boolean) : [];
                            let nextCats;
                            if (currentCats.includes(cat)) {
                              nextCats = currentCats.filter(c => c !== cat);
                            } else {
                              nextCats = [...currentCats, cat];
                            }
                            setNewCategory(nextCats.join(', '));
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center space-x-1.5 ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-500"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="w-3.5 h-3.5 accent-emerald-600 rounded cursor-pointer pointer-events-none"
                          />
                          <span>{cat}</span>
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-gray-400">No categories seeded yet.</span>
                  )}
                </div>
                {newCategory ? (
                  <div className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg font-bold flex items-center justify-between">
                    <span>Selected: {newCategory}</span>
                    <button
                      type="button"
                      onClick={() => setNewCategory("")}
                      className="text-emerald-900 dark:text-emerald-100 hover:text-rose-500 font-black text-xs px-1"
                      title="Clear selection"
                    >
                      Clear All
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-1 animate-pulse">
                    ⚠️ Please select at least one category above.
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950 text-slate-800 dark:text-slate-100"
                >
                  {mcqSubjects && mcqSubjects.length > 0 ? (
                    mcqSubjects.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))
                  ) : (
                    <option value="Pakistan Affairs">Pakistan Affairs</option>
                  )}
                </select>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Explanation Summary</label>
              <textarea
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                placeholder="Reference explanations from books..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950"
                rows={2}
              />
            </div>

            <button
              onClick={handleCreateMCQ}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Add MCQ to Active Database
            </button>
          </div>

          {/* Manage MCQ Categories & Subjects Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-4 shadow-sm">
            <div className="flex items-center space-x-1.5 border-b border-gray-100 dark:border-gray-700 pb-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-black text-gray-950 dark:text-gray-100 uppercase tracking-wider">
                Manage Categories & Subjects
              </h4>
            </div>

            {/* Add MCQ Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase block">Add MCQ Category</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMcqCatInput}
                  onChange={(e) => setNewMcqCatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newMcqCatInput.trim()) {
                        onAddMcqCategory(newMcqCatInput.trim());
                        setNewMcqCatInput("");
                      }
                    }
                  }}
                  placeholder="e.g. UPSC, FPSC-2027"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newMcqCatInput.trim()) {
                      onAddMcqCategory(newMcqCatInput.trim());
                      setNewMcqCatInput("");
                    }
                  }}
                  className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Badge list of categories */}
              <div className="space-y-1 pt-1.5">
                <span className="text-[9px] text-gray-400 font-bold block uppercase">Seeded Categories ({mcqCategories.length}):</span>
                <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1">
                  {mcqCategories.map(cat => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-lg font-mono hover:border-rose-400 dark:hover:border-rose-900 group"
                    >
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteMcqCategory(cat);
                        }}
                        className="text-[10px] text-gray-400 hover:text-rose-500 font-bold transition-colors"
                        title="Delete"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Add MCQ Subject */}
            <div className="space-y-1.5 border-t border-gray-100 dark:border-gray-700 pt-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase block">Add MCQ Subject</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMcqSubInput}
                  onChange={(e) => setNewMcqSubInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newMcqSubInput.trim()) {
                        onAddMcqSubject(newMcqSubInput.trim());
                        setNewMcqSubInput("");
                      }
                    }
                  }}
                  placeholder="e.g. Sociology, Chemistry"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-950 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newMcqSubInput.trim()) {
                      onAddMcqSubject(newMcqSubInput.trim());
                      setNewMcqSubInput("");
                    }
                  }}
                  className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Badge list of subjects */}
              <div className="space-y-1 pt-1.5">
                <span className="text-[9px] text-gray-400 font-bold block uppercase">Seeded Subjects ({mcqSubjects.length}):</span>
                <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1">
                  {mcqSubjects.map(sub => (
                    <span
                      key={sub}
                      className="inline-flex items-center gap-1 text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-lg font-mono hover:border-rose-400 dark:hover:border-rose-900 group"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteMcqSubject(sub);
                        }}
                        className="text-[10px] text-gray-400 hover:text-rose-500 font-bold transition-colors"
                        title="Delete"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

          {/* Active MCQs list */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Question Pool ({mcqs.length})</h3>
            
            <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-2 divide-y divide-gray-100 dark:divide-gray-700">
              {mcqs.map((q) => (
                <div key={q.id} className="pt-3.5 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] bg-slate-50 dark:bg-slate-900 border border-gray-100 px-2 py-0.5 rounded font-mono text-gray-500">
                      ID: {q.id} | {q.category} | {q.subject}
                    </span>
                    
                    {/* Delete MCQ option */}
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this MCQ?")) {
                          onDeleteMCQ(q.id);
                        }
                      }}
                      className="text-gray-400 hover:text-rose-500 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-gray-950 dark:text-gray-100 leading-relaxed mb-1">{q.question}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mb-1">Correct Option: {q.options[q.correctOptionIndex]}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 4: CSV Bulk importer */}
      {activeTab === "csv" && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Bulk CSV MCQ Import Board</h3>
              <span className="text-[11px] text-gray-400 block">Fast pipeline to upload dozens of questions at once</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl text-xs space-y-1 border border-gray-100 dark:border-gray-800 leading-relaxed text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">CSV Structure Guidelines:</span>
            <p>Paste lines separated by <strong>pipes |</strong> in the following order:</p>
            <p className="font-mono bg-white dark:bg-gray-900 p-2 rounded border border-gray-100 dark:border-gray-800 text-[10px] overflow-x-auto text-emerald-600 font-bold">
              Question text | Option A | Option B | Option C | Option D | CorrectOptionIndex (0-3) | Explanation
            </p>
          </div>

          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="What is the capital of Pakistan? | Lahore | Karachi | Islamabad | Peshawar | 2 | Islamabad became capital in 1967."
            className="w-full h-44 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 font-mono text-xs focus:outline-none"
          />

          <div className="flex justify-between items-center flex-wrap gap-3">
            <button
              onClick={handleParseCSV}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Import pasted rows</span>
            </button>

            {csvLog && (
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{csvLog}</span>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Financial logs */}
      {activeTab === "financials" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Premium Transactions History</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                  <th className="p-4 font-semibold">Transaction ID</th>
                  <th className="p-4 font-semibold">Subscriber</th>
                  <th className="p-4 font-semibold">Product Plan</th>
                  <th className="p-4 font-semibold">Amount Paid</th>
                  <th className="p-4 font-semibold">Discount Coupon</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                {payments.map(pay => (
                  <tr key={pay.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono font-bold text-gray-900 dark:text-white">{pay.id}</td>
                    <td className="p-4">{pay.user}</td>
                    <td className="p-4 font-semibold">{pay.plan}</td>
                    <td className="p-4 font-mono font-black text-emerald-600">{pay.amount}</td>
                    <td className="p-4"><span className="bg-gray-100 dark:bg-gray-900 border px-1.5 py-0.5 rounded text-[10px] font-mono">{pay.coupon}</span></td>
                    <td className="p-4 font-mono text-gray-400">{pay.date}</td>
                    <td className="p-4 text-right"><span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]">Cleared</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Academy Video Course Management */}
      {activeTab === "academy" && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center space-x-1.5">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>Video Academy Course Management</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Add, remove, and manage video lectures and courses accessible to student users.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowAddCourseForm(!showAddCourseForm)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-amber-500" />
                <span>{showAddCourseForm ? "Close Form" : "Create New Course"}</span>
              </button>
            </div>
          </div>

          {/* Inline Create Course Form */}
          {showAddCourseForm && (
            <form onSubmit={handleAddCourseSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Create New Video Course</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Course Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSS Pakistan Affairs Complete"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Instructor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Ayesha Shah"
                    value={newCourseInstructor}
                    onChange={(e) => setNewCourseInstructor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Category *</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none text-gray-800 dark:text-gray-200"
                  >
                    {courseCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Price in USD ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 29"
                    value={newCoursePrice}
                    onChange={(e) => setNewCoursePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Thumbnail Image URL</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={newCourseThumbnail}
                    onChange={(e) => setNewCourseThumbnail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Deconstruct historical timelines and key challenges..."
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="premium-toggle"
                  checked={newCoursePremium}
                  onChange={(e) => setNewCoursePremium(e.target.checked)}
                  className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="premium-toggle" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Premium Only Access (Only premium users can view lectures in this course)
                </label>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
              >
                Create Course
              </button>
            </form>
          )}

          {/* Inline Add Course Category form */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center space-x-1">
              <span>📚 Manage Course Categories</span>
            </h4>
            <form onSubmit={handleAddCategorySubmit} className="flex gap-2 max-w-md">
              <input
                type="text"
                required
                placeholder="New Category e.g. Geography, PMS Essay"
                value={newCatInput}
                onChange={(e) => setNewCatInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Add Category
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {courseCategories.map((cat, idx) => (
                <span key={idx} className="bg-gray-100 dark:bg-gray-900 border px-2.5 py-0.5 rounded-full text-[10px] text-gray-500 dark:text-gray-400">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Courses List Grid with lecture builders */}
          <div className="grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-5 space-y-4 relative shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title} 
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border dark:border-gray-700" 
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          {course.category}
                        </span>
                        {course.isPremiumOnly && (
                          <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                            Premium Only
                          </span>
                        )}
                        <span className="text-gray-400 text-[10px] font-mono">
                          {course.lectures.length} Lectures
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight">{course.title}</h4>
                      <p className="text-xs text-gray-400 font-medium">Instructor: {course.instructor} • Price: ${course.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this complete course? This will remove all associated video lectures.")) {
                        onDeleteCourse(course.id);
                        alert("Course deleted successfully.");
                      }
                    }}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-900/20 rounded-xl shrink-0 transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t dark:border-gray-700 pt-3">
                  {course.description}
                </p>

                {/* Video lectures listing & management inside course */}
                <div className="border-t border-dashed border-gray-100 dark:border-gray-700 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Syllabus Video Lectures</h5>
                    
                    <button
                      onClick={() => setActiveLectureAddCourseId(activeLectureAddCourseId === course.id ? null : course.id)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 flex items-center space-x-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{activeLectureAddCourseId === course.id ? "Close Form" : "Add Lecture Video"}</span>
                    </button>
                  </div>

                  {/* Add Video Lecture Form inline inside this course */}
                  {activeLectureAddCourseId === course.id && (
                    <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-900 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Add Video Lecture to Course</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase block">Lecture Title *</label>
                          <input
                            type="text"
                            placeholder="e.g. Drafting outlines, Geopolitics intro"
                            value={newLectureTitle}
                            onChange={(e) => setNewLectureTitle(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase block">Duration *</label>
                          <input
                            type="text"
                            placeholder="e.g. 15:30"
                            value={newLectureDuration}
                            onChange={(e) => setNewLectureDuration(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase block">YouTube Video ID / Embed Code *</label>
                          <input
                            type="text"
                            placeholder="e.g. dQw4w9WgXcQ"
                            value={newLectureVideoUrl}
                            onChange={(e) => setNewLectureVideoUrl(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none font-mono"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-5">
                          <input
                            type="checkbox"
                            id={`is-preview-${course.id}`}
                            checked={newLecturePreview}
                            onChange={(e) => setNewLecturePreview(e.target.checked)}
                            className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label htmlFor={`is-preview-${course.id}`} className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                            Is Free Preview (Non-Premium users can watch this free)
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddLectureSubmit(course.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                      >
                        Save Lecture Video
                      </button>
                    </div>
                  )}

                  {/* Lectures list */}
                  {course.lectures.length === 0 ? (
                    <span className="text-xs text-gray-400 block italic py-1">No video lectures uploaded yet. Use "Add Lecture Video" to insert.</span>
                  ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {course.lectures.map((lec) => (
                        <div 
                          key={lec.id}
                          className="flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl border border-gray-100/50 dark:border-gray-800 text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-gray-500">
                              🎬
                            </span>
                            <div className="space-y-0.5">
                              <span className="font-bold text-gray-800 dark:text-gray-200 block">{lec.title}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] text-gray-400 font-mono">{lec.duration}</span>
                                {lec.isFreePreview && (
                                  <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded text-[8px] uppercase font-sans">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteLecture(course.id, lec.id)}
                            className="text-gray-400 hover:text-rose-600 p-1 rounded transition-colors"
                            title="Delete Lecture"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Payment Configurations Setup */}
      {activeTab === "payments" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main settings form */}
          <form onSubmit={handleUpdatePaymentsSubmit} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 border-b dark:border-gray-700">
              <Coins className="w-6 h-6 text-amber-500" />
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white">Financial Integration & Price Customization</h3>
                <span className="text-xs text-gray-400 block mt-0.5">Toggle payment gateways, set active package pricing, and configure wallet credentials</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SECTION A: PAYMENT METHOD STATUS (ENABLE/DISABLE) */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1">
                  <span>⚙️ Enable / Disable Payment Gateways</span>
                </h4>
                
                <div className="space-y-3 pt-1">
                  {/* Toggle Card */}
                  <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-800 cursor-pointer hover:border-amber-500/30 transition-all">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Stripe Credit/Debit Card</span>
                        <span className="text-[10px] text-gray-400 block">Instant gateway simulation & direct links</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableCardInput}
                      onChange={(e) => setEnableCardInput(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-amber-500"
                    />
                  </label>

                  {/* Toggle EasyPaisa */}
                  <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-800 cursor-pointer hover:border-amber-500/30 transition-all">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-xs font-sans">
                        🟢
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">EasyPaisa Mobile Wallet</span>
                        <span className="text-[10px] text-gray-400 block">Manual transfer with transaction verification</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableEPInput}
                      onChange={(e) => setEnableEPInput(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-amber-500"
                    />
                  </label>

                  {/* Toggle JazzCash */}
                  <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-800 cursor-pointer hover:border-amber-500/30 transition-all">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg font-bold text-xs font-sans">
                        🔴
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">JazzCash Mobile Wallet</span>
                        <span className="text-[10px] text-gray-400 block">Manual transfer with transaction verification</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableJCInput}
                      onChange={(e) => setEnableJCInput(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-amber-500"
                    />
                  </label>
                </div>
              </div>

              {/* SECTION B: PREMIUM PLAN PRICES */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1">
                  <span>💰 Set Premium Plan Price Options</span>
                </h4>
                
                <div className="grid grid-cols-1 gap-3 pt-1">
                  {/* Monthly Price */}
                  <div className="space-y-1 bg-white dark:bg-gray-950 p-2.5 rounded-xl border dark:border-gray-800">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Monthly Premium Plan Price ($)</label>
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-slate-400 px-2 font-mono">$</span>
                      <input
                        type="number"
                        min="1"
                        required
                        value={monthlyPriceInput}
                        onChange={(e) => setMonthlyPriceInput(e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Yearly Price */}
                  <div className="space-y-1 bg-white dark:bg-gray-950 p-2.5 rounded-xl border dark:border-gray-800">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Yearly Professional Plan Price ($)</label>
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-slate-400 px-2 font-mono">$</span>
                      <input
                        type="number"
                        min="1"
                        required
                        value={yearlyPriceInput}
                        onChange={(e) => setYearlyPriceInput(e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Lifetime Price */}
                  <div className="space-y-1 bg-white dark:bg-gray-950 p-2.5 rounded-xl border dark:border-gray-800">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lifetime Emperor Plan Price ($)</label>
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-slate-400 px-2 font-mono">$</span>
                      <input
                        type="number"
                        min="1"
                        required
                        value={lifetimePriceInput}
                        onChange={(e) => setLifetimePriceInput(e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-800 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SECTION C: SECURE GATEWAY & MERCHANT DETAILS */}
            <div className="space-y-4 border-t dark:border-gray-700 pt-5">
              <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                🔑 Gateway API / Merchant Wallet Credentials
              </h4>

              <div className="grid grid-cols-1 gap-5">
                
                {/* Stripe Checkout link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-600 dark:text-gray-300 block uppercase tracking-wider">Fast Start checkout / Stripe Gateway Link</label>
                  <input
                    type="url"
                    placeholder="e.g. https://buy.stripe.com/mock_prepistan_premium"
                    value={payLinkInput}
                    disabled={!enableCardInput}
                    onChange={(e) => setPayLinkInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs focus:outline-none font-mono text-slate-800 dark:text-white disabled:opacity-50"
                  />
                  <span className="text-[10px] text-gray-400 block">Provide a Stripe payment gateway link or any credit card payment gateway URL to checkout.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* EasyPaisa configurations */}
                  <div className="p-4 bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/15 rounded-2xl space-y-3">
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">🟢 EasyPaisa Wallet Merchant Settings</span>
                    
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">EasyPaisa Account Number</label>
                        <input
                          type="text"
                          required={enableEPInput}
                          disabled={!enableEPInput}
                          placeholder="e.g. 0345-6789101"
                          value={epNumberInput}
                          onChange={(e) => setEpNumberInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">EasyPaisa Account Title Name</label>
                        <input
                          type="text"
                          required={enableEPInput}
                          disabled={!enableEPInput}
                          placeholder="e.g. PREPISTAN PREP"
                          value={epNameInput}
                          onChange={(e) => setEpNameInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* JazzCash configurations */}
                  <div className="p-4 bg-amber-500/5 dark:bg-amber-950/10 border border-amber-500/15 rounded-2xl space-y-3">
                    <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 block uppercase tracking-wider">🔴 JazzCash Wallet Merchant Settings</span>
                    
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">JazzCash Account Number</label>
                        <input
                          type="text"
                          required={enableJCInput}
                          disabled={!enableJCInput}
                          placeholder="e.g. 0312-3456789"
                          value={jcNumberInput}
                          onChange={(e) => setJcNumberInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">JazzCash Account Title Name</label>
                        <input
                          type="text"
                          required={enableJCInput}
                          disabled={!enableJCInput}
                          placeholder="e.g. PREPISTAN JAZZ"
                          value={jcNameInput}
                          onChange={(e) => setJcNameInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 border-t border-dashed dark:border-gray-700 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20"
              >
                Save Configurations
              </button>
            </div>
          </form>

          {/* SECTION D: COUPON CODE GENERATOR SYSTEM */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 border-b dark:border-gray-700">
              <Shield className="w-6 h-6 text-indigo-500" />
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white">🎟️ Coupon Code Generator System</h3>
                <span className="text-xs text-gray-400 block mt-0.5">Generate active promotional discount coupon codes for students to claim discounts</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Form to add coupon */}
              <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border dark:border-gray-700">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Generate New Promo Code</span>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase block">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PREPISTAN50, EIDMUBARAK"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-xs font-mono font-bold uppercase focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase block">Discount Percentage (%)</label>
                  <select
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-xs focus:outline-none text-slate-700 dark:text-gray-300"
                  >
                    <option value="10">10% Off</option>
                    <option value="20">20% Off</option>
                    <option value="25">25% Off</option>
                    <option value="30">30% Off</option>
                    <option value="40">40% Off</option>
                    <option value="50">50% Off (Half Price)</option>
                    <option value="75">75% Off</option>
                    <option value="90">90% Off</option>
                    <option value="100">100% Off (Free Access)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleAddCoupon}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                >
                  Generate Coupon
                </button>
              </div>

              {/* Coupon list display */}
              <div className="md:col-span-2 space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Active Coupon Databases ({coupons.length})</span>
                
                {coupons.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-gray-400 italic">
                    No active coupon codes generated. Please add one using the form on the left!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                    {coupons.map((c) => (
                      <div
                        key={c.code}
                        className="p-3 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">🎟️</span>
                          <div>
                            <span className="font-mono font-black text-xs text-slate-900 dark:text-white block uppercase tracking-wider">{c.code}</span>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{c.discount}% Discount Claimable</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteCoupon(c.code);
                            alert(`Deleted coupon "${c.code}". Click "Save Configurations" to persist this change!`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <span className="text-[10px] text-slate-400 block italic">⚠️ Make sure to click "Save Configurations" in the top panel to persist your generated or deleted coupons!</span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Tab 8: AI Tutor Engine Coordinator */}
      {activeTab === "ai" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl">
                  <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI Tutor Engine Coordinator</h3>
                  <span className="text-[11px] text-gray-400 block">Manage multiple Large Language Model integrations & fallback rules</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (onUpdateAIConfig) {
                    onUpdateAIConfig(localAiConfig);
                    alert("🎉 AI Configurations updated successfully across all Student Portals!");
                  }
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save AI Engine Configurations</span>
              </button>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <strong>Super Admin Override Active:</strong> Enabling or disabling APIs here immediately dictates which AI model handles live conversations and question generation inside the Prepistan Arena. Leftover credentials default to server-side standard env keys if not overridden below.
              </div>
            </div>

            {/* Configured API grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* GEMINI CARD */}
              <div className={`p-5 rounded-2xl border transition-all ${
                localAiConfig.activeApi === "gemini" 
                  ? "bg-blue-50/20 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900 shadow-md"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-500">🔮</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">Google Gemini API</h4>
                      <span className="text-[10px] text-gray-400 block">Fastest Native Integrations</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      localAiConfig.apis.gemini.enabled ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}>
                      {localAiConfig.apis.gemini.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <input
                      type="radio"
                      name="activeApi"
                      checked={localAiConfig.activeApi === "gemini"}
                      disabled={!localAiConfig.apis.gemini.enabled}
                      onChange={() => {
                        setLocalAiConfig(prev => ({
                          ...prev,
                          activeApi: "gemini"
                        }));
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-[10px] text-gray-400 uppercase w-1/3 font-semibold">Enable API</label>
                    <input
                      type="checkbox"
                      checked={localAiConfig.apis.gemini.enabled}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            gemini: { ...prev.apis.gemini, enabled: val }
                          },
                          // If active was gemini and now disabled, switch active to simulated
                          activeApi: (!val && prev.activeApi === "gemini") ? "simulated" : prev.activeApi
                        }));
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">API Model Endpoint</label>
                    <input
                      type="text"
                      value={localAiConfig.apis.gemini.model}
                      disabled={!localAiConfig.apis.gemini.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            gemini: { ...prev.apis.gemini, model: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">Custom API Key (Optional Override)</label>
                    <input
                      type="password"
                      value={localAiConfig.apis.gemini.apiKey}
                      disabled={!localAiConfig.apis.gemini.enabled}
                      placeholder="••••••••••••••••••••••••"
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            gemini: { ...prev.apis.gemini, apiKey: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">System instructions (Customize Vibe)</label>
                    <textarea
                      rows={3}
                      value={localAiConfig.apis.gemini.systemPrompt}
                      disabled={!localAiConfig.apis.gemini.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            gemini: { ...prev.apis.gemini, systemPrompt: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* OPENAI CARD */}
              <div className={`p-5 rounded-2xl border transition-all ${
                localAiConfig.activeApi === "openai" 
                  ? "bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900 shadow-md"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-emerald-500">🟢</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">OpenAI GPT-4o Model</h4>
                      <span className="text-[10px] text-gray-400 block">Standard Global Reasoning</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      localAiConfig.apis.openai.enabled ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}>
                      {localAiConfig.apis.openai.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <input
                      type="radio"
                      name="activeApi"
                      checked={localAiConfig.activeApi === "openai"}
                      disabled={!localAiConfig.apis.openai.enabled}
                      onChange={() => {
                        setLocalAiConfig(prev => ({
                          ...prev,
                          activeApi: "openai"
                        }));
                      }}
                      className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-[10px] text-gray-400 uppercase w-1/3 font-semibold">Enable API</label>
                    <input
                      type="checkbox"
                      checked={localAiConfig.apis.openai.enabled}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            openai: { ...prev.apis.openai, enabled: val }
                          },
                          activeApi: (!val && prev.activeApi === "openai") ? "simulated" : prev.activeApi
                        }));
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">API Model Endpoint</label>
                    <input
                      type="text"
                      value={localAiConfig.apis.openai.model}
                      disabled={!localAiConfig.apis.openai.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            openai: { ...prev.apis.openai, model: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">Custom API Key</label>
                    <input
                      type="password"
                      value={localAiConfig.apis.openai.apiKey}
                      disabled={!localAiConfig.apis.openai.enabled}
                      placeholder="sk-••••••••••••••••••••••••"
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            openai: { ...prev.apis.openai, apiKey: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">System instructions</label>
                    <textarea
                      rows={3}
                      value={localAiConfig.apis.openai.systemPrompt}
                      disabled={!localAiConfig.apis.openai.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            openai: { ...prev.apis.openai, systemPrompt: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* DEEPSEEK CARD */}
              <div className={`p-5 rounded-2xl border transition-all ${
                localAiConfig.activeApi === "deepseek" 
                  ? "bg-cyan-50/20 dark:bg-cyan-950/10 border-cyan-200 dark:border-cyan-900 shadow-md"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-cyan-500">🔵</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">DeepSeek API</h4>
                      <span className="text-[10px] text-gray-400 block">High Accuracy reasoning</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      localAiConfig.apis.deepseek.enabled ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}>
                      {localAiConfig.apis.deepseek.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <input
                      type="radio"
                      name="activeApi"
                      checked={localAiConfig.activeApi === "deepseek"}
                      disabled={!localAiConfig.apis.deepseek.enabled}
                      onChange={() => {
                        setLocalAiConfig(prev => ({
                          ...prev,
                          activeApi: "deepseek"
                        }));
                      }}
                      className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-[10px] text-gray-400 uppercase w-1/3 font-semibold">Enable API</label>
                    <input
                      type="checkbox"
                      checked={localAiConfig.apis.deepseek.enabled}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            deepseek: { ...prev.apis.deepseek, enabled: val }
                          },
                          activeApi: (!val && prev.activeApi === "deepseek") ? "simulated" : prev.activeApi
                        }));
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">API Model Endpoint</label>
                    <input
                      type="text"
                      value={localAiConfig.apis.deepseek.model}
                      disabled={!localAiConfig.apis.deepseek.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            deepseek: { ...prev.apis.deepseek, model: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">Custom API Key</label>
                    <input
                      type="password"
                      value={localAiConfig.apis.deepseek.apiKey}
                      disabled={!localAiConfig.apis.deepseek.enabled}
                      placeholder="sk-••••••••••••••••••••••••"
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            deepseek: { ...prev.apis.deepseek, apiKey: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">System instructions</label>
                    <textarea
                      rows={3}
                      value={localAiConfig.apis.deepseek.systemPrompt}
                      disabled={!localAiConfig.apis.deepseek.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            deepseek: { ...prev.apis.deepseek, systemPrompt: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* CLAUDE CARD */}
              <div className={`p-5 rounded-2xl border transition-all ${
                localAiConfig.activeApi === "claude" 
                  ? "bg-amber-50/20 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900 shadow-md"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-amber-500">🟠</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">Anthropic Claude API</h4>
                      <span className="text-[10px] text-gray-400 block">Premium Literary & Analytical Skills</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      localAiConfig.apis.claude.enabled ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}>
                      {localAiConfig.apis.claude.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <input
                      type="radio"
                      name="activeApi"
                      checked={localAiConfig.activeApi === "claude"}
                      disabled={!localAiConfig.apis.claude.enabled}
                      onChange={() => {
                        setLocalAiConfig(prev => ({
                          ...prev,
                          activeApi: "claude"
                        }));
                      }}
                      className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-[10px] text-gray-400 uppercase w-1/3 font-semibold">Enable API</label>
                    <input
                      type="checkbox"
                      checked={localAiConfig.apis.claude.enabled}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            claude: { ...prev.apis.claude, enabled: val }
                          },
                          activeApi: (!val && prev.activeApi === "claude") ? "simulated" : prev.activeApi
                        }));
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">API Model Endpoint</label>
                    <input
                      type="text"
                      value={localAiConfig.apis.claude.model}
                      disabled={!localAiConfig.apis.claude.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            claude: { ...prev.apis.claude, model: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">Custom API Key</label>
                    <input
                      type="password"
                      value={localAiConfig.apis.claude.apiKey}
                      disabled={!localAiConfig.apis.claude.enabled}
                      placeholder="sk-ant-••••••••••••••••••••••••"
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            claude: { ...prev.apis.claude, apiKey: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">System instructions</label>
                    <textarea
                      rows={3}
                      value={localAiConfig.apis.claude.systemPrompt}
                      disabled={!localAiConfig.apis.claude.enabled}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            claude: { ...prev.apis.claude, systemPrompt: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* SIMULATED OFFLINE CARD */}
              <div className={`p-5 rounded-2xl border md:col-span-2 transition-all ${
                localAiConfig.activeApi === "simulated" 
                  ? "bg-slate-100/40 dark:bg-slate-900/40 border-slate-300 dark:border-slate-700 shadow-md"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">💾</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">Offline Simulated AI Tutor</h4>
                      <span className="text-[10px] text-gray-400 block">High fidelity simulated response fallback to preserve server functionality</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-500`}>
                      Always Active Fallback
                    </span>
                    <input
                      type="radio"
                      name="activeApi"
                      checked={localAiConfig.activeApi === "simulated"}
                      onChange={() => {
                        setLocalAiConfig(prev => ({
                          ...prev,
                          activeApi: "simulated"
                        }));
                      }}
                      className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 focus:ring-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-gray-400 uppercase block font-bold">Simulated System Vibe Instruction</label>
                    <textarea
                      rows={2}
                      value={localAiConfig.apis.simulated.systemPrompt}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalAiConfig(prev => ({
                          ...prev,
                          apis: {
                            ...prev.apis,
                            simulated: { ...prev.apis.simulated, systemPrompt: val }
                          }
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => {
                  if (onUpdateAIConfig) {
                    onUpdateAIConfig(localAiConfig);
                    alert("🎉 AI Configurations updated successfully across all Student Portals!");
                  }
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save AI Engine Configurations</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {activeTab === "adsense" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-2xl">
                  <Settings className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Google AdSense & Ad Placement Coordination</h3>
                  <span className="text-[11px] text-gray-400 block">Manage live monetization scripts, ad formats, and sidebar responsive spaces</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onUpdateAdSenseConfig) {
                    onUpdateAdSenseConfig({
                      publisherId: localPublisherId,
                      adSlotBanner: localAdSlotBanner,
                      adSlotSidebar: localAdSlotSidebar,
                      customHtmlCode: localCustomHtmlCode,
                      enableAds: localEnableAds,
                    });
                    alert("🎉 Google AdSense & Monetization configurations updated successfully! The placements are now live in the blog and feed sections.");
                  }
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save AdSense Configurations</span>
              </button>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong>AdSense Monetization Active:</strong> These ad placements appear strategically inside the single-article views of the Blog/Alert portal. Adding your publisher ID enables organic ad request serving inside iframe containers safely.
              </div>
            </div>

            {/* Config Panel split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Form Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Enable Ad Placements</span>
                    <span className="text-[10px] text-gray-400 block">Toggle all ads and banners on the Prepistan blog feeds</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLocalEnableAds(!localEnableAds)}
                    className="p-1 rounded-full transition-all focus:outline-none"
                  >
                    {localEnableAds ? (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold text-[10px] rounded-lg border border-emerald-200 dark:border-emerald-900/30 uppercase">Active</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-bold text-[10px] rounded-lg border border-gray-200 dark:border-gray-700 uppercase">Disabled</span>
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Google AdSense Publisher ID (ca-pub-*)</label>
                    <input
                      type="text"
                      placeholder="e.g. ca-pub-9876543210987654"
                      value={localPublisherId}
                      onChange={(e) => setLocalPublisherId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs font-mono text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Header Banner Slot</label>
                      <input
                        type="text"
                        placeholder="e.g. 7765432109"
                        value={localAdSlotBanner}
                        onChange={(e) => setLocalAdSlotBanner(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs font-mono text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Sidebar Ad Slot</label>
                      <input
                        type="text"
                        placeholder="e.g. 8812345678"
                        value={localAdSlotSidebar}
                        onChange={(e) => setLocalAdSlotSidebar(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs font-mono text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Custom HTML / Script Ad Code</label>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Supports responsive raw HTML/CSS & scripts</span>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Paste your custom responsive Google AdSense code or native ad markup here..."
                      value={localCustomHtmlCode}
                      onChange={(e) => setLocalCustomHtmlCode(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Live Simulator Sandbox */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span>Monetized Live Canvas Preview</span>
                  </span>
                  <span className="text-[9px] bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold font-mono px-2 py-0.5 rounded-md uppercase">
                    Sandbox Shielded
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Below is an organic visual representation of the AdSense widget inside the blog post sidebar and main article container:
                  </p>

                  {/* Render simulated output */}
                  {localEnableAds ? (
                    <div className="space-y-4 pt-2">
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">--- In-Article Ad Slot ---</div>
                      {localCustomHtmlCode ? (
                        <div 
                          className="adsense-custom-html-preview transition-all duration-200"
                          dangerouslySetInnerHTML={{ __html: localCustomHtmlCode }}
                        />
                      ) : (
                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-center space-y-2">
                          <p className="text-[9px] font-mono text-amber-600 uppercase tracking-wider">ca-pub-{localPublisherId || "xxxx"}</p>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Google Responsive Ad Placement (Default Mock)</h4>
                          <p className="text-[10px] text-gray-400">Specify custom HTML markup to override this placeholder box completely.</p>
                        </div>
                      )}

                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-4">--- Sidebar Ad Slot (Slot ID: {localAdSlotSidebar}) ---</div>
                      <div className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-between shadow-sm">
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-400 uppercase block font-mono">Ad Unit Slot</span>
                          <span className="text-xs font-bold block text-emerald-600 dark:text-emerald-400">FPSC CSS Exam Cram Guides</span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">Download CSS pre-partition syllabus solved questions.</span>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs shadow-sm shrink-0 ml-3">
                          CSS
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 bg-gray-100 dark:bg-gray-950 rounded-2xl text-center text-gray-400 text-xs border border-dashed border-gray-300 dark:border-gray-800">
                      ⚠️ Monetization is disabled. Banners will not load inside blog posts.
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (onUpdateAdSenseConfig) {
                    onUpdateAdSenseConfig({
                      publisherId: localPublisherId,
                      adSlotBanner: localAdSlotBanner,
                      adSlotSidebar: localAdSlotSidebar,
                      customHtmlCode: localCustomHtmlCode,
                      enableAds: localEnableAds,
                    });
                    alert("🎉 Google AdSense & Monetization configurations updated successfully! The placements are now live in the blog and feed sections.");
                  }
                }}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save AdSense Configurations</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
