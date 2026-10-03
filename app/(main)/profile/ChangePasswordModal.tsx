"use client";

import { useEffect, useRef, useState } from "react";

type ChangePasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

  function handleClose() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("გთხოვთ, შეავსოთ ყველა ველი.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("ახალი პაროლები ერთმანეთს არ ემთხვევა.");
      return;
    }

    console.log({
      currentPassword,
      newPassword,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-0 text-zinc-100 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] backdrop:bg-black/70"
      aria-labelledby="change-password-title"
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

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              შეიყვანეთ მიმდინარე და ახალი პაროლი.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="დახურვა"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              მიმდინარე პაროლი
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-amber-300/50"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              ახალი პაროლი
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-amber-300/50"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              გაიმეორეთ ახალი პაროლი
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-zinc-100 outline-none transition-colors focus:border-amber-300/50"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-amber-300 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-200"
          >
            პაროლის შეცვლა
          </button>
        </form>
      </div>
    </dialog>
  );
}
