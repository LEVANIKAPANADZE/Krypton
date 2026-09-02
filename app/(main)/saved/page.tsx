import Link from "next/link";
import SavedItems from "../../components/SavedItems";
import { getSavedItemsForCurrentUser } from "@/lib/actions/saved";

export default async function Page() {
  const savedItems = await getSavedItemsForCurrentUser();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 xl:py-24">
        <div className="mb-12 border-b border-zinc-900 pb-8">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            შენახული მასალები
          </h1>
          <p className="mt-4 text-zinc-400 text-lg md:text-xl max-w-2xl">
            თქვენი ფავორიტი რესურსები, დავალებები და პროექტები ერთ სივრცეში.
          </p>
        </div>

        {savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 px-4 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-16 h-16 mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              შენახული მასალები ვერ მოიძებნა
            </h2>
            <p className="text-zinc-500 mb-10 max-w-md text-base md:text-lg">
              მასალების შესანახად და სწრაფად მოსაძებნად, დაათვალიერეთ ჩვენი
              ბაზა.
            </p>

            <Link
              href="/resource"
              className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-cyan-400 rounded-xl overflow-hidden transition-all hover:bg-cyan-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050505]"
            >
              <span className="relative z-10 flex items-center gap-2">
                მასალების დათვალიერება
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </div>
        ) : (
          <SavedItems items={savedItems} />
        )}
      </div>
    </main>
  );
}
