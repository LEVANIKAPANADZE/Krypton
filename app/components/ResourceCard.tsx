"use client";

import Image from "next/image";
import Link from "next/link";
import SaveButton from "../components/saveButton";

interface ResourceCardProps {
  item: {
    id: string;
    type?: string;
    language?: string;
    grade?: string;
    icon?: string;
    title?: string;
    description?: string;
    link?: string;
  };
  initialSaved: boolean;
}

export default function ResourceCard({
  item,
  initialSaved,
}: ResourceCardProps) {
  return (
    <article className="group relative flex flex-col justify-between p-5 md:p-6 bg-zinc-950/90 border border-zinc-800/80 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500 transition-all duration-500" />

      <div>
        <div className="flex justify-between items-start mb-5 gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center p-2.5 relative z-10 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={item.icon || "/file-icon.svg"}
                alt=""
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
              {item.type ? item.type : "RESOURCE"}
            </span>

            {item.grade && (
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider">
                კლასი {item.grade}
              </span>
            )}

            <div className="ml-1 z-20">
              <SaveButton
                resourceId={String(item.id)}
                initialSaved={initialSaved}
              />
            </div>
          </div>
        </div>

        <Link
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 mb-2 line-clamp-1">
            {item.title}
          </h3>

          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6">
            {item.description}
          </p>
        </Link>
      </div>

      <div className="pt-4 border-t border-zinc-900/90 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          ID: {String(item.id).slice(0, 8)}
        </span>

        <Link
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-bold text-zinc-300 group-hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
        >
          გახსნა
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
