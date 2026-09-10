"use client";

import { useState } from "react";
import Image from "next/image";
import { toggleSaved } from "@/lib/actions/saved";

interface SaveButtonProps {
  resourceId: string;
  initialSaved: boolean;
}

export default function SaveButton({
  resourceId,
  initialSaved,
}: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, setIsPending] = useState(false);

  async function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isPending) return;

    setIsPending(true);

    try {
      const result = await toggleSaved(resourceId);
      setSaved(result.saved);
    } catch (error) {
      console.error("Failed to toggle save state:", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      aria-label={saved ? "შენახულებიდან წაშლა" : "შენახვა"}
      aria-pressed={saved}
      disabled={isPending}
      onClick={handleSave}
      className={`rounded-lg p-2 transition-all duration-300 ${
        saved
          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          : "bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700"
      } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Image
        src="/navIcons/icon-nav-bookmark.svg"
        alt=""
        width={18}
        height={18}
        className={
          saved ? "brightness-125" : "opacity-70 group-hover:opacity-100"
        }
      />
    </button>
  );
}
