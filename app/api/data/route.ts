import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data");

    const data = await db.collection("info").find({}).toArray();

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json([]);
  }
}
