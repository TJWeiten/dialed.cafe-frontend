import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen justify-items-center p-8">
      <Navbar />

      {/* Main Content */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 p-8 pt-32"></div>
      <main className="row-start-2 flex flex-col gap-[32px] sm:items-start"></main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
