import { notFound } from "next/navigation";
import data from "@/data.json";

type Type = "resource" | "task" | "project";

type Props = {
  params: Promise<{
    type: Type;
  }>;
};

export default async function Page({ params }: Props) {
  const { type } = await params;
  const validTypes: Type[] = ["resource", "task", "project"];

  if (!validTypes.includes(type)) notFound();

  const filtered = data.filter((item) => item.type === type);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 xl:p-20 antialiased">
      <div className="max-w-[1400px] mx-auto">
        {/* Responsive Header */}
        <header className="mb-10 md:mb-16 border-l-4 border-cyan-500 pl-5 md:pl-8">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold capitalize tracking-tighter">
            {type}s
          </h1>
          <p className="text-zinc-500 text-sm md:text-lg mt-2 font-medium">
            {filtered.length} entries active in database
          </p>
        </header>

        {/* The Grid: 1 col (mobile) | 2 cols (tablet) | 3 cols (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Icon with Glow */}
                  <div className="relative">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-12 h-12 relative z-10"
                    />
                    <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>

                  <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                    Grade {item.grade}
                  </span>
                </div>

                <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">
                  ID: {item.id.slice(0, 8)}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-400 flex items-center gap-2 transition-all">
                  Launch{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
