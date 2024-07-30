import { Icon } from "@/app/components/Icon";
import { PostType } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { getQueryClient } from "@/app/components/ReactQueryProvider";
import { queries } from "../../queries";

const incrementLikeQuery = gql`
  mutation UpdatePost($id: ID!, $updatePostInput: UpdatePostInput!) {
    updatePost(id: $id, updatePostInput: $updatePostInput) {
      likes
    }
  }
`;

interface ActionBarProps {
  onCommentClick(): void;
  post: PostType;
}
export function ActionBar(props: ActionBarProps) {
  const { onCommentClick, post } = props;

  const [incrementLike, { data, loading, error }] =
    useMutation(incrementLikeQuery);

  const queryClient = getQueryClient();

  function onClickLike() {
    const newLikes = post.likes + 1;

    incrementLike({
      variables: {
        id: post.id,
        updatePostInput: {
          likes: newLikes,
          fields: ["likes"],
        },
      },
    });

    queryClient.setQueryData([queries.fetchPosts.name], (old: any) => {
      return {
        ...old,
        pages: old.pages.map((page: any) =>
          page.map((item: any) =>
            item.id === post.id ? { ...post, likes: newLikes } : item
          )
        ),
      };
    });
  }

  return (
    <div className="flex gap-small">
      <i className="cursor-pointer" onClick={onClickLike}>
        <Icon.Fav />
      </i>
      <i className="cursor-pointer" onClick={onCommentClick}>
        <Icon.Comment />
      </i>
      <i className="cursor-pointer">
        <Icon.Share />
      </i>
      <i className="ml-auto cursor-pointer">
        <Icon.BookMark />
      </i>
    </div>
  );
}
