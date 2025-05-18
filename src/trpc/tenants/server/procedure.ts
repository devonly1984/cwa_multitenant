
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import z from 'zod';
export const tenantRouter = createTRPCRouter({
  getOne: databaseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tenants = await ctx.payload.find({
        collection: "tenants",
        where: {
          slug: {
            equals: input.slug,
          },
        },
        limit: 1,
        pagination: false,
      });
      const individualTenant = tenants.docs[0];

      if (!tenants) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }
      return individualTenant;
    }),
});
