
import { createTRPCRouter } from "@/trpc/init";
import { categoriesRouter } from "../categories/server/prodcedures";
export const appRouter = createTRPCRouter({
 categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;