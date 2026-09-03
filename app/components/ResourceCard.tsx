"use client";

import SaveButton from "./saveButton";

interface ResourceItem {
  id: string;
  type: string;
  language: string;
  grade: string;
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface ResourceCardProps {
  item: ResourceItem;
  initialSaved?: boolean;
}

export default function ResourceCard({
  item,
  initialSaved = false,
}: ResourceCardProps) {
  return (
    <a
      key={item.id}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <img src={item.icon} alt="" className="w-12 h-12 relative z-10" />

            <div className="absolute inset bg-cyan-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              კლასი {item.grade}
            </span>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <SaveButton resourceId={item.id} initialSaved={initialSaved} />
            </div>
          </div>
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
          გახსნა{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
      </div>
    </a>
  );
}
