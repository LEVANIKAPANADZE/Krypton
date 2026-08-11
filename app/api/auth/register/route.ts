import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long!")
    .max(50, "Name must be 50 characters or fewer!"),
  email: z.email("Please enter a valid email address!").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(20, "Password must be 20 characters or fewer!"),
});

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const result = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const errors = result.error.issues.reduce(
        (acc, issue) => {
          const field = issue.path[0];

          if (typeof field === "string" && !acc[field]) {
            acc[field] = issue.message;
          }

          return acc;
        },
        {} as Record<string, string>,
      );

      return NextResponse.json({ errors }, { status: 400 });
    }

    const cleanName = result.data.name;
    const cleanEmail = result.data.email;
    const cleanPassword = result.data.password;

    const client = await clientPromise;
    const db = client.db("data");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email: cleanEmail });

    if (existingUser) {
      return NextResponse.json(
        {
          errors: {
            email: "User already exists",
          },
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    await users.insertOne({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      favorites: [],
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Error appeared while registering..." },
      { status: 500 },
    );
  }
}
