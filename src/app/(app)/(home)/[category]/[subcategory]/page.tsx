import ProductList from "@/components/products/ProductList";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{  subcategory: string }>;
}
const SubCategoryPage =async ({params}:Props) => {
    const { subcategory } = await params;
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
      trpc.products.getMany.queryOptions({
        categorySlug: subcategory,
      })
    );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={subcategory} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
export default SubCategoryPage;