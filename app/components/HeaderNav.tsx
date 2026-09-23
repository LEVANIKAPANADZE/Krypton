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
    <nav className="relative hidden md:flex items-center gap-1.5">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`relative px-4.5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              isActive
                ? "text-purple-400 bg-purple-500/[0.08]"
                : "text-gray-400 hover:text-purple-400 hover:bg-white/[0.03]"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-4 right-4 -bottom-[15px] h-px bg-purple-400 shadow-[0_0_8px_rgba(185,79,224,0.8)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
