import type { SearchParams } from "nuqs/server";
import { ProductListView } from "@/components";
import { loadProductFilters } from "@/hooks/searchParamsServer";
import { getQueryClient,  trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";



interface TenantProps {
    searchParams: Promise<SearchParams>;
    params: Promise<{slug:string}>;
}
const TenantPage = async ({ searchParams, params }: TenantProps) => {
    const {slug} = await params;
    const filters = await loadProductFilters(searchParams);
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        tenantSlug: slug,
        limit: DEFAULT_LIMIT,
      })
    );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} />
    </HydrationBoundary>
  );
};
export default TenantPage;
