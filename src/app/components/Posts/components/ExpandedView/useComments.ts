// import { useInfiniteQuery } from "@tanstack/react-query";
// import { queries } from "../../queries";
import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";

interface UseCommentsProps {
  postId: string;
}
const limit = 10;
export function useComments(params: UseCommentsProps) {
  const { postId } = params;
  const [page, setPage] = React.useState(0);
  const [pageEnd, setPageEnd] = React.useState(false);
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

  const COMMENTS_SUBSCRIPTION = gql`
    subscription CommentAdded($postId: ID!) {
      commentAdded(postId: $postId) {
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

  function more() {
    fetchMore({
      variables: {
        commentPage: page + 1,
        limit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEntries = fetchMoreResult.comments;
        if (newEntries.length === 0) {
          setPageEnd(true);
          return previousResult;
        }
        setPage(page + 1);
        setPageEnd(false);
        return {
          comments: [...previousResult.comments, ...newEntries],
        };
      },
    });
  }

  const { loading, data, fetchMore, subscribeToMore } = useQuery(
    fetchCommentQuery,
    {
      variables: {
        postId: Number(postId),
        commentPage: 0,
        limit: 10,
      },
    }
  );

  useEffect(() => {
    subscribeToMore({
      document: COMMENTS_SUBSCRIPTION,
      variables: { postId: Number(postId) },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("Subscription Data", subscriptionData);
        if (!subscriptionData.data) return prev;
        const newComment = subscriptionData.data.commentAdded;
        return {
          comments: [newComment, ...prev.comments],
        };
      },
    });
  }, []);

  return {
    data,
    fetchMore: more,
    loading,
    pageEnd,
  };
}
