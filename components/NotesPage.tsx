/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Download, 
  FileDown, 
  CheckCircle, 
  Crown, 
  Sparkles, 
  ArrowRight,
  BookMarked,
  Clock,
  ExternalLink
} from "lucide-react";

interface StudyNote {
  id: string;
  title: string;
  category: "Islamic Studies" | "Pre-Partition History" | "GK Capsules" | "Current Affairs";
  description: string;
  content: string;
  isPremium: boolean;
  pages: number;
  readTime: string;
  referenceSources: string;
}

interface NotesPageProps {
  isPremium: boolean;
  onOpenPricing: () => void;
  language: "EN" | "UR";
}

export default function NotesPage({
  isPremium,
  onOpenPricing,
  language
}: NotesPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const notesList: StudyNote[] = [
    {
      id: "note-1",
      title: "Islamic Studies: Battle Ghazwah Summaries & Hadith Compilations",
      category: "Islamic Studies",
      description: "Quick-review guidelines highlighting dates, battle leaders, treaties (Hudaibiyah), and outcomes for CSS Islamic paper.",
      content: `PREPISTAN STUDY NOTES: ISLAMIC STUDIES (GHAZWAH & HADITH REFERENCE)
----------------------------------------------------------------------
1. Battle of Badr (2 AH / 624 AD):
   - Opponents: Muslims vs Quraish of Makkah.
   - Muslim Strength: 313. enemy Strength: ~1000.
   - Core Outcome: Decisive Muslim victory. Quran mentions angels assisting.

2. Battle of Uhud (3 AH / 625 AD):
   - Opponents: Muslims vs Quraish.
   - Key Incident: Archery contingent left their designated pass prematurely.
   - Core Outcome: Setback for Muslims; Prophet (PBUH) was injured.

3. Battle of Trench / Ahzab (5 AH / 627 AD):
   - Key Tactic: Digging of trench suggested by Hazrat Salman Farsi (R.A).
   - Core Outcome: Siege broken by harsh winter winds and divine assistance.

4. Treaty of Hudaibiyah (6 AH / 628 AD):
   - Terminated active war for 10 years. Drafted by Hazrat Ali (R.A).

5. Conquest of Makkah (8 AH / 630 AD):
   - General amnesty declared. Idols destroyed from Kaabah.

6. Hadith Compilations (Sihah-e-Sittah):
   - Sahih Bukhari (Imam Bukhari), Sahih Muslim (Imam Muslim), Sunan Abu Dawood, Sunan al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah.`,
      isPremium: false,
      pages: 14,
      readTime: "8 min read",
      referenceSources: "Islam: Its History and Doctrine & Islamic Culture Guides."
    },
    {
      id: "note-2",
      title: "History Capsule (712 - 1857): Arrival of Bin Qasim to Mughal Decline",
      category: "Pre-Partition History",
      description: "Chronological guide mapping Muhammad bin Qasim's conquest of Sindh, Mahmud Ghaznavi's raids, the Delhi Sultanate dynasties, and the Mughal collapse.",
      content: `PREPISTAN COMPILATIVE SHEET: PRE-PARTITION HISTORY (712 - 1857)
----------------------------------------------------------------------
1. Muhammad Bin Qasim (712 AD):
   - Arrived in Sindh to rescue cargo ship from Raja Dahir's pirates.
   - Captured Debal (modern Karachi/port area), established first Islamic state structure in South Asia.

2. Ghaznavid Empire (997 - 1187 AD):
   - Mahmud Ghaznavi led 17 expeditions into Subcontinent. Destroyed Somnath Temple in 1026 AD.

3. Delhi Sultanate Dynasties (1206 - 1526 AD):
   - Mamluk / Slave Dynasty (Qutbuddin Aibak, Iltutmish, Razia Sultana)
   - Khilji Dynasty (Alauddin Khilji's market control rules)
   - Tughlaq Dynasty (Muhammad bin Tughlaq's token currency experiments)
   - Sayyid & Lodi Dynasties.

4. Mughal Empire (1526 - 1857 AD):
   - Babur established the empire after defeating Ibrahim Lodi in First Battle of Panipat (1526).
   - Akbar (Deen-e-Elahi), Shah Jahan (Taj Mahal), Aurangzeb Alamgir (Islamic Fatawa Alamgiri).
   - Decline started after death of Aurangzeb (1707 AD). British East India Company took full control. Final blow in War of Independence 1857 (Bahadur Shah Zafar captured).`,
      isPremium: true,
      pages: 25,
      readTime: "15 min read",
      referenceSources: "A Concise History of India & CSS pre-partition syllabus textbooks."
    },
    {
      id: "note-3",
      title: "History Capsule (1857 - 1947): Freedom Struggle & Aligarh Movement",
      category: "Pre-Partition History",
      description: "High-scoring CSS notes tracking Sir Syed Ahmad Khan, partition of Bengal, Simla Deputation, Lahore Resolution, and Mountbatten Partition Plan.",
      content: `PREPISTAN EXAM STUDY NOTES: FREEDOM MOVEMENT (1857 - 1947)
----------------------------------------------------------------------
1. Sir Syed Ahmad Khan & Aligarh Movement:
   - Established scientific society in Ghazipur (1864) and MAO College Aligarh (1877).
   - Advised Muslims to acquire western education first, stay away from political Congress party.

2. Partition of Bengal (1905) & Annulment (1911):
   - Bengal partitioned on administrative grounds by Lord Curzon. Leftist Hindu factions protested.
   - Annulled in 1911 due to extreme Swadeshi civil protests, disappointing Muslims.

3. Simla Deputation (1906):
   - 35 Muslim leaders led by Sir Aga Khan met Viceroy Lord Minto. Demanded 'Separate Elective seats'.

4. Creation of All-India Muslim League (1906):
   - Formed in Dhaka on 30th December 1906 to protect Muslim interests.

5. Allahabad Address (1930):
   - Allama Iqbal proposed a separate independent homeland for North-Western Muslim majority areas.

6. Lahore Resolution (23rd March 1940):
   - Presented by A.K. Fazlul Huq (Sher-e-Bangal). Demanded sovereign independent states in Muslim majority zones.

7. Mountbatten Plan & Pakistan Independence (3rd June 1947 / 14th August 1947).`,
      isPremium: true,
      pages: 32,
      readTime: "18 min read",
      referenceSources: "Trek to Pakistan by Dr. K. Ali."
    },
    {
      id: "note-4",
      title: "Geography and GK Capsules: Pakistan Passes, Rivers & Core Sites",
      category: "GK Capsules",
      description: "An absolute general knowledge cheat sheet listing mountain passes (Khyber, Bolan), river lengths, dams, and strategic nuclear test sites.",
      content: `PREPISTAN GENERAL KNOWLEDGE CHEAT SHEET
----------------------------------------------------------------------
1. MOUNTAIN PASSES OF PAKISTAN:
   - Khyber Pass: Connects Peshawar with Kabul (Afghanistan).
   - Bolan Pass: Connects Quetta with Jacobabad (Balochistan).
   - Khunjerab Pass: Connects Pakistan with China (Karakoram highway).
   - Tochi Pass: Connects Bannu with Ghazni (Afghanistan).

2. MOUNTAINS & PEAKS:
   - K2 (Godwin-Austen): 2nd highest peak in the world (8,611m), located in Karakoram range.
   - Nanga Parbat: 9th highest in the world (8,126m), known as Killer Mountain.

3. RIVERS & WATER RESOURCES:
   - Indus River: Longest river of Pakistan (originates from Lake Mansarovar, Tibet).
   - Jhelum, Chenab, Ravi, Sutlej (Tributaries).

4. NUCLEAR TEST SITES:
   - Chagai-I & Chagai-II: Ras Koh Hills, Balochistan. Tests conducted on 28th and 30th May 1998 in response to Indian nuclear expansion.`,
      isPremium: false,
      pages: 8,
      readTime: "5 min read",
      referenceSources: "Survey of Pakistan Geography Documents."
    }
  ];

  const filteredNotes = notesList.filter(note => {
    const matchSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === "All" || note.category === activeCategory;
    return matchSearch && matchCat;
  });

  // Simulated PDF Downloader triggering a clean local text file download
  const handleDownload = (note: StudyNote) => {
    if (note.isPremium && !isPremium) {
      onOpenPricing();
      return;
    }

    setDownloadingId(note.id);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          
          // Trigger actual text file download representing the "PDF" notes!
          const element = document.createElement("a");
          const file = new Blob([note.content], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = `${note.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

          alert(`🎉 Download Complete: "${note.title}" saved successfully to your downloads!`);
          return 0;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-6" id="notes-archive">
      
      {/* Intro banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-1.5">
            <BookMarked className="w-5.5 h-5.5 text-emerald-600" />
            <span>Prepistan Premium Revision Capsules</span>
          </h1>
          <p className="text-xs text-gray-500 max-w-xl">
            Compiled by high-scoring civil service seniors. Download detailed text materials and cheat sheets containing pre-partition history, Islamic guidelines, and general knowledge directly.
          </p>
        </div>

        {/* Total pages status */}
        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-2xl text-center border shrink-0">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Library Volume</span>
          <span className="text-base font-black text-emerald-600 block">79+ Chapters</span>
        </div>
      </div>

      {/* Categories Toggle & Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="flex flex-wrap gap-1">
          {["All", "Islamic Studies", "Pre-Partition History", "GK Capsules", "Current Affairs"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-500 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search summary notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 focus:outline-none"
          />
        </div>

      </div>

      {/* Grid of study cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => {
          const isNotePremiumLocked = note.isPremium && !isPremium;
          const isNoteDownloading = downloadingId === note.id;

          return (
            <div 
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
              id={`note-card-${note.id}`}
            >
              {/* Premium Ribbon overlay */}
              {note.isPremium && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-bl-xl font-bold font-mono text-[9px] flex items-center space-x-1 uppercase tracking-wider">
                  <Crown className="w-2.5 h-2.5 fill-slate-950" />
                  <span>Premium Locked</span>
                </div>
              )}

              <div>
                
                {/* Meta Category and Page Size */}
                <div className="flex items-center space-x-2 text-[10px] text-gray-400 mb-3.5 font-mono">
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-gray-500 font-bold rounded">
                    {note.category}
                  </span>
                  <span>• {note.pages} pages</span>
                  <span>• {note.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-gray-950 dark:text-white leading-snug mb-2.5">
                  {note.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {note.description}
                </p>

                {/* Sources info */}
                <span className="block text-[10px] text-gray-400 font-semibold mb-6">
                  📚 Recommended Sources: {note.referenceSources}
                </span>

              </div>

              {/* Action row with Downloader trigger */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
                
                <span className="text-[10px] text-gray-400">
                  Format: <strong>Clean Text / PDF Guide</strong>
                </span>

                <button
                  onClick={() => handleDownload(note)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isNotePremiumLocked
                      ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                      : isNoteDownloading
                        ? "bg-gray-100 text-gray-400 pointer-events-none"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                  }`}
                >
                  {isNotePremiumLocked ? (
                    <>
                      <Crown className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Unlock Notes</span>
                    </>
                  ) : isNoteDownloading ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin shrink-0" />
                      <span>Downloading {downloadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Guide</span>
                    </>
                  )}
                </button>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
