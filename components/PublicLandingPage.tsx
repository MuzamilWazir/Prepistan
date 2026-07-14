import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Trophy, 
  Newspaper, 
  Lock, 
  Star, 
  Shield, 
  Zap, 
  Sun, 
  Moon,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Building2,
  Search,
  Compass,
  Award
} from "lucide-react";

const examSuites = [
  {
    name: "FPSC & CSS/PMS",
    category: "civil",
    icon: <Award className="w-5 h-5 text-emerald-500" />,
    tag: "Federal Civil Service",
    badge: "Fully Live",
    desc: "Syllabi trackers, daily current affairs, constitutional guides, and English Essay outlines tailored to federal officer posts.",
    tests: ["CSS Exam", "PMS competitive", "FPSC MPT", "FPSC Inspector & AD"]
  },
  {
    name: "PPSC (Punjab)",
    category: "civil",
    icon: <Building2 className="w-5 h-5 text-indigo-500" />,
    tag: "Provincial Executive",
    badge: "Preloaded Tracker",
    desc: "Solved past papers and complete trackers for Punjab Sub-Inspector, Tehsildar, and Assistant (S&GAD) exams.",
    tests: ["Tehsildar CSS Syllabus", "ASI Punjab Police", "Assistant S&GAD", "PPSC Lecturer"]
  },
  {
    name: "SPSC, GBPSC & Provincial",
    category: "civil",
    icon: <Compass className="w-5 h-5 text-sky-500" />,
    tag: "Provincial Boards",
    badge: "92% Synced",
    desc: "Sindh CCE, Gilgit-Baltistan PSC, KPPSC (Khyber Pakhtunkhwa), and BPSC (Balochistan) public service prep logs.",
    tests: ["SPSC Combined Competitive", "GBPSC Assistant posts", "KPPSC & BPSC Entry"]
  },
  {
    name: "NAB & FIA Screenings",
    category: "recruitment",
    icon: <Shield className="w-5 h-5 text-rose-500" />,
    tag: "Federal Agencies",
    badge: "Highly Popular",
    desc: "General intelligence, law enforcement frameworks, Pakistan Penal Code basics, and investigation case-study sheets.",
    tests: ["FIA Sub-Inspector", "NAB Assistant Investigator", "Inspector Custody"]
  },
  {
    name: "NTS, OTS, PTS & GAT",
    category: "recruitment",
    icon: <Search className="w-5 h-5 text-amber-500" />,
    tag: "National Testing Services",
    badge: "Daily Mock Tests",
    desc: "Quantitative reasoning, basic mathematics, analytical reasoning, and verbal comprehension worksheets.",
    tests: ["NTS GAT General", "NAT Admission", "OTS/PTS Ministry Screening"]
  },
  {
    name: "MDCAT Admissions",
    category: "admissions",
    icon: <GraduationCap className="w-5 h-5 text-pink-500" />,
    tag: "Medical Entrance",
    badge: "High-Yield Bank",
    desc: "Preloaded high-yield medical college entrance syllabus nodes. Biology, Chemistry, Physics, and English simulation vaults.",
    tests: ["PMC Syllabus Match", "MDCAT Mock Simulator", "Chemistry / Physics Concepts"]
  },
  {
    name: "USAT & LAT Admissions",
    category: "admissions",
    icon: <BookOpen className="w-5 h-5 text-teal-500" />,
    tag: "Academic Admissions",
    badge: "Preloaded Lessons",
    desc: "Undergraduate Studies Admission Test and Law Admission Test (LAT) syllabus outlines, essay guidelines, and personal statement blueprints.",
    tests: ["HEC USAT Entry", "LAT Pre-Law Mock", "Verbal & Quantitative Units"]
  }
];

interface PublicLandingPageProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onStartPrep: (tab: "signup" | "signin") => void;
  onDemoBypass: (role: "Student" | "Premium Student" | "Content Manager" | "Super Admin") => void;
}

