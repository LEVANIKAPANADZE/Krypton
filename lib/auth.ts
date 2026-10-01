import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { waitUntil } from "@vercel/functions";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/mailer";

const client = await clientPromise;

const db = client.db("data");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  advanced: {
    backgroundTasks: {
      handler: waitUntil,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        user.email,
        "დაადასტურეთ თქვენი ელ. ფოსტა — Krypton",
        `გამარჯობა ${user.name},
      გთხოვთ, დაადასტუროთ თქვენი ელ. ფოსტის მისამართი Krypton-ის ანგარიშის გასააქტიურებლად.
      დადასტურებისთვის დააჭირეთ შემდეგ ბმულს:
        ${url}
        თუ ეს ანგარიში თქვენ არ შეგიქმნიათ, შეგიძლიათ უგულებელყოთ ეს წერილი.
              Krypton`,
      );
    },
    autoSignInAfterVerification: true,
  },

  user: {
    additionalFields: {
      saved: {
        type: "string[]",
        required: false,
        defaultValue: [],
        input: false,
      },
    },
  },
});
