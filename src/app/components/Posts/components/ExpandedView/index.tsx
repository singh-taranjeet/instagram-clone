"use client";
import { User } from "@/app/components/UserImage";
import React, { useEffect, useMemo, useState } from "react";
import { CommentType, ModalType, PostType } from "../../types";
import { getImages } from "../../utils";
import { Author } from "../Author";
import { Media } from "../Media";
import { ActionBar } from "../ActionBar";
import { timeFromNow } from "@/app/utils";
import { PostDetails } from "../Details";
import { Likes } from "../Likes";
import "./styles.css";
import { Icon } from "@/app/components/Icon";
import { useScreenSize, breakPoints } from "@/app/utils/hooks/useScreenSize";
import { AddComment } from "../AddComment";
import { useComments } from "./useComments";
import { LoadMore } from "../LoadMore";
import { PulseLoading } from "@/app/components/PulseLoading";
import { getQueryClient } from "@/app/components/ReactQueryProvider";
import { queries } from "../../queries";
import { gql, useMutation } from "@apollo/client";

type Props = Omit<ModalType, "open">;
type ExpandedViewProps = Props & {
  onClose(): void;
};

const commentLikeQuery = gql`
  mutation LikeComment($id: ID!, $userId: ID!) {
    likeComment(id: $id, userId: $userId) {
      likes
      likedBy {
        name
        id
        profileUrl
      }
    }
  }
`;

function onClickReply() {
  // focus on the textarea with id AddAComment
  const textarea = document.getElementById("AddAComment");
  if (textarea) {
    textarea.focus();
  }
}

export function ExpandedView(props: ExpandedViewProps) {
  const isDesktop = useScreenSize() > breakPoints.xs;
  const { onClose } = props;
  const [selectedPost, setSelectedPost] = useState<PostType | undefined>(
    undefined
  );

  const queryClient = getQueryClient();
  const posts: any = queryClient.getQueryData([queries.fetchPosts.name]);

  const [incrementCommentLike] = useMutation(commentLikeQuery);

  function onClickCommentLike(id: number) {
    incrementCommentLike({
      variables: {
        id,
        userId: 1,
      },
      onCompleted: (data) => {
        updateQuery((prev: any) => {
          console.log("Prev", prev);
          const comments = JSON.parse(JSON.stringify(prev.comments));
          // update the comment in prev
          comments.forEach((comment: any, index: number) => {
            if (comment.id === id) {
              comments[index].likes = data.likeComment.likes;
            }
          });
          return {
            comments,
          };
        });
      },
    });
  }

  // get post of id selectedPost
  useEffect(() => {
    posts.pages.forEach((page: any) => {
      page.forEach((item: any) => {
        if (item.id === props.selectedPost) {
          setSelectedPost(item);
        }
      });
    });
  }, [posts, selectedPost]);

  const { data, loading, fetchMore, pageEnd, updateQuery } = useComments({
    postId: selectedPost?.id ?? "",
  });

  return (
    <>
      {selectedPost ? (
        <section className="flex justify-center gap-0 h-full">
          {isDesktop ? (
            <div className="flex-1 expanded-view bg-black ">
              <Media.Wrapper
                fit="contain"
                images={getImages(selectedPost.media || [])}
                title={selectedPost.description || ""}
              />
            </div>
          ) : null}
          <section className="bg-white relative flex-1 sm:overflow-y-scroll overflow-y-hidden">
            {!isDesktop ? (
              <div className="px-gutter flex py-small justify-between border-b border-slate-200 absolute top-0 w-full">
                <i className="self-start" onClick={onClose}>
                  <Icon.Back className="-rotate-90" />
                </i>
                <p className="self-center mx-auto">Comments</p>
              </div>
            ) : null}
            <div className="p-gutter border-b border-slate-200 hidden sm:block">
              <Author
                name={selectedPost.user.name}
                profileUrl={selectedPost.user.profileUrl}
              />
            </div>
            <div className="mt-12 sm:mt-0 overflow-y-scroll expanded-view-container pb-[145px]">
              {data?.comments?.map((comment: CommentType, index: number) => (
                <React.Fragment key={`${comment.id}-${index}`}>
                  <div className="flex p-gutter">
                    <div>
                      <User.image
                        profileUrl={comment.user.profileUrl}
                        name={comment.user.name}
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="pl-small">
                        <PostDetails
                          comment={comment.content}
                          userName={comment.user.name}
                        />

                        <div className="flex items-center gap-small text-text-gray text-extraExtraSmall">
                          <span>{timeFromNow(comment.createdAt)}</span>
                          <span className="font-semibold">
                            {comment.likes || 0} likes
                          </span>
                          <span
                            className="font-semibold"
                            onClick={onClickReply}
                          >
                            Reply
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => onClickCommentLike(comment.id)}
                      >
                        <Icon.Fav className="w-3 h-h3" label="like"></Icon.Fav>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
              {pageEnd ? null : (
                <LoadMore isFetching={loading} nextPage={fetchMore}>
                  <PulseLoading.Comments />
                </LoadMore>
              )}
            </div>
            {/* Actions and likes */}
            {isDesktop ? (
              <section className="bottom-0 absolute w-full bg-white border-y border-slate-200">
                <section className="p-gutter flex flex-col gap-2">
                  <ActionBar
                    entity={selectedPost}
                    onCommentClick={onClickReply}
                  />
                  <span>
                    <Likes likes={selectedPost.likes} />
                  </span>
                </section>
                {/* Show add a new comment in mobile */}
                <AddComment selectedPost={selectedPost} />
              </section>
            ) : (
              <section className=" absolute bottom-0 w-full">
                <AddComment selectedPost={selectedPost} />
              </section>
            )}
          </section>
        </section>
      ) : null}
    </>
  );
}
