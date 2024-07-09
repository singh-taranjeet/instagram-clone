"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";

import { usePosts } from "@/app/utils/hooks/usePosts";
import { Modal } from "../Modal";
import { Media } from "./components/Media";
import { LoadMore } from "./components/LoadMore";

interface PostType {
  id: string;
  description: string;
  likes: number;
  user: {
    _id: string;
    name: string;
    profileUrl: string;
  };
  comments: {
    content: string;
    user: string;
  }[];
  media: {
    name: string;
    url: string;
  }[];
}

interface ModalType {
  open: boolean;
  selectedPost: PostType;
}

function getImages(media: { url: string; name: string }[]) {
  return media.map((item) => item.url);
}

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

  return (
    <>
      <ul className="flex flex-col mt-small items-center">
        {posts?.map((post: PostType, index: number) => (
          <li
            key={`${post.id}-${index}`}
            className="max-w-sm py-small xs:mx-gutter border-b border-slate-200"
          >
            <div className="flex flex-col gap-small w-full justify-center">
              <span className="px-gutter ls:px-0 flex gap-small w-full items-center">
                <Image
                  width={32}
                  height={32}
                  alt="dsf"
                  src={`${post.user.profileUrl}`}
                />
                {post.user.name}
              </span>

              <Media.Wrapper
                title={post.description}
                images={getImages(post.media)}
              />

              <div className="flex gap-small mx-gutter">
                <Icon.Fav />
                <Icon.Comment />
                <Icon.Share />
                <div className="ml-auto">
                  <Icon.BookMark />
                </div>
              </div>
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
            <section className="grid grid-cols-2">
              <Media.Wrapper
                images={getImages(modal?.selectedPost.media || [])}
                title={modal?.selectedPost.description || ""}
              />
              <section className="bg-white">
                <h1>{modal?.selectedPost.description}</h1>
                <div>
                  {modal?.selectedPost.comments.map((comment, index) => (
                    <div key={index}>
                      <p>{comment.content}</p>
                      <p>{comment.user}</p>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      <LoadMore isFetching={isFetching} nextPage={fetchNextPage} />
    </>
  );
}
