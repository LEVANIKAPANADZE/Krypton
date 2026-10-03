"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type ResetPasswordFormProps = {
  token: string;
  initialError: string;
};

export default function ResetPasswordForm({
  token,
  initialError,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialError === "INVALID_TOKEN") {
      setError("პაროლის აღდგენის ბმული არასწორია ან ვადაგასულია.");
    }
  }, [initialError]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("პაროლის აღდგენის ბმული არასწორია ან ვადაგასულია.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("გთხოვთ, შეავსოთ ყველა ველი.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("ახალი პაროლები ერთმანეთს არ ემთხვევა.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (error) {
        if (error.code === "INVALID_TOKEN") {
          setError("პაროლის აღდგენის ბმული არასწორია ან ვადაგასულია.");
        } else {
          setError(
            error.message ||
              "პაროლის აღდგენა ვერ მოხერხდა. გთხოვთ, სცადოთ თავიდან.",
          );
        }

        return;
      }

      setSuccess("პაროლი წარმატებით აღდგა. გადაგიყვანთ შესვლის გვერდზე...");

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        router.replace("/login");
      }, 1200);
    } catch {
      setError("დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.");
    } finally {
      setLoading(false);
    }
  }

  if (!token || initialError === "INVALID_TOKEN") {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10 sm:px-6 md:min-h-[calc(100vh-6rem)] md:px-8 md:py-14">
        <div className="w-full max-w-md">
          <div className="rounded-[2rem] border border-zinc-800/70 bg-zinc-950/90 p-6 text-center shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)] sm:p-8 md:p-10">
            <h1 className="text-2xl font-semibold text-zinc-100 md:text-3xl">
              პაროლის აღდგენა
            </h1>

            <p className="mt-4 text-sm leading-6 text-red-400">
              პაროლის აღდგენის ბმული არასწორია ან ვადაგასულია.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/forgot-password"
                className="flex h-12 items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200"
              >
                ახალი ბმულის მოთხოვნა
              </Link>

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

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10 sm:px-6 md:min-h-[calc(100vh-6rem)] md:px-8 md:py-14 xl:min-h-[calc(100vh-7rem)] xl:px-12 xl:py-16">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-zinc-800/70 bg-zinc-950/90 p-6 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
              ახალი პაროლი
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              შეიყვანეთ თქვენი ახალი პაროლი.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="reset-new-password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                ახალი პაროლი
              </label>

              <input
                id="reset-new-password"
                name="new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                autoFocus
                disabled={loading}
                className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-amber-300/50 focus:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="reset-confirm-password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                გაიმეორეთ ახალი პაროლი
              </label>

              <input
                id="reset-confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                disabled={loading}
                className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-amber-300/50 focus:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
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

            {success && (
              <p
                role="status"
                className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 px-4 py-3 text-sm leading-5 text-emerald-400"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-amber-300 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "იცვლება..." : "პაროლის შეცვლა"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
