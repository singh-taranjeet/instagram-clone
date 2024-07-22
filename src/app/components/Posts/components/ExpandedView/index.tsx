import { User } from "@/app/components/UserImage";
import React from "react";
import { ModalType, PostType } from "../../types";
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

type Props = Omit<ModalType, "open">;
type ExpandedViewProps = Props & {
  onClose(): void;
};

export function ExpandedView(props: ExpandedViewProps) {
  const isDesktop = useScreenSize() > breakPoints.xs ? true : false;
  const { selectedPost, onClose } = props;
  return (
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
          {selectedPost.comments.map((comment, index) => (
            <React.Fragment key={`${comment.user.id}${index}`}>
              <div className="flex p-gutter items-censter">
                <div>
                  <User.image
                    profileUrl={comment.user.profileUrl}
                    name={comment.user.name}
                  />
                </div>
                <div className="pl-small">
                  <PostDetails
                    comment={comment.content}
                    userName={comment.user.name}
                  />

                  <div className="flex items-center gap-small text-text-gray text-extraExtraSmall">
                    <span>{timeFromNow(selectedPost.createdAt)}</span>
                    <span className="font-semibold">
                      {comment.likes || 0} likes
                    </span>
                    <span className="font-semibold">Reply</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Actions and likes */}
        {isDesktop ? (
          <section className="bottom-0 absolute w-full bg-white border-y border-slate-200">
            <section className="p-gutter flex flex-col gap-2">
              <ActionBar />
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
  );
}
