import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientCanvasBackground from "../components/ClientCanvasBackground";

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
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dialed",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  height: "device-height",
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
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        <main className="fixed inset-0 before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-full before:bg-[url('../public/noise.gif')] before:opacity-[0.03] before:content-['']">
          <ClientCanvasBackground />
          <div className="relative z-20 h-full overflow-y-auto pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
