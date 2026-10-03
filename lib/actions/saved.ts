"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import type { AppUser } from "@/types/user";
import type { SavedContentDocument, SavedContentItem } from "@/types/content";

function normalizeSavedId(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "object") {
    const maybeObject = value as {
      toHexString?: () => string;
      toString?: () => string;
    };

    if (typeof maybeObject.toHexString === "function") {
      const hex = maybeObject.toHexString();
      if (hex) return hex;
    }

    const stringValue =
      typeof maybeObject.toString === "function"
        ? maybeObject.toString()
        : String(value);

    if (stringValue && stringValue !== "[object Object]") {
      return stringValue;
    }
  }

  return null;
}

function normalizeSavedIds(values: unknown[] = []): string[] {
  return [
    ...new Set(
      values.map(normalizeSavedId).filter((id): id is string => Boolean(id)),
    ),
  ];
}

async function findUserBySessionId(sessionUserId: string) {
  const client = await clientPromise;
  const db = client.db("data");
  const users = db.collection<AppUser>("user");
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
  return normalizeSavedIds(user?.saved ?? []);
}

export async function getSavedItemsForCurrentUser() {
  const savedIds = await getSavedIdsForCurrentUser();

  if (savedIds.length === 0) {
    return [];
  }

  const client = await clientPromise;
  const db = client.db("data");
  const objectIdValues = savedIds
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));

  const docs = await db
    .collection("info")
    .find({
      $or: [{ id: { $in: savedIds } }, { _id: { $in: objectIdValues } }],
    })
    .toArray();

  return docs.map((doc): SavedContentItem => {
    const { _id, ...rest } = doc as SavedContentDocument;
    const documentId =
      _id !== undefined && _id !== null
        ? String(_id)
        : typeof rest.id === "string"
          ? rest.id
          : "";

    return {
      ...rest,
      _id: documentId,
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
  const users = db.collection<AppUser>("user");

  const user = await findUserBySessionId(session.user.id);
  const saved = normalizeSavedIds(user?.saved ?? []);
  const normalizedResourceId = normalizeSavedIds([resourceId])[0];

  if (!normalizedResourceId) {
    throw new Error("Invalid resource ID");
  }

  const isSaved = saved.includes(normalizedResourceId);
  const nextSaved = isSaved
    ? saved.filter((id) => id !== normalizedResourceId)
    : [...new Set([...saved, normalizedResourceId])];

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
