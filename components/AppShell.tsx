"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./AppContext";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";
import ExamCategories from "./ExamCategories";
import QuizInterface from "./QuizInterface";
import AIPortal from "./AIPortal";
import LeaderboardPage from "./LeaderboardPage";
import BlogCMS from "./BlogCMS";
import NotesPage from "./NotesPage";
import BookmarksPage from "./BookmarksPage";
import PricingModal from "./PricingModal";
import CoursesPage from "./CoursesPage";

export default function AppShell() {
  const router = useRouter();
  const {
    currentRole, setRole, isPremium, setPremium, language, setLanguage,
    darkMode, setDarkMode, activeTab, pricingOpen, setPricingOpen,
    notifications, handleMarkNotificationsAsRead, handleNavigate,
    userXp, userCoins, setUserCoins, userStreak, longestStreak, currentUser, handleLogout,
    mcqs, bookmarkedIds, quizHistory, articles, discussions,
    courses, courseCategories, mcqCategories, mcqSubjects, uniqueCategories,
    paymentConfig, adsenseConfig, aiConfig, setAiConfig,
    quizConfig, handleStartQuiz, handleFinishQuiz, handleToggleBookmark,
    handlePostDiscussion, handleNavigateToQuiz, handleAddMCQ, handleDeleteMCQ,
    handleAddArticle, handleUpdateArticle, handleDeleteArticle,
    handleAddCourse, handleDeleteCourse, handleAddCourseCategory,
    handleUpdatePaymentConfig, handleUpdateAdSenseConfig,
    handleAddMcqCategory, handleAddMcqSubject,
    handleDeleteMcqCategory, handleDeleteMcqSubject,
  } = useApp();

  const isAdmin = currentRole === "Admin" || currentRole === "Super Admin";

  useEffect(() => {
    if (isAdmin) {
      window.location.href = "/admin/dashboard";
    }
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="animate-pulse text-sm text-slate-400 font-semibold">Redirecting to admin panel...</div>
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
              longestStreak={longestStreak}
              coins={userCoins}
              language={language}
              onNavigate={handleNavigate}
              onOpenPricing={() => setPricingOpen(true)}
              currentUser={currentUser}
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
              isAdmin={isAdmin}
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
