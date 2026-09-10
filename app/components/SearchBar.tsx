import Image from "next/image";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

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
        placeholder="მოიძიე მასალები..."
        className="w-full h-11 md:h-12 pl-11 pr-4 rounded-xl border border-zinc-800 bg-zinc-900/60 text-sm md:text-base text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500/60 focus:bg-zinc-900 focus:ring-4 focus:ring-cyan-500/10"
      />
    </div>
  );
}
