"use client";

import Link from "next/link";
import { useState } from "react";

import en from "../../messages/en.json";
import ka from "../../messages/ka.json";

import Description from "../../description.json";

export default function Page() {
  const [locale, setLocale] = useState<"en" | "ka">("en");

  const messages = locale === "en" ? en : ka;
  const home = messages.HomePage;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 md:px-12 xl:px-20">
      <div className="max-w-5xl mx-auto flex justify-end mb-4">
        <button
          onClick={() => setLocale(locale === "en" ? "ka" : "en")}
          className="
            px-4 py-2
            rounded-xl
            bg-white/5 border border-white/10
            text-gray-300 text-sm font-medium
            hover:bg-cyan-400 hover:text-black hover:border-cyan-400
            transition-all duration-300
          "
        >
          {locale === "en" ? "ქართული" : "English"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <section className="space-y-6 mt-10">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-sm">
            {home.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide">
            <span className="text-white">{home.titleWhite}</span>
            <span className="text-cyan-400">{home.titleBlue}</span>
          </h1>

          <p className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            {home.heroDescription}
          </p>

          <div className="pt-3">
            <Link
              href="/project"
              className="
                inline-flex items-center gap-2
                px-6 py-3 md:px-8 md:py-4
                rounded-xl
                bg-cyan-400 text-black
                font-semibold
                shadow-lg shadow-cyan-500/20
                hover:bg-cyan-300
                hover:scale-105
                transition-all duration-300
              "
            >
              {home.button}
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-20 w-full">
          {Description.map((card, index) => (
            <div
              key={index}
              className="
                cursor-pointer
                p-6 rounded-2xl
                border border-white/10
                bg-white/5
                backdrop-blur-sm
                hover:border-cyan-400/40
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        <section
          className="
            mt-20 w-full max-w-4xl
            rounded-3xl
            border border-cyan-500/20
            bg-gradient-to-br from-cyan-500/10 to-transparent
            p-10
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {home.learnSmarter}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {home.learnSmarterDescription}
          </p>
        </section>
      </div>
    </main>
  );
}
