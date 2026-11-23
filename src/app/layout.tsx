import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AML/KYC Wiki — Financial Crime Operations Knowledge Base",
    template: "%s | AML/KYC Wiki",
  },
  description:
    "The knowledge base for AML, KYC and financial-crime operations: courses on fraud prevention, sanctions screening, counter-terrorist financing and financial intelligence.",
  openGraph: {
    title: "AML/KYC Wiki — Financial Crime Operations Knowledge Base",
    description:
      "Courses, frameworks and field guides for AML, KYC and financial-crime operations analysts.",
    type: "website",
    siteName: "AML/KYC Wiki",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AML/KYC Wiki",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true)}catch(e){}",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
