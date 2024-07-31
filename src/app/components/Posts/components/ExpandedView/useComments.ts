import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";

const limit = 10;
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
interface UseCommentsProps {
  postId: string;
}

export function useComments(params: UseCommentsProps) {
  const { postId } = params;
  const [page, setPage] = React.useState(0);
  const [pageEnd, setPageEnd] = React.useState(false);

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
        if (!subscriptionData.data) return prev;
        const newComment = subscriptionData.data.commentAdded;
        const exist = prev.comments.find(
          (item: any) => item.id === newComment.id
        );
        if (exist) return prev;
        return {
          comments: [newComment, ...prev.comments],
        };
      },
    });
  }, [subscribeToMore, postId]);

  return {
    data,
    fetchMore: more,
    loading,
    pageEnd,
  };
}
