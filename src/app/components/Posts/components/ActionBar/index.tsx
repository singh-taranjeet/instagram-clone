import { Icon } from "@/app/components/Icon";
import { PostType } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { getQueryClient } from "@/app/components/ReactQueryProvider";
import { queries } from "../../queries";

const postLikeQuery = gql`
  mutation LikePost($id: ID!, $userId: ID!) {
    likePost(id: $id, userId: $userId) {
      likes
      likedBy {
        name
        id
        profileUrl
      }
    }
  }
`;
interface ActionBarProps {
  onCommentClick(): void;
  entity: PostType;
}
export function ActionBar(props: Readonly<ActionBarProps>) {
  const { onCommentClick, entity } = props;

  const [incrementpostLike] = useMutation(postLikeQuery);

  const queryClient = getQueryClient();

  function onClickLike() {
    incrementpostLike({
      variables: {
        id: entity.id,
        userId: 1,
      },
      onCompleted: (data) => {
        // console.log("data", data.likePost);
        queryClient.setQueryData([queries.fetchPosts.name], (old: any) => {
          return {
            ...old,
            pages: old.pages.map((page: any) =>
              page.map((item: any) =>
                item.id === entity.id
                  ? { ...entity, likes: data.likePost.likes }
                  : item
              )
            ),
          };
        });
      },
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
