"use client";

interface FilterControlsProps {
  language: string;
  setLanguage: (lang: string) => void;
  grade: string;
  setGrade: (g: string) => void;
}

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
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 shrink-0">
          ენები:
        </span>

        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                language === lang
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
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

      <div className="hidden md:block h-6 w-[1px] bg-zinc-800" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 shrink-0">
          კლასები:
        </span>

        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                grade === g
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
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
