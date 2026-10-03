"use client";

import type { FilterControlsProps } from "@/types/ui";

export default function FilterControls({
  language,
  setLanguage,
  grade,
  setGrade,
}: FilterControlsProps) {
  const languages = ["all", "English", "Georgian"];
  const grades = ["all", "7+", "10+"];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 xl:gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 shrink-0">
          ენები:
        </span>

        <div className="flex items-center gap-1.5 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-200 shrink-0 ${
                language === lang
                  ? "bg-amber-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              {lang === "all"
                ? "ყველა"
                : lang === "English"
                  ? "ENG"
                  : lang === "Georgian"
                    ? "GEO"
                    : lang}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block h-6 w-[1px] bg-zinc-800/50" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 shrink-0">
          კლასები:
        </span>

        <div className="flex items-center gap-1.5 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/50">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors duration-200 shrink-0 ${
                grade === g
                  ? "bg-amber-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              {g === "all" ? "ყველა" : `${g}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
