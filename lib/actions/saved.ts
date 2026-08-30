"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

type User = {
  _id?: ObjectId;
  id?: string;
  saved?: string[];
};

async function getSingleUserDocument(sessionUserId: string) {
  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<User>("user");

  const objectId = ObjectId.isValid(sessionUserId)
    ? new ObjectId(sessionUserId)
    : null;
  const realUser = objectId ? await users.findOne({ _id: objectId }) : null;
  const legacyUser = realUser
    ? null
    : await users.findOne({ id: sessionUserId });

  if (realUser && legacyUser) {
    const mergedSaved = [
      ...new Set([...(realUser.saved ?? []), ...(legacyUser.saved ?? [])]),
    ];

    await users.updateOne(
      { _id: realUser._id },
      {
        $set: { saved: mergedSaved },
      },
    );

    await users.deleteOne({ _id: legacyUser._id });

    return {
      ...realUser,
      saved: mergedSaved,
    };
  }

  return realUser ?? legacyUser ?? null;
}

export async function getSavedIdsForCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return [];
  }

  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<User>("user");
  const user = await getSingleUserDocument(session.user.id);

  if (!user) {
    return [];
  }

  return Array.isArray(user.saved) ? user.saved : [];
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
  const user = await getSingleUserDocument(session.user.id);

  const saved = Array.isArray(user?.saved) ? user.saved : [];
  const isSaved = saved.includes(resourceId);
  const nextSaved = isSaved
    ? saved.filter((id) => id !== resourceId)
    : [...new Set([...saved, resourceId])];

  const objectId = ObjectId.isValid(session.user.id)
    ? new ObjectId(session.user.id)
    : null;

  if (objectId) {
    await users.updateOne(
      { _id: objectId },
      { $set: { saved: nextSaved } },
      { upsert: true },
    );
  } else {
    await users.updateOne(
      { id: session.user.id },
      { $set: { saved: nextSaved } },
      { upsert: true },
    );
  }

  revalidatePath("/saved");
  revalidatePath("/resource");
  revalidatePath("/task");
  revalidatePath("/project");

  return {
    saved: !isSaved,
  };
}
