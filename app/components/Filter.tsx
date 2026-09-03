"use client";

import { useState } from "react";

import FilterControls from "./FilterControls";
import ResourceCard from "./ResourceCard";

interface FilterItem {
  id: string;
  type: string;
  language: string;
  grade: string;
  icon: string;
  title: string;
  description: string;
  link: string;
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
    return (
      (type === "saved" || item.type === type) &&
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
        {filtered.map((item) => (
          <ResourceCard
            key={item.id}
            item={item}
            initialSaved={savedIds.includes(item.id)}
          />
        ))}
      </div>
    </>
  );
}
