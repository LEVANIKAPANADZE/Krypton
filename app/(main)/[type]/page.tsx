import { notFound } from "next/navigation";
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
  saved: "შენახული ჩანაწერები",
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
    <main className="min-h-screen bg-black text-white p-6 md:p-12 antialiased">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-10 border-l-4 border-cyan-500 pl-5">
          <h1 className="text-3xl md:text-5xl font-bold capitalize tracking-tighter">
            {titleMap[type]}
          </h1>
          <p className="text-zinc-500 text-sm mt-3 xl:mt-5 font-medium">
            მონაცემთა ბაზაში {sanitizedData.length} აქტიური ჩანაწერია
          </p>
        </header>

        <Filter data={sanitizedData} type={type} savedIds={savedIds} />
      </div>
    </main>
  );
}
