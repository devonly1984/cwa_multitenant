import LibraryView from "@/components/library/views/LibraryView";
import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const LibraryPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.review.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  );
};
export default LibraryPage;
