interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="მასალის ძებნა..."
    />
  );
}
