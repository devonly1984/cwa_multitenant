import { ProductListView } from "@/components";
import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/hooks/searchParamsServer";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

interface Props {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<SearchParams>;
}
const SubCategoryPage = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      categorySlug: subcategory,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView category={subcategory} />
      </HydrationBoundary>
    </div>
  );
};
export default SubCategoryPage;
