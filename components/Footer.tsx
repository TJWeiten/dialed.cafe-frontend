export default function Footer() {
  return (
    <footer className="z-20 w-full px-4 py-6 select-none">
      <div className="mx-auto flex flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-300">
          © 2025 <b className="text-neutral-100">DIALED</b>
        </span>
        <div className="text-sm text-gray-300">
          Made with <span className="text-red-500">♥︎</span> by
          <a
            className="ml-1 font-semibold hover:underline hover:decoration-2 hover:underline-offset-4"
            href="https://tjweiten.com"
          >
            T.J. Weiten
          </a>
        </div>
      </div>
    </footer>
  );
}
