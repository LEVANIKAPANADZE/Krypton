"use client";

import { useState } from "react";
import SaveButton from "./saveButton";

interface SavedItemsProps {
  items: any[];
}

export default function SavedItems({ items }: SavedItemsProps) {
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
    <div>
      <img src="/search-icon.svg" alt="მოძებნის ხატულა" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="მასალის ძებნა..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((itemType) => (
          <button
            key={itemType}
            type="button"
            onClick={() => setType(itemType)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              type === itemType
                ? "border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
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

      <div className="mt-3 flex flex-wrap gap-2">
        {languages.map((itemLanguage) => (
          <button
            key={itemLanguage}
            type="button"
            onClick={() => setLanguage(itemLanguage)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              language === itemLanguage
                ? "border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            {itemLanguage === "all"
              ? "ყველა"
              : itemLanguage === "English"
                ? "ინგლისური"
                : "ქართული"}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-cyan-500/50"
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-1"
              >
                <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
                <p className="text-zinc-400">{item.description}</p>
              </a>
              <SaveButton resourceId={item.id} initialSaved={true} />
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-zinc-500">მასალა ვერ მოიძებნა.</p>
      )}
    </div>
  );
}
