// import { useInfiniteQuery } from "@tanstack/react-query";
// import { queries } from "../../queries";
import { gql, useQuery } from "@apollo/client";

export function useComments(postId: string) {
  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isLoading,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: [queries.fetchComments.name, postId],
  //   queryFn: queries.fetchComments.queryFn(postId),
  //   getNextPageParam: (lastPage, pages) => {
  //     console.log("lastPage", lastPage);
  //     if (lastPage.length === 0) return undefined;
  //     return pages.length;
  //   },
  //   initialPageParam: 0, // Provide the initialPageParam value
  // });

  const fetchCommentQuery = gql`
    query Comments($postId: ID!, $commentPage: Float, $limit: Float) {
      comments(postId: $postId, commentPage: $commentPage, limit: $limit) {
        content
        likes
        id
        createdAt
        user {
          name
          id
          profileUrl
        }
      }
    }
  `;

  const { loading, data, fetchMore, error } = useQuery(fetchCommentQuery, {
    variables: {
      postId: Number(postId),
      commentPage: 0,
      limit: 10,
    },
  });

  return {
    data,
    fetchMore,
    loading,
  };
}
