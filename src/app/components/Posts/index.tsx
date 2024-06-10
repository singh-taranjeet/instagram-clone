"use client";
import { queries } from "@/app/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";

function MobileImageContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ width: "min(420px, 100vw)", paddingBottom: `100%` }}
      className="mobile relative flex flex-col justify-center items-center xs:hidden"
    >
      {props.children}
    </div>
  );
}

function DesktopImageContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ paddingBottom: `100%` }}
      className="desktop relative hidden flex-col justify-center items-center xs:flex sm:border border-slate-200"
    >
      {props.children}
    </div>
  );
}

function PostImage(props: { title: string; image: string }) {
  const { title, image } = props;
  return (
    <Image
      className="object-contain sm:object-cover"
      fill={true}
      alt={title}
      src={image}
    />
  );
}

function useElementOnScreen(ref: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

function LoadMore(props: { nextPage(): void; isFetching: boolean }) {
  const { nextPage, isFetching } = props;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useElementOnScreen(componentRef);

  useEffect(() => {
    if (isVisible) {
      // console.log("Element is visible");
      nextPage();
    }
  }, [isVisible, nextPage]);

  return (
    <div ref={componentRef}>
      {isFetching ? <div>Loading...</div> : <div>Swipe to load more</div>}
    </div>
  );
}

export function Posts() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: queries.fetchPosts,
      getNextPageParam: (lastPage, pages) => {
        return pages.length;
      },
      initialPageParam: 0, // Provide the initialPageParam value
    });

  const posts = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <>
      <ul className="flex flex-col mt-small items-center">
        {posts?.map((post: any) => (
          <li
            key={post.id}
            className="max-w-md py-small xs:mx-gutter border-b border-slate-200 w-full"
          >
            <div className="flex flex-col gap-small w-full justify-center">
              <span className="px-gutter ls:px-0 flex gap-small w-full items-center">
                <Image
                  width={32}
                  height={32}
                  alt="dsf"
                  src={`/users/${post.user?.image}`}
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
      <LoadMore isFetching={isFetching} nextPage={fetchNextPage} />
    </>
  );
}
