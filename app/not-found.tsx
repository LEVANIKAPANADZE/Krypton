"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const route = useParams();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-black text-cyan-500 font-mono text-center p-4">
      <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold animate-pulse">
        ERROR 404
      </h1>
      <p className="text-xs md:text-sm xl:text-base uppercase opacity-70 mt-[15px]">
        Page "{route.type}" not found, redirecting...
      </p>
    </main>
  );
}
