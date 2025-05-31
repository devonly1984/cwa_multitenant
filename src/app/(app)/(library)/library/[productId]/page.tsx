import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import LibraryProductView from "@/components/library/views/LibraryProductView";
 interface Props {
    params: Promise<{productId: string}>;
}
const ProductIdPage = async ({ params }: Props) => {
  const {productId} = await params;
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(
      trpc.library.getOne.queryOptions({
        productId,
      })
    );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryProductView productId={productId} />
    </HydrationBoundary>
  );
};
export default ProductIdPage;
