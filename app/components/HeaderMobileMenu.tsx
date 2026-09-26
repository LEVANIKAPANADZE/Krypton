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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-100 transition-colors hover:border-amber-400/50"
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
        <div className="absolute right-0 top-full mt-3 w-72 rounded-xl border border-zinc-800 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-md">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-400"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href="/saved"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-400"
                >
                  შენახულები
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-400"
                >
                  პროფილი
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-amber-400"
                >
                  შესვლა
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-amber-500 px-3 py-2 text-center text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
                >
                  რეგისტრაცია
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
