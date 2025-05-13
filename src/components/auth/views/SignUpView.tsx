"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { poppins } from "@/constants";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const SignUpView = () => {
  const router =useRouter();
const trpc = useTRPC();
const register = useMutation(
  trpc.auth.register.mutationOptions({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })
);
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit =  (data: z.infer<typeof registerSchema>) => {
    register.mutate(data);
  };
  const username = form.watch('username')
  const usernameErrors = form.formState.errors.username
  const showPreview = username && !usernameErrors

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
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
                <Link prefetch href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1580 creators earning money on FunRoad.
            </h1>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                  >                    Your store will be available at&nbsp;
                    <strong>{username}</strong>.shop.com
                    {/**TODO: use proper method to generate preview url  */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              disabled={register.isPending}
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url(/bg-auth.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
export default SignUpView;