import { Icon } from "@/app/components/Icon";
import { useState } from "react";
import "./styles.css";
import { ObjectFitType } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

function CarouselButton(props: {
  direction: "next" | "prev";
  onClick: () => void;
}) {
  return (
    <button
      id={`carousel-${props.direction}`}
      className={`${props.direction} shadow p-4 z-10 mx-small absolute bg-slate-50 bg-opacity-50 flex justify-center items-center !w-7 !h-7 transition-all duration-500 rounded-full bottom-1/2 ${
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

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Carousel = (props: {
  title: string;
  images: string[];
  fit?: ObjectFitType;
}) => {
  const { title, images, fit = "cover" } = props;
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);
  const objectFit =
    fit === "cover" ? "object-cover" : "object-contain lg:object-cover";

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  function setPageIndex(index: number) {
    const newDirection = index > page ? -1 : 1;
    setPage([index, newDirection]);
  }

  console.log("page", page, imageIndex);

  return (
    <div className="example-container z-0">
      <AnimatePresence initial={false} custom={direction}>
        <div style={{ paddingBottom: `100%`, width: "min(420px, 100vw)" }}>
          <motion.img
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: "transparent",
            }}
            alt={title}
            className={`${objectFit} z-0`}
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: { duration: 0.1 },
              wdith: { duration: 0.5 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </div>
        <div className="absolute flex justify-center mb-2 bottom-0 z-1">
          {images.map((_, idx) => (
            <div
              onClick={() => setPageIndex(idx)}
              key={idx}
              className={` mx-[2px] h-[7px] w-[7px] rounded-full cursor-pointer shadow ${Math.abs(page) === idx ? "bg-white" : "bg-[#8f908d]"}`}
            />
          ))}
        </div>
      </AnimatePresence>
      <CarouselButton direction="prev" onClick={() => paginate(1)} />
      <CarouselButton direction="next" onClick={() => paginate(-1)} />
    </div>
  );
};
