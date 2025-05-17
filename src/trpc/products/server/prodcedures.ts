import { DEFAULT_LIMIT } from "@/constants";
import { sortValues } from "@/hooks/searchParamsServer";
import { Category, Media } from "@/payload-types";
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from 'zod';
export const productsRouter = createTRPCRouter({
  getMany: databaseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        categorySlug: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        price: {},
      };
      let sort: Sort = "-createdAt";
      switch (input.sort) {
        case "trending":
          sort = "+createdAt";
          break;
        case "hot_and_new":
          sort = "name";
          break;
        case "curated":
          sort = "-createdAt";
          break;
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
          greater_than_equal: input.minPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

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
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategories],
          };
        }
      }
      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }
      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
        })),
      };
    }),
});
