import { Category } from "@/payload-types";
import { ReactNode } from "react";

export interface NavbarItems {
  href: string;
  children: ReactNode;
}

export type CustomCategory = Category & {
  subcategories: Omit<Category, "subcategories">[];
};