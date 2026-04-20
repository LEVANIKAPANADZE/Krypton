import { notFound } from "next/navigation";
import data from "@/data.json";

type Type = "resource" | "task" | "project";

type Props = {
  params: Promise<{
    type: Type;
  }>;
};

export default async function Page({ params }: Props) {
  const { type } = await params;

  const validTypes: Type[] = ["resource", "task", "project"];

  if (!validTypes.includes(type)) {
    notFound();
  }

  const filtered = data.filter((item) => item.type === type);

  return (
    <main>
      <h1>{type}</h1>

      {filtered.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </main>
  );
}
