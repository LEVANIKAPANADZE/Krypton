export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto animate-pulse">
        <header className="mb-10 border-l-4 border-zinc-800 pl-5">
          <div className="h-10 w-48 bg-zinc-800 rounded mb-2"></div>
          <div className="h-4 w-32 bg-zinc-900 rounded"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-zinc-900/40 rounded-xl border border-zinc-800 shadow-sm"
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}
