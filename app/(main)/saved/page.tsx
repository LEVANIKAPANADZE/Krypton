import Link from "next/link";
import { getSavedItemsForCurrentUser } from "@/lib/actions/saved";

export default async function Page() {
  const savedItems = await getSavedItemsForCurrentUser();

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold">შენახული მასალები</h1>

            <img
              src="/navIcons/icon-nav-bookmark.svg"
              alt="შენახული"
              className="h-7 w-7"
            />
          </div>

          <p className="text-zinc-400">თქვენი შენახული მასალები ერთ ადგილას</p>
        </header>

        <div className="mt-6">
          <input
            type="search"
            placeholder="მასალის ძებნა..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        {savedItems.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <h2 className="mb-3 text-xl font-semibold">
              შენახული მასალები ვერ მოიძებნა
            </h2>

            <p className="mb-5 text-zinc-400">
              მასალების შესანახად ჯერ დაათვალიერეთ ისინი.
            </p>

            <Link
              href="/resource"
              className="inline-block rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-black"
            >
              მასალების ნახვა
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {savedItems.map((item: any) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>

                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
