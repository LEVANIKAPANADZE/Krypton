"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";

type ChangePasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: "current-password",
      name: "currentPassword",
      label: "მიმდინარე პაროლი",
      autoComplete: "current-password",
    },
    {
      id: "new-password",
      name: "newPassword",
      label: "ახალი პაროლი",
      autoComplete: "new-password",
    },
    {
      id: "confirm-password",
      name: "confirmPassword",
      label: "გაიმეორეთ ახალი პაროლი",
      autoComplete: "new-password",
    },
  ] as const;

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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function resetForm() {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  }

  function handleClose() {
    if (loading) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    resetForm();
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("გთხოვთ, შეავსოთ ყველა ველი.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("ახალი პაროლები ერთმანეთს არ ემთხვევა.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        setError(getAuthErrorMessage(error.code, error.message));
        return;
      }

      setSuccess("პაროლი წარმატებით შეიცვალა.");

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        handleClose();
      }, 1000);
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
      aria-labelledby="change-password-title"
      aria-describedby="change-password-description"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-0 text-zinc-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="change-password-title"
              className="text-xl font-semibold text-zinc-100 md:text-2xl"
            >
              პაროლის შეცვლა
            </h2>

            <p
              id="change-password-description"
              className="mt-2 text-sm leading-6 text-zinc-500"
            >
              შეიყვანეთ მიმდინარე და ახალი პაროლი.
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputs.map((input, index) => (
            <div key={input.id}>
              <label
                htmlFor={input.id}
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                {input.label}
              </label>

              <input
                id={input.id}
                name={input.name}
                type="password"
                value={formData[input.name]}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    [input.name]: event.target.value,
                  }))
                }
                autoComplete={input.autoComplete}
                autoFocus={index === 0}
                disabled={loading}
                className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          ))}

          <div className="pt-1">
            <Link
              href="/forgot-password"
              onClick={handleClose}
              className="text-sm text-amber-300 transition-colors hover:text-amber-200"
            >
              დაგავიწყდათ პაროლი?
            </Link>
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
    </dialog>
  );
}
