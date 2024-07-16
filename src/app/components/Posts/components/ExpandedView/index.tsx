import { User } from "@/app/components/UserImage";
import React from "react";
import { ModalType } from "../../types";
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

type Props = Omit<ModalType, "open">;

export function ExpandedView(props: Props) {
  const isDesktop = useScreenSize() > breakPoints.xs ? true : false;
  const { selectedPost } = props;
  return (
    <section className="flex justify-center gap-0 h-full">
      {isDesktop ? (
        <div className="flex-1 expanded-view">
          <Media.Wrapper
            images={getImages(selectedPost.media || [])}
            title={selectedPost.description || ""}
          />
        </div>
      ) : null}
      <section className="bg-white relative flex-1 h-screen sm:h-auto">
        {!isDesktop ? (
          <div className="px-gutter flex py-small justify-between border-b border-slate-200">
            <i className="self-start">
              <Icon.Back className="-rotate-90" />
            </i>
            <p className="self-center mx-auto">Comments</p>
          </div>
        ) : null}
        <div className="p-[14px] border-b border-slate-200 hidden sm:block">
          <Author
            name={selectedPost.user.name}
            profileUrl={selectedPost.user.profileUrl}
          />
        </div>
        <div>
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
        {isDesktop ? (
          <section className="bottom-0 absolute w-full p-gutter">
            <ActionBar />
            <span className="mt-2">
              <Likes likes={selectedPost.likes} />
            </span>
          </section>
        ) : null}
      </section>
    </section>
  );
}
