
import { productSchema } from "@/lib/schemas/productShema";
import { Category, Media, Tenant } from "@/payload-types";
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from 'zod';
export const productsRouter = createTRPCRouter({
  getMany: databaseProcedure
    .input(productSchema)
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
      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
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
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  getOne: databaseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
      });
      return {
        ...product,
        image: product.image as Media | null,
        cover: product.cover as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),
});
