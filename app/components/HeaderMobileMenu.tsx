"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  path: string;
};

type HeaderMobileMenuProps = {
  navItems: NavItem[];
  isAuthenticated: boolean;
};

export default function HeaderMobileMenu({
  navItems,
  isAuthenticated,
}: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-100 transition-colors hover:border-amber-300/50"
      >
        <span className="flex flex-col items-center gap-1.5">
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-zinc-950/80 backdrop-blur-sm"
          />

          <aside className="fixed inset-y-0 right-0 z-40 flex h-dvh w-72 max-w-[80%] flex-col gap-2 border-l border-zinc-800/50 bg-zinc-950 px-6 pt-24 pb-6 shadow-[-15px_0_40px_-10px_rgba(0,0,0,0.8)]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 mb-6"
            >
              <img
                src="/KryptonNewLogo.png"
                alt="Krypton logo"
                className="w-9 h-9 rounded-md shadow-[0_0_15px_rgba(252,211,77,0.15)] group-hover:shadow-[0_0_20px_rgba(252,211,77,0.3)] transition-shadow duration-300"
              />
              <span className="text-zinc-100 font-serif font-extrabold tracking-widest text-lg group-hover:text-amber-300 transition-colors duration-300">
                KRYPTON
              </span>
            </Link>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="my-3 h-px bg-zinc-800/50" />

            {isAuthenticated ? (
              <nav className="flex flex-col gap-1">
                <Link
                  href="/saved"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-300"
                >
                  შენახულები
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-300"
                >
                  პროფილი
                </Link>
              </nav>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-zinc-800 px-4 py-3 text-center text-sm font-medium text-zinc-300 transition-colors hover:border-amber-300/50 hover:text-white"
                >
                  შესვლა
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-amber-400 px-4 py-3 text-center text-sm font-bold tracking-wide text-zinc-950 shadow-[0_0_15px_-3px_rgba(252,211,77,0.4)] transition-all hover:bg-amber-300 hover:shadow-[0_0_25px_-2px_rgba(252,211,77,0.6)]"
                >
                  რეგისტრაცია
                </Link>
              </div>
            )}
          </aside>
        </>
      )}
    </div>
  );
}