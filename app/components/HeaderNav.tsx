"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  path: string;
};

type HeaderNavProps = {
  navItems: NavItem[];
};

export default function HeaderNav({ navItems }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav className="relative hidden md:flex items-center gap-8 xl:gap-12">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive ? "text-amber-500" : "text-zinc-400 hover:text-amber-500"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-[26px] xl:-bottom-[30px] h-[2px] bg-amber-500 shadow-[0_-2px_10px_rgba(245,158,11,0.8)] rounded-t-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
