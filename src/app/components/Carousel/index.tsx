"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "../Icon";
import { useRef } from "react";
import { breakPoints, useScreenSize } from "@/app/utils/hooks/useScreenSize";

function CarouselItem(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <div className="min-w-16 h-16 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer">
        <span className="text-3xl font-semibold text-indigo-600">
          {props.children}
        </span>
      </div>
    </div>
  );
}

function CarouselBody(props: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex gap-small overflow-clip">{props.children}</div>;
}

function slidesToShow(screenWidth: number) {
  if (screenWidth < breakPoints.xs) {
    return 5;
  } else if (screenWidth < breakPoints.sm) {
    return 8;
  } else if (screenWidth < breakPoints.md) {
    return 9;
  } else if (screenWidth < breakPoints.lg) {
    return 9;
  } else {
    return 13;
  }
}

export default function CarouselWrapper(
  props: Readonly<{ children: React.ReactNode }>
) {
  const width = useScreenSize();

  console.log("No of slides to show: ", slidesToShow(width), width);

  const settings = {
    className: "center",
    infinite: true,
    // arrows: false,
    centerMode: true,
    draggable: true,
    touchMove: true,
    initialSlide: 0,
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <CarouselButton direction="next" />,
    prevArrow: <CarouselButton direction="prev" />,
    centerPadding: "-30px",
    // afterChange: function (index: number) {
    //   console.log(
    //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //   );
    // },
    responsive: [
      {
        breakpoint: breakPoints.xl,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: breakPoints.lg,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: breakPoints.md,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: breakPoints.sm,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: breakPoints.xs,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  const sliderRef = useRef<Slider | null>(null);

  function CarouselButton(props: Readonly<{ direction: "next" | "prev" }>) {
    function onClick() {
      if (props.direction === "next") {
        sliderRef?.current?.slickNext();
      } else {
        sliderRef?.current?.slickPrev();
      }
    }

    return (
      <button
        onClick={onClick}
        className={`shadow z-10 mx-small absolute bg-white flex justify-center items-center !w-5 !h-5 transition-all duration-500 rounded-full !-translate-y-8 -bottom-[5px] ${
          props.direction === "next" ? "right-0" : "left-0"
        }`}
        data-carousel-next
      >
        <i className={props.direction === "next" ? "-rotate-90" : "rotate-90"}>
          <Icon.Down className="text-slate-200" />
        </i>
      </button>
    );
  }

  return (
    <div className="max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg  mx-auto">
      <Slider ref={sliderRef} {...settings}>
        {props.children}
      </Slider>
    </div>
  );
}

export const Carousel = {
  Item: CarouselItem,
  Wrapper: CarouselWrapper,
  Body: CarouselBody,
};
