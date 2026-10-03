export type SavedContentDocument = {
  _id?: unknown;
  id?: string;
  [key: string]: unknown;
};

export type SavedContentItem = Omit<SavedContentDocument, "_id"> & {
  _id: string;
};

export type PageType = "resource" | "task" | "project" | "saved";

export type PageItem = {
  _id: string;
  type?: string;
  language?: string;
  grade?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
};
