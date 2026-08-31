"use client";

import { useState } from "react";

interface SavedItemsProps {
  items: any[];
}

export default function SavedItems({ items }: SavedItemsProps) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="მასალის ძებნა..."
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-cyan-500/50"
          >
            <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
            <p className="text-zinc-400">{item.description}</p>
          </a>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-zinc-500">მასალა ვერ მოიძებნა.</p>
      )}
    </div>
  );
}
