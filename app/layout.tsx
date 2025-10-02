import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dialed",
    default: "Dialed | Your AI-Barista Copilot",
  },
  description:
    "Create a brew log and get AI-powered insights and recommendations to perfect your coffee brewing process.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dialed",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} flex min-h-svh flex-col antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        {/* Background Noise Overlay & Gradient BG */}
        <div
          className="fixed inset-0 z-10 before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:h-screen before:w-full before:bg-[url('../public/noise.gif')] before:opacity-[0.03] before:content-['']"
          style={{
            maskImage:
              "radial-gradient(circle at top, black 0%, transparent 50%)",
            WebkitMaskImage:
              "radial-gradient(circle at top, black 0%, transparent 50%)",
          }}
        >
          <Background />
        </div>
        {/* Page Content */}
        <div className="z-20 flex flex-grow">{children}</div>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