export default function PublicLandingPage({
  darkMode,
  setDarkMode,
  onStartPrep,
  onDemoBypass
}: PublicLandingPageProps) {
  // Active Category Tab: "all" | "civil" | "recruitment" | "admissions"
  const [activeCategoryTab, setActiveCategoryTab] = useState<"all" | "civil" | "recruitment" | "admissions">("all");

  // Live sample question interactive state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const sampleQuestion = {
    question: "Which article of the 1973 Constitution of Pakistan defines the President's authority to dissolve the National Assembly under discretionary circumstances?",
    options: [
      { text: "Article 48(1)", isCorrect: false },
      { text: "Article 58(2)b", isCorrect: true },
      { text: "Article 62(1)f", isCorrect: false },
      { text: "Article 112", isCorrect: false }
    ],
    explanation: "Article 58(2)b gives the power to dissolve the National Assembly when a situation has arisen in which the Government of the Federation cannot be carried on in accordance with the provisions of the Constitution. It has been a historical point of constitutional debate."
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const compulsorySubjects = [
    {
      name: "English Essay & Précis",
      marks: "200 Marks",
      desc: "Master thesis statement formulation, structured essay outlines, précis writing & vocabulary building templates.",
      status: "100% Preloaded",
      tag: "Compulsory"
    },
    {
      name: "General Science & Ability",
      marks: "100 Marks",
      desc: "Physical sciences, environmental science, quantitative reasoning, and mental ability past papers solved.",
      status: "Preloaded Node",
      tag: "Compulsory"
    },
    {
      name: "Current & Pakistan Affairs",
      marks: "200 Marks",
      desc: "Foreign policy structures, economic challenges, regional dynamics, and constitutional history timelines.",
      status: "Daily Live Updates",
      tag: "Compulsory"
    },
    {
      name: "Islamic Studies",
      marks: "100 Marks",
      desc: "Core Islamic tenets, modern socio-economic challenges, governance in Islam, and comparative religion guides.",
      status: "Bilingual Templates",
      tag: "Compulsory"
    }
  ];

  const optionalSubjectsPreview = [
    { name: "Political Science", code: "IR-PS", marks: "200 Marks" },
    { name: "International Relations", code: "IR-1", marks: "200 Marks" },
    { name: "Criminology & Law", code: "CR-LW", marks: "100 Marks" },
    { name: "US History / European History", code: "US-EU", marks: "100 Marks" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${darkMode ? "dark bg-[#0F172A] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Header / Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 bg-white/85 dark:bg-[#0F172A]/85 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-500/20">
              P
            </div>
            <div>
              <h2 className="font-display font-black text-base tracking-tight leading-none text-slate-900 dark:text-white">Prepistan</h2>
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Competitive Arena</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Platform Features</a>
            <a href="#compulsory" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Syllabus Matrix</a>
            <a href="#interactive-quiz" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Try MPT Demo</a>
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Aspirants' Voice</a>
          </div>

          {/* Quick CTAs */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onStartPrep("signin")}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Sign In
            </button>

            <button
              onClick={() => onStartPrep("signup")}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/15"
            >
              Join Free
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase mb-6 animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>Pakistan's Digital Hub: CSS, PMS, PPSC, SPSC, NTS, MDCAT, USAT, NAB & FIA Prep</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
            The Smartest Way to Conquer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">Any Pakistan Exam</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Stop spending millions on rigid, overcrowded academies. Prepistan is your unified exam cockpit. From CSS, PMS, and Provincial Civil Services (PPSC, SPSC, KPPSC, BPSC, GBPSC) to Recruitment Screenings (NTS, NAB, FIA) and Academic entries (MDCAT, USAT, LAT) — access structured trackers, pre-vetted MCQs, past papers, and 24/7 simulated AI tutoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onStartPrep("signup")}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 group"
            >
              <span>Get Started (Free Account)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#interactive-quiz"
              className="w-full sm:w-auto px-6 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all text-center"
            >
              Try Interactive Demo MCQ
            </a>
          </div>

          {/* Simple statistics bar */}
          <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">1,420+</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Active Aspirants</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">20k+</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Pre-vetted MCQs</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">24/7</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Simulated AI Tutor</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Syllabus Covered</span>
            </div>
          </div>

        </div>
      </section>

      {/* Pakistan Exam Suite Explorer */}
      <section id="exam-suites" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">Comprehensive Preparation Arena</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Unified Pakistan Exam Suite</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Prepistan is not just for CSS. We support all major testing frameworks, provincial commission boards, federal agency recruitments, and academic entry exams in Pakistan.
          </p>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-2xl mx-auto p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setActiveCategoryTab("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCategoryTab === "all" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"}`}
            >
              🌌 All Preparation Suites
            </button>
            <button
              onClick={() => setActiveCategoryTab("civil")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCategoryTab === "civil" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"}`}
            >
              🏛️ Civil & Public Services (CSS, PMS, PSCs)
            </button>
            <button
              onClick={() => setActiveCategoryTab("recruitment")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCategoryTab === "recruitment" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"}`}
            >
              🕵️ Recruitment & Agencies (NTS, NAB, FIA)
            </button>
            <button
              onClick={() => setActiveCategoryTab("admissions")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCategoryTab === "admissions" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"}`}
            >
              🎓 Entry Admissions (MDCAT, USAT, LAT)
            </button>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examSuites
            .filter((suite) => activeCategoryTab === "all" || suite.category === activeCategoryTab)
            .map((suite, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/[0.02] transition-all group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100">
                      {suite.icon}
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono font-bold uppercase rounded">
                      {suite.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block mb-1">
                    {suite.tag}
                  </span>
                  <h3 className="text-base font-black text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {suite.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {suite.desc}
                  </p>

                  {/* Bullet Wrap of Specific Tests */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-slate-400 block mb-2">Specific Tests Covered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {suite.tests.map((test, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded border border-slate-150 dark:border-slate-800"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive Syllabus & Mocks
                  </span>
                  <button
                    onClick={() => onStartPrep("signup")}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Prepare Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Interactive MPT Trial Section */}
      <section id="interactive-quiz" className="py-16 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">Try Before Registering</span>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white mt-1">Live MCQ Practice Sandbox</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
              Test your general knowledge of Pakistan constitutional affairs right now. Click any option to see immediate feedback.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-purple-150 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-bold uppercase rounded">
                Constitutional History
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">• CSS/PMS Compulsory Subject</span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white mb-6 leading-relaxed">
              {sampleQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {sampleQuestion.options.map((opt, idx) => {
                let btnStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50";
                
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-500/10 dark:bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400";
                  } else {
                    btnStyle = "opacity-50 border-slate-200 dark:border-slate-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full p-3 text-left text-xs rounded-xl border transition-all ${btnStyle} flex items-center justify-between`}
                    disabled={isAnswered}
                  >
                    <span>{opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <span className="text-[9px] font-bold text-emerald-500 font-mono uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">Correct</span>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-300">
                <div className="flex gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Consultant Explanation:</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {sampleQuestion.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">🎉 Welcome Gift Mock Reward:</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">You earned +50 Trial Mock XP!</span>
                  </div>
                  <button
                    onClick={() => onStartPrep("signup")}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition-all shadow-md shadow-emerald-500/10 hover:scale-105"
                  >
                    Claim My XP & Open Full Arena
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">Interactive Platform Modules</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Engineered Specifically For Officers</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Every feature is calibrated to Pakistan Civil Service exam syllabus guides. We replace bulky physical study sheets with dynamic modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 - AI Tutor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
              Simulated AI Tutor Gating
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-500/10 px-1.5 py-0.5 rounded">Smart</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Need feedback on a Foreign Policy outline or constitutional analysis? Consult the 24/7 AI tutor, generate outlines, or check preloaded essay topics.
            </p>
          </div>

          {/* Card 2 - Syllabus Matrix */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2">Syllabus & Course Log Tracker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Track your preparation percent for compulsory and optional subjects. Mark sections as completed, save bookmark sheets, and view recommended reading materials.
            </p>
          </div>

          {/* Card 3 - Quiz Leaderboard */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2">Daily MPT mock challenges</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Fast-loading current affairs, science, and history MCQ modules with immediate ranking. Build daily study streaks, score coins, and climb the public leaderboard.
            </p>
          </div>

          {/* Card 4 - News Columns CMS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 font-bold">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2">Officer's Corner Columns</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Read verified, original study logs, CSS analysis dossiers, and foreign policy summaries published directly by competitive mentors and qualified CSP guides.
            </p>
          </div>

          {/* Card 5 - Bookmark Vault */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2">Encrypted Saved Vault</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Bookmark crucial, complex MCQs or notes with offline client-side support. Retrieve saved topics instantly during last-minute exam revisions.
            </p>
          </div>

          {/* Card 6 - Offline-First Sync */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-2">Premium Diagnostic Mocks</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Unlock simulated full-length exam modes with timer restrictions. Access standard evaluations and review score curves.
            </p>
          </div>

        </div>
      </section>

      {/* Compulsory Syllabus Hub Preview */}
      <section id="compulsory" className="py-20 bg-slate-100/50 dark:bg-slate-900/35 border-y border-slate-200/80 dark:border-slate-800/80 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">Syllabus Matrix Overview</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Core Syllabus & Subject Trackers</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              We preload comprehensive syllabi and study progress matrices. Whether you are tracking CSS compulsory units, provincial general knowledge nodes, NTS quantitative criteria, or entry exam modules—you can start logging progress instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {compulsorySubjects.map((sub, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-mono font-bold uppercase rounded">
                      {sub.tag}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {sub.marks}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {sub.desc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {sub.status}
                  </span>
                  <button
                    onClick={() => onStartPrep("signup")}
                    className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Lectures</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Optional preview */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-4">Also supporting 30+ Optional Electives:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {optionalSubjectsPreview.map((opt, idx) => (
                <span
                  key={idx}
                  onClick={() => onStartPrep("signup")}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-bold rounded-lg cursor-pointer transition-all"
                >
                  {opt.name} ({opt.marks})
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Developer bypass section */}
      <section className="py-8 bg-amber-500/5 border-y border-amber-500/10 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] uppercase font-mono tracking-wider text-amber-600 dark:text-amber-400 font-bold block mb-2">
            🔑 Developer Simulation & Testing bypass
          </span>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 leading-normal">
            For evaluation, you can bypass auth instantly to view the fully functional, data-filled study dashboard in different user roles:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => onDemoBypass("Super Admin")}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-bold transition-all border border-amber-500/15"
            >
              Super Admin Control
            </button>
            <button
              onClick={() => onDemoBypass("Student")}
              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold transition-all border border-emerald-500/15"
            >
              Standard Student
            </button>
            <button
              onClick={() => onDemoBypass("Premium Student")}
              className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg text-[10px] font-bold transition-all border border-purple-500/15"
            >
              Premium Student
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">Successful Aspirants</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Aspirants Who Made It</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Real stories from CSS, PMS, MDCAT, and FIA/NTS candidates who leveraged gamified study trackers to secure stellar results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "The GSA notes tracker on Prepistan kept my revision schedules extremely tidy. I went from struggling with general science syllabus depth to securing a stellar 76 score. The simulated current affairs modules are incredibly high quality."
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                ST
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Sana Tariq</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Allocated Assistant Commissioner (48th STP)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "The leaderboard and streak mechanisms kept me studying every single night after my day job. I answered over 1,500 questions in Islamiyat and current affairs. Secure local persistence is outstandingly executed."
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                BA
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Bilal Ahmed</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">CSS Aspirant 2026, Lahore</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "Prepistan's high-yield MDCAT Biology and Chemistry vaults helped me refine my concepts. The custom simulated feedback and timed sandbox tests are a game changer for university entries."
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 flex items-center justify-center font-bold text-xs">
                ZM
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Zainab Malik</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">MDCAT Candidate (scored 188/200)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call To Action Footer Panel */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-slate-950 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
            Ready to Conquer Your Competitive Exam?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Create your free study account on Pakistan's premier digital civil service, recruitment screening, and admission entrance prep arena today.
          </p>
          <button
            onClick={() => onStartPrep("signup")}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Launch Free Competitive Arena Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-50 dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-900 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Prepistan Arena</span>
            <span>• Pakistan's Premier Multi-Exam & Competitive Testing Platform</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Prepistan. Built to aid competitive education across Pakistan.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
