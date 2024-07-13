import { User } from "@/app/components/UserImage";
import { ModalType } from "../../types";
import { getImages } from "../../utils";
import { Author } from "../Author";
import { Media } from "../Media";
import { ActionBar } from "../ActionBar";
import { timeFromNow } from "@/app/utils";
import { PostDetails } from "../Details";

type Props = Omit<ModalType, "open">;

export function ExpandedView(props: Props) {
  const { selectedPost } = props;
  return (
    <section className="grid grid-cols-2">
      <div className="hidden sm:block">
        <Media.Wrapper
          images={getImages(selectedPost.media || [])}
          title={selectedPost.description || ""}
        />
      </div>
      <section className="bg-white relative">
        <div className="p-[14px] border-b border-slate-200">
          <Author
            name={selectedPost.user.name}
            profileUrl={selectedPost.user.profileUrl}
          />
        </div>
        <div>
          {selectedPost.comments.map((comment, index) => (
            <>
              <div
                key={comment.user.id}
                className="flex p-gutter items-censter"
              >
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
            </>
          ))}
        </div>
        <section className="bottom-0 absolute w-full p-gutter">
          <ActionBar />
        </section>
      </section>
    </section>
  );
}
