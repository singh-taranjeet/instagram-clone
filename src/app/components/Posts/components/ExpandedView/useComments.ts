import { useInfiniteQuery } from "@tanstack/react-query";
import { queries } from "../../queries";

export function useComments(postId: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queries.fetchComments.name, postId],
    queryFn: queries.fetchComments.queryFn(postId),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length;
    },
    initialPageParam: 0, // Provide the initialPageParam value
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  };
}
