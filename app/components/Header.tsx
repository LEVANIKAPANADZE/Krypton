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
    <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3.5 md:px-9 md:py-5 xl:px-14 flex items-center justify-between transition-all">
      <Link
        href="/"
        className="relative flex items-center gap-3 flex-shrink-0 group"
      >
        <img
          src="/KryptonNewLogo.png"
          alt="Krypton logo"
          className="w-9 h-9 md:w-11 md:h-11 rounded-md shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow duration-300"
        />
        <span className="text-zinc-100 font-serif font-extrabold tracking-widest text-lg md:text-xl group-hover:text-amber-500 transition-colors duration-300">
          KRYPTON
        </span>
      </Link>

      <HeaderNav navItems={navItems} />

      <div className="relative hidden md:flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link
              href="/saved"
              className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-amber-500"
            >
              შენახულები
            </Link>
            <Link
              href="/profile"
              aria-label="პროფილი"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/50 transition-colors duration-200 hover:border-amber-500/50 hover:bg-amber-500/10"
            >
              <img src="/user-icon.svg" alt="" className="w-5 h-5 opacity-80" />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
            >
              შესვლა
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_-2px_rgba(245,158,11,0.6)] text-zinc-950 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
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
