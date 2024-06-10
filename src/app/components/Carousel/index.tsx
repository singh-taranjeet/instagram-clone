import { Icon } from "../Icon";

function CarouselButton(props: { direction: "next" | "prev" }) {
  return (
    <button
      className={`mx-small absolute bg-white flex justify-center items-center !w-5 !h-5 transition-all duration-500 rounded-full !-translate-y-8 -bottom-3 ${props.direction === "next" ? "right-0" : "left-0"}`}
      data-carousel-next
    >
      <i className={props.direction === "next" ? "-rotate-90" : "rotate-90"}>
        <Icon.Down className="text-slate-200" />
      </i>
    </button>
  );
}

function CarouselItem(props: { children: React.ReactNode }) {
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

function CarouselBody(props: { children: React.ReactNode }) {
  return <div className="flex gap-small overflow-clip">{props.children}</div>;
}

function CarouselWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="w-full relative flex justify-center">{props.children}</div>
  );
}

export const Carousel = {
  Button: CarouselButton,
  Item: CarouselItem,
  Wrapper: CarouselWrapper,
  Body: CarouselBody,
};
