"use client";
import { useState, useMemo } from "react";
import React from "react";
import { usePosts } from "@/app/components/Posts/hooks/usePosts";
import { Modal } from "../Modal";
import { Media } from "./components/Media";
import { LoadMore } from "./components/LoadMore";
import { getImages } from "./utils";
import { ModalType, PostType } from "./types";
import { ExpandedView } from "./components/ExpandedView";
import { ActionBar } from "./components/ActionBar";
import { Author } from "./components/Author";
import { LikeComment } from "./components/LikeComment";
import { PulseLoading } from "../PulseLoading";
import { Carousel } from "./components/Carousel";

export function Posts() {
  const { data, fetchNextPage, isFetching } = usePosts();
  const [modal, setModal] = useState<ModalType | undefined>(undefined);

  function onModalClose() {
    setModal(undefined);
  }

  function openCommentsModal(postId: string) {
    setModal({ open: true, selectedPost: postId });
  }

  const posts = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <>
      <ul className="flex flex-col mt-small items-center">
        {posts &&
          posts?.map((post: PostType, index: number) => (
            <li
              key={`${post.id}-${index}`}
              className="max-w-[420px] py-small xs:mx-gutter border-b border-slate-200"
            >
              <div className="flex flex-col gap-small w-full justify-center">
                <Author
                  name={post?.user?.name}
                  profileUrl={post?.user?.profileUrl}
                />

                <Carousel
                  fit="cover"
                  title={post.description}
                  images={getImages(post.media)}
                />

                <section className="px-gutter xs:px-0">
                  <ActionBar
                    post={post}
                    onCommentClick={() => openCommentsModal(post.id)}
                  />

                  <LikeComment
                    post={post}
                    onClickComments={() => openCommentsModal(post.id)}
                  />
                </section>
              </div>
            </li>
          ))}
      </ul>

      <Modal.ModalDialog onClose={onModalClose} open={!!modal?.open}>
        <Modal.ModalBody>
          <Modal.ModalCloseIcon onClose={onModalClose} />
          <Modal.ModalContent>
            {modal?.selectedPost ? (
              <ExpandedView
                onClose={onModalClose}
                selectedPost={modal.selectedPost}
              />
            ) : null}
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      <LoadMore isFetching={isFetching} nextPage={fetchNextPage}>
        <PulseLoading.Comments />
      </LoadMore>
    </>
  );
}
