import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { loadProductFilters } from "@/hooks/searchParamsServer";
import {ProductListView} from "@/components";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}
const CategoryPage = async ({ params, searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);
  const { category } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: category,
      ...filters,
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
