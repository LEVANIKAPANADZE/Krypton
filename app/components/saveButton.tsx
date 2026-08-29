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

  async function handleSave() {
    const result = await toggleSaved(resourceId);
    setSaved(result.saved);
  }

  return (
    <button
      type="button"
      aria-label={saved ? "შენახულებიდან წაშლა" : "შენახვა"}
      aria-pressed={saved}
      onClick={handleSave}
    >
      <Image
        src="/navIcons/icon-nav-bookmark.svg"
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
