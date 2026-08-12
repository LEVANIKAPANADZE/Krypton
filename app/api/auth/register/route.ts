import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "სახელი უნდა შეიცავდეს სულ მცირე 2 სიმბოლოს!")
    .max(50, "სახელი არ უნდა აღემატებოდეს 50 სიმბოლოს!"),
  email: z.email("გთხოვთ, მიუთითოთ ვალიდური ელ. ფოსტა!").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს სულ მცირე 8 სიმბოლოს!")
    .max(20, "პაროლი არ უნდა აღემატებოდეს 20 სიმბოლოს!"),
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
            email: "მომხმარებელი ამ ელ. ფოსტით უკვე არსებობს",
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
      { message: "მომხმარებელი წარმატებით დარეგისტრირდა" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "რეგისტრაციისას დაფიქსირდა შეცდომა..." },
      { status: 500 },
    );
  }
}
