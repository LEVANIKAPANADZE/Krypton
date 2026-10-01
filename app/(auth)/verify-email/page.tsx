"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { data: session, isPending } = authClient.useSession();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!cooldown) return;

    const timer = setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!isPending && session?.user?.emailVerified) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  async function resendEmail() {
    if (!email || loading || cooldown > 0) {
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
        setCooldown(60);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session?.user?.emailVerified) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>Verify your email</h1>
      <p>Please check your inbox and click the verification link.</p>
      {email && <p>{email}</p>}

      <button
        onClick={resendEmail}
        disabled={loading || !email || cooldown > 0}
      >
        {loading
          ? "Sending..."
          : cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend verification email"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
