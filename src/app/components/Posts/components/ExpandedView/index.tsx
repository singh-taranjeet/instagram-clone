import { ModalType } from "../../types";
import { getImages } from "../../utils";
import { Author } from "../Author";
import { Media } from "../Media";

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
      <section className="bg-white">
        <div className="p-[14px] border-b border-slate-200">
          <Author
            name={selectedPost.user.name}
            profileUrl={selectedPost.user.profileUrl}
          />
        </div>
        <div>
          {selectedPost.comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.content}</p>
              <p>{comment.user}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
