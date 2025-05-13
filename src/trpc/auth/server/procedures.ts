import { generateAuthCookie } from "@/lib/authUtils";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { createTRPCRouter, databaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";

export const authRouter = createTRPCRouter({
  session: databaseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });
    return session;
  }),
  register: databaseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const existingData = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });
      const existingUser = existingData.docs[0];
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }
      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }
      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });
    }),
  login: databaseProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }
      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });
      return data;
    }),

});
