"use client";

import { useSearchParams } from "next/navigation";
import data from "@/data.json";

export default function Learn() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const filtered = type ? data.filter((item) => item.type === type) : data;

  return (
    <main>
      <h1>{type || "all"}</h1>

      {filtered.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </main>
  );
}
