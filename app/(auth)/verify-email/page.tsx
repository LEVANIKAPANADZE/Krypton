"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { data: session, isPending } = authClient.useSession();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

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
    return <div>იტვირთება...</div>;
  }

  if (session?.user?.emailVerified) {
    return <div>გადამისამართება...</div>;
  }

  const tips = [
    "შეამოწმეთ Spam ან Junk საქაღალდე",
    "შეამოწმეთ Promotions ან სხვა მსგავსი საქაღალდეები",
    "დარწმუნდით, რომ ელ. ფოსტის მისამართი სწორად არის მითითებული",
    "დაელოდეთ რამდენიმე წუთს, რადგან წერილის მიღებას შეიძლება დრო დასჭირდეს",
    "თუ წერილი მაინც არ მოვიდა, გამოიყენეთ ხელახლა გაგზავნის ღილაკი",
  ];

  return (
    <div>
      <h1>დაადასტურეთ ელ. ფოსტა</h1>

      <p>
        გამოგიგზავნეთ დამადასტურებელი ბმული თქვენს ელ. ფოსტაზე. გთხოვთ, გახსნათ
        წერილი და დააჭიროთ ბმულს ანგარიშის დასადასტურებლად.
      </p>

      {email && <p>{email}</p>}

      <div>
        <p>თუ წერილი ვერ იპოვეთ:</p>

        {tips.map((element) => (
          <span key={element} className="block">
            {element}
          </span>
        ))}
      </div>

      <button
        onClick={resendEmail}
        disabled={loading || !email || cooldown > 0}
      >
        {loading
          ? "იგზავნება..."
          : cooldown > 0
            ? `ხელახლა გაგზავნა ${cooldown} წამში`
            : "დადასტურების ბმულის ხელახლა გაგზავნა"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
