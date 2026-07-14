 ort { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Flame, 
  CheckCircle, 
  XCircle, 
  BarChart2, 
  TrendingUp, 
  Calendar, 
  Bookmark, 
  Clock, 
  Award, 
  ArrowRight,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Zap,
  Target,
  Check,
  X
} from "lucide-react";
import { MCQ, QuizAttempt } from "../types";

interface DashboardHomeProps {
  attempts: QuizAttempt[];
  bookmarks: string[];
  mcqs: MCQ[];
  xp: number;
  streak: number;
  longestStreak: number;
  coins: number;
  language: "EN" | "UR";
  onNavigate: (tab: string, arg?: any) => void;
  onOpenPricing: () => void;
}

export default function DashboardHome({
  attempts,
  bookmarks,
  mcqs,
  xp,
  streak,
  longestStreak,
  coins,
  language,
  onNavigate,
  onOpenPricing
}: DashboardHomeProps) {
  
  // Calculations
  const totalSolved = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const totalCorrect = attempts.reduce((acc, curr) => acc + curr.correctAnswers, 0);
  const totalWrong = attempts.reduce((acc, curr) => acc + curr.wrongAnswers, 0);
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
  const totalTimeSpentMinutes = Math.round(attempts.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0) / 60);

  // Subject wise performance calculations
  const subjectStats: { [key: string]: { correct: number; total: number } } = {};
  attempts.forEach(attempt => {
    const subj = attempt.subject || "General";
    if (!subjectStats[subj]) {
      subjectStats[subj] = { correct: 0, total: 0 };
    }
    subjectStats[subj].correct += attempt.correctAnswers;
    subjectStats[subj].total += attempt.totalQuestions;
  });

  const subjectStrength = Object.keys(subjectStats).map(subject => {
    const stats = subjectStats[subject];
    const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return { subject, accuracy: acc, total: stats.total };
  });

  // Sort subjects by strength
  const sortedStrength = [...subjectStrength].sort((a, b) => b.accuracy - a.accuracy);
  const strongSubjects = sortedStrength.filter(s => s.accuracy >= 70);
  const weakSubjects = sortedStrength.filter(s => s.accuracy < 70);

  // Fallback if no attempts yet
  const defaultStrong = [
    { subject: "Islamic Studies", accuracy: 85, total: 20 },
    { subject: "Geography", accuracy: 78, total: 15 }
  ];
  const defaultWeak = [
    { subject: "Current Affairs", accuracy: 48, total: 25 },
    { subject: "Mathematics", accuracy: 52, total: 12 }
  ];

  const actualStrong = strongSubjects.length > 0 ? strongSubjects : defaultStrong;
  const actualWeak = weakSubjects.length > 0 ? weakSubjects : defaultWeak;

  // Recharts Chart Data (Recent 5 attempts progression)
  const chartData = attempts.slice(-6).map((attempt, index) => ({
    name: `Test ${index + 1}`,
    score: Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100),
    questions: attempt.totalQuestions,
    correct: attempt.correctAnswers
  }));

  // Fallback graph data
  const fallbackChartData = [
    { name: "Test 1", score: 60, questions: 10, correct: 6 },
    { name: "Test 2", score: 70, questions: 10, correct: 7 },
    { name: "Test 3", score: 55, questions: 10, correct: 5 },
    { name: "Test 4", score: 80, questions: 10, correct: 8 },
    { name: "Test 5", score: 75, questions: 10, correct: 7 },
    { name: "Test 6", score: 90, questions: 10, correct: 9 }
  ];

  const actualChartData = chartData.length >= 3 ? chartData : fallbackChartData;

  // Goal settings
  const dailyGoalXp = 100;
  const currentXpToday = Math.min(xp % 150 + 20, dailyGoalXp); // simulated daily accumulation
  const goalProgressPercent = Math.min(Math.round((currentXpToday / dailyGoalXp) * 100), 100);

  // Calendar study heat map (Last 7 days)
  // Calculate real week dates starting from Monday
  const getWeekDates = () => {
    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      const isToday = dateMidnight.getTime() === todayMidnight.getTime();
      const isFuture = dateMidnight.getTime() > todayMidnight.getTime();
      const isPast = dateMidnight.getTime() < todayMidnight.getTime();
      
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return {
        day: dayNames[i],
        dateNum: date.getDate(),
        fullDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        isToday,
        isFuture,
        isPast
      };
    });
  };

  const weekDates = getWeekDates();
  const studyDaysConfig = [
    { active: true, mins: 45 },  // Mon
    { active: true, mins: 60 },  // Tue
    { active: false, mins: 0 },  // Wed
    { active: true, mins: 30 },  // Thu
    { active: true, mins: 75 },  // Fri
    { active: false, mins: 0 },  // Sat
    { active: true, mins: 25 }   // Sun
  ];

  const studyDays = weekDates.map((item, idx) => {
    const config = studyDaysConfig[idx];
    let active = config.active;
    let mins = config.mins;

    if (item.isToday) {
      active = true;
      mins = Math.max(15, Math.floor(currentXpToday / 2));
    } else if (item.isFuture) {
      active = false;
      mins = 0;
    }

    return {
      ...item,
      active,
      mins
    };
  });

  // Badges Earned List
  const badges = [
    { id: "b1", title: "Pakistan Pioneer", desc: "Correctly answered a Pakistan Affairs MCQ", icon: "🇵🇰", unlocked: totalSolved > 0 },
    { id: "b2", title: "Streak Master", desc: "Maintained a 5-day quiz streak", icon: "🔥", unlocked: streak >= 5 },
    { id: "b3", title: "Elite Sniper", desc: "Achieved 90%+ in any timed mock test", icon: "🎯", unlocked: totalCorrect >= 10 },
    { id: "b4", title: "AI Companion", desc: "Consulted the AI Tutor for assistance", icon: "🤖", unlocked: true },
    { id: "b5", title: "Coins Collector", desc: "Accumulated 200+ gold coins", icon: "🪙", unlocked: coins >= 200 }
  ];

  // Dynamic language translation
  const t = {
    EN: {
      solved: "Total Solved",
      correct: "Correct Answers",
      wrong: "Wrong Answers",
      accuracy: "Overall Accuracy",
      streak: "Current Streak",
      bestStreak: "Longest Streak",
      time: "Study Time",
      bookmarked: "Bookmarked",
      goals: "Daily XP Goal",
      weak: "Weak Subjects (Needs Work)",
      strong: "Strong Subjects (Great Job)",
      recent: "Recent Tests History",
      analytics: "Accuracy Progression %",
      badges: "Acheivement Badges",
      calendar: "Weekly Activity Calendar",
      startQuiz: "Launch Practice Test",
      tryAi: "Chat with AI Tutor"
    },
    UR: {
      solved: "کل حل شدہ",
      correct: "درست جوابات",
      wrong: "غلط جوابات",
      accuracy: "مجموعی درستگی",
      streak: "موجودہ تسلسل",
      bestStreak: "طویل ترین تسلسل",
      time: "مطالعہ کا وقت",
      bookmarked: "محفوظ کردہ",
      goals: "روزانہ کا ہدف",
      weak: "کمزور مضامین (محنت درکار ہے)",
      strong: "مضبوط مضامین (بہترین کارکردگی)",
      recent: "حالیہ ٹیسٹوں کی تاریخ",
      analytics: "درستگی کی ترقی %",
      badges: "کامیابی کے بیجز",
      calendar: "ہفتہ وار سرگرمی",
      startQuiz: "پریکٹس ٹیسٹ شروع کریں",
      tryAi: "اے آئی ٹیوٹر سے بات کریں"
    }
  }[language];

  return (
    <div className="space-y-6" id="dashboard-home">
      
      {/* Welcome Hero Banner (Notion Styled) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-10 -top-20 w-48 h-48 bg-emerald-600/25 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl font-sans">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            {language === "EN" ? "Preparation Room" : "تیاری کا کمرہ"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3">
            {language === "EN" ? "Welcome back, Murtaza!" : "خوش آمدید، مرتضیٰ!"}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-2">
            {language === "EN" 
              ? "You are currently ranked #14 on the CSS Prepistan Leaderboard. Complete today's goal to climb to the top!"
              : "آپ اس وقت سی ایس ایس پریپستان لیڈر بورڈ پر 14ویں نمبر پر ہیں۔ آج کا ہدف مکمل کریں!"}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("exams")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-1"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{t.startQuiz}</span>
            </button>
            <button
              onClick={() => onNavigate("ai-portal")}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-sm border border-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-1.5"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{t.tryAi}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Main Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        
        {/* Total Solved */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/20 flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold uppercase tracking-wider">{t.solved}</span>
            <span className="text-xl sm:text-2xl font-black font-display text-slate-800 dark:text-white block mt-0.5">{totalSolved || 12}</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/20 flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold uppercase tracking-wider">{t.accuracy}</span>
            <span className="text-xl sm:text-2xl font-black font-display text-slate-800 dark:text-white block mt-0.5">{accuracy || 75}%</span>
          </div>
        </div>

        {/* Streak */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/20 flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold uppercase tracking-wider">{t.streak}</span>
            <span className="text-xl sm:text-2xl font-black font-display text-slate-800 dark:text-white block mt-0.5">
              {streak} {language === "EN" ? "Days" : "دن"}
            </span>
          </div>
        </div>

        {/* Study Time */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/20 flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-bold uppercase tracking-wider">{t.time}</span>
            <span className="text-xl sm:text-2xl font-black font-display text-slate-800 dark:text-white block mt-0.5">
              {totalTimeSpentMinutes || 120} {language === "EN" ? "Mins" : "منٹ"}
            </span>
          </div>
        </div>

      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Graphs & Performance Analytics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Performance Graph */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center space-x-1.5 font-display">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <span>{t.analytics}</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">Past Tests Summary</span>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={actualChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    formatter={(value: any) => [`${value}% Accuracy`]}
                  />
                  <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            
            {/* Strong Subjects */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 fill-emerald-100 dark:fill-emerald-950/50" />
                <span>{t.strong}</span>
              </h3>
              <div className="space-y-3.5">
                {actualStrong.map((s, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{s.subject}</span>
                    <div className="flex items-center space-x-2.5 w-1/2">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${s.accuracy}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-white min-w-[32px] text-right">{s.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Subjects */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center space-x-1.5">
                <XCircle className="w-4 h-4 fill-rose-100 dark:fill-rose-950/50" />
                <span>{t.weak}</span>
              </h3>
              <div className="space-y-3.5">
                {actualWeak.map((s, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{s.subject}</span>
                    <div className="flex items-center space-x-2.5 w-1/2">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${s.accuracy}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-white min-w-[32px] text-right">{s.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recent Tests Table */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 font-display">
              {t.recent}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                    <th className="py-2 font-semibold">Date</th>
                    <th className="py-2 font-semibold">Subject & Category</th>
                    <th className="py-2 font-semibold">Score</th>
                    <th className="py-2 font-semibold">Mode</th>
                    <th className="py-2 font-semibold">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {attempts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No quiz attempts recorded yet. Launch a practice test!
                      </td>
                    </tr>
                  ) : (
                    attempts.map(attempt => {
                      const pct = Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100);
                      return (
                        <tr key={attempt.id} className="text-gray-700 dark:text-gray-300">
                          <td className="py-3 font-mono">{attempt.date}</td>
                          <td className="py-3 font-medium">
                            {attempt.subject} <span className="text-gray-400">({attempt.category})</span>
                          </td>
                          <td className="py-3 font-bold">{attempt.correctAnswers}/{attempt.totalQuestions}</td>
                          <td className="py-3 font-medium">{attempt.quizMode}</td>
                          <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">{pct}%</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Gamification, Daily Goal, Achievements, Calendars */}
        <div className="space-y-6">
          
          {/* Daily XP Progress Circle */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 font-display">
              {t.goals}
            </h3>
            
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              {/* Simple SVGCircle for progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-emerald-500 transition-all duration-500"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * goalProgressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black font-display text-slate-800 dark:text-white">{currentXpToday}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">/ {dailyGoalXp} XP</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 font-semibold">
              {goalProgressPercent >= 100 
                ? "🎉 Fantastic! Daily Goal achieved!" 
                : `${goalProgressPercent}% of today's goal completed.`}
            </p>
          </div>

          {/* Weekly Study Activity Calendar */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center space-x-1.5 font-display">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{t.calendar}</span>
            </h3>
            
            <div className="grid grid-cols-7 gap-2">
              {studyDays.map((d, index) => {
                let cardClass = "";
                if (d.isToday) {
                  cardClass = "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 ring-2 ring-emerald-500/20 dark:ring-emerald-400/20 scale-105 shadow-sm";
                } else if (d.isFuture) {
                  cardClass = "bg-slate-50 dark:bg-slate-900/40 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800 border-dashed";
                } else {
                  // isPast
                  cardClass = d.active 
                    ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30" 
                    : "bg-rose-500/10 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30";
                }

                return (
                  <div key={index} className="text-center">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1">
                      {d.day}
                      {d.isToday && <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-extrabold ml-0.5">★</span>}
                    </span>
                    <div 
                      title={`${d.isToday ? "Today: " : ""}${d.isFuture ? "Upcoming: " : ""}${d.mins > 0 ? `${d.mins} minutes studied` : "No study activity recorded"}`}
                      className={`w-full aspect-square rounded-xl flex flex-col items-center justify-between p-1.5 transition-all relative border ${cardClass}`}
                    >
                      {/* The Date Number */}
                      <span className="text-[10px] sm:text-xs font-black tracking-tight leading-none self-start opacity-70">
                        {d.dateNum}
                      </span>

                      {/* Check, X, or dash indicator icon on the date */}
                      <div className="flex items-center justify-center mb-1">
                        {d.isFuture ? (
                          <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono">-</span>
                        ) : d.active ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                        ) : (
                          <X className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[3]" />
                        )}
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono block mt-1">
                      {d.isFuture ? "-" : d.mins > 0 ? `${d.mins}m` : "0m"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Achievements Block */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center space-x-1.5 font-display">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.badges}</span>
            </h3>
            <div className="space-y-4">
              {badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`flex items-center space-x-3.5 transition-opacity ${
                    badge.unlocked ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-xl shadow-inner border border-slate-100 dark:border-slate-800">
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">
                        {badge.title}
                      </span>
                      {badge.unlocked ? (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-100 text-slate-400 font-medium px-1.5 py-0.5 rounded">
                          Locked
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate block mt-0.5">
                      {badge.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
