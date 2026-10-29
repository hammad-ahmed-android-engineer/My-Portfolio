import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeContext";
import { ExtensionShield } from "@/components/common/ExtensionShield";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammad-ahmed-android-engineer.vercel.app";

export const metadata: Metadata = {
  title: "Hammad Ahmed | Senior Android Engineer & Senior Android Developer",
  description:
    "Official portfolio of Hammad Ahmed, Senior Android Engineer specializing in native Android engineering, Kotlin, Jetpack Compose, Clean Architecture, Coroutines, Flow, Room, and high-performance offline-first mobile systems.",
  keywords: [
    "Hammad Ahmed",
    "Senior Android Engineer",
    "Senior Android Developer",
    "Lead Android Engineer",
    "Android Architect",
    "Android Software Engineer",
    "Kotlin",
    "Kotlin Coroutines",
    "Kotlin Flow",
    "StateFlow",
    "SharedFlow",
    "Jetpack Compose",
    "Compose Multiplatform",
    "Material Design 3",
    "Android SDK",
    "Android Studio",
    "Android 15",
    "Android 14",
    "Target SDK 35",
    "Clean Architecture Android",
    "MVVM",
    "MVI Pattern",
    "Unidirectional Data Flow",
    "Feature Modularization",
    "Multi-Module Architecture",
    "Dagger Hilt",
    "Koin DI",
    "Dependency Injection",
    "Room Database",
    "Offline First Architecture",
    "WorkManager",
    "Foreground Services",
    "Broadcast Receivers",
    "Retrofit 2",
    "OkHttp 4",
    "REST APIs",
    "Checkout.com Flow SDK",
    "Tap Payments SDK",
    "Payment Gateway Integration",
    "Performance Profiling",
    "Android Profiler",
    "ANR Elimination",
    "Cold Start Optimization",
    "LeakCanary",
    "Memory Management",
    "Baseline Profiles",
    "R8 Shrinking",
    "ProGuard Rules",
    "JUnit 5",
    "MockK",
    "Turbine Flow Testing",
    "Firebase Crashlytics",
    "Firebase Cloud Messaging",
    "CameraX API",
    "Mobile Software Engineering",
    "Native Android App Development",
    "Google Play Console",
  ],
  authors: [{ name: "Hammad Ahmed" }],
  creator: "Hammad Ahmed",
  publisher: "Hammad Ahmed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hammad Ahmed | Senior Android Engineer & Senior Android Developer",
    description:
      "Explore Hammad Ahmed's Android engineering portfolio, featuring Kotlin, Jetpack Compose, Clean Architecture, reactive programming, and modern mobile engineering solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Hammad Ahmed | Android Engineering Portfolio",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammad Ahmed | Senior Android Engineer",
    description:
      "Senior Android Engineer specializing in native Android development, Kotlin, Jetpack Compose, and Clean Architecture.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Hammad Ahmed — Senior Android Engineer Portfolio",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Hammad Ahmed Portfolio",
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Hammad Ahmed",
      jobTitle: "Senior Android Engineer",
      alternateName: [
        "Senior Android Developer",
        "Android Software Engineer",
        "Mobile Software Architect",
      ],
      description:
        "Senior Android Engineer with 5+ years of production experience building high-scale native Android apps, Jetpack Compose interfaces, offline-first Room architectures, and secure payment integrations with 99.99% crash-free stability.",
      url: siteUrl,
      sameAs: [
        "https://www.linkedin.com/in/hammad-ahmed-android-engineer",
        "https://github.com/hammad-ahmed-android-engineer",
      ],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "National University of Sciences and Technology (NUST)",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "COMSATS University Islamabad",
        },
      ],
      knowsAbout: [
        "Android Development",
        "Kotlin",
        "Jetpack Compose",
        "Clean Architecture",
        "Kotlin Coroutines & Flow",
        "StateFlow",
        "Dagger Hilt",
        "Room Database",
        "Offline-First Architecture",
        "WorkManager",
        "Retrofit & OkHttp",
        "Checkout.com Flow SDK",
        "Tap Payments SDK",
        "ANR Elimination",
        "Cold Start Optimization",
        "Android Profiler",
        "JUnit & MockK Testing",
        "Material Design 3",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100"
      >
        <ExtensionShield />
        <div id="app-root" className="flex min-h-full flex-col flex-1">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}