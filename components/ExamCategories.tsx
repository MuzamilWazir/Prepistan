 ort { 
  Search, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ChevronRight, 
  ShieldCheck, 
  Compass, 
  Zap, 
  Clock, 
  FileText,
  UserCheck
} from "lucide-react";
import { MCQ, QuizMode } from "../types";

interface ExamCategoriesProps {
  categories: string[];
  subjects?: string[];
  mcqs: MCQ[];
  onStartQuiz: (category: string, subject: string, mode: QuizMode, questionCount: number) => void;
  language: "EN" | "UR";
}

export default function ExamCategories({
  categories,
  subjects,
  mcqs,
  onStartQuiz,
  language
}: ExamCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<"All" | "Civil" | "Provincial" | "Security" | "Academic">("All");
  
  // Selection dialog state for starting a quiz
  const [selectedExam, setSelectedExam] = useState<{ category: string; mode: QuizMode } | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [selectedSubject, setSelectedSubject] = useState<string>("All Subjects");

  // Descriptions and metadata for Pakistan exams
  const examMeta: { [key: string]: { name: string; desc: string; group: "Civil" | "Provincial" | "Security" | "Academic" | "Other"; tags: string[] } } = {
    CSS: {
      name: "Central Superior Services",
      desc: "Federal elite civil service exam of Pakistan. Crucial for bureaucrat recruitment.",
      group: "Civil",
      tags: ["High Difficulty", "English Precis", "Pakistan Affairs"]
    },
    PMS: {
      name: "Provincial Management Service",
      desc: "Provincial civil service competitive exam. Managed by local provincial commission.",
      group: "Civil",
      tags: ["Provincial", "General Knowledge", "Urdu Essay"]
    },
    FPSC: {
      name: "Federal Public Service Commission",
      desc: "Federal department exams recruiting officers across Ministries and Federal bodies.",
      group: "Civil",
      tags: ["FPSC", "Federal Jobs", "Pedagogy"]
    },
    PPSC: {
      name: "Punjab Public Service Commission",
      desc: "Officer jobs in government departments of Punjab province, Pakistan.",
      group: "Provincial",
      tags: ["Punjab", "Tehsildar", "Lecturer"]
    },
    KPPSC: {
      name: "Khyber Pakhtunkhwa PSC",
      desc: "Civil and municipal recruitment examinations for KP government.",
      group: "Provincial",
      tags: ["KP", "Provincial Service"]
    },
    SPSC: {
      name: "Sindh Public Service Commission",
      desc: "Executive recruitment tests for Government of Sindh administrative departments.",
      group: "Provincial",
      tags: ["Sindh", "Asst Commissioner"]
    },
    BPSC: {
      name: "Balochistan PSC",
      desc: "Administrative and educational recruitment exams for Balochistan province.",
      group: "Provincial",
      tags: ["Balochistan", "Civil Judge"]
    },
    AJKPSC: {
      name: "Azad Jammu & Kashmir PSC",
      desc: "Public service officer recruitments for AJK Government departments.",
      group: "Provincial",
      tags: ["AJK", "Kashmir Affairs"]
    },
    NTS: {
      name: "National Testing Service",
      desc: "National standardized tests for university admissions and semi-government job entry.",
      group: "Academic",
      tags: ["GAT", "NAT", "Teaching"]
    },
    OTS: {
      name: "Open Testing Service",
      desc: "Private testing service conducting recruitment for banks and public organizations.",
      group: "Academic",
      tags: ["OTS", "General MCQs"]
    },
    PTS: {
      name: "Pakistan Testing Service",
      desc: "Standard tests utilized for administrative assistant and clerk postings.",
      group: "Academic",
      tags: ["PTS", "Clerical"]
    },
    STS: {
      name: "SIBA Testing Service",
      desc: "Renowned testing service managed by IBA Sukkur, focused on Sindh state hiring.",
      group: "Provincial",
      tags: ["Sindh", "Sukkur IBA"]
    },
    Police: {
      name: "Punjab/Sindh/KP Police",
      desc: "Constable, ASI, and Sub-Inspector entrance exams and physical tests.",
      group: "Security",
      tags: ["ASI", "Sub-Inspector", "Physical Science"]
    },
    Army: {
      name: "Pakistan Army Entrance",
      desc: "Initial tests and ISSB preparation material for PMA Long Course commissions.",
      group: "Security",
      tags: ["ISSB", "PMA", "Intelligence"]
    },
    Navy: {
      name: "Pakistan Navy Careers",
      desc: "Entrance examinations for Cadet, sailor, and officer positions.",
      group: "Security",
      tags: ["PN Cadet", "Technical"]
    },
    "Air Force": {
      name: "Pakistan Air Force",
      desc: "Initial tests for GDP, aeronautical engineering, and airmen streams.",
      group: "Security",
      tags: ["PAF ISSB", "Physics", "Maths"]
    },
    ASF: {
      name: "Airport Security Force",
      desc: "ASI and corporal recruitment examinations under the Ministry of Aviation.",
      group: "Security",
      tags: ["ASF", "Aviation Security"]
    },
    FIA: {
      name: "Federal Investigation Agency",
      desc: "Inspector, Sub-Inspector, and Assistant examinations focusing on cybercrime and immigration.",
      group: "Security",
      tags: ["FIA Inspector", "FIA Act 1974"]
    },
    NAB: {
      name: "National Accountability Bureau",
      desc: "Specialized officer recruitment tests for anti-corruption and forensics experts.",
      group: "Security",
      tags: ["NAB Ordinance", "Investigator"]
    },
    IB: {
      name: "Intelligence Bureau",
      desc: "Recruitment exams for Inspector, Sub-Inspector, and security officer ranks.",
      group: "Security",
      tags: ["IB Inspector", "Current Affairs"]
    },
    ISI: {
      name: "Inter-Services Intelligence",
      desc: "Preparation guides for AD (Assistant Director) and officer roles via FPSC.",
      group: "Security",
      tags: ["National Security", "Geopolitics"]
    },
    "Pakistan Affairs": {
      name: "Pakistan Studies Core",
      desc: "Core historical dates, movements, and post-partition constitutional issues.",
      group: "Academic",
      tags: ["History", "Constitutions", "Geography"]
    },
    "Current Affairs": {
      name: "Global & Domestic News",
      desc: "Up-to-date monthly summaries of international geopolitics and local affairs.",
      group: "Academic",
      tags: ["Current Events", "Borders", "Summits"]
    },
    "Islamic Studies": {
      name: "Islamiyat Fundamentals",
      desc: "Ghazawat history, Quran compilation, and fundamentals of Islamic theology.",
      group: "Academic",
      tags: ["Islamiyat", "Ahadees", "Seerah"]
    },
    English: {
      name: "English Grammar & Précis",
      desc: "CSS standard synonyms, antonyms, prepositions, sentence corrections, and analogies.",
      group: "Academic",
      tags: ["Grammar", "Precis", "Vocabulary"]
    },
    Mathematics: {
      name: "General Ability & Math",
      desc: "Quantitative arithmetic, percentages, fractions, logical reasoning, and basic algebra.",
      group: "Academic",
      tags: ["Maths", "Percentages", "Ability"]
    }
  };

  // Group filter handler
  const isMatchGroup = (cat: string) => {
    if (activeGroup === "All") return true;
    const meta = examMeta[cat];
    if (!meta) return activeGroup === "Academic"; // Default academic/subjects fallback
    return meta.group === activeGroup;
  };

  // Filter list by search query and group
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (examMeta[cat]?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = isMatchGroup(cat);
    return matchesSearch && matchesGroup;
  });

  // Subjects lists (dynamic fallback to default lists if not provided)
  const availableSubjects = subjects && subjects.length > 0 
    ? subjects 
    : ["Pakistan Affairs", "Islamic Studies", "Geography", "English", "Mathematics", "Current Affairs"];

  return (
    <div className="space-y-6" id="exam-categories">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {language === "EN" ? "Choose Your Target Exam" : "اپنے امتحانی ہدف کا انتخاب کریں"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {language === "EN" 
            ? "Access thousands of mock MCQs, past papers, and dynamic practice mode for all major Pakistani services." 
            : "تمام بڑے پاکستانی امتحانات کے لیے ہزاروں فرضی سوالات اور پریکٹس ٹیسٹ تک رسائی حاصل کریں۔"}
        </p>
      </div>

      {/* Control Tools (Search + Quick Filter Groups) */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === "EN" ? "Search exams e.g. CSS, FIA, PPSC..." : "امتحان تلاش کریں جیسے CSS، FIA..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all"
          />
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 dark:border-gray-700 pt-3">
          {[
            { id: "All", label: language === "EN" ? "All Exams" : "تمام امتحانات" },
            { id: "Civil", label: language === "EN" ? "Federal & Civil" : "وفاقی اور سول" },
            { id: "Provincial", label: language === "EN" ? "Provincial Services" : "صوبائی کمیشن" },
            { id: "Security", label: language === "EN" ? "Defense & Intel" : "دفاع اور انٹیلیجنس" },
            { id: "Academic", label: language === "EN" ? "Core Subjects" : "لازمی مضامین" }
          ].map(group => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeGroup === group.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Exams Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            No exam categories found matching your criteria.
          </div>
        ) : (
          filteredCategories.map((cat, idx) => {
            const meta = examMeta[cat] || {
              name: `${cat} Exam Syllabus`,
              desc: `Preparation modules and previous papers for the ${cat} exam network in Pakistan.`,
              group: "Academic",
              tags: ["MCQs Ready"]
            };

            // Count available MCQs for this category
            const countMcq = mcqs.filter(q => q.category.toUpperCase().split(',').map(c => c.trim()).includes(cat.toUpperCase())).length;

            return (
              <div 
                key={cat}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:shadow-md transition-all flex flex-col justify-between"
                id={`exam-card-${cat.toLowerCase()}`}
              >
                <div>
                  
                  {/* Card Header (Duolingo styled badges) */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg shadow-sm border border-emerald-100/30">
                      {cat.slice(0, 3)}
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-100/30">
                      {countMcq > 0 ? `${countMcq} Seeded` : "Mock Mode"}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-bold text-gray-900 dark:text-white text-base tracking-tight mb-1">
                    {cat} - {meta.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {meta.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meta.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-slate-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded font-medium border border-gray-100 dark:border-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Subject and Action Options */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                  
                  <span className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {language === "EN" ? "Choose Preparation Mode" : "تیاری کا طریقہ منتخب کریں"}
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    
                    {/* Practice Mode */}
                    <button
                      onClick={() => {
                        setSelectedExam({ category: cat, mode: "Practice Mode" });
                        setQuestionCount(20);
                        setSelectedSubject("All Subjects");
                      }}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold text-center transition-all flex items-center justify-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Practice</span>
                    </button>

                    {/* Timed Exam */}
                    <button
                      onClick={() => {
                        setSelectedExam({ category: cat, mode: "Timed Test" });
                        setQuestionCount(20);
                        setSelectedSubject("All Subjects");
                      }}
                      className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 rounded-xl font-bold text-center transition-all flex items-center justify-center space-x-1"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timed Exam</span>
                    </button>

                    {/* Full Mock Test */}
                    <button
                      onClick={() => {
                        setSelectedExam({ category: cat, mode: "Mock Test" });
                        setQuestionCount(100);
                        setSelectedSubject("All Subjects");
                      }}
                      className="p-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-xl font-bold text-center transition-all flex items-center justify-center space-x-1 col-span-2"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Full Mock Paper (100 Marks)</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Start Quiz Configuration Modal */}
      {selectedExam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 max-w-lg w-full p-6 shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold px-2.5 py-1 rounded-full border border-emerald-100/30">
                  {selectedExam.mode === "Mock Test" ? "🏆 " : selectedExam.mode === "Timed Test" ? "⏱️ " : "📚 "}
                  {selectedExam.mode}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-2">
                  {selectedExam.category} Exam Prep Setup
                </h3>
                <p className="text-xs text-gray-400">
                  Configure your exam board preferences below.
                </p>
              </div>
              <button 
                onClick={() => setSelectedExam(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-extrabold text-lg p-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Select Number of Questions (5, 10, 20, 50, 100) */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Select Number of MCQs (سوالات کی تعداد)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[5, 10, 20, 50, 100].map((count) => {
                  const isSelected = questionCount === count;
                  const label = 
                    count === 5 ? "Mini" :
                    count === 10 ? "Brief" :
                    count === 20 ? "Quick" :
                    count === 50 ? "Standard" :
                    "Full Paper";
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={`py-3 px-1.5 rounded-xl border-2 font-black text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/20 text-emerald-800 dark:text-emerald-300"
                          : "border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="text-base sm:text-lg">{count}</span>
                      <span className="text-[9px] font-bold mt-0.5 uppercase tracking-wider opacity-80 leading-none">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Focus Subject */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Select Focus Subject (مضمون کا انتخاب)
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Subjects">All Subjects / Comprehensive Syllabus</option>
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Test info summary card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1.5 leading-relaxed">
              <div className="flex justify-between">
                <span>⏱️ Time Estimate:</span>
                <span className="font-bold text-gray-900 dark:text-white">{questionCount * 1} Minutes</span>
              </div>
              <div className="flex justify-between">
                <span>💎 Reward Potential:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">+{questionCount * 10} XP / +{questionCount * 2} Coins</span>
              </div>
              {selectedExam.mode === "Timed Test" && (
                <div className="text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wider pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                  ⚠️ Negative Marking Active (-0.25 marks per error)
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3.5">
              <button
                type="button"
                onClick={() => setSelectedExam(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all text-sm"
              >
                {language === "EN" ? "Cancel" : "منسوخ کریں"}
              </button>
              <button
                type="button"
                onClick={() => {
                  onStartQuiz(selectedExam.category, selectedSubject, selectedExam.mode, questionCount);
                  setSelectedExam(null);
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center space-x-1"
              >
                <span>{language === "EN" ? "Start Test" : "ٹیسٹ شروع کریں"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
