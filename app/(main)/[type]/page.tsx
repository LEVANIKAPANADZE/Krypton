import { notFound } from "next/navigation";
import Link from "next/link";
import Filter from "../../components/Filter";
import clientPromise from "@/lib/mongodb";
import {
  getSavedIdsForCurrentUser,
  getSavedItemsForCurrentUser,
} from "@/lib/actions/saved";

type Type = "resource" | "task" | "project" | "saved";

type PageItem = {
  _id: string;
  type?: string;
  language?: string;
  grade?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
};

const validTypes: Type[] = ["resource", "task", "project", "saved"];

const titleMap: Record<Type, string> = {
  resource: "რესურსები",
  task: "დავალებები",
  project: "პროექტები",
  saved: "შენახული რესურსები",
};

const countLabelMap: Record<Type, string> = {
  resource: "მასალა",
  task: "დავალება",
  project: "პროექტი",
  saved: "შენახული რესურსები",
};

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!validTypes.includes(type as Type)) {
    notFound();
  }

  const currentType = type as Type;

  let data: PageItem[] = [];

  try {
    if (currentType === "saved") {
      data = await getSavedItemsForCurrentUser();
    } else {
      const client = await clientPromise;
      const db = client.db("data");

      data = await db
        .collection<PageItem>("info")
        .find({ type: currentType })
        .toArray();
    }
  } catch (error) {
    console.error("Failed to load page data:", error);
  }

  const sanitizedData = data.map((item) => ({
    ...item,
    _id: String(item._id),
  }));

  const savedIds = await getSavedIdsForCurrentUser();

  const isEmpty = sanitizedData.length === 0;

  return (
    <main className="min-h-screen bg-[#07090e] text-white selection:bg-cyan-500/30 font-sans antialiased pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-8 md:pt-14 xl:pt-16">
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/60 pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white">
              {titleMap[currentType]}
            </h1>

            <p className="text-zinc-400 text-sm md:text-base max-w-xl font-normal mt-2">
              თქვენი ქიმიის სასწავლო მასალები ერთ ორგანიზებულ სივრცეში.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs md:text-sm font-semibold text-zinc-300 self-start md:self-auto shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {sanitizedData.length} {countLabelMap[currentType]}
            </span>
          </div>
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-28 px-4 text-center bg-zinc-950/60 border border-zinc-800/80 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentType === "saved"
                ? "შენახული მასალები არ არის"
                : currentType === "task"
                  ? "დავალებები არ არის"
                  : currentType === "project"
                    ? "პროექტები არ არის"
                    : "რესურსები არ არის"}
            </h2>

            <p className="text-zinc-400 mb-8 max-w-md text-sm md:text-base">
              {currentType === "saved"
                ? "ჯერ არ გაქვთ შენახული ქიმიის მასალები."
                : currentType === "task"
                  ? "ამჟამად არ არის წარმოდგენილი დავალებები."
                  : `ამ კატეგორიაში ჯერ არ არის ${countLabelMap[currentType]}.`}
            </p>

            <Link
              href={currentType === "task" ? "/" : "/resource"}
              className="inline-flex items-center gap-2 px-6 py-3.5 font-bold text-xs md:text-sm text-black bg-cyan-400 rounded-xl transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <span>
                {currentType === "task"
                  ? "მთავარ გვერდზე დაბრუნება"
                  : "მასალების დათვალიერება"}
              </span>
              <span className="text-base">→</span>
            </Link>
          </div>
        ) : (
          <Filter
            data={sanitizedData}
            type={currentType}
            savedIds={savedIds}
            showSaveButton={currentType !== "task"}
          />
        )}
      </div>
    </main>
  );
}
