
import {  Media, Tenant } from "@/payload-types";
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import z from 'zod';
export const checkoutRouter = createTRPCRouter({
  getProducts: databaseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
    
      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where: {
          id: {
            in: input.ids
          }
        }
      });
      if (data.totalDocs !==input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
