import { PostType } from "../../types";
import { PostDetails } from "../Details";
import { Likes } from "../Likes";

interface Props {
  onClickComments: () => void;
  post: PostType;
}
export function LikeComment(props: Props) {
  const { onClickComments, post } = props;

  return (
    <div className="flex flex-col">
      <span className="my-2">
        <Likes likes={post.likes}></Likes>
      </span>
      {post?.comments?.[0]?.user?.name ? (
        <PostDetails
          comment={post?.comments?.[0]?.content || "No comments"}
          userName={post.comments[0].user.name}
        />
      ) : null}
      {post.comments.length > 1 ? (
        <span
          className="text-sm text-slate-500 cursor-pointer mt-2"
          onClick={onClickComments}
        >
          View all {post.comments.length} comments
        </span>
      ) : null}
    </div>
  );
}
