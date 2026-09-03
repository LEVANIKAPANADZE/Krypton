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
    <div className="flex flex-col md:flex-row md:items-center gap-8 xl:gap-16 xl:scale-110 origin-left mb-10 transition-transform">
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          ენები
        </span>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              style={{ cursor: "pointer" }}
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                language === lang
                  ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {lang === "all"
                ? "ყველა"
                : lang === "English"
                  ? "ინგლისური"
                  : lang === "Georgian"
                    ? "ქართული"
                    : lang}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block h-10 w-[1px] bg-zinc-800 mt-6" />

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          კლასები
        </span>

        <div className="flex flex-wrap gap-2">
          {grades.map((g) => (
            <button
              style={{ cursor: "pointer" }}
              key={g}
              onClick={() => setGrade(g)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                grade === g
                  ? "bg-white border-white text-black"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {g === "all" ? "ყველა კლასი" : `კლასი ${g}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
