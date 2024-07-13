"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";

import { usePosts } from "@/app/utils/hooks/usePosts";
import { Modal } from "../Modal";
import { Media } from "./components/Media";
import { LoadMore } from "./components/LoadMore";
import { getImages } from "./utils";
import { ModalType, PostType } from "./types";
import { ExpandedView } from "./components/ExpandedView";
import { ActionBar } from "./components/ActionBar";
import { Author } from "./components/Author";

export function Posts() {
  const { data, fetchNextPage, isFetching } = usePosts();
  const [modal, setModal] = useState<ModalType | undefined>(undefined);

  console.log("modal", modal);

  function onModalClose() {
    setModal(undefined);
  }

  function onClickComments(post: PostType) {
    setModal({ open: true, selectedPost: post });
  }

  const posts = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  console.log("posts", posts);

  return (
    <>
      <ul className="flex flex-col mt-small items-center">
        {posts?.map((post: PostType, index: number) => (
          <li
            key={`${post.id}-${index}`}
            className="max-w-sm py-small xs:mx-gutter border-b border-slate-200"
          >
            <div className="flex flex-col gap-small w-full justify-center">
              <Author
                name={post?.user?.name}
                profileUrl={post?.user?.profileUrl}
              />

              <Media.Wrapper
                title={post.description}
                images={getImages(post.media)}
              />

              <ActionBar />

              <div className="flex flex-col mx-gutter">
                <b className="text-sm">100 likes</b>
                <span>
                  <b className="text-sm">Taranjeet Singh</b>{" "}
                  {post?.comments?.[0]?.content || "No comments"}
                </span>
                <span
                  className="text-sm text-slate-500"
                  onClick={() => onClickComments(post)}
                >
                  view all 150 comments
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal.ModalDialog onClose={onModalClose} open={!!modal?.open}>
        <Modal.ModalBody>
          <Modal.ModalCloseIcon onClose={onModalClose} />
          <Modal.ModalContent>
            {modal?.selectedPost ? (
              <ExpandedView selectedPost={modal.selectedPost} />
            ) : null}
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      <LoadMore isFetching={isFetching} nextPage={fetchNextPage} />
    </>
  );
}
