"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { poppins } from "@/constants"
import { registerSchema } from "@/lib/schemas/registerSchema"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const SignUpForm = () => {
    const router = useRouter()
    const trpc = useTRPC()
    const queryClient = useQueryClient();
      const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
          email: "",
          password: "",
          username: "",
        },
      });
      const register = useMutation(
  trpc.auth.register.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })
);
       const username = form.watch('username')
  const usernameErrors = form.formState.errors.username
  const showPreview = username && !usernameErrors
    const onSubmit =  (data: z.infer<typeof registerSchema>) => {
    register.mutate(data);
  };
  return (
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
  )
}
export default SignUpForm