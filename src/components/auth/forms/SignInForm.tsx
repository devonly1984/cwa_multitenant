"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { poppins } from "@/constants";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignInForm = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.auth.session.queryFilter()
        );
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login.mutate(data);
  };
  return <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn(
                    "text-2xl font-semibold",
                    poppins.className
                  )}
                >
                  FunRoad
                </span>
              </Link>
              <Button
                asChild
                variant={"ghost"}
                size={"sm"}
                className="text-base border-none underline"
              >
                <Link prefetch href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Welcome back to Funroad.{" "}
            </h1>

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"lg"}
              variant={"elevated"}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
              disabled={login.isPending}
            >
              Log in
            </Button>
          </form>
        </Form>
};
export default SignInForm;
