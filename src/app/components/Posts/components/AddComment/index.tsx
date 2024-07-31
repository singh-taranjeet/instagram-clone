import React from "react";
import { User } from "@/app/components/UserImage";
import { PostType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { queries } from "../../queries";

type Props = {
  selectedPost: PostType;
};

export function AddComment(props: Props) {
  const { selectedPost } = props;

  async function createComment(data: { postId: string; content: string }) {
    const { postId, content } = data;
    return queries.createComment.mutation(postId, content);
  }

  const createCommentMutation = useMutation({ mutationFn: createComment });

  const [content, setContent] = React.useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function onClickPost() {
    createCommentMutation.mutate(
      { postId: selectedPost.id, content },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  }

  return (
    <section className="px-gutter py-2 border-t flex items-center bg-white w-full gap-small">
      <div>
        <User.image
          profileUrl={selectedPost.user.profileUrl}
          name={selectedPost.user.name}
        />
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        id="AddAComment"
        className="w-full outline-none overflow-y-hidden h-5 max-h-20 text-sm resize-none flex"
        aria-label="Add a comment"
        placeholder="Add a comment..."
      />
      <button onClick={onClickPost} className="text-blue-600 font-semibold">
        Post
      </button>
    </section>
  );
}
