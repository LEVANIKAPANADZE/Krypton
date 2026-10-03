import Image from "next/image";
import type { SearchBarProps } from "@/types/ui";

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="relative w-full xl:max-w-md">
      <Image
        src="/search-icon.svg"
        alt="ძიების ხატულა"
        width={16}
        height={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
      />

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ჩაწერეთ საძიებო სიტყვა ან ფრაზა..."
        className="w-full h-11 md:h-12 pl-11 pr-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 text-sm md:text-base text-zinc-100 placeholder-zinc-500 outline-none transition-colors duration-200 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-300/20"
      />
    </div>
  );
}
