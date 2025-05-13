
import { createTRPCRouter } from "@/trpc/init";
import { categoriesRouter } from "../categories/server/prodcedures";
import { authRouter } from "../auth/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;