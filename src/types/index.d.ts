import { ReactNode } from "react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import Stripe from "stripe";
export interface NavbarItems {
  href: string;
  children: ReactNode;
}



export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[0]
export type ProductsGetManyOutput = inferRouterOutputs<AppRouter>['products']['getMany']
export type ProductMetadata = {
  stripeAccountId: string;
  id: string;
  name: string;
  price: number;
};

export type CheckoutMetadata = {
  userId:string;
  
}
export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata;
    };
  };
};