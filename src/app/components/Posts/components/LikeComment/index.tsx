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
      {post?.highlightedComment?.user?.name ? (
        <PostDetails
          comment={post?.highlightedComment?.content || "No comments"}
          userName={post.highlightedComment.user.name}
        />
      ) : null}
      <span
        className="text-sm text-slate-500 cursor-pointer mt-2"
        onClick={onClickComments}
      >
        View all {post.commentsCount} comments
      </span>
    </div>
  );
}
