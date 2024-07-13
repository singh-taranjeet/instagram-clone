import { UserImage } from "@/app/components/UserImage";
import { ModalType } from "../../types";
import { getImages } from "../../utils";
import { Author } from "../Author";
import { Media } from "../Media";
import { ActionBar } from "../ActionBar";

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
            <div key={comment.user.id} className="flex p-gutter items-center">
              <UserImage
                profileUrl={comment.user.profileUrl}
                name={comment.user.name}
              />
              <p className="px-small text-extraSmall">{comment.content}</p>
            </div>
          ))}
        </div>
        <section className="bottom-0 absolute w-full py-gutter">
          <ActionBar />
        </section>
      </section>
    </section>
  );
}
