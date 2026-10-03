import type { ObjectId } from "mongodb";

export type AppUser = {
  _id?: ObjectId | string;
  id?: string;
  name?: string;
  email?: string;
  saved?: string[];
};
