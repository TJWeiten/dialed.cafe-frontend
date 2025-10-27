import type { Metadata, Viewport } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/universal/Background";
import Footer from "@/components/universal/Footer";

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
        template: "%s | DIALED",
        default: "DIALED | Your AI-Barista Copilot",
    },
    description:
        "Create a brew log and get AI-powered insights and recommendations to perfect your coffee brewing process.",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "DIALED",
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
        <ClerkProvider
            appearance={{
                cssLayerName: "clerk",
                baseTheme: "simple",
                variables: {
                    colorPrimaryForeground: "#000",
                    colorForeground: "rgba(255, 255, 255, 0.9)",
                    colorBackground: "rgba(12, 13, 15, 0.5)",
                    colorInputBackground: "rgba(255, 255, 255, 0.05)",
                    colorInputText: "rgba(255, 255, 255, 0.9)",
                    colorBorder: "hsla(0, 0%, 100%, .9)",
                },
                elements: {
                    formButtonPrimary:
                        "bg-neutral-200 !text-black hover:bg-white",
                    socialButtonsBlockButton: "bg-neutral-200 hover:bg-white",
                    userButtonPopoverCard:
                        "w-[90vw] backdrop-blur-md transition-all duration-300 ease-in-out bg-black/30 !left-1/2 -translate-x-1/2 md:max-w-xs md:!left-full md:!-translate-x-[calc(100%+1.5rem)] mt-8",
                    avatarBox: "h-10 w-10",
                    userButtonOuterIdentifier:
                        "hidden md:inline text-md font-sans font-semibold text-gray-300 transition-colors text-shadow-[var(--shadowy-text)] hover:text-white",
                    userButtonPopoverActionButton: "text-white",
                    avatarImageActionsUpload: "text-white",
                    formButtonReset: "text-white",
                    button: "text-neutral-400",
                    userButtonTrigger: "focus:shadow-none",
                    footerActionLink: "text-white",
                    modalContent: "bg-black",
                },
            }}
        >
            <html className="dark" lang="en">
                <body
                    className={`${inter.variable} ${geistMono.variable} flex min-h-svh flex-col antialiased`}
                    style={{ margin: 0, padding: 0 }}
                >
                    {/* Background Noise Overlay & Gradient BG */}
                    <div
                        className="fixed inset-0 z-10 before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-screen before:w-full before:bg-[url('../public/noise.gif')] before:opacity-[0.03] before:content-['']"
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
        </ClerkProvider>
    );
}
