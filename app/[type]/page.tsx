import { notFound } from "next/navigation";
import Filter from "../components/Filter";
import clientPromise from "@/lib/mongodb";

type Type = "resource" | "task" | "project";

export default async function Page({
  params,
}: {
  params: Promise<{ type: Type }>;
}) {
  const { type } = await params;
  const validTypes: Type[] = ["resource", "task", "project"];

  if (!validTypes.includes(type)) notFound();

  let data: any[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("data");
    data = await db.collection("info").find({}).toArray();
  } catch (e) {
    console.error(e);
    data = [];
  }

  const sanitizedData = data
    .filter((item: any) => item.type === type)
    .map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    }));

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 antialiased">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-10 border-l-4 border-cyan-500 pl-5">
          <h1 className="text-3xl md:text-5xl font-bold capitalize tracking-tighter">
            {type}s
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">
            {sanitizedData.length} entries active in database
          </p>
        </header>

        <Filter data={sanitizedData} type={type} />
      </div>
    </main>
  );
}
