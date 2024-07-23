import { useInfiniteQuery } from "@tanstack/react-query";
import { queries } from "../../queries";

export function useComments(postId: string, page: number) {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [queries.fetchComments.name, postId, page],
      queryFn: queries.fetchComments.queryFn(postId),
      getNextPageParam: (lastPage, pages) => {
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
  };
}
