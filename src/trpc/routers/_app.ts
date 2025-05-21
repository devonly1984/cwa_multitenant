
import { createTRPCRouter } from "@/trpc/init";
import { categoriesRouter } from "../categories/server/prodcedures";
import { authRouter } from "../auth/server/procedures";
import { productsRouter } from "../products/server/prodcedures";
import { tagsRouter } from "../tags/server/procedures";
import { tenantRouter } from "../tenants/server/procedure";
import { checkoutRouter } from "../checkout/server/prodcedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantRouter,
  checkout: checkoutRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;