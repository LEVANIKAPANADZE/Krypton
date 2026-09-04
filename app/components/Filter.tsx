"use client";

import { useState } from "react";
import FilterControls from "./FilterControls";
import ResourceCard from "./ResourceCard";

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
}

export default function Filter({ data, type, savedIds = [] }: FilterProps) {
  const [language, setLanguage] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");

  const filtered = data.filter((item) => {
    const matchesType = type === "saved" ? true : item.type === type;

    return (
      matchesType &&
      (language === "all" || item.language === language) &&
      (grade === "all" || item.grade === grade)
    );
  });

  return (
    <>
      <FilterControls
        language={language}
        setLanguage={setLanguage}
        grade={grade}
        setGrade={setGrade}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
              initialSaved={savedIds.includes(itemId)}
            />
          );
        })}
      </div>
    </>
  );
}
