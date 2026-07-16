import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tyaro kro - Competitive Exam Prep",
  description: "Pakistan's premier competitive exam preparation platform for CSS, PMS, FPSC, PPSC",
  openGraph: {
    title: "Tyaro kro - Competitive Exam Prep",
    description: "Pakistan's premier competitive exam preparation platform for CSS, PMS, FPSC, PPSC",
    url: "https://prepistan.vercel.app",
    siteName: "Tyaro kro",
    images: [
      {
        url: "/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Tyaro kro - Competitive Exam Prep",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyaro kro - Competitive Exam Prep",
    description: "Pakistan's premier competitive exam preparation platform for CSS, PMS, FPSC, PPSC",
    images: ["/ogImage.png"],
  },
};

const darkModeScript = `
  (function() {
    try {
      var mode = localStorage.getItem('prepistan_dark_mode');
      var dark = mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (dark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
