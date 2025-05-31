
import { createTRPCRouter } from "@/trpc/init";
import { categoriesRouter } from "../categories/server/prodcedures";
import { authRouter } from "../auth/server/procedures";
import { productsRouter } from "../products/server/prodcedures";
import { tagsRouter } from "../tags/server/procedures";
import { tenantRouter } from "../tenants/server/procedure";
import { checkoutRouter } from "../checkout/server/prodcedures";
import { libraryRouter } from "../library/server/prodcedures";
import { reviewsRouter } from "../reviews/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantRouter,
  checkout: checkoutRouter,
  library: libraryRouter,
  review: reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;