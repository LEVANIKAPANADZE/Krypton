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
    <div className="min-h-screen bg-[#050505] text-gray-200 p-4 md:p-8 xl:p-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-4xl xl:max-w-5xl mx-auto relative z-10 space-y-6 md:space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-6 tracking-tight text-center md:text-left">
            ჩემი ანგარიში
          </h1>
        </header>

        <section className="bg-[#0f0f0f] border border-gray-800/60 rounded-2xl p-6 md:p-8 xl:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 shadow-xl shadow-cyan-900/5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 xl:gap-8 w-full md:w-auto">
            <div className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 bg-[#161616] rounded-full flex items-center justify-center border border-gray-700/50 p-5 shrink-0 shadow-inner">
              <Image
                src="/user-icon.svg"
                alt="User Profile Icon"
                width={80}
                height={80}
                className="w-full h-full object-contain opacity-80"
              />
            </div>

            <div className="text-center md:text-left flex flex-col justify-center h-full pt-2">
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-2 tracking-wide">
                {session.user.name}
              </h2>
              <div className="inline-flex items-center justify-center md:justify-start gap-2">
                <span className="bg-[#1a1a1a] text-cyan-400/80 text-xs md:text-sm px-4 py-1.5 rounded-full border border-cyan-900/30 tracking-wider">
                  {session.user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col xl:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button
              type="button"
              className="w-full sm:w-auto flex-1 md:flex-none px-6 py-2.5 cursor-pointer rounded-full border border-gray-700 bg-transparent hover:bg-gray-800 hover:text-white text-gray-400 text-sm md:text-base transition-all duration-200"
            >
              პაროლის შეცვლა
            </button>

            <button
              type="button"
              className="w-full sm:w-auto flex-1 md:flex-none px-6 py-2.5 cursor-pointer rounded-full border border-gray-700 bg-transparent hover:bg-gray-800 hover:text-white text-gray-400 text-sm md:text-base transition-all duration-200"
            >
              გასვლა
            </button>

            <button
              type="button"
              className="w-full xl:w-auto px-6 py-2.5 rounded-full cursor-pointer border border-red-900/40 bg-red-950/10 text-red-400 hover:bg-red-900/30 hover:border-red-800/60 text-sm md:text-base transition-all duration-200"
            >
              ანგარიშის წაშლა
            </button>
          </div>
        </section>

        <Link
          href="/saved"
          className="block bg-[#0f0f0f] border border-gray-800/60 hover:border-cyan-900/50 hover:bg-[#121212] rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[200px] transition-all duration-300 group cursor-pointer"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            შენახული მასალები
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-md group-hover:text-gray-400 transition-colors duration-300">
            შენახული ქიმიის სტრუქტურირებული მასალები ჯერ არ გაქვთ.
          </p>

          <span className="text-cyan-400 group-hover:text-cyan-300 font-medium text-sm md:text-base mt-2 flex items-center gap-2 transition-all duration-300">
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
