"use client";

import { useState } from "react";
import Image from "next/image";
import { toggleSaved } from "@/lib/actions/saved";
import type { SaveButtonProps } from "@/types/ui";

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
      className={`rounded-lg p-2 border transition-colors duration-200 ${
        saved
          ? "bg-amber-300/10 border-amber-300/50"
          : "bg-zinc-900/50 border-zinc-800/50 hover:border-amber-300/50 hover:bg-amber-300/5"
      } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Image
        src={
          saved
            ? "/navIcons/bookmark-filled.svg"
            : "/navIcons/bookmark-outline.svg"
        }
        alt=""
        width={18}
        height={18}
      />
    </button>
  );
}
