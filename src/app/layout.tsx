import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { Providers } from './providers';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base URL used to resolve absolute URLs for Open Graph / Twitter images
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Yasharth Sonker | Full Stack Developer, AI & Web Engineer",
  description:
    "Welcome to the portfolio of Yasharth Sonker — a Full Stack Developer and AI Enthusiast specializing in Next.js, TypeScript, Tailwind CSS, and modern web solutions. Discover top projects, professional achievements, and innovative digital work.",
  keywords: [
    "Yasharth Sonker",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Web Developer Portfolio",
    "MERN Stack Developer",
    "Best Developer Portfolio India",
    "Software Engineer Portfolio",
    "Tailwind CSS Developer",
    "Next.js App Router",
  ],
  authors: [{ name: "Yasharth Sonker", url: "https://www.yasharthsonker.com" }],
  openGraph: {
    title: "Yasharth Sonker | Full Stack Developer & AI Enthusiast",
    description:
      "Portfolio of Yasharth Sonker — a skilled Full Stack Developer and AI Enthusiast building modern, scalable, and SEO-optimized web applications.",
    url: "https://www.yasharthsonker.com",
    siteName: "Yasharth Sonker Portfolio",
    images: [
      {
        url: "/images/MainLogo.jpg",
        width: 1200,
        height: 630,
        alt: "Yasharth Sonker Portfolio Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yasharth Sonker | Full Stack Developer Portfolio",
    description:
      "Explore Yasharth Sonker’s professional portfolio — featuring modern Next.js projects, AI integrations, and cutting-edge web development.",
    images: ["/images/MainLogo.jpg"],
    creator: "@yasharth_sonker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.yasharthsonker.com",
  },
  icons: {
    icon: "/images/MainLogo.jpg",
    shortcut: "/images/MainLogo.jpg",
    apple: "/images/MainLogo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="mjm3sKGeVMvfd0AJKfoGw7XrHmFWimXrq_0XcPL3Roo" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <Providers>
        {/* Main Content */}
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
