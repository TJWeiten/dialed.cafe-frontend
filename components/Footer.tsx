import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 py-6">
      <div className="mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <span className="text-sm text-gray-300">
          © 2025 <b>Dialed</b>.
        </span>
        <div className="text-sm text-gray-300">
          Made with ♥︎ by
          <a
            className="ml-1 font-semibold hover:underline hover:decoration-2 hover:underline-offset-4"
            href="https://tjweiten.com"
          >
            T.J. Weiten
          </a>
          .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
