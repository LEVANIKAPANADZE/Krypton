"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function resendEmail() {
    if (!email) {
      setMessage("Email address not found.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Failed to send verification email.");
      } else {
        setMessage("Verification email sent!");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Verify your email</h1>
      <p>Please check your inbox and click the verification link.</p>
      {email && <p>{email}</p>}

      <button onClick={resendEmail} disabled={loading || !email}>
        {loading ? "Sending..." : "Resend verification email"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
