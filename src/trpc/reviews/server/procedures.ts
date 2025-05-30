
import { createTRPCRouter, protectedProdure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import z from 'zod';
export const reviewsRouter = createTRPCRouter({
  getOne: protectedProdure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No Reviews Found",
        });
      }
      const reviewsData = await ctx.payload.find({
        collection: "reviews",
        limit: 1,
        where: {
          and: [
            {
              product: {
                equals: product.id,
              },
            },
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
          ],
        },
      });
      const review = reviewsData.docs[0];
      if (!review) {
        return null;
      }
      return review;
    }),
  create: protectedProdure
    .input(
      z.object({
        productId: z.string(),
        rating: z
          .number()
          .min(1, { message: "Rating is required" })
          .max(5),
        description: z
          .string()
          .min(1, { message: "Description is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.productId,
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      const existingReviewData = await ctx.payload.find({
        collection: "reviews",
        where: {
          and: [
            {
              product: { equals: input.productId },
            },
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
          ],
        },
      });
      if (existingReviewData.totalDocs > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already reviewed this product",
        });
      }
      const review = await ctx.payload.create({
        collection: "reviews",
        data: {
          user: ctx.session.user.id,
          product: product.id,
          rating: input.rating,
          description: input.description,
        },
      });
      return review;
    }),
  update: protectedProdure
    .input(
      z.object({
        reviewId: z.string(),
        rating: z
          .number()
          .min(1, { message: "Rating is required" })
          .max(5),
        description: z
          .string()
          .min(1, { message: "Description is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
  
      const existingReview = await ctx.payload.findByID({
        collection: "reviews",
        depth: 0,
        id: input.reviewId,
      });
      if (!existingReview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review Not Found",
        });
      }
      if (existingReview.user !== ctx.session.user.id){
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to update this review",
        });
      }
     const updatedReview = await ctx.payload.update({
       collection: "reviews",
       id: input.reviewId,
       data: {
         rating: input.rating,
         description: input.description,
       },
     });
     return updatedReview;
    }),
});
