import React, { KeyboardEventHandler } from "react";
import { User } from "@/app/components/UserImage";
import { PostType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { queries } from "../../queries";
import { Icon } from "@/app/components/Icon";

type Props = {
  selectedPost: PostType;
};

export function AddComment(props: Readonly<Props>) {
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onClickPost();
    }
  };

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
        onKeyDown={handleKeyPress}
        id="AddAComment"
        className="w-full outline-none overflow-y-hidden h-5 max-h-20 text-sm resize-none flex"
        aria-label="Add a comment"
        placeholder="Add a comment..."
      />
      <button onClick={onClickPost} className="text-blue-600 font-semibold">
        {createCommentMutation.isPending ? (
          <Icon.Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" />
        ) : (
          "Post"
        )}
      </button>
    </section>
  );
}
