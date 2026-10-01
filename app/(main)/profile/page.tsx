import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen text-zinc-200 p-4 md:p-8 xl:p-12 font-sans">
      <div className="max-w-4xl xl:max-w-5xl mx-auto relative z-10 space-y-6 md:space-y-8">
        <header>
          <h1 className="font-serif font-normal text-3xl md:text-4xl xl:text-5xl text-zinc-100 mb-2 md:mb-6 tracking-tight text-center md:text-left">
            ჩემი ანგარიში
          </h1>
        </header>

        <section className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 md:p-8 xl:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 shadow-[0_0_25px_-8px_rgba(252,211,77,0.08)]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 xl:gap-8 w-full md:w-auto">
            <div className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-zinc-900 rounded-full flex items-center justify-center border border-amber-300/20 p-5 shrink-0">
              <Image
                src="/user-icon.svg"
                alt="User Profile Icon"
                width={80}
                height={80}
                className="w-full h-full object-contain opacity-80"
              />
            </div>

            <div className="text-center md:text-left flex flex-col justify-center h-full pt-2">
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-zinc-100 mb-2 tracking-wide">
                {session.user.name}
              </h2>
              <div className="inline-flex items-center justify-center md:justify-start gap-2">
                <span className="bg-amber-300/10 text-amber-300 text-xs md:text-sm px-4 py-1.5 rounded-full border border-amber-300/20 tracking-wider">
                  {session.user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col xl:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button
              type="button"
              className="w-full sm:w-auto flex-1 md:flex-none px-6 py-2.5 cursor-pointer rounded-full border border-zinc-800 bg-transparent text-zinc-400 hover:border-amber-300/50 hover:text-white text-sm md:text-base transition-colors duration-200"
            >
              პაროლის შეცვლა
            </button>

            <button
              type="button"
              className="w-full sm:w-auto flex-1 md:flex-none px-6 py-2.5 cursor-pointer rounded-full border border-zinc-800 bg-transparent text-zinc-400 hover:border-amber-300/50 hover:text-white text-sm md:text-base transition-colors duration-200"
            >
              გასვლა
            </button>

            <button
              type="button"
              className="w-full xl:w-auto px-6 py-2.5 rounded-full cursor-pointer border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:border-red-800/60 text-sm md:text-base transition-colors duration-200"
            >
              ანგარიშის წაშლა
            </button>
          </div>
        </section>

        <Link
          href="/saved"
          className="block bg-zinc-900/50 border border-zinc-800/50 hover:border-amber-300/50 hover:bg-amber-300/10 rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[200px] transition-colors duration-200 group cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 flex items-center gap-3">
            შენახული მასალები
          </h2>

          <p className="text-zinc-400 text-sm md:text-base max-w-md group-hover:text-zinc-300 transition-colors duration-300">
            შენახული ქიმიის სტრუქტურირებული მასალები ჯერ არ გაქვთ.
          </p>

          <span className="text-amber-300 font-medium text-sm md:text-base mt-2 flex items-center gap-2">
            ყველას ნახვა
            <span
              className="group-hover:translate-x-1 transition-transform duration-300"
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
