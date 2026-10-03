"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("გთხოვთ, მიუთითოთ ელ. ფოსტა.");
      return;
    }

    if (cooldown > 0 || loading) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(
          error.message || "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.",
        );
        return;
      }

      setMessage(
        "თუ ამ ელ. ფოსტით ანგარიში არსებობს, პაროლის აღდგენის ბმული გამოგზავნილია.",
      );
      setCooldown(60);
    } catch {
      setError("დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10 sm:px-6 md:min-h-[calc(100vh-6rem)] md:px-8 md:py-14 xl:min-h-[calc(100vh-7rem)] xl:px-12 xl:py-16">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-zinc-800/70 bg-zinc-950/90 p-6 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
              პაროლის აღდგენა
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              შეიყვანეთ თქვენი ელ. ფოსტა და გამოგიგზავნით პაროლის აღდგენის
              ბმულს.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="forgot-password-email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                ელ. ფოსტა
              </label>

              <input
                id="forgot-password-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                autoFocus
                disabled={loading}
                className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm leading-5 text-red-400"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 px-4 py-3 text-sm leading-5 text-emerald-400"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || cooldown > 0}
              className="h-12 w-full rounded-xl bg-amber-300 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "იგზავნება..."
                : cooldown > 0
                  ? `ხელახლა გაგზავნა ${cooldown} წამში`
                  : "აღდგენის ბმულის გაგზავნა"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              დაბრუნება შესვლაზე
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
