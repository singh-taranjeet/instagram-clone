"use client";
import { queries } from "@/app/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";

function MobileImageContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ width: "min(470px, 100vw)", paddingBottom: `100%` }}
      className="mobile relative flex flex-col justify-center mx-auto items-center xs:hidden"
    >
      {props.children}
    </div>
  );
}

function DesktopImageContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ width: "min(470px, 100vw)" }}
      className="desktop relative hidden flex-col h-[400px] justify-center mx-auto items-center xs:flex"
    >
      {props.children}
    </div>
  );
}

function PostImage(props: { title: string; image: string }) {
  const { title, image } = props;
  return (
    <Image
      className="object-contain mx-auto"
      fill={true}
      alt={title}
      src={image}
    />
  );
}

export function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: queries.fetchPosts,
  });

  console.log("posts d", data);

  return (
    <ul className="flex flex-col mt-small items-center">
      {data?.map((post: any) => (
        <li
          key={post.id}
          className="max-w-md py-small xs:px-gutter border-b border-slate-200 w-full"
        >
          <div className="flex flex-col gap-small w-full justify-center">
            <span className="px-gutter xs:px-0 flex gap-small w-full items-center">
              <Image
                width={32}
                height={32}
                alt="dsf"
                src={`/users/${post.user.image}`}
              />
              {post.user.name}
            </span>

            <MobileImageContainer>
              <PostImage
                title={post.title}
                image={`/posts/${post.images?.[0]}`}
              />
            </MobileImageContainer>

            <DesktopImageContainer>
              <PostImage
                title={post.title}
                image={`/posts/${post.images?.[0]}`}
              />
            </DesktopImageContainer>

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
                {post?.comments[0].name}
              </span>
              <span className="text-sm text-slate-500">
                view all 150 comments
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
