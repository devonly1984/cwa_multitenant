import { stripe } from "@/lib/stripe";
import {  Media, Tenant } from "@/payload-types";
import { createTRPCRouter, databaseProcedure, protectedProdure } from "@/trpc/init";
import { CheckoutMetadata, ProductMetadata } from "@/types";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";

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
            in: input.ids,
          },
        },
      });
      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }
      const totalPrice = data.docs.reduce((acc, product) => {
        const price = Number(product.price);
        return acc + (isNaN(price) ? 0 : price);
      }, 0);
      return {
        ...data,
        totalPrice: totalPrice,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  purchase: protectedProdure
    .input(
      z.object({
        productIds: z.array(z.string()).min(1),
        tenantSlug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });
      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }
      const tenantsData = await ctx.payload.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });
      const tenant = tenantsData.docs[0];
      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
            product_data: {
              name: product.name,
              metadata: {
                stripeAccountId: tenant.stripeAccountId,
                id: product.id,
                name: product.name,
                price: product.price,
              } as ProductMetadata,
            },
          },
        }));
      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          userId: ctx.session.user.id,
        } as CheckoutMetadata,
      });
      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session url",
        });
      }
      return { url: checkout.url };
    }),
});
