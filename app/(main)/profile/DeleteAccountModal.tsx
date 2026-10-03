"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import type { DeleteAccountModalProps } from "@/types/ui";

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function resetForm() {
    setPassword("");
    setConfirmation(false);
    setError("");
  }

  function handleClose() {
    if (loading) return;

    resetForm();
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("გთხოვთ, შეიყვანოთ მიმდინარე პაროლი.");
      return;
    }

    if (!confirmation) {
      setError("გთხოვთ, დაადასტუროთ ანგარიშის წაშლა.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.deleteUser({
        password,
      });

      if (error) {
        setError(getAuthErrorMessage(error.code, error.message));
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      aria-labelledby="delete-account-title"
      aria-describedby="delete-account-description"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-red-900/40 bg-zinc-950 p-0 text-zinc-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="delete-account-title"
              className="text-xl font-semibold text-zinc-100 md:text-2xl"
            >
              ანგარიშის წაშლა
            </h2>

            <p
              id="delete-account-description"
              className="mt-2 text-sm leading-6 text-zinc-500"
            >
              ეს მოქმედება მუდმივია და თქვენი ანგარიშის მონაცემები წაიშლება.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="დახურვა"
          >
            ×
          </button>
        </div>

        <div className="mb-6 rounded-xl border border-red-900/30 bg-red-950/20 px-4 py-3">
          <p className="text-sm leading-6 text-red-400">
            ანგარიშის წაშლის შემდეგ ამ მოქმედების გაუქმება შეუძლებელი იქნება.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="delete-account-password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              მიმდინარე პაროლი
            </label>

            <input
              id="delete-account-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              disabled={loading}
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-red-400/50 focus:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={confirmation}
              onChange={(event) => setConfirmation(event.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 shrink-0 accent-red-500"
            />

            <span className="text-sm leading-6 text-zinc-400">
              მე მესმის, რომ ჩემი ანგარიშის წაშლა მუდმივი მოქმედებაა და მისი
              აღდგენა შეუძლებელი იქნება.
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm leading-5 text-red-400"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-12 flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              გაუქმება
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-12 flex-1 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "იშლება..." : "ანგარიშის წაშლა"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
