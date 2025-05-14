import ProductFilters from "@/components/products/filters/ProductFilters";
import ProductList from "@/components/products/ProductList";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";
import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";


interface Props {
    params: Promise<{category:string}>
}
const CategoryPage =async ({params}:Props) => {
    const { category } = await params;
const queryClient = getQueryClient()
void queryClient.prefetchQuery(
  trpc.products.getMany.queryOptions({
    categorySlug: category,
  })
);
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
            <div className="lg:col-span-2 xl:col-span-2">
              <ProductFilters />
            </div>
            <div className="lg:col-span-4 xl:col-span-6">
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList category={category} />
              </Suspense>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
export default CategoryPage