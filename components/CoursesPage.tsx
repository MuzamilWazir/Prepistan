import React, { useState } from "react";
import { 
  Video, 
  Play, 
  Lock, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  User, 
  DollarSign, 
  Clock, 
  ExternalLink,
  ChevronRight,
  PlusCircle,
  FolderPlus,
  ArrowLeft,
  Tv,
  CheckCircle,
  FileVideo
} from "lucide-react";
import { Course, VideoLecture, UserRole } from "../types";

interface CoursesPageProps {
  currentRole: UserRole;
  isPremium: boolean;
  onOpenPricing: () => void;
  language: "EN" | "UR";
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  categories: string[];
  onAddCategory: (cat: string) => void;
}

// Pre-seeded high-quality courses
export const initialCourses: Course[] = [
  {
    id: "css-essay-mastery",
    title: "CSS English Essay Mastery Course",
    description: "Learn how to write high-scoring argumentative essays for CSS & PMS. Covers outline building, thesis statements, introductory hooks, and critical templates.",
    instructor: "Sir Ahmed Khan (CSS Mentor)",
    price: 35,
    category: "English Essay",
    thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400",
    isPremiumOnly: true,
    lectures: [
      { id: "e1", title: "Introduction to CSS Essay Structure", duration: "18:45", videoUrl: "dQw4w9WgXcQ", isFreePreview: true },
      { id: "e2", title: "Drafting an Irresistible Thesis Statement", duration: "22:10", videoUrl: "dQw4w9WgXcQ" },
      { id: "e3", title: "Structuring the Outline (Geometric Method)", duration: "15:30", videoUrl: "dQw4w9WgXcQ" },
      { id: "e4", title: "Avoiding Common Grammatical Blunders", duration: "28:15", videoUrl: "dQw4w9WgXcQ" }
    ]
  },
  {
    id: "pak-affairs-decoded",
    title: "Pakistan Affairs Comprehensive Decoded",
    description: "Deconstruct key historical timelines from 1947 to present day. Focused on geopolitics, water crisis, economic challenges, and foreign policy parameters.",
    instructor: "Prof. Ayesha Shah",
    price: 25,
    category: "Pakistan Affairs",
    thumbnailUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
    isPremiumOnly: false,
    lectures: [
      { id: "p1", title: "Pre-Partition Ideology & Timeline", duration: "12:15", videoUrl: "dQw4w9WgXcQ", isFreePreview: true },
      { id: "p2", title: "The 1973 Constitution: Core Clauses", duration: "19:40", videoUrl: "dQw4w9WgXcQ", isFreePreview: true },
      { id: "p3", title: "Pakistan-US Relations Post-Cold War", duration: "25:30", videoUrl: "dQw4w9WgXcQ" },
      { id: "p4", title: "CPEC & The Maritime Silk Road Impact", duration: "31:10", videoUrl: "dQw4w9WgXcQ" }
    ]
  },
  {
    id: "gk-mcq-hacks",
    title: "General Knowledge & GK Hacks for FPSC/PPSC",
    description: "Learn fast mnemonics, international borders, rivers of the world, and intelligence agencies hacks to score 90+ in one-paper MCQs tests.",
    instructor: "Muhammad Ali (GK Expert)",
    price: 15,
    category: "General Knowledge",
    thumbnailUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400",
    isPremiumOnly: true,
    lectures: [
      { id: "g1", title: "World Geography: Oceans & Straits Mnemonics", duration: "14:20", videoUrl: "dQw4w9WgXcQ", isFreePreview: true },
      { id: "g2", title: "Important International Treaties Decoded", duration: "18:15", videoUrl: "dQw4w9WgXcQ" },
      { id: "g3", title: "Famous Mountain Passes and Ranges", duration: "11:50", videoUrl: "dQw4w9WgXcQ" }
    ]
  }
];

export const initialCategories = ["English Essay", "Pakistan Affairs", "General Knowledge", "Islamic Studies", "Current Affairs"];

