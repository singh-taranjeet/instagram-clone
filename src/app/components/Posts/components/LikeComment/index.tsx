import { timeFromNow } from "@/app/utils";
import { PostType } from "../../types";
import { PostDetails } from "../Details";
import { Likes } from "../Likes";

interface Props {
  onClickComments: () => void;
  post: PostType;
}
export function LikeComment(props: Readonly<Props>) {
  const { onClickComments, post } = props;

  return (
    <div className="flex flex-col">
      <span className="my-2">
        <Likes likes={post.likes}></Likes>
      </span>
      {post?.highlightedComment?.user?.name ? (
        <div className="flex flex-col">
          <PostDetails
            comment={post?.highlightedComment?.content || "No comments"}
            userName={post.highlightedComment.user.name}
          />
          <span className=" text-xs text-[#737373] mt-1">
            {timeFromNow(post.highlightedComment.createdAt, false)}
          </span>
        </div>
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
