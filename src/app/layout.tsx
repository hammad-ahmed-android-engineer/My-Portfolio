import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hammad Ahmed | Senior Android Engineer & Senior Android Developer",
  description:
    "Official portfolio of Hammad Ahmed, Senior Android Engineer specializing in native Android engineering, Kotlin, Jetpack Compose, Clean Architecture, Coroutines, Flow, and high performance offline first mobile systems.",
  keywords: [
    "Hammad Ahmed",
    "Android Developer",
    "Android Engineer",
    "Senior Android Developer",
    "Senior Android Engineer",
    "Kotlin",
    "Jetpack Compose",
    "Android SDK",
    "Android Studio",
    "Clean Architecture",
    "MVVM",
    "MVI",
    "Coroutines",
    "Flow",
    "StateFlow",
    "Dagger Hilt",
    "Koin",
    "Dependency Injection",
    "Room Database",
    "Offline First Architecture",
    "WorkManager",
    "Foreground Services",
    "Broadcast Receivers",
    "Material Design 3",
    "Android Jetpack",
    "Architecture Components",
    "Retrofit",
    "OkHttp",
    "REST APIs",
    "Performance Profiling",
    "Memory Management",
    "Baseline Profiles",
    "R8 Optimization",
    "Gradle Build Optimization",
    "Unit Testing",
    "Mobile Software Engineering",
    "Native Android App Development",
  ],
  authors: [{ name: "Hammad Ahmed" }],
  creator: "Hammad Ahmed",
  publisher: "Hammad Ahmed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hammad-ahmed.github.io"),
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
    url: "/",
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hammad Ahmed",
  jobTitle: "Senior Android Engineer",
  alternateName: [
    "Senior Android Developer",
    "Android Engineer",
    "Android Developer",
  ],
  description:
    "Senior Android Engineer specializing in native Android engineering, Kotlin, Jetpack Compose, Clean Architecture, Coroutines, Flow, and high performance mobile systems.",
  knowsAbout: [
    "Android Development",
    "Kotlin",
    "Jetpack Compose",
    "Clean Architecture",
    "Coroutines",
    "StateFlow",
    "Dagger Hilt",
    "Room Database",
    "Offline First Architecture",
    "Mobile Software Engineering",
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
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function () {
          var allowed = { lang: true, dir: true, class: true, style: true };

          function clean(el) {
            if (!el) return;
            for (var i = el.attributes.length - 1; i >= 0; i--) {
              var name = el.attributes[i].name;
              if (!allowed[name]) el.removeAttribute(name);
            }
          }

          function cleanAll() {
            clean(document.documentElement);
            clean(document.body);
          }

          cleanAll();

          // Extensions can add attributes after this script runs, so watch for changes
          var observer = new MutationObserver(cleanAll);
          observer.observe(document.documentElement, { attributes: true });

          document.addEventListener("DOMContentLoaded", function () {
            cleanAll();
            if (document.body) {
              observer.observe(document.body, { attributes: true });
            }
          });
        })();
      `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}