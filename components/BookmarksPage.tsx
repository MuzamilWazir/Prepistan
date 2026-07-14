import { Bookmark, Trash2, HelpCircle, ArrowRight, Play, ExternalLink } from "lucide-react";
import { MCQ } from "../types";

interface BookmarksPageProps {
  bookmarkedIds: string[];
  mcqs: MCQ[];
  onToggleBookmark: (id: string) => void;
  onNavigateToQuiz: (category: string, subject: string, customMcqs: MCQ[]) => void;
  language: "EN" | "UR";
}

export default function BookmarksPage({
  bookmarkedIds,
  mcqs,
  onToggleBookmark,
  onNavigateToQuiz,
  language
}: BookmarksPageProps) {
  const bookmarkedMcqs = mcqs.filter(q => bookmarkedIds.includes(q.id));

  return (
    <div className="space-y-6" id="bookmarks-room">
      
      {/* Page Header banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
            <Bookmark className="w-5.5 h-5.5 text-emerald-600 fill-emerald-600/15" />
            <span>Saved Questions Vault</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review your bookmarked MCQs, read detailed AI explanations, or compose custom revision sessions.
          </p>
        </div>

        {bookmarkedMcqs.length > 0 && (
          <button
            onClick={() => onNavigateToQuiz("Custom (Saved Vault)", "Saved Questions", bookmarkedMcqs)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Practice Saved ({bookmarkedMcqs.length})</span>
          </button>
        )}
      </div>

      {/* Main List */}
      {bookmarkedMcqs.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Your Saved Vault is Empty</h2>
            <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1 leading-relaxed">
              Whenever you practice active tests or mock revisions, click the bookmark icon next to tough questions to save them here for offline review!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedMcqs.map((q, idx) => (
            <div 
              key={q.id}
              className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4 shadow-sm hover:shadow-md transition-all relative"
              id={`bookmark-${q.id}`}
            >
              
              {/* Header stamp */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-gray-100 px-2.5 py-0.5 rounded font-mono text-gray-400">
                  #{idx + 1} | Category: {q.category} | Subject: {q.subject}
                </span>

                {/* Remove bookmark */}
                <button
                  onClick={() => onToggleBookmark(q.id)}
                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-500 rounded-lg transition-all"
                  title="Remove from bookmarks"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Question */}
              <h3 className="text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-relaxed">
                {q.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {q.options.map((opt, i) => {
                  const prefix = ["A", "B", "C", "D"][i];
                  const isCorrect = i === q.correctOptionIndex;
                  return (
                    <div 
                      key={i}
                      className={`p-3.5 rounded-xl border flex items-center space-x-2.5 ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50/10 text-emerald-800 dark:text-emerald-400"
                          : "border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 text-gray-600"
                      }`}
                    >
                      <span className={`w-5.5 h-5.5 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrect ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                      }`}>
                        {prefix}
                      </span>
                      <span className="text-xs sm:text-sm">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation Note */}
              <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-emerald-200/20 text-xs sm:text-sm space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block uppercase tracking-wider text-[10px]">
                  Explanation Reference:
                </span>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs">
                  {q.explanation}
                </p>
                {q.referenceBook && (
                  <span className="block text-[9px] font-mono text-gray-400 mt-2">
                    📚 Source: {q.referenceBook}
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
