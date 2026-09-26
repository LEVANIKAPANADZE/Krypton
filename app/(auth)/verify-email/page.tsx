"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function resendEmail() {
    setLoading(true);
    setMessage("");

    const { error } = await authClient.sendVerificationEmail({
      email: "",
      callbackURL: "/",
    });

    if (error) {
      setMessage(error.message || "Failed to send verification email.");
    } else {
      setMessage("Verification email sent!");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>Verify your email</h1>
      <p>Please check your inbox and click the verification link.</p>

      <button onClick={resendEmail} disabled={loading}>
        {loading ? "Sending..." : "Resend verification email"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
