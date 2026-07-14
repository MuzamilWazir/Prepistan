import { useState } from "react";
import { 
  Trophy,
  Crown, 
  Award, 
  Flame, 
  Coins, 
  ArrowUp, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  Search,
  Zap,
  CheckCircle2
} from "lucide-react";
import { LeaderboardEntry } from "../types";

interface LeaderboardPageProps {
  userXp: number;
  userCoins: number;
  userStreak: number;
  language: "EN" | "UR";
}

export default function LeaderboardPage({
  userXp,
  userCoins,
  userStreak,
  language
}: LeaderboardPageProps) {
  const [filterPeriod, setFilterPeriod] = useState<"Daily" | "Weekly" | "Monthly" | "Overall">("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const mockLeaderboard: { [key: string]: LeaderboardEntry[] } = {
    Daily: [
      { rank: 1, userId: "u1", name: "Fatima Jamil", xp: 320, coins: 50, level: 12, badge: "⚡ Speed Demon" },
      { rank: 2, userId: "u2", name: "Zia-ur-Rehman", xp: 280, coins: 40, level: 8, badge: "🇵🇰 History King" },
      { rank: 3, userId: "u3", name: "Hamza Abbasi", xp: 240, coins: 30, level: 15, badge: "🧠 General Ability" },
      { rank: 4, userId: "u4", name: "Aisha Khan", xp: 210, coins: 25, level: 9, badge: "🎓 CSS Aspirant" },
      { rank: 5, userId: "u5", name: "Bilal Dar", xp: 190, coins: 20, level: 7, badge: "📖 PMS Champion" },
      { rank: 6, userId: "u6", name: "Sana Malik", xp: 170, coins: 15, level: 11, badge: "🌟 Rising Star" },
      { rank: 7, userId: "u7", name: "Usman Ghazi", xp: 150, coins: 10, level: 6, badge: "🛡️ Security Cadet" }
    ],
    Weekly: [
      { rank: 1, userId: "u1", name: "Ayesha Lodhi", xp: 1450, coins: 250, level: 14, badge: "🏆 CSS Achiever" },
      { rank: 2, userId: "u2", name: "Kamran Akmal", xp: 1320, coins: 200, level: 11, badge: "🛡️ Intelligence Officer" },
      { rank: 3, userId: "u3", name: "Sadia Imam", xp: 1210, coins: 180, level: 10, badge: "🌙 Islamic Scholar" },
      { rank: 4, userId: "u4", name: "Zubair Ahmad", xp: 1100, coins: 150, level: 8, badge: "⚡ Speed King" },
      { rank: 5, userId: "u5", name: "Rabia Basri", xp: 950, coins: 120, level: 7, badge: "✍️ English Whiz" },
      { rank: 6, userId: "u6", name: "Nabeel Qureshi", xp: 880, coins: 100, level: 9, badge: "📖 PMS Leader" },
      { rank: 7, userId: "u7", name: "Haris Sohail", xp: 750, coins: 80, level: 6, badge: "📚 GK Explorer" }
    ],
    Monthly: [
      { rank: 1, userId: "u1", name: "Prof. Tariq", xp: 5800, coins: 1100, level: 25, badge: "🦉 Grandmaster" },
      { rank: 2, userId: "u2", name: "Waqar Younis", xp: 5120, coins: 950, level: 21, badge: "🌟 Legend" },
      { rank: 3, userId: "u3", name: "Zainab Shah", xp: 4890, coins: 800, level: 19, badge: "🎓 CSS Conqueror" },
      { rank: 4, userId: "u4", name: "Mustafa Kamal", xp: 4200, coins: 700, level: 16, badge: "💡 General Ability" },
      { rank: 5, userId: "u5", name: "Bushra Bibi", xp: 3950, coins: 650, level: 15, badge: "🌙 Quranic Scholar" }
    ],
    Overall: [
      { rank: 1, userId: "u1", name: "Dr. Farooq", xp: 24500, coins: 4800, level: 50, badge: "👑 Prepistan Emperor" },
      { rank: 2, userId: "u2", name: "Zia Chaudhry", xp: 21800, coins: 4100, level: 44, badge: "🦉 CSS Legend" },
      { rank: 3, userId: "u3", name: "Aliya Riaz", xp: 19200, coins: 3600, level: 39, badge: "📖 PMS Master" }
    ]
  };

  const currentList = mockLeaderboard[filterPeriod] || [];

  const filteredList = currentList.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (entry.badge || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredList.slice(0, 3);
  const remainingList = filteredList.slice(3);

  return (
    <div className="space-y-6" id="leaderboard-page">
      
      {/* Intro section */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <Trophy className="w-12 h-12 text-amber-500 mx-auto fill-amber-500/10" />
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {language === "EN" ? "Pakistan Civil Service Arena" : "پاکستانی امتحانات کا میدان"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Rankings are updated hourly. Complete daily mock tests, maintain your streak, and earn coins to purchase premium notes.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Toggle tabs */}
        <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold">
          {["Daily", "Weekly", "Monthly", "Overall"].map(p => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p as any)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterPeriod === p
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Search filter input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search competitor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

      </div>

      {/* Visual Podium (Ranks 1, 2, 3) */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-8 items-end">
          
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 shadow">
                {topThree[1].name.slice(0, 2)}
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-400 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                #2
              </span>
            </div>
            <span className="font-bold text-xs text-gray-900 dark:text-white text-center block mt-3 truncate w-24">
              {topThree[1].name}
            </span>
            <span className="text-[10px] text-gray-400 font-bold block">{topThree[1].xp} XP</span>
            <div className="bg-slate-100 dark:bg-slate-900/50 w-full h-20 rounded-t-xl mt-3 flex items-center justify-center border-t border-slate-200 dark:border-slate-800">
              <span className="text-xl font-bold text-slate-400">2nd</span>
            </div>
          </div>

          {/* Rank 1 (Gold Crown) */}
          <div className="flex flex-col items-center">
            <div className="relative scale-110">
              <Crown className="w-6 h-6 text-amber-500 fill-amber-500 absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce" />
              <div className="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-950 border-4 border-amber-500 flex items-center justify-center font-black text-amber-700 dark:text-amber-400 shadow-md">
                {topThree[0].name.slice(0, 2)}
              </div>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                #1
              </span>
            </div>
            <span className="font-bold text-xs text-gray-900 dark:text-white text-center block mt-5 truncate w-24">
              {topThree[0].name}
            </span>
            <span className="text-[10px] text-amber-600 font-black block">{topThree[0].xp} XP</span>
            <div className="bg-amber-100 dark:bg-amber-950/40 w-full h-28 rounded-t-xl mt-3 flex items-center justify-center border-t border-amber-300/40">
              <span className="text-2xl font-black text-amber-600">1st</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-amber-50/20 dark:bg-orange-950/20 border-2 border-orange-500 flex items-center justify-center font-bold text-orange-700 dark:text-orange-400 shadow">
                {topThree[2].name.slice(0, 2)}
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                #3
              </span>
            </div>
            <span className="font-bold text-xs text-gray-900 dark:text-white text-center block mt-3 truncate w-24">
              {topThree[2].name}
            </span>
            <span className="text-[10px] text-gray-400 font-bold block">{topThree[2].xp} XP</span>
            <div className="bg-orange-100/30 dark:bg-orange-950/10 w-full h-16 rounded-t-xl mt-3 flex items-center justify-center border-t border-orange-200/20">
              <span className="text-xl font-bold text-orange-600">3rd</span>
            </div>
          </div>

        </div>
      )}

      {/* Scrolled list for lower ranks */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
        
        {remainingList.map((entry) => (
          <div 
            key={entry.userId}
            className="px-5 py-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition-colors"
          >
            <div className="flex items-center space-x-4">
              
              {/* Rank Badge */}
              <span className="w-6 text-sm font-mono font-bold text-gray-400 text-center">
                #{entry.rank}
              </span>

              {/* Avatar circle */}
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold text-xs text-gray-700 dark:text-gray-300 shadow-inner">
                {entry.name.slice(0, 2)}
              </div>

              <div>
                <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
                  <span>{entry.name}</span>
                  <span className="text-[9px] bg-slate-50 dark:bg-slate-900 font-semibold px-1.5 py-0.5 text-gray-400 border border-gray-100 rounded">
                    Lvl {entry.level}
                  </span>
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {entry.badge}
                </span>
              </div>

            </div>

            {/* Performance points */}
            <div className="text-right">
              <span className="text-xs font-black text-gray-900 dark:text-white block">
                {entry.xp} XP
              </span>
              <span className="text-[9px] font-bold text-amber-500 font-mono block mt-0.5">
                +{entry.coins} Gold Coins
              </span>
            </div>

          </div>
        ))}

      </div>

      {/* Personal Rank Footer Block */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl border border-white/20 shadow-inner">
            ⚡
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Your Current Arena Position</span>
            <div className="text-base font-black flex items-center space-x-1.5">
              <span>Murtaza Syed</span>
              <span className="text-xs bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full">
                Rank #14
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <div>
            <span className="block text-[10px] text-emerald-100">Your XP</span>
            <span className="text-sm font-bold text-white">{userXp} XP</span>
          </div>
          <div>
            <span className="block text-[10px] text-emerald-100">Streak</span>
            <span className="text-sm font-bold text-white">{userStreak}d</span>
          </div>
          <div>
            <span className="block text-[10px] text-emerald-100">Level</span>
            <span className="text-sm font-bold text-white">Lvl 6</span>
          </div>
        </div>
      </div>

    </div>
  );
}
