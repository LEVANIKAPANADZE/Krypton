"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Header() {
  const locale = useLocale();
  const router = useRouter();

  const navItems = [
    { icon: "/navIcons/icon-nav-home.svg", path: "/" },
    { icon: "/navIcons/icon-nav-movies.svg", path: "/resource" },
    { icon: "/navIcons/icon-nav-bookmark.svg", path: "/project" },
    { icon: "/navIcons/icon-nav-tv-series.svg", path: "/task" },
  ];

  function toggleLanguage() {
    const newLocale = locale === "en" ? "ka" : "en";
    router.push(`/${newLocale}`);
  }

  return (
    <header className="w-full max-w-4xl mx-auto flex justify-between md:rounded-xl items-center p-4 md:p-6 xl:p-8 xl:rounded-xl bg-gray-800 xl:mt-[20px]">
      <img
        src="/content.png"
        alt="logo"
        className="w-6 h-6 rounded-md md:w-8 md:h-8 xl:w-10 xl:h-10"
      />

      <div className="flex gap-4 md:gap-6 xl:gap-8">
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <img
              src={item.icon}
              alt="nav"
              className="w-6 h-6 md:w-7 md:h-7 xl:w-9 xl:h-9"
            />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="
            px-3 py-1 rounded-md
            border border-cyan-500/40
            text-cyan-400
            hover:bg-cyan-500/10
            transition
            text-sm
          "
        >
          {locale.toUpperCase()}
        </button>

        <img
          src="/content.png"
          alt="logo"
          className="w-6 h-6 rounded-md md:w-8 md:h-8 xl:w-10 xl:h-10"
        />
      </div>
    </header>
  );
}
