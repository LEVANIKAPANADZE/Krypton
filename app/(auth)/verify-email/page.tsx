import { Suspense } from "react";
import VerifyEmailContent from "./VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center p-4">
          <p className="text-sm text-zinc-400">იტვირთება...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
