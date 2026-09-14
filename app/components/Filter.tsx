"use client";

import { useState } from "react";
import FilterControls from "./FilterControls";
import ResourceCard from "./ResourceCard";
import SearchBar from "./SearchBar";

interface FilterItem {
  id?: string;
  _id?: string;
  type?: string;
  language?: string;
  grade?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
}

interface FilterProps {
  data: FilterItem[];
  type: string;
  savedIds?: string[];
  showSaveButton?: boolean;
}

export default function Filter({
  data,
  type,
  savedIds = [],
  showSaveButton = true,
}: FilterProps) {
  const [language, setLanguage] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) => {
    const matchesType = type === "saved" ? true : item.type === type;
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    return (
      matchesType &&
      matchesSearch &&
      (language === "all" || item.language === language) &&
      (grade === "all" || item.grade === grade)
    );
  });

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-zinc-950/80 p-4 md:p-6 rounded-2xl border border-zinc-900/90 shadow-xl">
        <SearchBar search={search} setSearch={setSearch} />

        <FilterControls
          language={language}
          setLanguage={setLanguage}
          grade={grade}
          setGrade={setGrade}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-2">
        {filtered.map((item) => {
          const itemId = String(item.id ?? item._id ?? "");

          return (
            <ResourceCard
              key={itemId}
              item={{
                id: itemId,
                type: item.type,
                language: item.language,
                grade: item.grade,
                icon: item.icon,
                title: item.title,
                description: item.description,
                link: item.link,
              }}
              initialSaved={
                showSaveButton ? (savedIds ?? []).includes(itemId) : undefined
              }
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 md:py-24 flex flex-col items-center justify-center text-center bg-zinc-950/40 rounded-2xl border border-zinc-900">
          <p className="text-lg md:text-xl font-bold text-white mb-2">
            {type === "task"
              ? "დავალებები არ არის"
              : type === "project"
                ? "პროექტები არ არის"
                : type === "saved"
                  ? "შენახული მასალები არ არის"
                  : "რესურსები არ არის"}
          </p>
          <p className="text-sm text-zinc-500">
            {type === "saved"
              ? "ჯერ არ გაქვთ შენახული მასალები."
              : "ამ კატეგორიაში არცერთი ელემენტი არ არის."}
          </p>
        </div>
      )}
    </div>
  );
}
