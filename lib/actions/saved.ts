"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

type User = {
  id: string;
  saved: string[];
};

export async function toggleSaved(resourceId: string) {
  if (!resourceId || typeof resourceId !== "string") {
    throw new Error("Invalid resource ID");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized!");
  }

  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<User>("user");

  const user = await users.findOne(
    { id: session.user.id },
    { projection: { saved: 1 } },
  );

  const saved = user?.saved ?? [];
  const isSaved = saved.includes(resourceId);

  if (isSaved) {
    await users.updateOne(
      { id: session.user.id },
      { $pull: { saved: resourceId } },
    );
  } else {
    await users.updateOne(
      { id: session.user.id },
      { $addToSet: { saved: resourceId } },
    );
  }

  revalidatePath("/saved");

  return {
    saved: !isSaved,
  };
}
