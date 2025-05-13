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
      CategoryPage {category}
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={category} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
export default CategoryPage