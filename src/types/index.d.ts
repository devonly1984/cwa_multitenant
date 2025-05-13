import { ReactNode } from "react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
export interface NavbarItems {
  href: string;
  children: ReactNode;
}



export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[0]
export type ProductsGetManyOutput = inferRouterOutputs<AppRouter>['products']['getMany']