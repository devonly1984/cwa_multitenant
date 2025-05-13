import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import {
  SearchFilters,
  SearchFiltersSkeleton,
  HomeFooter,
  Navbar,
} from "@/components";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  children: ReactNode;
}
const HomeLayout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <HomeFooter />
    </div>
  );
};
export default HomeLayout;
