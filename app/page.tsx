import Logo from "@/components/Logo";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex w-full flex-grow flex-col">
      <Logo />
      <main className="flex flex-grow -translate-y-48 items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center gap-8 p-8">
          <h1 className="text-center text-4xl leading-[110%] font-semibold text-white opacity-90 text-shadow-[var(--shadowy-text)] md:text-7xl">
            Your AI-powered barista{" "}
            <span className="relative">
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-clip-text text-transparent select-none"
                style={{
                  backgroundImage:
                    "conic-gradient(from 136.95deg at 50% 50%, #0294fe -55.68deg, #ff2136 113.23deg, #9b4dff 195deg, #0294fe 304.32deg, #ff2136 473.23deg)",
                  filter: "blur(16px)",
                  WebkitBackgroundClip: "text",
                  transform: "scale(1.1, 1.2)",
                }}
              >
                copilot
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-clip-text text-transparent select-none"
                style={{
                  backgroundImage:
                    "conic-gradient(from 136.95deg at 50% 50%, #0294fe -55.68deg, #ff2136 113.23deg, #9b4dff 195deg, #0294fe 304.32deg, #ff2136 473.23deg)",
                  filter: "blur(12px)", // Reduced blur for the intense core
                  WebkitBackgroundClip: "text",
                  transform: "scale(1.1, 1.2)",
                }}
              >
                copilot
              </span>
              {/* The sharp text layer (top) */}
              <span className="relative z-10">copilot</span>
            </span>
            .
          </h1>
          <p className="text-center text-xl font-medium tracking-wide text-balance text-white text-shadow-[var(--shadowy-text)]">
            Track beans, log brews, and get AI-powered advice to pull the
            perfect shot, every time.
          </p>
          <Link href="/sign-up">
            <button className="mt-8 rounded-md bg-neutral-200 px-4 py-2 font-semibold text-gray-800 transition-all duration-200 ease-in-out hover:bg-white">
              Get Brewing <span className="ml-2">→</span>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
