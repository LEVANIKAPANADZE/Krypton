"use client";

import Link from "next/link";

export default function Page() {
  const infoBlocks = [
    {
      id: "4o",
      title: "რა არის კრიპტონი?",
      description:
        "Krypton წარმოადგენს სტრუქტურირებულ საგანმანათლებლო პლატფორმას, რომელიც შექმნილია საბაზო და საშუალო საფეხურის მოსწავლეებისთვის ქიმიის შესწავლის ხელშესაწყობად. პლატფორმაზე სასწავლო მასალა ლოგიკურად არის წარმოდგენილი, რაც უზრუნველყოფს ცოდნის ეტაპობრივ ათვისებასა და ხელს უწყობს კონცეპტუალურ გაგებას, ნაცვლად მხოლოდ მექანიკური დამახსოვრებისა.",
    },
    {
      id: "7o",
      title: "რატომ კრიპტონი?",
      description:
        "ქიმიის შესწავლა მოსწავლეებისთვის ხშირად სირთულეებთან არის დაკავშირებული. აღნიშნული მიდგომა ხელს უწყობს ცოდნის სისტემურ და თანმიმდევრულ ათვისებას, ზრდის მოსწავლეთა ინტერესს საგნის მიმართ და უზრუნველყოფს ქიმიური კანონზომიერებების აღმოჩენასა და მათ სიღრმისეულ გააზრებას.",
    },
  ];

  const navCards = [
    {
      name: "რესურსები",
      path: "/resource",
      description:
        "მრავალფეროვანი სასწავლო მასალები, თეორიები და სახელმძღვანელოები.",
      icon: "📚",
    },
    {
      name: "პროექტები",
      path: "/project",
      description: "სასკოლო და ინდივიდუალური პროექტები, პრაქტიკული მაგალითები.",
      icon: "⚡",
    },
    {
      name: "დავალებები",
      path: "/task",
      description: "ინტერაქტიული სავარჯიშოები და ტესტები ცოდნის შესამოწმებლად.",
      icon: "📝",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.1)] mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          ქიმიის სასწავლო პლატფორმა 🧪
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-white">კრიპ</span>
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            ტონი
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed mb-10">
          ისწავლე ქიმია მარტივი სტრუქტურირებული მასალით, რომელიც შექმნილია
          მოსწავლეებისთვის და მორგებულია შენს საჭიროებებზე. ⚛️
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/resource"
            className="
              inline-flex items-center justify-center gap-2
              px-8 py-4 rounded-full
              bg-cyan-400 text-black
              font-bold text-lg
              shadow-[0_0_20px_rgba(34,211,238,0.3)]
              hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]
              hover:-translate-y-1
              transition-all duration-300 ease-out
            "
          >
            დაიწყე სწავლა 🚀
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
        {infoBlocks.map((block) => (
          <div
            key={block.id}
            className="pl-6 md:pl-10 border-l-2 border-cyan-500/50 hover:border-cyan-400 transition-colors duration-300"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {block.title}
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg max-w-3xl">
              {block.description}
            </p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-10 pl-6 border-l-2 border-cyan-500/50">
          <h2 className="text-3xl font-bold text-white">რას იპოვით აქ? 🔍</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {navCards.map((card, index) => (
            <Link
              key={index}
              href={card.path}
              className="
                group
                flex flex-col justify-between
                p-8 rounded-2xl
                bg-[#0a0a0a] border border-white/5
                hover:border-cyan-400/40 hover:bg-[#111] hover:-translate-y-1.5
                transition-all duration-300 cursor-pointer
              "
            >
              <div>
                <div className="text-4xl mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-xl border border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                  {card.name}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300">
                გადასვლა
                <span className="group-hover:translate-x-1.5 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div
          className="
            w-full rounded-3xl
            border border-cyan-500/20
            bg-gradient-to-r from-cyan-950/40 via-black to-[#050505]
            p-10 md:p-14 text-center
            relative overflow-hidden
          "
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 relative z-10">
            ისწავლე უფრო <span className="text-cyan-400">ჭკვიანურად</span> 💡
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed relative z-10 text-lg">
            კრიპტონი ყურადღებას ამახვილებს სიცხადესა და სტრუქტურაზე, რათა
            მოსწავლეებმა ნაკლები დრო დახარჯონ დაზეპირებაზე და მეტი — გაგებაზე.
            ✨
          </p>
        </div>
      </section>
    </main>
  );
}
