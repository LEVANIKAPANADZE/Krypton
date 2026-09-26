"use client";

import Link from "next/link";

export default function Page() {
  const infoBlocks = [
    {
      id: "4o",
      num: "01",
      title: "რა არის კრიპტონი?",
      description:
        "Krypton წარმოადგენს სტრუქტურირებულ საგანმანათლებლო პლატფორმას, რომელიც შექმნილია საბაზო და საშუალო საფეხურის მოსწავლეებისთვის ქიმიის შესწავლის ხელშესაწყობად. პლატფორმაზე სასწავლო მასალა ლოგიკურად არის წარმოდგენილი, რაც უზრუნველყოფს ცოდნის ეტაპობრივ ათვისებასა და ხელს უწყობს კონცეპტუალურ გაგებას, ნაცვლად მხოლოდ მექანიკური დამახსოვრებისა.",
    },
    {
      id: "7o",
      num: "02",
      title: "რატომ კრიპტონი?",
      description:
        "ქიმიის შესწავლა მოსწავლეებისთვის ხშირად სირთულეებთან არის დაკავშირებული. აღნიშნული მიდგომა ხელს უწყობს ცოდნის სისტემურ და თანმიმდევრულ ათვისებას, ზრდის მოსწავლეთა ინტერესს საგნის მიმართ და უზრუნველყოფს ქიმიური კანონზომიერებების აღმოჩენასა და მათ სიღრმისეულ გააზრებას.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "აღმოაჩინე მასალა",
      description:
        "დაათვალიერე სტრუქტურირებული რესურსები საკუთარი ტემპით — ვიდეოებით, ახსნა-განმარტებებითა და თემების მიხედვით დალაგებული მასალით.",
    },
    {
      num: "02",
      title: "დაამუშავე პრაქტიკულად",
      description:
        "გადადი პროექტებსა და პრაქტიკულ მაგალითებზე, რომ თეორია რეალურ, ხელშესახებ გამოცდილებად აქციო.",
    },
    {
      num: "03",
      title: "შეამოწმე ცოდნა",
      description:
        "დაასრულე ინტერაქტიული დავალებები და ტესტები, რათა დარწმუნდე საკუთარ პროგრესში ყოველ ეტაპზე.",
    },
  ];

  const navCards = [
    {
      name: "რესურსები",
      path: "/resource",
      description:
        "მრავალფეროვანი სასწავლო მასალები, თეორიები და სახელმძღვანელოები.",
      featured: true,
    },
    {
      name: "პროექტები",
      path: "/project",
      description: "სასკოლო და ინდივიდუალური პროექტები, პრაქტიკული მაგალითები.",
      featured: false,
    },
    {
      name: "დავალებები",
      path: "/task",
      description: "ინტერაქტიული სავარჯიშოები და ტესტები ცოდნის შესამოწმებლად.",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-300/25">
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-24 xl:py-28 xl:px-8 grid xl:grid-cols-2 gap-10 xl:gap-20 items-center">
        <div className="space-y-5 md:space-y-6">
          <div className="inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-amber-300">
            ქიმიის სასწავლო პლატფორმა
          </div>

          <h1 className="font-serif font-extrabold uppercase tracking-widest text-4xl md:text-6xl xl:text-7xl leading-[1] text-zinc-100">
            Krypton
          </h1>
          <div className="h-[3px] w-14 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]" />

          <p className="text-zinc-400 max-w-md text-base md:text-lg leading-relaxed">
            ისწავლე ქიმია მარტივი სტრუქტურირებული მასალით, რომელიც შექმნილია
            მოსწავლეებისთვის და მორგებულია შენს საჭიროებებზე.
          </p>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500 pt-1">
            <span>ორგანული ქიმია</span>
            <span className="text-zinc-700">·</span>
            <span>არაორგანული ქიმია</span>
            <span className="text-zinc-700">·</span>
            <span>ფიზიკური ქიმია</span>
            <span className="text-zinc-700">·</span>
            <span>ანალიზური ქიმია</span>
          </div>

          <div className="flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-6 pt-3">
            <Link
              href="/resource"
              className="
                inline-flex items-center gap-2.5
                px-7 py-3.5 rounded-full
                bg-amber-400 text-zinc-950
                font-bold tracking-wide text-base
                shadow-[0_0_15px_-3px_rgba(252,211,77,0.4)]
                hover:bg-amber-300 hover:shadow-[0_0_25px_-2px_rgba(252,211,77,0.6)]
                transition-all duration-300
              "
            >
              დაიწყე სწავლა
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/resource"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
            >
              ან ნახე რესურსები
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/50 p-2.5 md:p-4 shadow-[0_0_25px_-5px_rgba(252,211,77,0.12)]">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kK9RXlrC5Vk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-4 md:gap-5">
          {infoBlocks.map((block, i) => (
            <div
              key={block.id}
              className={`
                p-6 md:p-10 rounded-xl border border-zinc-800/50
                ${i === 0 ? "md:col-span-7 bg-zinc-900/50" : "md:col-span-5"}
              `}
            >
              <span className="text-xs font-medium tracking-[0.15em] text-amber-300/70">
                {block.num}
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-normal mb-3 mt-3 text-zinc-100">
                {block.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <h2 className="text-xs font-medium tracking-[0.18em] uppercase text-zinc-500 mb-8 md:mb-10">
          როგორ მუშაობს
        </h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`
                ${i > 0 ? "md:pl-8 md:border-l md:border-zinc-800/60" : ""}
                ${i < steps.length - 1 ? "md:pr-8" : ""}
              `}
            >
              <span className="font-serif text-3xl text-zinc-700">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold mt-3 mb-2 text-zinc-100">
                {step.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <h2 className="text-xs font-medium tracking-[0.18em] uppercase text-zinc-500 mb-8">
          რას იპოვით აქ?
        </h2>

        <div className="flex flex-col gap-5">
          <Link
            href={navCards[0].path}
            className="
              group flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6
              p-6 md:p-8 rounded-xl border border-zinc-800/50 bg-zinc-900/50
              hover:border-amber-300/50 hover:bg-amber-300/10
              transition-colors duration-200
            "
          >
            <div className="flex items-center gap-5 md:gap-6">
              <div className="font-serif text-xl w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center rounded-full bg-amber-300/10 border border-amber-300/20 text-amber-300">
                {navCards[0].name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1.5 text-zinc-100">
                  {navCards[0].name}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm max-w-md">
                  {navCards[0].description}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-medium text-amber-300 shrink-0">
              გადასვლა
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </span>
          </Link>

          <div className="grid md:grid-cols-2 gap-5">
            {navCards.slice(1).map((card, index) => (
              <Link
                key={index}
                href={card.path}
                className="
                  group flex flex-col justify-between
                  p-6 md:p-8 rounded-xl border border-zinc-800/50 bg-zinc-900/50
                  hover:border-amber-300/50 hover:bg-amber-300/10
                  transition-colors duration-200
                "
              >
                <div>
                  <div className="font-serif text-lg mb-5 w-11 h-11 flex items-center justify-center rounded-full bg-amber-300/10 border border-amber-300/20 text-amber-300">
                    {card.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                    {card.name}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm mb-8">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-medium text-amber-300">
                  გადასვლა
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-16 md:pb-24">
        <div className="w-full rounded-xl border-t-2 border-amber-300/50 shadow-[0_-2px_20px_-6px_rgba(252,211,77,0.4)] bg-zinc-900/50 p-8 md:p-16 text-center">
          <h2 className="font-serif font-normal text-2xl md:text-4xl mb-4 text-zinc-100">
            ისწავლე უფრო ჭკვიანურად
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            კრიპტონი ყურადღებას ამახვილებს სიცხადესა და სტრუქტურაზე, რათა
            მოსწავლეებმა ნაკლები დრო დახარჯონ დაზეპირებაზე და მეტი — გაგებაზე.
          </p>
        </div>
      </section>
    </main>
  );
}
