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
    <nav className="relative hidden md:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`relative px-5 py-2.5 text-base font-medium rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-cyan-400 bg-cyan-500/[0.08]"
                : "text-gray-400 hover:text-cyan-400 hover:bg-white/[0.03]"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-5 right-5 -bottom-[17px] h-px bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
