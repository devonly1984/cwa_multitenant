import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { loadProductFilters } from "@/hooks/searchParamsServer";
import {ProductListView} from "@/components";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}
const CategoryPage = async ({ params, searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);
  const { category } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      categorySlug: category,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={category} />
      </HydrationBoundary>
    </div>
  );
};
export default CategoryPage;
