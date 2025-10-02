"use client";

import React, { useState } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Beans", href: "/dashboard/beans" },
  { name: "Brews", href: "/dashboard/brews" },
  { name: "Sauces", href: "/dashboard/sauces" },
  { name: "Grinders", href: "/dashboard/grinders" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="static z-50 mx-6 mt-6 mb-12 overflow-hidden rounded-xl bg-[linear-gradient(var(--panel-gradient))] outline-1 outline-[var(--color-panel-border)] backdrop-blur-md transition-all duration-300 ease-in-out">
      {/* Top Bar */}
      <div className="mx-auto h-24 px-8">
        <div className="grid h-full grid-cols-3 items-center md:flex md:justify-between">
          {/* Left: Logo */}
          <div className="justify-self-start">
            <div className="text-lg font-bold text-white text-shadow-[var(--shadowy-text)]">
              DIALED
            </div>
          </div>

          {/* Center: Hamburger (Mobile Only) */}
          <div className="justify-self-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon: Hamburger or Close (X) */}
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Center: Desktop Links (Desktop Only) */}
          <div className="hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-md font-semibold text-gray-300 transition-colors text-shadow-[var(--shadowy-text)] hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Avatar */}
          <div className="flex items-center gap-4 justify-self-end">
            <Image
              src="/avatar-placeholder.png"
              className="h-10 w-10 rounded-full p-1 ring-2 ring-gray-500"
              width={128}
              height={128}
              alt="User's Profile Image"
            />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="flex flex-col items-center space-y-4 px-2 pt-2 pb-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-md block rounded-md px-3 py-2 font-semibold text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
