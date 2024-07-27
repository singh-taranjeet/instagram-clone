import { Icon } from "@/app/components/Icon";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Media } from "../Media";
import { ObjectFitType } from "../../types";

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

export function Carousel(props: {
  title: string;
  images: string[];
  fit?: ObjectFitType;
}) {
  const { title, images, fit = "cover" } = props;

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
        <Media.PostImage
          visible={currentImageIndex === index}
          key={index}
          fit={fit}
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
