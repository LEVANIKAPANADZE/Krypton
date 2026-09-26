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
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10"
      >
        <img src="/cheeseburger.svg" alt="" className="h-5 w-5 opacity-80" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="მენიუს დახურვა"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-zinc-950/80 backdrop-blur-sm"
          />

          <aside className="fixed inset-y-0 right-0 z-50 flex h-dvh w-72 max-w-[80%] flex-col gap-2 border-l border-zinc-800/50 bg-zinc-950 px-6 py-6 shadow-[-15px_0_40px_-10px_rgba(0,0,0,0.8)]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/KryptonNewLogo.png"
                  alt="Krypton logo"
                  className="h-8 w-8 rounded-md shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                />
                <span className="font-serif font-extrabold tracking-widest text-zinc-100">
                  KRYPTON
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="მენიუს დახურვა"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:border-amber-500/50 hover:text-amber-500 hover:bg-amber-500/10"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-amber-500 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-5 h-px bg-zinc-800/50" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-amber-500"
                >
                  შენახულები
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-amber-500"
                >
                  <img
                    src="/user-icon.svg"
                    alt=""
                    className="h-5 w-5 opacity-80"
                  />
                  პროფილი
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-auto mb-4">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-3 text-center font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white border border-zinc-800"
                >
                  შესვლა
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-amber-600 px-4 py-3 text-center font-bold tracking-wide text-zinc-950 transition-all hover:bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
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
