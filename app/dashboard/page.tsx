import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  return (
    <main className="flex flex-grow items-start justify-center">
      {/* Main Content */}
      <div className="flex w-full max-w-3xl flex-grow flex-col items-start justify-center gap-8 p-8 pt-10">
        <h1 className="text-center text-4xl leading-[110%] font-semibold text-white opacity-90 text-shadow-[var(--shadowy-text)] md:text-7xl">
          Welcome to your dashboard
        </h1>
        <p className="text-center text-xl font-medium tracking-wide text-balance text-white text-shadow-[var(--shadowy-text)]">
          Here you can track your beans, log brews, and get AI-powered advice to
          pull the perfect shot, every time.
        </p>
        {/* Add more dashboard content here */}
      </div>
    </main>
  );
}
