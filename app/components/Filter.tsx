"use client";

import { useState } from "react";

import SaveButton from "../components/saveButton";

interface FilterItem {
  id: string;
  type: string;
  language: string;
  grade: string;
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface FilterProps {
  data: FilterItem[];
  type: string;
  savedIds?: string[];
}

export default function Filter({ data, type, savedIds = [] }: FilterProps) {
  const [language, setLanguage] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");

  const languages = ["all", "English", "Georgian"];
  const grades = ["all", "7+", "10+"];

  const filtered = data.filter((item) => {
    return (
      item.type === type &&
      (language === "all" || item.language === language) &&
      (grade === "all" || item.grade === grade)
    );
  });

  return (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filtered.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-12 h-12 relative z-10"
                  />

                  <div className="absolute inset bg-cyan-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                    კლასი {item.grade}
                  </span>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <SaveButton
                      resourceId={item.id}
                      initialSaved={savedIds.includes(item.id)}
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors mb-2">
                {item.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">
                ID: {item.id.slice(0, 8)}
              </span>

              <span className="text-sm font-bold text-white group-hover:text-cyan-400 flex items-center gap-2 transition-all">
                გახსნა{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
