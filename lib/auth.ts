import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/mailer";

const client = await clientPromise;

const db = client.db("data");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        user.email,
        "Verify your Krypton account",
        `Click this link to verify your email: ${url}`,
      );
    },
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
