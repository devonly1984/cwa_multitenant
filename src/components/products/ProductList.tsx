"use client"
import { useProductFilters } from "@/hooks/useProductFilters";
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery,  } from "@tanstack/react-query";
import { ProductCard } from "@/components";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    category?:string;
    tenantSlug?:string;
    narrowView?:boolean;
}
const ProductList = ({category,tenantSlug,narrowView}:Props) => {
    const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          categorySlug: category,
          ...filters,
          limit: DEFAULT_LIMIT,
          tenantSlug,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0
              ? lastPage.nextPage
              : undefined;
          },
        }
      )
    );
if (data.pages?.[0]?.docs.length===0) {
  return (
    <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
      <InboxIcon className=""/>
      <p className="text-base font-medium">No Products Found</p>
    </div>
  )
}
  return (
    <>
      <div
        className={cn(
          "grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant.image?.url}
              reviewRating={3}
              reviewCount={5}
              price={product.price}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant={"elevated"}
          >
            Load more...
          </Button>
        )}
      </div>
    </>
  );
}
export default ProductList