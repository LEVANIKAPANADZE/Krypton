"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="მენიუს გახსნა"
        aria-expanded={open}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-800 bg-white/[0.02] transition-colors hover:border-cyan-500/50"
      >
        <img src="/cheeseburger.svg" alt="" className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="მენიუს დახურვა"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/90 backdrop-blur-sm"
          />

          <aside className="fixed inset-y-0 right-0 z-50 flex h-dvh w-72 max-w-[80%] flex-col gap-2 border-l border-cyan-500/20 bg-[#050505] px-6 py-6 shadow-[-10px_0_40px_-10px_rgba(0,0,0,0.6)]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="/KryptonNewLogo.png"
                  alt="Krypton logo"
                  className="h-8 w-8 rounded-lg"
                />

                <span className="font-bold tracking-wide text-white">
                  KRYPTON
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="მენიუს დახურვა"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-3 font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-500/[0.08] text-cyan-400"
                        : "text-gray-300 hover:bg-white/[0.03] hover:text-cyan-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-3 h-px bg-gray-800" />

            {isAuthenticated ? (
              <>
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-gray-300 transition-colors hover:bg-white/[0.03] hover:text-cyan-400"
                >
                  შენახულები
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 font-medium text-gray-300 transition-colors hover:bg-white/[0.03] hover:text-cyan-400"
                >
                  <img
                    src="/user-icon.svg"
                    alt=""
                    className="h-5 w-5 opacity-80"
                  />
                  პროფილი
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-gray-300 transition-colors hover:bg-white/[0.03] hover:text-cyan-400"
                >
                  შესვლა
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-lg bg-cyan-500 px-3 py-3 text-center font-semibold text-black transition-colors hover:bg-cyan-400"
                >
                  რეგისტრაცია
                </Link>
              </>
            )}
          </aside>
        </>
      )}
    </div>
  );
}
