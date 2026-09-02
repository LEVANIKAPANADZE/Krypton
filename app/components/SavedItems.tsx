"use client";

import { useState } from "react";
import Image from "next/image";
import SaveButton from "./saveButton";

interface SavedItemsProps {
  items: any[];
  savedIds?: string[];
}

export default function SavedItems({ items, savedIds = [] }: SavedItemsProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [language, setLanguage] = useState("all");

  const types = ["all", "resource", "task", "project"];
  const languages = ["all", "English", "Georgian"];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = type === "all" || item.type === type;
    const matchesLanguage = language === "all" || item.language === language;

    return matchesSearch && matchesType && matchesLanguage;
  });

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center bg-zinc-950/50 p-2 rounded-2xl border border-zinc-900">
        <div className="relative w-full xl:max-w-md">
          <label htmlFor="saved-search" className="sr-only">
            მასალის ძებნა
          </label>

          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Image src="/search-icon.svg" alt="" width={20} height={20} />
          </div>

          <input
            id="saved-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="მასალის ძებნა..."
            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
          <div className="flex items-center p-1 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
            {types.map((itemType) => (
              <button
                key={itemType}
                type="button"
                onClick={() => setType(itemType)}
                aria-pressed={type === itemType}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  type === itemType
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {itemType === "all"
                  ? "ყველა"
                  : itemType === "resource"
                    ? "რესურსები"
                    : itemType === "task"
                      ? "დავალებები"
                      : "პროექტები"}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
            {languages.map((itemLanguage) => (
              <button
                key={itemLanguage}
                type="button"
                onClick={() => setLanguage(itemLanguage)}
                aria-pressed={language === itemLanguage}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === itemLanguage
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {itemLanguage === "all"
                  ? "ყველა"
                  : itemLanguage === "English"
                    ? "ENG"
                    : "GEO"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 relative z-10 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={item.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                    კლასი {item.grade}
                  </span>

                  <div
                    className="z-20 relative hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <SaveButton
                      resourceId={String(item.id)}
                      initialSaved={savedIds.includes(String(item.id))}
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-3">
                {item.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                ID: {String(item.id).slice(0, 8)}
              </span>

              <span className="text-sm font-bold text-zinc-300 group-hover:text-cyan-400 flex items-center gap-2 transition-all">
                გახსნა
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 mb-4 bg-zinc-900/50 rounded-full flex items-center justify-center">
            <Image src="/search-icon.svg" alt="" width={32} height={32} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            შედეგი ვერ მოიძებნა
          </h3>

          <p className="text-zinc-500">
            ამ ფილტრებით მასალა არ მოიძებნა. სცადეთ სხვა პარამეტრები.
          </p>
        </div>
      )}
    </div>
  );
}
