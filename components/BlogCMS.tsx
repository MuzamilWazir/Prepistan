/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  FileText, 
  PlusCircle, 
  Calendar, 
  Clock, 
  Trash2, 
  Share2, 
  BookMarked, 
  Bookmark, 
  Compass, 
  TrendingUp, 
  Search,
  Bell,
  Sparkles,
  ArrowLeft,
  User,
  Edit,
  CheckCircle
} from "lucide-react";
import { BlogArticle, UserRole, AdSenseConfig } from "../types";

interface BlogCMSProps {
  articles: BlogArticle[];
  onAddArticle: (article: BlogArticle) => void;
  onUpdateArticle: (article: BlogArticle) => void;
  onDeleteArticle: (id: string) => void;
  currentRole: UserRole;
  language: "EN" | "UR";
  adsenseConfig?: AdSenseConfig;
}

export default function BlogCMS({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  currentRole,
  language,
  adsenseConfig
}: BlogCMSProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Editor states
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Current Affairs");
  const [newTags, setNewTags] = useState("");

  const isAdminOrEditor = currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager";
  const categories = ["All", "Current Affairs", "Job Alert", "Exam Alert", "Blog", ...(isAdminOrEditor ? ["Drafts Only"] : [])];

  // Filter lists
  const filteredArticles = articles.filter(article => {
    // Hide drafts for non-admins
    if (!isAdminOrEditor && article.status === "Draft") {
      return false;
    }
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchCat = false;
    if (activeCategory === "All") {
      matchCat = true;
    } else if (activeCategory === "Drafts Only") {
      matchCat = article.status === "Draft";
    } else {
      matchCat = article.category === activeCategory;
    }

    return matchSearch && matchCat;
  });

  // Find selected article
  const selectedArticle = articles.find(art => art.id === selectedArticleId);

  if (selectedArticle) {
    let related = articles.filter(art => art.id !== selectedArticle.id && art.category === selectedArticle.category);
    if (related.length === 0) {
      related = articles.filter(art => art.id !== selectedArticle.id);
    }
    related = related.slice(0, 3);

    return (
      <div className="space-y-6 animate-in fade-in duration-200" id="blog-article-detail">
        {/* Detail View Header / Breadcrumbs */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-750 p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedArticleId(null)}
            className="flex items-center space-x-2 px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-gray-50 dark:bg-gray-950 rounded-xl transition-all border border-gray-100 dark:border-gray-850"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <span className="text-[10px] text-gray-400 font-bold font-mono tracking-wider uppercase">
            Viewing {selectedArticle.category}
          </span>
        </div>

        {/* Dynamic AdSense Header Banner */}
        {adsenseConfig?.enableAds && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-750 p-4 shadow-sm overflow-hidden">
            {adsenseConfig.customHtmlCode ? (
              <div 
                className="adsense-banner-container"
                dangerouslySetInnerHTML={{ __html: adsenseConfig.customHtmlCode }}
              />
            ) : (
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-center space-y-1 font-mono">
                <p className="text-[8px] text-gray-400 uppercase tracking-widest">GOOGLE ADSENSE BANNER</p>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Prepare Pakistan Exam Solved MCQs & Lecture Series</h5>
                <p className="text-[10px] text-gray-400">ca-pub-{adsenseConfig.publisherId} • Slot: {adsenseConfig.adSlotBanner}</p>
              </div>
            )}
          </div>
        )}

        {/* Main Double Grid: Article Body & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Complete Article Body */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Meta stamp */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-5">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">{selectedArticle.author}</span>
                  <span className="text-[10px] text-gray-400 block font-mono">Prepistan Verified Contributor</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Title & category */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                  {selectedArticle.category}
                </span>
                {selectedArticle.status === "Draft" && (
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 animate-pulse">
                    Draft Saved
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedArticle.title}
              </h1>
            </div>

            {/* Article Content */}
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {selectedArticle.content}
            </div>

            {/* Tags footer */}
            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 pt-5 mt-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2.5">Exam Tags & Context</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Actions bar */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => alert("✅ Link copied! Share with your css/pms group.")}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-950 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 transition-colors border border-gray-100 dark:border-gray-850"
              >
                <Share2 className="w-4 h-4 text-gray-400" />
                <span>Share Article</span>
              </button>

              {/* Admin actions */}
              {(currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager") && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingArticleId(selectedArticle.id);
                      setNewTitle(selectedArticle.title);
                      setNewContent(selectedArticle.content);
                      setNewCategory(selectedArticle.category);
                      setNewTags(selectedArticle.tags.join(", "));
                      setSelectedArticleId(null);
                      setShowEditor(true);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-emerald-600 rounded-xl text-xs font-bold transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Post</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const newStatus = selectedArticle.status === "Draft" ? "Published" : "Draft";
                      onUpdateArticle({
                        ...selectedArticle,
                        status: newStatus
                      });
                      alert(newStatus === "Draft" ? "Article successfully moved to Drafts!" : "Article successfully published Live!");
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 rounded-xl text-xs font-bold transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{selectedArticle.status === "Draft" ? "Publish Live" : "Move to Draft"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this article?")) {
                        onDeleteArticle(selectedArticle.id);
                        setSelectedArticleId(null);
                      }
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 rounded-xl text-xs font-bold transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Post</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDEBAR: Related Posts & Monetization */}
          <div className="space-y-6">
            
            {/* Sidebar Ad Unit */}
            {adsenseConfig?.enableAds && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm space-y-3">
                <span className="text-[9px] font-mono tracking-wider text-gray-400 uppercase block">SPONSORED GOOGLE ADSENSE</span>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-gray-150 dark:border-gray-800 space-y-2 text-center">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-mono">ca-pub-{adsenseConfig.publisherId}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Unlock 15,000+ Verified MCQ Study Packages</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">Instant access to Pakistan Affairs, Islamic Studies, and General Knowledge solver.</p>
                  <button onClick={() => alert("Redirecting to Premium checkout!")} className="w-full mt-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] rounded-lg transition-colors">
                    Join Premium Today
                  </button>
                </div>
              </div>
            )}

            {/* Related Posts Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-gray-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5 border-b border-gray-100 dark:border-gray-700 pb-3">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Related Competitive Articles</span>
              </h3>

              {related.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No other related articles found.</p>
              ) : (
                <div className="space-y-3.5">
                  {related.map(art => (
                    <div 
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      className="group p-3 bg-gray-50 hover:bg-emerald-50/30 dark:bg-gray-950 dark:hover:bg-emerald-950/10 rounded-2xl border border-gray-100/50 dark:border-gray-900 cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                          {art.category}
                        </span>
                        <span className="text-[8px] text-gray-400">{art.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 line-clamp-2">
                        {art.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Sticky Quick Notice */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong>Tip:</strong> Keep checking Prepistan Arena daily! The Federal and Provincial commissions (FPSC, PPSC, SPSC, KPPSC, BPSC, AJKPSC) notify recruitment syllabi and dates that we immediately index.
            </div>

          </div>

        </div>

      </div>
    );
  }

  const handleSavePost = (status: "Published" | "Draft") => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please fill in the title and content.");
      return;
    }

    if (editingArticleId) {
      const existing = articles.find(a => a.id === editingArticleId);
      if (!existing) return;
      const updated: BlogArticle = {
        ...existing,
        title: newTitle,
        content: newContent,
        category: newCategory,
        tags: newTags.split(",").map(t => t.trim()).filter(Boolean),
        status: status,
      };
      onUpdateArticle(updated);
      alert(status === "Published" ? "🎉 Article updated & published successfully!" : "📝 Article changes saved to drafts!");
    } else {
      const post: BlogArticle = {
        id: "post-" + Date.now(),
        title: newTitle,
        content: newContent,
        author: "Murtaza Syed (Prepistan Senior)",
        date: new Date().toISOString().split("T")[0],
        category: newCategory,
        tags: newTags.split(",").map(t => t.trim()).filter(Boolean),
        readTime: "3 min read",
        status: status,
      };
      onAddArticle(post);
      alert(status === "Published" ? "🎉 Article successfully published to Prepistan feed!" : "📝 Article saved as draft!");
    }

    // Reset form
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setEditingArticleId(null);
    setShowEditor(false);
  };

  return (
    <div className="space-y-6" id="blog-cms">
      
      {/* Feed Header */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
            <Bell className="w-5 h-5 text-emerald-600 animate-swing" />
            <span>Pakistan Exam Calendars & Current Affairs</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Stay updated with immediate competitive news, state jobs opening alerts, and essay preparation articles.
          </p>
        </div>

        {/* Editor permission trigger */}
        {(currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager") && (
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showEditor ? "Close Writer" : "Draft Article"}</span>
          </button>
        )}
      </div>

      {/* Editor stage */}
      {showEditor && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-emerald-500/30 p-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <h2 className="text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Compose New Current Affairs/Job Alert</span>
          </h2>

          <div className="space-y-3">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Article Title / Alert Header</label>
              <input
                type="text"
                placeholder="e.g. FPSC Inspector Customs Job Vacancies..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Category / Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Feed Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs"
                >
                  <option value="Current Affairs">Current Affairs</option>
                  <option value="Job Alert">Job Alert</option>
                  <option value="Exam Alert">Exam Alert</option>
                  <option value="Blog">General Blog</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="History, CSS, FPSC"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs"
                />
              </div>
            </div>

            {/* Body */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Article Body Content</label>
              <textarea
                placeholder="Provide comprehensive details, application links, syllabus topics, and reference guides..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleSavePost("Published")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{editingArticleId ? "Save & Publish Live" : "Publish Live"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSavePost("Draft")}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{editingArticleId ? "Save Changes as Draft" : "Save to Draft"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNewTitle("");
                  setNewContent("");
                  setNewTags("");
                  setEditingArticleId(null);
                  setShowEditor(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold text-xs transition-all"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Categories toggle bars & search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Cat filters */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search news & alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

      </div>

      {/* Articles Stream list layout (Notion inspired visual cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {filteredArticles.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            No active articles or alerts found.
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isAlert = article.category === "Job Alert" || article.category === "Exam Alert";
            return (
              <div 
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-all flex flex-col justify-between"
                id={`article-${article.id}`}
              >
                <div>
                  
                  {/* Category Stamp */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase tracking-wider ${
                        isAlert 
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400" 
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                      }`}>
                        {article.category}
                      </span>
                      {article.status === "Draft" && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                          Draft
                        </span>
                      )}
                    </div>

                    {/* Meta date */}
                    <div className="flex items-center space-x-1 text-[10px] text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => setSelectedArticleId(article.id)}
                    className="text-base font-bold text-gray-950 dark:text-white leading-snug mb-2.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 whitespace-pre-wrap line-clamp-3">
                    {article.content}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedArticleId(article.id)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center space-x-1 mb-4 group transition-colors focus:outline-none"
                  >
                    <span>Read Full Post</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </button>

                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-3.5 mt-auto flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 font-mono">
                    <span className="font-bold text-gray-600 dark:text-gray-300">By: {article.author.slice(0, 12)}...</span>
                    <span>• {article.readTime}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    
                    {/* Admin Actions: Edit, Move to Draft/Publish, and Delete */}
                    {(currentRole === "Admin" || currentRole === "Super Admin" || currentRole === "Content Manager") && (
                      <>
                        <button
                          onClick={() => {
                            setEditingArticleId(article.id);
                            setNewTitle(article.title);
                            setNewContent(article.content);
                            setNewCategory(article.category);
                            setNewTags(article.tags.join(", "));
                            setShowEditor(true);
                            document.getElementById("blog-cms")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-gray-400 hover:text-emerald-600 rounded-lg transition-colors"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            const nextStatus = article.status === "Draft" ? "Published" : "Draft";
                            onUpdateArticle({
                              ...article,
                              status: nextStatus
                            });
                            alert(nextStatus === "Draft" ? "📝 Article moved to Drafts!" : "🎉 Article published Live!");
                          }}
                          className="p-1.5 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-gray-400 hover:text-amber-600 rounded-lg transition-colors"
                          title={article.status === "Draft" ? "Publish Live" : "Move to Draft"}
                        >
                          <FileText className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this article?")) {
                              onDeleteArticle(article.id);
                            }
                          }}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => alert("✅ Link copied! Share with your css/pms group.")}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-400 rounded-lg transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}
