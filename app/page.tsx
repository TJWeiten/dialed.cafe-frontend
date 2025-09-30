import Footer from "@/components/Footer";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow items-center justify-center">
        {/* Main Content */}
        <div className="flex w-full max-w-3xl flex-col items-center gap-8 p-8">
          <h1 className="text-center text-4xl leading-[110%] font-semibold text-white opacity-90 text-shadow-[var(--shadowy-text)] md:text-7xl">
            Your AI-powered barista copilot.
          </h1>
          <p className="text-center text-xl font-medium tracking-wide text-balance text-white text-shadow-[var(--shadowy-text)]">
            Track beans, log brews, and get AI-powered advice to pull the
            perfect shot, every time.
          </p>
          <Link href="/dashboard">
            <button className="mt-8 rounded-md bg-neutral-200 px-4 py-2 font-semibold text-gray-800 transition-all duration-200 ease-in-out hover:bg-white">
              Get Brewing <span className="ml-2">→</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
