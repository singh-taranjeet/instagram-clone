import { useInfiniteQuery } from "@tanstack/react-query";
import { queries } from "../queries";

export function usePosts() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [queries.fetchPosts.name],
      queryFn: queries.fetchPosts.queryFn,
      getNextPageParam: (lastPage, pages) => {
        return pages.length;
      },
      initialPageParam: 10, // Provide the initialPageParam value
    });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  };
}
