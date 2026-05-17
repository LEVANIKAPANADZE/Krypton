import Link from "next/link";
import Description from "../../description.json";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 md:px-12 xl:px-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <section className="space-y-6 mt-10">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-sm">
            Chemistry Learning Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide">
            <span className="text-white">KRYP</span>
            <span className="text-cyan-400">TON</span>
          </h1>

          <p className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            Learn chemistry through clean explanations, organized lessons, and
            simple structured content built for students.
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
              View School Projects →
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Smarter</h2>

          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Krypton focuses on clarity and structure so students spend less time
            memorizing and more time understanding chemistry concepts.
          </p>
        </section>
      </div>
    </main>
  );
}
