"use client";
import { queries } from "@/app/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Icon } from "../Icon";
import React from "react";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";

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

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
  });

  function onClick(direction: "next" | "prev") {
    console.log("CLick");
    if (direction === "next" && currentImageIndex >= images.length - 1) {
      return;
    }
    if (direction === "prev" && currentImageIndex === 0) {
      return;
    }
    direction === "next"
      ? setCurrentImageIndex(currentImageIndex + 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  }

  return (
    <>
      {currentImageIndex === 0 ? null : (
        <CarouselButton direction="prev" onClick={() => onClick("prev")} />
      )}
      {images.map((image, index) => (
        <PostImage
          handlers={handlers}
          visible={currentImageIndex === index}
          key={index}
          title={title}
          image={`/posts/${image}`}
        />
      ))}
      {currentImageIndex === images.length - 1 ? null : (
        <CarouselButton direction="next" onClick={() => onClick("next")} />
      )}
    </>
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
      <CarouselButton direction="prev" />
      {props.children}
      <CarouselButton direction="next" />
    </div>
  );
}

function PostImage(props: {
  title: string;
  image: string;
  visible: boolean;
  handlers: SwipeableHandlers;
}) {
  const { title, image, visible } = props;
  return (
    <Image
      {...props.handlers}
      className={`object-contain sm:object-cover ${visible ? "block" : "hidden"}`}
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

  // const sliderRef = useRef<Slider | null>(null);
  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   draggable: true,
  //   touchMove: true,
  //   initialSlide: 0,
  //   swipeToSlide: true,
  //   nextArrow: <Carousel.Button sliderRef={sliderRef} direction="next" />,
  //   prevArrow: <Carousel.Button sliderRef={sliderRef} direction="prev" />,
  // };

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
                  src={`/users/${post.user?.image}`}
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
