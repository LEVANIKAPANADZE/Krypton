"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { data: session, isPending, refetch } = authClient.useSession();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!cooldown) return;

    const timer = setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!isPending && session?.user?.emailVerified) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  async function resendEmail() {
    if (!email || loading || cooldown > 0) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/",
      });

      if (error) {
        setMessage(
          error.message || "ვერ მოხერხდა დამადასტურებელი ელ. ფოსტის გაგზავნა.",
        );
      } else {
        setMessage("დადასტურების ბმული ხელახლა გამოგზავნილია!");
        setCooldown(60);
      }
    } catch {
      setMessage("დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <p className="text-sm text-zinc-400">იტვირთება...</p>
      </div>
    );
  }

  if (session?.user?.emailVerified) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <p className="text-sm text-zinc-400">გადამისამართება...</p>
      </div>
    );
  }

  const tips = [
    "შეამოწმეთ Spam ან Junk საქაღალდე",
    "შეამოწმეთ Promotions ან სხვა მსგავსი საქაღალდეები",
    "დარწმუნდით, რომ ელ. ფოსტის მისამართი სწორად არის მითითებული",
    "დაელოდეთ რამდენიმე წუთს, რადგან წერილის მიღებას შეიძლება დრო დასჭირდეს",
    "თუ წერილი მაინც არ მოვიდა, გამოიყენეთ ხელახლა გაგზავნის ღილაკი",
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800/50 bg-zinc-900/50 px-6 py-8 text-center md:max-w-md md:px-10 md:py-10 xl:max-w-lg xl:px-12 xl:py-12">
        <h1 className="font-serif font-normal text-2xl text-zinc-100 md:text-3xl">
          დაადასტურეთ ელ. ფოსტა
        </h1>

        <p className="mt-3 text-sm text-zinc-400 md:text-base">
          გამოგიგზავნეთ დამადასტურებელი ბმული თქვენს ელ. ფოსტაზე. გთხოვთ,
          გახსნათ წერილი და დააჭიროთ ბმულს ანგარიშის დასადასტურებლად.
        </p>

        {email && (
          <span className="mt-4 inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-1.5 text-sm text-amber-300">
            {email}
          </span>
        )}

        <div className="mt-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 text-left">
          <p className="text-sm font-medium text-zinc-100 mb-2">
            თუ წერილი ვერ იპოვეთ:
          </p>

          <ul className="flex flex-col gap-1.5">
            {tips.map((element) => (
              <li key={element} className="text-sm text-zinc-400">
                {element}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={resendEmail}
          disabled={loading || !email || cooldown > 0}
          className="mt-6 h-11 w-full cursor-pointer rounded-xl bg-amber-400 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 md:h-12 md:text-base"
        >
          {loading
            ? "იგზავნება..."
            : cooldown > 0
              ? `ხელახლა გაგზავნა ${cooldown} წამში`
              : "დადასტურების ბმულის ხელახლა გაგზავნა"}
        </button>

        {message && <p className="mt-4 text-sm text-zinc-300">{message}</p>}
      </div>
    </div>
  );
}
