import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbars/Navbar";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react"
import { SearchFilters } from "@/components/search";
import { getQueryClient, trpc } from "@/trpc/server";
import SearchFiltersSkeleton from "@/components/skeletons/SearchFiltersSkeleton";

interface Props {
    children: ReactNode
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
      <Footer />
    </div>
  );
};
export default HomeLayout