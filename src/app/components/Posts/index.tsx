"use client";
import { queries } from "@/app/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";
import { useSwipeable } from "react-swipeable";
import { gql, useQuery } from "@apollo/client";

function CarouselButton(props: {
  direction: "next" | "prev";
  onClick: () => void;
}) {
  return (
    <button
      id={`carousel-${props.direction}`}
      className={`shadow p-4 z-10 mx-small absolute bg-slate-50 bg-opacity-50 flex justify-center items-center !w-5 !h-5 transition-all duration-500 rounded-full bottom-1/2 ${
        props.direction === "next" ? "right-0" : "left-0"
      }`}
      onClick={props.onClick}
    >
      <i
        className={`${props.direction === "next" ? "-rotate-90" : "rotate-90"}`}
      >
        <Icon.Arrow className="text-slate-200" />
      </i>
    </button>
  );
}

function Carousel(props: { title: string; images: string[] }) {
  const { title, images } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDirection, setCurrentDirection] = useState<
    "next" | "prev" | undefined
  >();

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log("User Swiped!", eventData.dir);
      if (eventData.dir === "Left") {
        onClick("next");
      } else if (eventData.dir === "Right") {
        onClick("prev");
      }
    },
  });

  function onClick(direction: "next" | "prev") {
    if (direction === "next" && currentImageIndex >= images.length - 1) {
      return;
    }
    if (direction === "prev" && currentImageIndex === 0) {
      return;
    }
    setCurrentDirection(direction);
    direction === "next"
      ? setCurrentImageIndex(currentImageIndex + 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  }

  return (
    <div {...handlers} className="overflow-clip">
      {images.length && currentImageIndex === 0 ? null : (
        <CarouselButton direction="prev" onClick={() => onClick("prev")} />
      )}
      {images.map((image, index) => (
        <PostImage
          visible={currentImageIndex === index}
          key={index}
          direction={currentDirection}
          title={`${title} - ${index}`}
          image={`${image}`}
        />
      ))}
      {images.length && currentImageIndex === images.length - 1 ? null : (
        <CarouselButton direction="next" onClick={() => onClick("next")} />
      )}
    </div>
  );
}

function MobileImageContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ paddingBottom: `100%`, width: "min(420px, 100vw)" }}
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

function PostImage(props: {
  title: string;
  image: string;
  visible: boolean;
  direction?: "next" | "prev";
}) {
  const { title, image, visible } = props;
  const slideDirection =
    typeof props.direction === "undefined"
      ? ""
      : props.direction === "next" && typeof props.direction !== undefined
        ? "animate-slideRight"
        : "animate-slideLeft";
  return (
    <Image
      className={`object-contain sm:object-cover ${slideDirection} ${visible ? "block" : "hidden"}`}
      fill={true}
      alt={title}
      src={`/posts/${image}`}
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

function ImageWrapper(props: { title: string; images: string[] }) {
  const { title, images } = props;
  return (
    <React.Fragment>
      <MobileImageContainer>
        <Carousel title={title} images={images} />
      </MobileImageContainer>

      <DesktopImageContainer>
        <Carousel title={title} images={images} />
      </DesktopImageContainer>
    </React.Fragment>
  );
}

const GET_POSTS = gql`
  query Posts($page: Float!) {
    posts(page: $page) {
      description
      likes
      media
    }
  }
`;

export function Posts() {
  const postsGraph = useQuery(GET_POSTS, { variables: { page: 0 } });

  console.log("Posts Graph", postsGraph.data);

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

  //console.log("Posts", data);

  return (
    <>
      <ul className="flex flex-col mt-small items-center">
        {posts?.map((post: any) => (
          <li
            key={post.id}
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

              <ImageWrapper title={post.title} images={post.images} />

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
