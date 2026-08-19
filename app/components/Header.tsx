import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import HeaderNav from "./HeaderNav";
import HeaderMobileMenu from "./HeaderMobileMenu";

const navItems = [
  { label: "მთავარი", path: "/" },
  { label: "რესურსები", path: "/resource" },
  { label: "პროექტები", path: "/project" },
  { label: "დავალებები", path: "/task" },
];

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_1px_0_0_rgba(34,211,238,0.05)] px-4 py-3.5 md:px-9 md:py-5 xl:px-14 flex items-center justify-between">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-cyan-500/[0.06] blur-3xl" />

      <Link
        href="/"
        className="relative flex items-center gap-2.5 flex-shrink-0"
      >
        <img
          src="/KryptonNewLogo.png"
          alt="Krypton logo"
          className="w-9 h-9 md:w-11 md:h-11 rounded-lg"
        />
        <span className="text-white font-bold tracking-wide text-base md:text-lg">
          KRYPTON
        </span>
      </Link>

      <HeaderNav navItems={navItems} />

      <div className="relative hidden md:flex items-center gap-3.5">
        {isAuthenticated ? (
          <>
            <Link
              href="/saved"
              className="px-4.5 py-2.5 text-sm font-medium text-gray-400 rounded-lg transition-colors duration-200 hover:text-cyan-400 hover:bg-white/[0.03]"
            >
              შენახულები
            </Link>
            <Link
              href="/profile"
              aria-label="პროფილი"
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-gray-800 bg-white/[0.02] transition-colors duration-200 hover:border-cyan-500/50 hover:bg-cyan-500/[0.05]"
            >
              <img src="/user-icon.svg" alt="" className="w-5 h-5 opacity-80" />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4.5 py-2.5 text-sm font-medium text-gray-400 rounded-lg transition-colors duration-200 hover:text-cyan-400 hover:bg-white/[0.03]"
            >
              შესვლა
            </Link>
            <Link
              href="/register"
              className="px-5.5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_22px_-4px_rgba(6,182,212,0.5)] text-black text-sm font-semibold transition-all duration-200"
            >
              რეგისტრაცია
            </Link>
          </>
        )}
      </div>

      <HeaderMobileMenu navItems={navItems} isAuthenticated={isAuthenticated} />
    </header>
  );
}