export default function CoursesPage({
  currentRole,
  isPremium,
  onOpenPricing,
  language,
  courses,
  onAddCourse,
  onDeleteCourse,
  categories,
  onAddCategory
}: CoursesPageProps) {
  const isAdmin = currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager";

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLecture, setActiveLecture] = useState<VideoLecture | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Admin New Course Creation Form States
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newPrice, setNewPrice] = useState("20");
  const [newCategory, setNewCategory] = useState(categories[0] || "General");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newIsPremiumOnly, setNewIsPremiumOnly] = useState(true);
  
  // Custom temporary lectures state for the new course form
  const [tempLectures, setTempLectures] = useState<VideoLecture[]>([]);
  const [tempLectureTitle, setTempLectureTitle] = useState("");
  const [tempLectureDuration, setTempLectureDuration] = useState("");
  const [tempLectureVideoUrl, setTempLectureVideoUrl] = useState("dQw4w9WgXcQ");
  const [tempLectureIsPreview, setTempLectureIsPreview] = useState(false);

  // Admin New Category Form State
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Add course handler
  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newInstructor) {
      alert(language === "EN" ? "Please fill out all required fields." : "براہ کرم تمام مطلوبہ فیلڈز پُر کریں۔");
      return;
    }

    if (tempLectures.length === 0) {
      alert(language === "EN" ? "Please add at least one lecture before saving." : "براہ کرم محفوظ کرنے سے پہلے کم از کم ایک لیکچر شامل کریں۔");
      return;
    }

    const newCourseObj: Course = {
      id: "course-" + Date.now(),
      title: newTitle,
      description: newDescription,
      instructor: newInstructor,
      price: Number(newPrice) || 0,
      category: newCategory,
      thumbnailUrl: newThumbnail || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      isPremiumOnly: newIsPremiumOnly,
      lectures: tempLectures
    };

    onAddCourse(newCourseObj);
    
    // Reset form
    setNewTitle("");
    setNewDescription("");
    setNewInstructor("");
    setNewPrice("20");
    setNewThumbnail("");
    setNewIsPremiumOnly(true);
    setTempLectures([]);
    setShowAddCourseForm(false);
  };

  // Add temporary lecture to active new course form
  const handleAddTempLecture = () => {
    if (!tempLectureTitle || !tempLectureDuration) {
      alert(language === "EN" ? "Please provide Lecture Title & Duration." : "براہ کرم لیکچر کا عنوان اور دورانیہ درج کریں۔");
      return;
    }

    const newLec: VideoLecture = {
      id: "lec-" + Date.now() + Math.random().toString(36).substring(2, 5),
      title: tempLectureTitle,
      duration: tempLectureDuration,
      videoUrl: tempLectureVideoUrl || "dQw4w9WgXcQ",
      isFreePreview: tempLectureIsPreview
    };

    setTempLectures([...tempLectures, newLec]);
    setTempLectureTitle("");
    setTempLectureDuration("");
    setTempLectureVideoUrl("dQw4w9WgXcQ");
    setTempLectureIsPreview(false);
  };

  // Remove temporary lecture from active form list
  const handleRemoveTempLecture = (index: number) => {
    setTempLectures(tempLectures.filter((_, i) => i !== index));
  };

  // Add category handler
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryInput.trim()) return;

    if (categories.includes(newCategoryInput.trim())) {
      alert(language === "EN" ? "Category already exists!" : "کیٹیگری پہلے سے موجود ہے!");
      return;
    }

    onAddCategory(newCategoryInput.trim());
    setNewCategory(newCategoryInput.trim());
    setNewCategoryInput("");
    setShowCategoryForm(false);
  };

  // Delete Course
  const handleDeleteCourse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === "EN" ? "Are you sure you want to delete this course?" : "کیا آپ واقعی یہ کورس حذف کرنا چاہتے ہیں؟")) {
      onDeleteCourse(id);
      if (selectedCourse?.id === id) {
        setSelectedCourse(null);
        setActiveLecture(null);
      }
    }
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Check if a video is accessible by current user
  const canWatchLecture = (lecture: VideoLecture | null, course: Course | null) => {
    if (!lecture || !course) return false;
    if (isPremium) return true; // premium users can watch everything
    if (!course.isPremiumOnly && lecture.isFreePreview) return true; // free previews are open
    if (lecture.isFreePreview) return true; // generic preview
    return false;
  };

  // Translations
  const t = {
    title: language === "EN" ? "Video Academy" : "ویڈیو اکیڈمی",
    subtitle: language === "EN" ? "Master competitive exams with premium recorded courses." : "پریمیم ریکارڈ شدہ کورسز کے ساتھ مسابقتی امتحانات کی تیاری کریں۔",
    searchPlaceholder: language === "EN" ? "Search courses, mentors..." : "کورسز یا اساتذہ تلاش کریں...",
    addCourse: language === "EN" ? "Add New Course" : "نیا کورس شامل کریں",
    addCategory: language === "EN" ? "Add Category" : "کیٹیگری شامل کریں",
    instructor: language === "EN" ? "Instructor" : "انسٹرکٹر",
    price: language === "EN" ? "Course Price" : "کورس کی قیمت",
    premiumBadge: language === "EN" ? "Premium Course" : "پریمیم کورس",
    freePreview: language === "EN" ? "Free Preview Available" : "مفت پیش نظارہ دستیاب ہے",
    viewCourse: language === "EN" ? "Start Learning" : "سیکھنا شروع کریں",
    backToList: language === "EN" ? "Back to Catalog" : "کورس فہرست پر واپس جائیں",
    lockedMessage: language === "EN" ? "Premium Access Only" : "صرف پریمیم رسائی",
    lockedSub: language === "EN" ? "This high-yield video lecture requires a Premium Student account. Upgrade today to unlock the full competitive syllabus!" : "اس اہم معلوماتی ویڈیو لیکچر کے لیے پریمیم اسٹوڈنٹ اکاؤنٹ کی ضرورت ہے۔ آج ہی اپ گریڈ کریں۔",
    unlockBtn: language === "EN" ? "Upgrade & Unlock Instantly" : "فوری اپ گریڈ اور انلاک کریں",
    curriculum: language === "EN" ? "Course Curriculum" : "کورس کا نصاب",
    lecturePreview: language === "EN" ? "Free Video Preview" : "مفت ویڈیو پیش نظارہ",
    lectureLocked: language === "EN" ? "Premium Lecture" : "پریمیم لیکچر",
    courseDetails: language === "EN" ? "About Course" : "کورس کے بارے میں",
    addCourseTitle: language === "EN" ? "Create New Video Course" : "نیا ویڈیو کورس بنائیں",
    courseFormTitle: language === "EN" ? "Course Title" : "کورس کا عنوان",
    instructorName: language === "EN" ? "Instructor Name" : "انسٹرکٹر کا نام",
    priceUsd: language === "EN" ? "Price in USD" : "قیمت (ڈالر)",
    courseDesc: language === "EN" ? "Course Description" : "کورس کی تفصیل",
    thumbnailUrlLabel: language === "EN" ? "Thumbnail Image URL (Optional)" : "تھمب نیل امیج لنک (اختیاری)",
    lectureListLabel: language === "EN" ? "Lecture Playlist Setup" : "پلے لسٹ سیٹ اپ",
    addLectureBtn: language === "EN" ? "Add Video Lecture" : "ویڈیو لیکچر شامل کریں",
    saveCourseBtn: language === "EN" ? "Publish Video Course" : "ویڈیو کورس شائع کریں",
    cancelBtn: language === "EN" ? "Cancel" : "منسوخ کریں",
    lectureTitleInput: language === "EN" ? "Lecture Video Title" : "لیکچر ویڈیو کا عنوان",
    lectureDurationInput: language === "EN" ? "Duration (e.g. 15:40)" : "دورانیہ (مثال: 15:40)",
    lectureYtInput: language === "EN" ? "YouTube Video ID (or leave as demo)" : "یوٹیوب ویڈیو ID",
  };

  if (!isPremium && !isAdmin) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-8 font-sans" id="video-courses-module">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-10 -top-20 w-36 h-36 bg-teal-600/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Lock Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto animate-pulse">
              <Lock className="w-7 h-7" />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-extrabold">
                {language === "EN" ? "Prepistan Premium Only" : "صرف پریپستان پریمیم"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white font-display tracking-tight leading-tight">
                {language === "EN" ? "Unlock Video Academy" : "ویڈیو اکیڈمی لاک ہے"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === "EN" 
                  ? "The video academy section and premium recorded courses are only available for Premium Student accounts." 
                  : "ویڈیو اکیڈمی اور اس میں موجود پریمیم ریکارڈ شدہ لیکچرز صرف پریمیم اسٹوڈنٹ ممبرشپ کے لیے دستیاب ہیں۔"}
              </p>
            </div>

            {/* Features list */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                {language === "EN" ? "Premium Student Perks:" : "پریمیم پیکیج کے فوائد:"}
              </span>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Complete high-yield recorded lectures for CSS/PMS syllabus." 
                      : "سی ایس ایس اور پی ایم ایس کے مکمل ریکارڈ شدہ پریمیم لیکچرز تک رسائی۔"}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Argumentative essay outlines and examiner-level templates." 
                      : "انگریزی مضمون اور اہم مضامین کے بہترین خاکے اور ٹیمپلیٹس۔"}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Dedicated doubt discussion boards with mentors." 
                      : "اساتذہ کے ساتھ رہنمائی اور سوالات و جوابات کے لیے فورم۔"}
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrade Action Button */}
            <button
              onClick={onOpenPricing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5 animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === "EN" ? "Upgrade to Premium Student" : "پریمیم اسٹوڈنٹ میں اپ گریڈ کریں"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans" id="video-courses-module">
      
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-20 w-48 h-48 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              {language === "EN" ? "Prepistan Video Academy" : "پریپستان ویڈیو اکیڈمی"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              {t.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Action controls for Admins */}
          {isAdmin && (
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <FolderPlus className="w-4 h-4 text-emerald-500" />
                <span>{t.addCategory}</span>
              </button>
              
              <button
                onClick={() => {
                  setShowAddCourseForm(!showAddCourseForm);
                  setSelectedCourse(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>{t.addCourse}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin New Category Popover Form */}
      {showCategoryForm && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl max-w-md animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleAddCategorySubmit} className="flex gap-2">
            <input 
              type="text"
              required
              placeholder={language === "EN" ? "New category name (e.g. Current Affairs)" : "نئی کیٹیگری کا نام..."}
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500"
            >
              Save
            </button>
            <button 
              type="button"
              onClick={() => setShowCategoryForm(false)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-800 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              {t.cancelBtn}
            </button>
          </form>
        </div>
      )}

      {/* Admin New Course Creation Screen Overlay Block */}
      {showAddCourseForm && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2 font-display">
              <Tv className="w-5 h-5 text-emerald-600" />
              <span>{t.addCourseTitle}</span>
            </h2>
            <button
              onClick={() => setShowAddCourseForm(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
            >
              {t.cancelBtn}
            </button>
          </div>

          <form onSubmit={handleAddCourseSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.courseFormTitle} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSS Pakistan Affairs Masterclass"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.instructor} *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Jahangir"
                      value={newInstructor}
                      onChange={(e) => setNewInstructor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.priceUsd} ($)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col justify-center">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Access Scope</label>
                    <label className="flex items-center space-x-2 cursor-pointer py-1.5">
                      <input
                        type="checkbox"
                        checked={newIsPremiumOnly}
                        onChange={(e) => setNewIsPremiumOnly(e.target.checked)}
                        className="rounded border-slate-300 dark:border-slate-800 accent-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Premium Only Access</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.courseDesc} *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide a breakdown of what CSS students will learn..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.thumbnailUrlLabel}</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Right Column: Adding Lectures to the Playlist */}
              <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Video className="w-4 h-4 text-emerald-500" />
                    <span>{t.lectureListLabel} ({tempLectures.length})</span>
                  </span>
                </div>

                {/* Adding form nested */}
                <div className="space-y-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <input 
                    type="text"
                    placeholder={t.lectureTitleInput}
                    value={tempLectureTitle}
                    onChange={(e) => setTempLectureTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder={t.lectureDurationInput}
                      value={tempLectureDuration}
                      onChange={(e) => setTempLectureDuration(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950 text-center"
                    />
                    <input 
                      type="text"
                      placeholder="YouTube Video ID"
                      value={tempLectureVideoUrl}
                      onChange={(e) => setTempLectureVideoUrl(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950 text-center font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={tempLectureIsPreview}
                        onChange={(e) => setTempLectureIsPreview(e.target.checked)}
                        className="rounded accent-emerald-500"
                      />
                      <span className="text-[10px] text-slate-500 font-semibold">{t.lecturePreview}</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleAddTempLecture}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.addLectureBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Playlist preview */}
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {tempLectures.map((lec, index) => (
                    <div key={lec.id} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs">
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="text-[10px] font-mono text-slate-400 block">Lec #{index + 1}</span>
                        <span className="font-bold text-slate-800 dark:text-white block truncate">{lec.title}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{lec.duration} • {lec.isFreePreview ? "Free Preview" : "Premium"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTempLecture(index)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {tempLectures.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No video lectures added to this playlist yet. Add at least one above.
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowAddCourseForm(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-500/20"
              >
                {t.saveCourseBtn}
              </button>
            </div>
          </form>
        </div>
      )}


      {/* 2. MAIN SPLIT: Dynamic detail viewer OR Catalog browse view */}
      {selectedCourse ? (
        
        /* ---------------- VIEW A: ACTIVE COURSE VIEW & SECURE VIDEO PLAYER ---------------- */
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Back control */}
          <button
            onClick={() => {
              setSelectedCourse(null);
              setActiveLecture(null);
            }}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToList}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns: Video Screen Player */}
            <div className="lg:col-span-2 space-y-4">
              
              {activeLecture ? (
                /* Dynamic Interactive Video container */
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl group">
                  
                  {canWatchLecture(activeLecture, selectedCourse) ? (
                    /* User has Access: Render clean embed simulation player */
                    <iframe
                      src={`https://www.youtube.com/embed/${activeLecture.videoUrl}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                      title={activeLecture.title}
                      className="w-full h-full border-0 absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    /* User is LOCKED out: Beautiful high-contrast glassmorphic lock screen */
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                        <Lock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider font-mono">
                          {t.lockedMessage}
                        </span>
                        <h3 className="text-base font-black text-white font-display">
                          {activeLecture.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {t.lockedSub}
                        </p>
                      </div>
                      <button
                        onClick={onOpenPricing}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                      >
                        {t.unlockBtn}
                      </button>
                    </div>
                  )}

                  {/* Tiny watermarked corner indicator */}
                  <div className="absolute top-4 left-4 bg-slate-900/40 backdrop-blur-md text-[9px] font-mono uppercase text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700/20 pointer-events-none">
                    Prepistan Securestream • Active
                  </div>
                </div>
              ) : (
                /* Empty / Landing placeholder state */
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0F172A] border border-slate-800 shadow-xl flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500">
                    <Tv className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">Select a Lecture to Begin</h3>
                    <p className="text-xs text-slate-400 max-w-xs">Pick any video lecture from the playlist curriculum on the right to start playing instantly.</p>
                  </div>
                </div>
              )}

              {/* Lecture Title details and metadata */}
              {activeLecture && (
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-500">
                      Now Studying: Lecture {selectedCourse.lectures.findIndex(l => l.id === activeLecture.id) + 1} of {selectedCourse.lectures.length}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration: {activeLecture.duration}</span>
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-800 dark:text-white font-display leading-tight">
                    {activeLecture.title}
                  </h2>
                  <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold">{selectedCourse.instructor}</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{selectedCourse.category}</span>
                  </div>
                </div>
              )}

              {/* General Course outline and about section */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider font-display border-b border-slate-100 dark:border-slate-800 pb-2">
                  {t.courseDetails}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedCourse.description}
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Mentor</span>
                    <span className="font-bold text-slate-800 dark:text-white mt-0.5 block">{selectedCourse.instructor}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Access Scope</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                      {selectedCourse.isPremiumOnly ? "Premium Student Elite" : "Open Syllabus / Preview"}
                    </span>
                  </div>
                </div>
              </div>

            </div>


            {/* Right Column: Lecture Curriculum Sidebar list */}
            <div className="space-y-4">
              
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className="text-xs font-black uppercase text-slate-800 dark:text-white tracking-wider flex items-center gap-1.5 font-display">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>{t.curriculum}</span>
                  </h3>
                </div>

                {/* Playlist Scroll Area */}
                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  {selectedCourse.lectures.map((lec, index) => {
                    const isSelected = activeLecture?.id === lec.id;
                    const isUnlocked = canWatchLecture(lec, selectedCourse);
                    
                    return (
                      <button
                        key={lec.id}
                        onClick={() => setActiveLecture(lec)}
                        className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 group/item ${
                          isSelected 
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        {/* Status Icon Indicator */}
                        <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                          isSelected 
                            ? "bg-emerald-500 text-white" 
                            : isUnlocked 
                              ? "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover/item:text-emerald-500" 
                              : "bg-rose-50 dark:bg-rose-950/20 text-rose-500"
                        }`}>
                          {isUnlocked ? (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </div>

                        {/* Text Block */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono text-slate-400 block">Lecture #{index + 1}</span>
                          <span className={`text-xs block leading-snug font-bold ${
                            isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"
                          }`}>
                            {lec.title}
                          </span>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              <span>{lec.duration}</span>
                            </span>
                            {!isUnlocked && (
                              <span className="text-[9px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-semibold px-1 py-0.2 rounded">
                                {t.lectureLocked}
                              </span>
                            )}
                            {isUnlocked && lec.isFreePreview && (
                              <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-semibold px-1 py-0.2 rounded animate-pulse">
                                {t.lecturePreview}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary assistance block */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Video Notes</span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Interactive PDF slides & mock test questions associated with these lectures are available inside the <strong>Revision Notes</strong> and <strong>Exams</strong> rooms.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        
        /* ---------------- VIEW B: MAIN CATALOG BROWSE VIEW ---------------- */
        <div className="space-y-6">
          
          {/* 1. Category scroll tabs & Search input */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm font-sans">
            
            {/* Horizontal Filter Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === "All"
                    ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent shadow-sm"
                    : "bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-800 border-slate-100 dark:border-slate-800"
                }`}
              >
                {language === "EN" ? "All Subjects" : "تمام مضامین"}
              </button>

              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white border-transparent shadow-sm"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-800 border-slate-100 dark:border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Simple Search bar */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white"
              />
            </div>

          </div>


          {/* 2. Course Catalog Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {filteredCourses.map(course => {
              const hasFreePreview = course.lectures.some(l => l.isFreePreview);
              
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    // play first lecture automatically
                    if (course.lectures.length > 0) {
                      setActiveLecture(course.lectures[0]);
                    }
                  }}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-500/20 cursor-pointer flex flex-col transition-all duration-200"
                >
                  
                  {/* Thumbnail / Header Gradient Area */}
                  <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Left category badge */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-emerald-600 text-white font-mono text-[9px] uppercase tracking-wider font-semibold rounded-md">
                      {course.category}
                    </span>

                    {/* Right Premium Indicator lock */}
                    {course.isPremiumOnly ? (
                      <span className="absolute top-3 right-3 p-1.5 bg-amber-500/90 text-white rounded-lg text-[9px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                        <Lock className="w-3 h-3" />
                        <span>PREMIUM</span>
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 p-1.5 bg-emerald-500/90 text-white rounded-lg text-[9px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>OPEN ACCESS</span>
                      </span>
                    )}

                    {/* Instructor label in the card overlay */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] text-slate-300 uppercase block font-semibold">Taught by</span>
                      <span className="text-xs font-bold block">{course.instructor}</span>
                    </div>

                    {/* Trash course button for admins */}
                    {isAdmin && (
                      <button
                        onClick={(e) => handleDeleteCourse(course.id, e)}
                        className="absolute bottom-3 right-3 p-2 bg-rose-500/90 hover:bg-rose-600 text-white rounded-xl transition-all shadow-md backdrop-blur-sm"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Body Copy Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors font-display leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Quick Playlist Metrics / Actions bar */}
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs text-slate-500">
                      
                      {/* Metric info */}
                      <div className="flex items-center space-x-2.5">
                        <span className="font-bold font-mono text-slate-800 dark:text-slate-300 flex items-center gap-1">
                          <FileVideo className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{course.lectures.length} {course.lectures.length === 1 ? "Video" : "Videos"}</span>
                        </span>
                        <span>•</span>
                        <span className="font-mono text-slate-400">
                          {course.lectures.reduce((acc, current) => {
                            const minutes = parseInt(current.duration.split(":")[0]) || 0;
                            return acc + minutes;
                          }, 0)}m Total
                        </span>
                      </div>

                      {/* Action trigger button */}
                      <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>{t.viewCourse}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

            {filteredCourses.length === 0 && (
              <div className="col-span-full bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
                  <Video className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">No courses matched filters</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">Try typing another exam topic or select a different subject category tab above.</p>
                </div>
              </div>
            )}

          </div>

        </div>

      )}

    </div>
  );
}
