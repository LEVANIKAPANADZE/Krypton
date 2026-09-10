import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Filter from "../../components/Filter";
import clientPromise from "@/lib/mongodb";
import {
  getSavedIdsForCurrentUser,
  getSavedItemsForCurrentUser,
} from "@/lib/actions/saved";

type Type = "resource" | "task" | "project" | "saved";

const titleMap: Record<Type, string> = {
  resource: "რესურსები",
  task: "დავალებები",
  project: "პროექტები",
  saved: "შენახული მასალები",
};

export default async function Page({
  params,
}: {
  params: Promise<{ type: Type }>;
}) {
  const { type } = await params;
  const validTypes: Type[] = ["resource", "task", "project", "saved"];

  if (!validTypes.includes(type)) notFound();

  let data: any[] = [];
  let sanitizedData: any[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("data");
    data = await db.collection("info").find({}).toArray();
  } catch (e) {
    console.error(e);
    data = [];
  }

  if (type === "saved") {
    try {
      const savedItems = await getSavedItemsForCurrentUser();
      sanitizedData = savedItems.map((item: any) => ({
        ...item,
        _id: item._id?.toString ? item._id.toString() : String(item._id),
      }));
    } catch (e) {
      console.error(e);
      sanitizedData = [];
    }
  } else {
    sanitizedData = data
      .filter((item: any) => item.type === type)
      .map((item: any) => ({
        ...item,
        _id: item._id.toString(),
      }));
  }

  const savedIds = await getSavedIdsForCurrentUser();

  return (
    <main className="min-h-screen bg-[#07090e] text-white selection:bg-cyan-500/30 font-sans antialiased pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-8 md:pt-14 xl:pt-16">
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/60 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white">
                {titleMap[type]}
              </h1>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl font-normal">
              თქვენი ქიმიის სასწავლო მასალები ერთ ორგანიზებულ სივრცეში.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs md:text-sm font-semibold text-zinc-300 self-start md:self-auto shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{sanitizedData.length} შენახული მასალა</span>
          </div>
        </header>

        {sanitizedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-28 px-4 text-center bg-zinc-950/60 border border-zinc-800/80 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />

            <div className="w-16 h-16 mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shadow-lg">
              <Image
                src="/navIcons/icon-nav-bookmark.svg"
                alt=""
                width={32}
                height={32}
                className="opacity-70"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              შენახული მასალები ვერ მოიძებნა
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md text-sm md:text-base">
              შეინახეთ საინტერესო ქიმიის მასალები და ისინი გამოჩნდება ამ
              გვერდზე.
            </p>

            <Link
              href="/resource"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-bold text-xs md:text-sm text-black bg-cyan-400 rounded-xl transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <span>მასალების დათვალიერება</span>
              <span className="text-base">→</span>
            </Link>
          </div>
        ) : (
          <Filter data={sanitizedData} type={type} savedIds={savedIds} />
        )}
      </div>
    </main>
  );
}
