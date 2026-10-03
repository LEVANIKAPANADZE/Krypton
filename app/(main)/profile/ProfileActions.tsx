"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileActions() {
  const router = useRouter();

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (logoutLoading) return;

    setError("");
    setLogoutLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setError(error.message || "გასვლა ვერ მოხერხდა.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError("დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.");
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:flex-col md:items-center md:justify-start xl:flex-row">
        <button
          type="button"
          onClick={() => setChangePasswordOpen(true)}
          className="w-full flex-1 cursor-pointer rounded-full border border-zinc-800 bg-transparent px-6 py-2.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-amber-300/50 hover:text-white sm:w-auto md:flex-none md:text-base"
        >
          პაროლის შეცვლა
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          aria-busy={logoutLoading}
          className="w-full flex-1 cursor-pointer rounded-full border border-zinc-800 bg-transparent px-6 py-2.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-amber-300/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto md:flex-none md:text-base"
        >
          {logoutLoading ? "გამოსვლა..." : "გასვლა"}
        </button>

        <button
          type="button"
          className="w-full cursor-pointer rounded-full border border-red-900/40 bg-red-950/20 px-6 py-2.5 text-sm text-red-400 transition-colors duration-200 hover:border-red-800/60 hover:bg-red-950/40 sm:w-auto md:text-base"
        >
          ანგარიშის წაშლა
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 w-full text-center text-sm text-red-400"
        >
          {error}
        </p>
      )}

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
}
