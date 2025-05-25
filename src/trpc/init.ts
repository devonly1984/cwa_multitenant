import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import SuperJSON from "superjson";
import { headers as getHeaders } from "next/headers";
export const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

const t = initTRPC.create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const databaseProcedure = t.procedure.use(async({next})=>{
  const payload = await getPayload({
    config: configPromise
  })
  
  return next({ ctx: { payload } });

});
export const protectedProdure = databaseProcedure.use( async ({ctx,next})=>{
  const headers = await getHeaders()
  const session = await ctx.payload.auth({headers});
  if (!session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not Authorized"
    })
  }
  return next({
    ctx: {
      ...ctx,
      session: {
        ...session,
        user: session.user,
      },
    },
  });
}


)