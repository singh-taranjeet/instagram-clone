"use client";
import { gql, useQuery } from "@apollo/client";
import { useInfiniteQuery } from "@tanstack/react-query";

const GET_POSTS = gql`
  query Posts($page: Float!) {
    posts(page: $page) {
      _id
      description
      likes
      user {
        _id
        name
        profileUrl
      }
      comments {
        content
        likes
        user
      }
      media {
        name
        url
      }
    }
  }
`;

export function usePosts() {
  const postGraph = useQuery(GET_POSTS, {
    variables: { page: 0 },
  });

  async function fetchPosts(page: number) {
    const { data } = await postGraph.refetch({ page });
    return data.posts;
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts-12"],
      queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
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
