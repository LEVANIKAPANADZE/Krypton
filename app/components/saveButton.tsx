"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

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
      className={`rounded-lg p-2 transition-all ${
        saved ? "bg-cyan-500/15 ring-1 ring-cyan-500/40" : "bg-zinc-900"
      } ${isPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Image
        src="/navIcons/icon-nav-bookmark.svg"
        alt=""
        width={24}
        height={24}
        className={saved ? "brightness-125" : "opacity-80"}
      />
    </button>
  );
}
