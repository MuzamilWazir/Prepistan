/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  HelpCircle, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  AlertTriangle, 
  Share2, 
  Sparkles, 
  BookOpenCheck,
  Send,
  Flag,
  RotateCcw,
  Volume2,
  FileDown,
  Highlighter,
  MessageSquare
} from "lucide-react";
import { MCQ, QuizMode, QuizAttempt, QuestionDiscussion, AITutorApiConfig } from "../types";

interface QuizInterfaceProps {
  category: string;
  subject: string;
  mode: QuizMode;
  questions: MCQ[];
  onFinishQuiz: (attempt: QuizAttempt, exitImmediately?: boolean) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onPostDiscussion: (questionId: string, comment: string) => void;
  discussions: QuestionDiscussion[];
  language: "EN" | "UR";
  isPremium: boolean;
  onOpenPricing: () => void;
  aiConfig?: AITutorApiConfig;
}

export default function QuizInterface({
  category,
  subject,
  mode,
  questions,
  onFinishQuiz,
  bookmarks,
  onToggleBookmark,
  onPostDiscussion,
  discussions,
  language,
  isPremium,
  onOpenPricing,
  aiConfig
}: QuizInterfaceProps) {
  
  // Quiz states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isAnswered, setIsAnswered] = useState<{ [key: number]: boolean }>({});
  const [timer, setTimer] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [reported, setReported] = useState(false);
  const [discussComment, setDiscussComment] = useState("");
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  
  // AI Explainer State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  // Per-question AI and filter states for the final review sheet
  const [aiExplanationsMap, setAiExplanationsMap] = useState<{ [key: string]: string }>({});
  const [aiLoadingMap, setAiLoadingMap] = useState<{ [key: string]: boolean }>({});
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "unanswered">("all");

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  // Sound effects simulation
  const playSound = (type: "correct" | "wrong") => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.connect(gain);
      gain.connect(context.destination);
      if (type === "correct") {
        osc.frequency.setValueAtTime(587.33, context.currentTime); // D5
        osc.frequency.setValueAtTime(880, context.currentTime + 0.1);  // A5
        gain.gain.setValueAtTime(0.1, context.currentTime);
        osc.start();
        osc.stop(context.currentTime + 0.25);
      } else {
        osc.frequency.setValueAtTime(220, context.currentTime); // A3
        osc.frequency.setValueAtTime(165, context.currentTime + 0.15); // E3
        gain.gain.setValueAtTime(0.15, context.currentTime);
        osc.start();
        osc.stop(context.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext blocked
    }
  };

  // Timer Initialization
  useEffect(() => {
    if (quizFinished) return;
    
    // Determine timer based on mode
    let initialTime = 60 * totalQuestions; // 1 minute per question default
    if (mode === "Timed Test") {
      initialTime = questions.reduce((sum, q) => sum + (q.timeLimitSeconds || 45), 0);
    }
    setTimer(initialTime);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, questions, quizFinished]);

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
        <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">No questions available</h2>
        <p className="text-gray-500 text-sm mt-1">Please select another exam category or subject.</p>
      </div>
    );
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (quizFinished) return;
    
    // If practice mode, we allow submitting only once per question to see feedback
    if (mode === "Practice Mode") {
      if (isAnswered[currentIndex]) return;
      setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
      setIsAnswered({ ...isAnswered, [currentIndex]: true });
      setHintVisible(false);
      setAiExplanation(null);

      // Play sound simulation
      if (optionIndex === currentQuestion.correctOptionIndex) {
        playSound("correct");
      } else {
        playSound("wrong");
      }
    } else {
      // In timed/mock tests, we allow changing answers before final submission
      setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
    }
  };

  const handleFinishQuiz = (exitImmediately = false) => {
    const shouldExit = exitImmediately === true;
    
    let correctCount = 0;
    let wrongCount = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
      const selected = selectedAnswers[i];
      if (selected !== undefined) {
        if (selected === questions[i].correctOptionIndex) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } else {
        wrongCount++; // unanswered counted as wrong in scores
      }
    }

    const elapsedSeconds = (mode === "Timed Test" ? questions.reduce((sum, q) => sum + (q.timeLimitSeconds || 45), 0) : 60 * totalQuestions) - timer;

    const attempt: QuizAttempt = {
      id: "attempt-" + Date.now(),
      quizMode: mode,
      category,
      subject: currentQuestion.subject,
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      timeSpentSeconds: Math.max(elapsedSeconds, 15),
      date: new Date().toISOString().split("T")[0]
    };

    if (shouldExit) {
      onFinishQuiz(attempt, true);
    } else {
      setQuizFinished(true);
      onFinishQuiz(attempt, false);
    }
  };

  // Call Express API for Gemini AI Explanation Generator
  const handleFetchAiExplanation = async () => {
    if (!isPremium) {
      onOpenPricing();
      return;
    }
    setAiLoading(true);
    setAiExplanation(null);
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze this competitive exam question for Pakistani civil service preparation. Break down why the correct option is correct and why other options are incorrect. Be extremely educational and helpful.
          
          Question: ${currentQuestion.question}
          Options:
          A) ${currentQuestion.options[0]}
          B) ${currentQuestion.options[1]}
          C) ${currentQuestion.options[2]}
          D) ${currentQuestion.options[3]}
          
          Correct Option Index (0-based): ${currentQuestion.correctOptionIndex}
          Syllabus Category: ${category}
          Subject: ${currentQuestion.subject}`,
          config: aiConfig
        })
      });
      const data = await response.json();
      if (data.text) {
        setAiExplanation(data.text);
      } else {
        setAiExplanation("AI Tutor is currently processing other requests. Please try again in a moment.");
      }
    } catch (e) {
      setAiExplanation("Error connecting to Gemini API. Please make sure GEMINI_API_KEY is configured in Secrets.");
    } finally {
      setAiLoading(false);
    }
  };

  // Call Express API for Gemini AI Explanation on any reviewed question
  const handleFetchReviewAiExplanation = async (question: MCQ) => {
    if (!isPremium) {
      onOpenPricing();
      return;
    }
    setAiLoadingMap(prev => ({ ...prev, [question.id]: true }));
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze this competitive exam question for Pakistani civil service preparation. Break down why the correct option is correct and why other options are incorrect. Be extremely educational and helpful.
          
          Question: ${question.question}
          Options:
          A) ${question.options[0]}
          B) ${question.options[1]}
          C) ${question.options[2]}
          D) ${question.options[3]}
          
          Correct Option Index (0-based): ${question.correctOptionIndex}
          Syllabus Category: ${category}
          Subject: ${question.subject}`,
          config: aiConfig
        })
      });
      const data = await response.json();
      if (data.text) {
        setAiExplanationsMap(prev => ({ ...prev, [question.id]: data.text }));
      } else {
        setAiExplanationsMap(prev => ({ ...prev, [question.id]: "AI Tutor is currently processing other requests. Please try again." }));
      }
    } catch (e) {
      setAiExplanationsMap(prev => ({ ...prev, [question.id]: "Error connecting to Gemini API. Please make sure GEMINI_API_KEY is configured in Secrets." }));
    } finally {
      setAiLoadingMap(prev => ({ ...prev, [question.id]: false }));
    }
  };

  // Filter discussions for this specific question
  const questionDiscussions = discussions.filter(d => d.questionId === currentQuestion.id);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Helper to highlight terms inside the question text
  const renderHighlightedQuestion = (text: string) => {
    if (!highlightEnabled) return text;
    // Highlight years, locations, and proper nouns in the competitive questions
    const regex = /(\b(19\d\d|18\d\d|20\d\d|Lahore|Pakistan|Simla|Aga Khan|Quran|Badr|Cave of Hira|Prime Minister|Wahi|Ghazawat|CPEC)\b)/gi;
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) 
        ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/60 text-gray-900 dark:text-white px-1.5 py-0.5 rounded-md font-semibold">{part}</mark> 
        : part
    );
  };

  return (
    <div className="space-y-6" id="quiz-interface">
      
      {!quizFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Progress navigation sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 h-fit space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Exam Board</span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                {category}
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentQuestion.subject}</div>
              <span className="text-[11px] text-gray-400 block mt-0.5">Quiz Mode: {mode}</span>
            </div>

            {/* Quick jump bento block */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Questions List ({totalQuestions})
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((_, i) => {
                  const isCurrent = i === currentIndex;
                  const isDone = selectedAnswers[i] !== undefined;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setHintVisible(false);
                        setAiExplanation(null);
                      }}
                      className={`h-8 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                        isCurrent 
                          ? "bg-emerald-600 text-white ring-2 ring-emerald-500/30" 
                          : isDone 
                            ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50" 
                            : "bg-gray-50 dark:bg-gray-900 text-gray-500 hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Negative marking disclaimer */}
            {mode === "Timed Test" && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-950/40 text-[10px] text-rose-800 dark:text-rose-400 leading-relaxed flex items-start space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Negative Marking:</strong> Each incorrect answer deducts <strong>-0.25 marks</strong>. Manage your time and select carefully.
                </span>
              </div>
            )}

          </div>

          {/* Center Column: Question stage (Notion styled card) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Status bar */}
            <div className="bg-white dark:bg-gray-800 px-5 py-3.5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <div className="w-24 sm:w-36 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }} />
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                
                {/* Timer */}
                <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <Clock className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>{formatTime(timer)}</span>
                </div>

                {/* Highlighter Aid */}
                <button
                  onClick={() => setHighlightEnabled(!highlightEnabled)}
                  className={`p-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1 transition-all ${
                    highlightEnabled 
                      ? "bg-yellow-100 border-yellow-300 text-yellow-800" 
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-800"
                  }`}
                  title="Toggle highlight keywords"
                >
                  <Highlighter className="w-4 h-4 text-yellow-500" />
                  <span className="hidden sm:inline">Highlight Study Terms</span>
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => onToggleBookmark(currentQuestion.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    bookmarks.includes(currentQuestion.id)
                      ? "bg-amber-50 border-amber-200 text-amber-500 dark:bg-amber-950/20"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

              </div>
            </div>

            {/* The Main Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentQuestion.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40" :
                    currentQuestion.difficulty === "Medium" ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40" :
                    "bg-rose-50 text-rose-700 dark:bg-rose-950/40"
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Topic: {currentQuestion.topic || "General"}</span>
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                  {renderHighlightedQuestion(currentQuestion.question)}
                </h2>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const prefix = ["A", "B", "C", "D"][idx];
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  const showCorrect = isAnswered[currentIndex] && idx === currentQuestion.correctOptionIndex;
                  const showIncorrect = isAnswered[currentIndex] && isSelected && idx !== currentQuestion.correctOptionIndex;

                  let cardStyle = "border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50";
                  let badgeStyle = "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";

                  if (isSelected && mode !== "Practice Mode") {
                    cardStyle = "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300";
                    badgeStyle = "bg-emerald-600 text-white";
                  }

                  if (showCorrect) {
                    cardStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/20";
                    badgeStyle = "bg-emerald-500 text-white";
                  }

                  if (showIncorrect) {
                    cardStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/20";
                    badgeStyle = "bg-rose-500 text-white";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswered[currentIndex]}
                      className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-medium transition-all flex items-center justify-between ${cardStyle}`}
                    >
                      <div className="flex items-center space-x-3.5 pr-4">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}>
                          {prefix}
                        </span>
                        <span className="text-gray-900 dark:text-white leading-relaxed">{option}</span>
                      </div>

                      {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Hints, Discussion, AI Explanation, Next / Submit */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-700 pt-5">
                
                <div className="flex space-x-2">
                  {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                    <button
                      onClick={() => setHintVisible(!hintVisible)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-bold text-xs border border-amber-200/40 transition-colors"
                    >
                      💡 Need a Hint?
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setReported(true);
                      setTimeout(() => setReported(false), 3000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-bold text-xs border border-gray-200 dark:border-gray-800 transition-colors flex items-center space-x-1"
                  >
                    <Flag className="w-3.5 h-3.5 text-rose-400" />
                    <span>{reported ? "Reported Success" : "Report Error"}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                        setHintVisible(false);
                        setAiExplanation(null);
                      }
                    }}
                    disabled={currentIndex === 0}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentIndex(currentIndex + 1);
                        setHintVisible(false);
                        setAiExplanation(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gray-950 hover:bg-black text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-950 font-bold text-sm shadow-md transition-all flex items-center space-x-1"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFinishQuiz(false)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-1"
                    >
                      <BookOpenCheck className="w-4 h-4" />
                      <span>Submit Examination</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Render Hint if Visible */}
              {hintVisible && currentQuestion.hints && (
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/30 text-xs text-amber-800 dark:text-amber-300 leading-relaxed space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <span className="font-bold block">💡 Study Tip / Hint:</span>
                  <p>{currentQuestion.hints[0]}</p>
                </div>
              )}

              {/* Explanation section for Practice Mode */}
              {isAnswered[currentIndex] && mode === "Practice Mode" && (
                <div className="border-t border-gray-100 dark:border-gray-700 pt-5 space-y-4 animate-in fade-in duration-300">
                  
                  <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-emerald-200/30 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block uppercase tracking-wider">
                      Reference Explanation
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    {currentQuestion.referenceBook && (
                      <span className="block text-[10px] font-mono text-gray-400">
                        📚 Reference Source: {currentQuestion.referenceBook}
                      </span>
                    )}
                  </div>

                  {/* AI Tutor breakdown trigger */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleFetchAiExplanation}
                      disabled={aiLoading}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-all self-start disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                      <span>{aiLoading ? "AI Assistant reasoning..." : "Generate AI Detailed Breakdown (Gemini)"}</span>
                    </button>

                    {/* AI output result */}
                    {aiExplanation && (
                      <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed space-y-2 relative overflow-hidden font-sans">
                        <div className="absolute right-0 top-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
                        <span className="font-bold text-emerald-400 flex items-center space-x-1">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <span>Gemini AI Tutor Analysis:</span>
                        </span>
                        <div className="prose prose-sm prose-invert max-w-none text-gray-200 whitespace-pre-wrap">
                          {aiExplanation}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* In-App Discussion forum for this question */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-4">
              
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Discussion Board ({questionDiscussions.length})</span>
              </h3>

              {/* Comments list */}
              <div className="space-y-3.5 max-h-60 overflow-y-auto pr-2 divide-y divide-gray-100 dark:divide-gray-700">
                {questionDiscussions.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4">No discussions yet. Be the first to start the conversation!</p>
                ) : (
                  questionDiscussions.map((disc, idx) => (
                    <div key={disc.id} className={`pt-3 ${idx === 0 ? "border-none" : ""}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{disc.userName}</span>
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-900 text-gray-500 px-1.5 py-0.5 rounded uppercase font-semibold">
                          {disc.userRole}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-auto">{disc.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{disc.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Post comment box */}
              <div className="flex space-x-2 border-t border-gray-100 dark:border-gray-700 pt-3">
                <input
                  type="text"
                  placeholder="Post an academic note or question..."
                  value={discussComment}
                  onChange={(e) => setDiscussComment(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => {
                    if (discussComment.trim()) {
                      onPostDiscussion(currentQuestion.id, discussComment);
                      setDiscussComment("");
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center hover:bg-emerald-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* Quiz Finished View: Score card and analysis */
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl p-8 text-center space-y-6">
          
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <BookOpenCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Examination Completed</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Results & Grading Card</h2>
            <p className="text-xs text-gray-400">Board: {category} Competitive Exam | Subject: {currentQuestion.subject}</p>
          </div>

          {/* Score matrix */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Correct</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 block mt-1">
                {Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctOptionIndex).length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Wrong/Skipped</span>
              <span className="text-xl sm:text-2xl font-black text-rose-500 block mt-1">
                {totalQuestions - Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctOptionIndex).length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">XP Earned</span>
              <span className="text-xl sm:text-2xl font-black text-amber-500 block mt-1">
                +{Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctOptionIndex).length * 10} XP
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Overall Accuracy</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {Math.round((Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctOptionIndex).length / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full" 
                style={{ width: `${(Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === questions[Number(k)].correctOptionIndex).length / totalQuestions) * 100}%` }} 
              />
            </div>
          </div>

          {/* Detailed Question Review & Study Panel */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mt-6 space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>Review Answer Sheet</span>
                </h3>
                <p className="text-xs text-gray-400">Click on any question to study explanations and AI breakdowns.</p>
              </div>
              
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800">
                {(["all", "correct", "incorrect", "unanswered"] as const).map((filter) => {
                  const label = {
                    all: "All",
                    correct: "Correct",
                    incorrect: "Incorrect",
                    unanswered: "Unanswered"
                  }[filter];
                  
                  const isSelected = reviewFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setReviewFilter(filter)}
                      className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-bold transition-all ${
                        isSelected
                          ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Question Review List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 divide-y divide-gray-100 dark:divide-gray-700">
              {questions
                .map((q, idx) => {
                  const selectedIdx = selectedAnswers[idx];
                  const isCorrect = selectedIdx === q.correctOptionIndex;
                  const isSkipped = selectedIdx === undefined;
                  const status: "correct" | "incorrect" | "unanswered" = isSkipped 
                    ? "unanswered" 
                    : isCorrect 
                      ? "correct" 
                      : "incorrect";

                  return { q, idx, selectedIdx, isCorrect, isSkipped, status };
                })
                .filter(({ status }) => {
                  if (reviewFilter === "all") return true;
                  return reviewFilter === status;
                })
                .length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs">
                    No questions match the selected filter.
                  </div>
                ) : (
                  questions
                    .map((q, idx) => {
                      const selectedIdx = selectedAnswers[idx];
                      const isCorrect = selectedIdx === q.correctOptionIndex;
                      const isSkipped = selectedIdx === undefined;
                      const status: "correct" | "incorrect" | "unanswered" = isSkipped 
                        ? "unanswered" 
                        : isCorrect 
                          ? "correct" 
                          : "incorrect";

                      return { q, idx, selectedIdx, isCorrect, isSkipped, status };
                    })
                    .filter(({ status }) => {
                      if (reviewFilter === "all") return true;
                      return reviewFilter === status;
                    })
                    .map(({ q, idx, selectedIdx, isCorrect, isSkipped, status }) => (
                      <div key={q.id} className="pt-4 first:pt-0 space-y-3">
                        {/* Question Metadata Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-gray-400">
                              Q. {idx + 1}
                            </span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500">
                              {q.subject}
                            </span>
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                              q.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" :
                              q.difficulty === "Medium" ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" :
                              "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                            }`}>
                              {q.difficulty}
                            </span>
                          </div>

                          {/* Verdict Badge */}
                          <div>
                            {status === "correct" && (
                              <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-lg flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Correct</span>
                              </span>
                            )}
                            {status === "incorrect" && (
                              <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-lg flex items-center space-x-1">
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Incorrect</span>
                              </span>
                            )}
                            {status === "unanswered" && (
                              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-lg flex items-center space-x-1">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                <span>Skipped</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text */}
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
                          {q.question}
                        </p>

                        {/* Options list inside review */}
                        <div className="grid grid-cols-1 gap-2">
                          {q.options.map((option, oIdx) => {
                            const isCorrectOption = oIdx === q.correctOptionIndex;
                            const isUserSelected = oIdx === selectedIdx;

                            let optionStyle = "border-gray-100 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-900/10 text-gray-700 dark:text-gray-300";
                            let icon = null;

                            if (isCorrectOption) {
                              optionStyle = "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-bold";
                              icon = <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
                            } else if (isUserSelected && !isCorrectOption) {
                              optionStyle = "border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 text-rose-800 dark:text-rose-400 font-bold";
                              icon = <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optionStyle}`}
                              >
                                <span className="leading-relaxed">{option}</span>
                                {icon}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-gray-800/80 text-xs text-gray-600 dark:text-gray-300 space-y-1.5 leading-relaxed">
                          <div className="flex items-center space-x-1 font-bold text-gray-800 dark:text-gray-200">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Official Explanation & Study Notes:</span>
                          </div>
                          <p>{q.explanation}</p>
                          {q.referenceBook && (
                            <span className="block text-[10px] font-mono text-gray-400 mt-1">
                              📚 Recommended Source: {q.referenceBook}
                            </span>
                          )}
                        </div>

                        {/* Interactive AI breakdown for specific question */}
                        <div className="space-y-2">
                          {aiExplanationsMap[q.id] ? (
                            <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2 relative overflow-hidden font-sans">
                              <span className="font-bold text-emerald-400 flex items-center space-x-1">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                <span>AI Tutor Analysis:</span>
                              </span>
                              <div className="text-gray-200 whitespace-pre-wrap">
                                {aiExplanationsMap[q.id]}
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleFetchReviewAiExplanation(q)}
                              disabled={aiLoadingMap[q.id]}
                              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 hover:from-emerald-600/20 hover:to-teal-600/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-lg transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>
                                {aiLoadingMap[q.id]
                                  ? "AI Assistant reasoning..."
                                  : "Ask Gemini AI Tutor for detailed breakdown"}
                              </span>
                            </button>
                          )}
                        </div>

                      </div>
                    ))
                )}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-5 flex flex-col sm:flex-row gap-3 justify-center">
            
            <button
              onClick={() => {
                // reset states
                setSelectedAnswers({});
                setIsAnswered({});
                setCurrentIndex(0);
                setQuizFinished(false);
                setHintVisible(false);
                setAiExplanation(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-800 text-xs font-bold transition-all flex items-center justify-center space-x-1"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry This Test</span>
            </button>

            <button
              onClick={() => handleFinishQuiz(true)} // This just fires navigation callbacks to home
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1"
            >
              <span>Go to Student Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
