import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSavedIdsForCurrentUser } from "@/lib/actions/saved";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return (
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">შენახული მასალები</h1>
          <p className="text-zinc-400 mb-6">
            თქვენ უნდა შეხვიდეთ სისტემაში, რათა ნახოთ შენახული რესურსები.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full bg-cyan-500 px-5 py-2.5 font-semibold text-black"
          >
            შესვლა
          </Link>
        </div>
      </main>
    );
  }

  const savedIds = await getSavedIdsForCurrentUser();

  const client = await import("@/lib/mongodb").then((mod) => mod.default);
  const db = client.db("data");

  const savedItems = savedIds.length
    ? await db
        .collection("info")
        .find({ id: { $in: savedIds } })
        .toArray()
    : [];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">შენახული მასალები</h1>
        </header>

        {savedItems.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-400">
            შენახული მასალები არ არის.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {savedItems.map((item: any) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-cyan-500/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-zinc-700 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    {item.type}
                  </span>
                  <span className="text-xs text-zinc-500">
                    კლასი {item.grade}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
