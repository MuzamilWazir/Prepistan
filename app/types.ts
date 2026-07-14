 export type UserRole = "Student" | "Premium Student" | "Admin" | "Super Admin" | "Content Manager";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium: boolean;
  xp: number;
  coins: number;
  streak: number;
  longestStreak: number;
  level: number;
  avatarUrl: string;
}

export type QuizMode =
  | "Practice Mode"
  | "Timed Test"
  | "Mock Test"
  | "Previous Papers"
  | "Daily Quiz"
  | "Weekly Quiz"
  | "Topic Wise Quiz"
  | "Chapter Wise Quiz"
  | "Wrong Questions Revision"
  | "Bookmarked Questions"
  | "Custom Test Generator"
  | "AI Generated Quiz";

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[]; // Options array: [A, B, C, D]
  correctOptionIndex: number; // 0, 1, 2, or 3
  explanation: string;
  referenceBook?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string; // CSS, PMS, FPSC, PPSC, etc.
  subject: string; // Pakistan Affairs, Islamic Studies, English, etc.
  topic?: string;
  subtopic?: string;
  chapter?: string;
  tags?: string[];
  negativeMarks?: number;
  timeLimitSeconds?: number; // per question or test
  hints?: string[];
  imageUrl?: string;
  diagramUrl?: string;
  videoSolutionUrl?: string;
  pdfAttachmentUrl?: string;
  isPremium?: boolean;
}

export interface QuizAttempt {
  id: string;
  quizMode: QuizMode;
  category: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpentSeconds: number;
  date: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  xp: number;
  coins: number;
  level: number;
  badge: string;
  category?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string; // Blog, Current Affairs, Job Alert, Exam Alert
  imageUrl?: string;
  tags: string[];
  readTime: string;
  status?: "Published" | "Draft";
}

export interface QuestionDiscussion {
  id: string;
  questionId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  date: string;
  likes: number;
  isLikedByUser?: boolean;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "alert";
}

export interface UserGoal {
  dailyGoalXp: number;
  currentXpToday: number;
  studyTimeTodayMinutes: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  thumbnailUrl: string;
  lectures: VideoLecture[];
  isPremiumOnly: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
}

export interface PaymentConfig {
  paymentLink: string;
  easyPaisaNumber: string;
  easyPaisaName: string;
  jazzCashNumber: string;
  jazzCashName: string;
  enableCardPayment: boolean;
  enableEasyPaisa: boolean;
  enableJazzCash: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  lifetimePrice: number;
  coupons: Coupon[];
}

export interface ApiProviderConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  systemPrompt?: string;
}

export interface AITutorApiConfig {
  activeApi: "gemini" | "openai" | "deepseek" | "claude" | "simulated";
  apis: {
    gemini: ApiProviderConfig;
    openai: ApiProviderConfig;
    deepseek: ApiProviderConfig;
    claude: ApiProviderConfig;
    simulated: ApiProviderConfig;
  };
}

export interface AdSenseConfig {
  publisherId: string;
  adSlotBanner: string;
  adSlotSidebar: string;
  customHtmlCode: string;
  enableAds: boolean;
}


