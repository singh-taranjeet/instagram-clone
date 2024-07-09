import { Carousel } from "../Carousel";
import Image from "next/image";
import React from "react";

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
      className="desktop relative hidden flex-col justify-center items-center xs:flex"
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
      src={image}
    />
  );
}

function Wrapper(props: { title: string; images: string[] }) {
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

export const Media = {
  PostImage,
  Wrapper,
};
