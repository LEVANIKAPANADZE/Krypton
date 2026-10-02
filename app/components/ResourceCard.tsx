"use client";

import Image from "next/image";
import Link from "next/link";
import SaveButton from "../components/saveButton";

interface ResourceCardProps {
  item: {
    id?: string;
    _id?: string;
    type?: string;
    language?: string;
    grade?: string;
    icon?: string;
    title?: string;
    description?: string;
    link?: string;
  };
  initialSaved?: boolean | undefined;
}

export default function ResourceCard({
  item,
  initialSaved,
}: ResourceCardProps) {
  const resourceId = String(item.id || item._id || "");
  return (
    <article className="group relative flex flex-col justify-between p-5 md:p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:border-amber-300/50 hover:bg-amber-300/5 transition-colors duration-200">
      <div>
        <div className="flex justify-between items-start mb-5 gap-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center p-2.5">
            <Image
              src={item.icon || "/file-icon.svg"}
              alt=""
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/50 border border-zinc-800/50 text-amber-300 text-[10px] font-bold uppercase tracking-wide">
              {item.type ? item.type : "RESOURCE"}
            </span>

            {item.grade && (
              <span className="px-2.5 py-1 rounded-md bg-amber-300/10 border border-amber-300/20 text-amber-300 text-[10px] font-bold uppercase tracking-wide">
                კლასი {item.grade}
              </span>
            )}

            {item.type === "task" ||
            typeof initialSaved !== "boolean" ? null : (
              <div className="ml-1 z-20">
                <SaveButton
                  resourceId={resourceId}
                  initialSaved={initialSaved}
                />
              </div>
            )}
          </div>
        </div>

        <Link
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="text-lg md:text-xl font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors duration-200 mb-2 line-clamp-1">
            {item.title}
          </h3>

          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6">
            {item.description}
          </p>
        </Link>
      </div>

      <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">
          ID: {resourceId.slice(0, 8)}
        </span>

        <Link
          href={item.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-medium text-zinc-300 group-hover:text-amber-300 flex items-center gap-1.5 transition-colors duration-200"
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
