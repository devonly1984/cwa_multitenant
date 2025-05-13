import { Category } from "@/payload-types";
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { Where } from "payload";
import z from 'zod';
export const productsRouter = createTRPCRouter({
  getMany: databaseProcedure
    .input(
      z.object({
        categorySlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx,input }) => {
      const where:Where={}
      if (input.categorySlug) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.categorySlug,
            },
          },
        });
        const formattedData = categoriesData.docs.map((doc) => ({
              ...doc,
              subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                ...(doc as Category),
                subcategories: undefined,
              })),
            }));
            const subcategories = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subcategories.push(
            ...parentCategory.subcategories.map((subcat) => subcat.slug)
          );
        }
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategories],
          };
      }
      
      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));
      return data;
    }),
});
