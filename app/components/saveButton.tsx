"use client";

import Image from "next/image";
import { toggleSaved } from "@/lib/actions/saved";

export default function SaveButton() {
  return (
    <button type="button" aria-label="შენახვა">
      <Image
        src="/navIcons/icon-nav-bookmark.svg"
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
