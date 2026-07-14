/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Compass, 
  Plus, 
  Send, 
  User, 
  Cpu, 
  CheckCircle, 
  Clock, 
  Play, 
  Crown,
  BookMarked,
  ArrowRight,
  Lock,
  AlertTriangle
} from "lucide-react";
import { MCQ, UserRole, AITutorApiConfig } from "../types";

interface AIPortalProps {
  onAddCustomMCQ: (mcq: MCQ) => { success: boolean; duplicate?: MCQ };
  language: "EN" | "UR";
  isPremium: boolean;
  isAdmin?: boolean;
  onOpenPricing: () => void;
  onNavigateToQuiz: (category: string, subject: string, customMcqs: MCQ[]) => void;
  aiConfig?: AITutorApiConfig;
}

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export default function AIPortal({
  onAddCustomMCQ,
  language,
  isPremium,
  isAdmin = false,
  onOpenPricing,
  onNavigateToQuiz,
  aiConfig
}: AIPortalProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "generator" | "plan">("chat");

  // Premium lock screen for the entire AI Tutor room
  if (!isPremium && !isAdmin) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-8 font-sans" id="ai-portal">
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
                {language === "EN" ? "Unlock Prepistan AI Tutor" : "پریپستان اے آئی ٹیوٹر انلاک کریں"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === "EN" 
                  ? "The Prepistan AI Tutor Room is a Premium-only suite that helps you build custom mock quizzes, get comprehensive explanations of CSS syllabus items, and design structured study plans." 
                  : "پریپستان اے آئی ٹیوٹر روم ایک پریمیم خصوصیت ہے جو آپ کو کسٹم ایم سی کیو کوئز بنانے، تفصیلی گائیڈز اور ہفتہ وار اسٹڈی پلان تیار کرنے میں مدد دیتا ہے۔"}
              </p>
            </div>

            {/* Features list */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                {language === "EN" ? "AI Companion Features:" : "اے آئی فیچرز کی تفصیل:"}
              </span>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Interactive 24/7 AI Tutor chat for CSS/PMS syllabus clarification." 
                      : "سی ایس ایس اور پی ایم ایس نصاب کی وضاحت کے لیے 24/7 اے آئی ٹیوٹر چیٹ۔"}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Custom MCQ Generator powered by Gemini 3.5." 
                      : "جیمنائی 3.5 سے چلنے والا کسٹم ایم سی کیو جنریٹر۔"}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {language === "EN" 
                      ? "Intelligent Study Planner tailored to your weak subjects." 
                      : "آپ کے کمزور مضامین کے مطابق اسمارٹ اسٹڈی پلانر۔"}
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

  // AI Chat Tutor States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Assalam-o-Alaikum! I am your Prepistan AI Tutor. I can explain complex CSS/PMS topics, solve tough mathematics MCQs, translate pre-partition history, or summarize current affairs. What are you studying today?",
      time: "Just Now"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // AI MCQ Generator States
  const [genSubject, setGenSubject] = useState("Pakistan Affairs");
  const [genTopic, setGenTopic] = useState("Simla Deputation 1906");
  const [genDifficulty, setGenDifficulty] = useState("Medium");
  const [genLoading, setGenLoading] = useState(false);
  const [generatedMcq, setGeneratedMcq] = useState<MCQ | null>(null);
  const [aiDuplicateMatch, setAiDuplicateMatch] = useState<MCQ | null>(null);

  // AI Study Plan States
  const [targetExam, setTargetExam] = useState("CSS 2027");
  const [weakSubjectsInput, setWeakSubjectsInput] = useState("Current Affairs, General Ability Maths");
  const [hoursPerDay, setHoursPerDay] = useState("3");
  const [planOutput, setPlanOutput] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  // Send message to AI Tutor API
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    if (!isPremium && chatMessages.length >= 3) {
      onOpenPricing();
      return;
    }

    const userMsg: ChatMessage = {
      sender: "user",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are the Prepistan AI Tutor, an elite competitive exam specialist for Pakistan's civil service exams (CSS, PMS, FPSC, PPSC). Keep your response professional, accurate, highly helpful, and targeted at a civil service candidate.
          
          User asked: ${chatInput}`,
          config: aiConfig
        })
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        sender: "ai",
        text: data.text || "I am currently overloaded. Please try again in a few seconds.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const aiMsg: ChatMessage = {
        sender: "ai",
        text: "Error calling Gemini API. Please make sure GEMINI_API_KEY is configured in your project secrets.",
        time: "Now"
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Generate Custom MCQ with AI
  const handleGenerateMCQ = async () => {
    if (!isPremium) {
      onOpenPricing();
      return;
    }
    setGenLoading(true);
    setGeneratedMcq(null);
    setAiDuplicateMatch(null);

    const promptText = `Generate a high-quality competitive multiple-choice question (MCQ) for Pakistani competitive exams (CSS, PMS). The output must be valid JSON matching this schema:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctOptionIndex": 0,
      "explanation": "Detailed explanation of why the correct option is right and others are wrong.",
      "referenceBook": "Name of book or reference source",
      "difficulty": "Easy" or "Medium" or "Hard",
      "topic": "Topic name"
    }

    Subject: ${genSubject}
    Topic Focus: ${genTopic}
    Difficulty level: ${genDifficulty}
    Only output valid JSON, do not include markdown blocks or wrappers outside of the JSON representation.`;

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          config: aiConfig
        })
      });
      const data = await response.json();
      
      // Clean up markdown block wraps (e.g. ```json ... ```) if returned
      let rawText = data.text.trim();
      if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```(json)?/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(rawText);

      const formattedMcq: MCQ = {
        id: "ai-" + Date.now(),
        question: parsed.question,
        options: parsed.options,
        correctOptionIndex: parsed.correctOptionIndex,
        explanation: parsed.explanation,
        referenceBook: parsed.referenceBook,
        difficulty: parsed.difficulty,
        category: "Custom (AI Generated)",
        subject: genSubject,
        topic: parsed.topic || genTopic,
        tags: ["AI Generated", genSubject]
      };

      setGeneratedMcq(formattedMcq);
      const res = onAddCustomMCQ(formattedMcq); // Append to global list!
      if (res && !res.success && res.duplicate) {
        setAiDuplicateMatch(res.duplicate);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to parse AI generated response. Please try generating again.");
    } finally {
      setGenLoading(false);
    }
  };

  // Generate Study Plan with AI
  const handleGeneratePlan = async () => {
    if (!isPremium) {
      onOpenPricing();
      return;
    }
    setPlanLoading(true);
    setPlanOutput(null);

    const promptText = `Create a highly tailored 4-week study plan for a Pakistani competitive exam candidate targeting ${targetExam}.
    They struggle with: ${weakSubjectsInput}.
    They can study: ${hoursPerDay} hours per day.
    Provide a day-by-day or week-by-week visual table, daily routine checklist, study tips, and reference books. Keep it premium, actionable, and formatted beautifully in clean markdown.`;

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText })
      });
      const data = await response.json();
      setPlanOutput(data.text);
    } catch (e) {
      setPlanOutput("Error generating study guide. Please make sure the server is fully running.");
    } finally {
      setPlanLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="ai-portal">
      
      {/* Premium Notification Cover */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-emerald-500/10 rounded-2xl border border-amber-200 dark:border-amber-900/40 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300">
            <Crown className="w-5 h-5 text-amber-500 animate-bounce fill-amber-500 shrink-0" />
            <span>You are using the Free Tier. Upgrade to Premium for unlimited AI Tutor responses, customized exam planners, and AI question generators.</span>
          </div>
          <button
            onClick={onOpenPricing}
            className="px-4 py-1.5 bg-amber-500 text-white font-bold rounded-lg text-xs self-start sm:self-auto hover:bg-amber-400 transition-colors"
          >
            Unlock Premium
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Prepistan AI Assistant Room</h1>
            <span className="text-xs text-gray-400">Powered by Gemini 3.5 Flash</span>
          </div>
        </div>

        {/* Action tabs */}
        <div className="flex bg-gray-50 dark:bg-gray-900 p-1.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "chat"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            AI Chat Tutor
          </button>
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "generator"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            AI MCQ Generator
          </button>
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "plan"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            AI Study Plan
          </button>
        </div>
      </div>

      {/* Tab 1: AI Chat Tutor */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chat Window */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-[500px]">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-3xl flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Live Session with AI Tutor</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Messages box */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((msg, i) => {
                const isAi = msg.sender === "ai";
                return (
                  <div key={i} className={`flex ${isAi ? "justify-start" : "justify-end"} items-start space-x-2`}>
                    {isAi && (
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi 
                        ? "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800" 
                        : "bg-emerald-600 text-white"
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className={`block text-[9px] mt-1.5 text-right ${isAi ? "text-gray-400" : "text-emerald-200"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              {chatLoading && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                    AI
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-400 rounded-xl text-xs border border-gray-100 dark:border-gray-800 animate-pulse">
                    AI Tutor is drafting response...
                  </div>
                </div>
              )}
            </div>

            {/* Footer Form */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask any topic: 'Explain Allahabad Address 1930', 'Give arithmetic ratios formula'..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendChat();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSendChat}
                  disabled={chatLoading}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-set Prep topics cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider block">Suggested AI Prompts</h3>
            {[
              { title: "Explain Objective Resolution 1949", category: "Pakistan Affairs" },
              { title: "Indus Water Treaty main clauses summary", category: "Geography & Geopolitics" },
              { title: "Synonyms of vocabulary tested in CSS English", category: "English Précis" },
              { title: "First revelation history and verses compilation", category: "Islamic Studies" }
            ].map((suggest, idx) => (
              <button
                key={idx}
                onClick={() => setChatInput(suggest.title)}
                className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group flex items-start space-x-3"
              >
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-lg group-hover:scale-105 transition-all">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-mono block mb-0.5">{suggest.category}</span>
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {suggest.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: AI MCQ Generator */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Creator panel */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Configure AI Generator</h3>
            
            {/* Subject */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Syllabus Subject</label>
              <select
                value={genSubject}
                onChange={(e) => setGenSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Pakistan Affairs">Pakistan Affairs</option>
                <option value="Islamic Studies">Islamic Studies</option>
                <option value="Geography">Geography</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Current Affairs">Current Affairs</option>
              </select>
            </div>

            {/* Custom Focus topic */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide font-semibold">Custom Topic / Event Focus</label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                placeholder="e.g. Allahabad Address 1930, Ghazwah Hunain..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setGenDifficulty(diff)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      genDifficulty === diff
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                        : "bg-gray-50 dark:bg-gray-900 text-gray-600 border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateMCQ}
              disabled={genLoading}
              className="w-full py-3 mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{genLoading ? "AI Synthesizing Question..." : "Synthesize Question (Gemini)"}</span>
            </button>
          </div>

          {/* Question Output display stage */}
          <div className="lg:col-span-2">
            {generatedMcq ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      {generatedMcq.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Topic: {generatedMcq.topic}</span>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold font-mono">
                    AI Generated
                  </span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs text-gray-400 block font-bold">Generated Question:</span>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                    {generatedMcq.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {generatedMcq.options.map((option, idx) => {
                    const prefix = ["A", "B", "C", "D"][idx];
                    const isCorrect = idx === generatedMcq.correctOptionIndex;
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                          isCorrect 
                            ? "border-emerald-500 bg-emerald-50/20 text-emerald-800 dark:text-emerald-400" 
                            : "border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                          isCorrect ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                        }`}>
                          {prefix}
                        </span>
                        <span className="text-xs sm:text-sm">{option}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-emerald-200/20 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block uppercase tracking-wider">
                    AI Generated Explanation Note:
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {generatedMcq.explanation}
                  </p>
                  {generatedMcq.referenceBook && (
                    <span className="block text-[10px] font-mono text-gray-400">
                      📚 Reference: {generatedMcq.referenceBook}
                    </span>
                  )}
                </div>

                 <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-xs text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {aiDuplicateMatch ? (
                    <div className="flex items-start gap-2 text-amber-850 dark:text-amber-400 text-xs leading-normal">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-600 dark:text-amber-400 font-extrabold uppercase text-[10px] block tracking-wide">Redundant MCQ Detected</strong>
                        This generated question already exists in your syllabus list (under <strong>{aiDuplicateMatch.category} - {aiDuplicateMatch.subject}</strong>). To keep your syllabus clean, it has been skipped from being re-added.
                      </div>
                    </div>
                  ) : (
                    <span>This MCQ has been successfully added to your <strong>Prepistan Study Library</strong>.</span>
                  )}
                  <button
                    onClick={() => onNavigateToQuiz("Custom (AI Generated)", generatedMcq.subject, [generatedMcq])}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow hover:bg-emerald-500 transition-all flex items-center space-x-1 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Test Now</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center space-y-4 h-full">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">AI Question Synthesizer Ready</h2>
                  <p className="text-xs text-gray-400 max-w-sm mt-1 mx-auto leading-relaxed">
                    Select a subject, focus topic, and hit Synthesize. Prepistan AI will generate a unique MCQ, explanation, reference, and append it to your test queue!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: AI Study Plan */}
      {activeTab === "plan" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 space-y-4">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Custom Planner Details</h3>
            
            {/* Target Exam */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Target Examination</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="CSS 2027">CSS 2027</option>
                <option value="PMS Punjab 2026">PMS Punjab 2026</option>
                <option value="FPSC Inspector FIA">FPSC Inspector FIA</option>
                <option value="PPSC Tehsildar Exam">PPSC Tehsildar Exam</option>
              </select>
            </div>

            {/* Weak Areas */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide font-semibold">Struggling Areas / Weak Subjects</label>
              <input
                type="text"
                value={weakSubjectsInput}
                onChange={(e) => setWeakSubjectsInput(e.target.value)}
                placeholder="e.g. Current Affairs, Mathematics, Synonyms..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Time dedicated */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Committed Study Hours per Day</label>
              <select
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="1-2">1 to 2 hours</option>
                <option value="3">3 hours</option>
                <option value="4-5">4 to 5 hours</option>
                <option value="6+">6+ hours (Intense study)</option>
              </select>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={planLoading}
              className="w-full py-3 mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{planLoading ? "AI Mapping Timetable..." : "Generate Customized Timetable"}</span>
            </button>
          </div>

          {/* Planner Output Stage */}
          <div className="lg:col-span-2">
            {planOutput ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-gray-900 dark:text-white">Your Custom 4-Week Timetable</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded font-bold uppercase font-mono">
                    Plan Live
                  </span>
                </div>

                {/* Markdown print */}
                <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
                  {planOutput}
                </div>

              </div>
            ) : (
              <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center space-y-4 h-full">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">Personal Study Planner Ready</h2>
                  <p className="text-xs text-gray-400 max-w-sm mt-1 mx-auto leading-relaxed">
                    Set your target exam and commitments. Gemini AI will compose a detailed 4-week timetable, reference source list, and routine checklist specifically tailored for your success.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
