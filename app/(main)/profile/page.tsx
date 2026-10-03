import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import ProfileActions from "./ProfileActions";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-4 font-sans text-zinc-200 md:p-8 xl:p-12">
      <div className="relative z-10 mx-auto max-w-4xl space-y-6 md:space-y-8 xl:max-w-5xl">
        <header>
          <h1 className="mb-2 text-center font-serif text-3xl font-normal tracking-tight text-zinc-100 md:mb-6 md:text-left md:text-4xl xl:text-5xl">
            ჩემი ანგარიში
          </h1>
        </header>

        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 shadow-[0_0_25px_-8px_rgba(252,211,77,0.08)] md:flex-row md:items-start md:p-8 xl:p-10">
          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row md:items-start md:gap-6 xl:gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-amber-300/20 bg-zinc-900 p-5 md:h-28 md:w-28 xl:h-32 xl:w-32">
              <Image
                src="/user-icon.svg"
                alt="User Profile Icon"
                width={80}
                height={80}
                className="h-full w-full object-contain opacity-80"
              />
            </div>

            <div className="flex h-full flex-col justify-center pt-2 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-semibold tracking-wide text-zinc-100 md:text-3xl xl:text-4xl">
                {session.user.name}
              </h2>

              <div className="inline-flex items-center justify-center gap-2 md:justify-start">
                <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-1.5 text-xs tracking-wider text-amber-300 md:text-sm">
                  {session.user.email}
                </span>
              </div>
            </div>
          </div>

          <ProfileActions />
        </section>

        <Link
          href="/saved"
          className="group flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 text-center transition-colors duration-200 hover:border-amber-300/50 hover:bg-amber-300/10 md:p-10"
        >
          <h2 className="flex items-center gap-3 text-xl font-semibold text-zinc-100 md:text-2xl">
            შენახული მასალები
          </h2>

          <p className="max-w-md text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 md:text-base">
            შენახული ქიმიის სტრუქტურირებული მასალები ჯერ არ გაქვთ.
          </p>

          <span className="mt-2 flex items-center gap-2 text-sm font-medium text-amber-300 md:text-base">
            ყველას ნახვა
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
