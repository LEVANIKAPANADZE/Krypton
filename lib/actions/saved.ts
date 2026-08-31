"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

type User = {
  _id?: ObjectId | string;
  id?: string;
  saved?: string[];
};

async function findUserBySessionId(sessionUserId: string) {
  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<User>("user");
  const objectId = ObjectId.isValid(sessionUserId)
    ? new ObjectId(sessionUserId)
    : null;

  return users.findOne(
    {
      $or: [{ _id: objectId ?? sessionUserId }, { id: sessionUserId }],
    },
    {
      projection: { _id: 1, id: 1, saved: 1 },
    },
  );
}

export async function getSavedIdsForCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return [];
  }

  const user = await findUserBySessionId(session.user.id);
  return user?.saved ?? [];
}

export async function getSavedItemsForCurrentUser() {
  const savedIds = await getSavedIdsForCurrentUser();

  if (savedIds.length === 0) {
    return [];
  }

  const client = await clientPromise;
  const db = client.db("data");
  const docs = await db
    .collection("info")
    .find({ id: { $in: savedIds } })
    .toArray();

  return docs.map((doc) => {
    const { _id, ...rest } = doc as any;
    return {
      ...rest,
      _id: _id ? String(_id) : undefined,
    };
  });
}

export async function toggleSaved(resourceId: string) {
  if (!resourceId || typeof resourceId !== "string") {
    throw new Error("Invalid resource ID");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized!");
  }

  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<User>("user");

  const user = await findUserBySessionId(session.user.id);
  const saved = user?.saved ?? [];
  const isSaved = saved.includes(resourceId);
  const nextSaved = isSaved
    ? saved.filter((id) => id !== resourceId)
    : [...new Set([...saved, resourceId])];

  const updateQuery = user?._id ? { _id: user._id } : { id: session.user.id };
  const normalizedId = ObjectId.isValid(session.user.id)
    ? new ObjectId(session.user.id)
    : undefined;

  await users.updateOne(
    updateQuery,
    {
      $set: {
        saved: nextSaved,
        ...(normalizedId ? {} : { id: session.user.id }),
      },
    },
    { upsert: true },
  );

  revalidatePath("/saved");
  revalidatePath("/resource");
  revalidatePath("/task");
  revalidatePath("/project");

  return {
    saved: !isSaved,
  };
}
