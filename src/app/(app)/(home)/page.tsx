import { ProductListView } from "@/components";
import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/hooks/searchParamsServer"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
interface Props {
  searchParams: Promise<SearchParams>;
}
const HomePage = async({searchParams}:Props) => {
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
    
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
 
}
export default HomePage
