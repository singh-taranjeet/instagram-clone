import { Carousel } from "../Carousel";
import Image from "next/image";
import React from "react";
import { ObjectFitType } from "../../types";

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
      style={{ paddingBottom: `100%`, width: "min(420px, 100vw)" }}
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
  fit?: ObjectFitType;
}) {
  const { title, image, visible, fit = "cover" } = props;
  const objectFit =
    fit === "cover" ? "object-cover" : "object-contain lg:object-cover";
  const slideDirection =
    typeof props.direction === "undefined"
      ? ""
      : props.direction === "next" && typeof props.direction !== undefined
        ? "animate-slideRight"
        : "animate-slideLeft";
  return (
    <Image
      className={`${objectFit} ${slideDirection} ${visible ? "block" : "hidden"}`}
      fill={true}
      priority={false}
      alt={title}
      src={image}
    />
  );
}

function Wrapper(props: {
  title: string;
  images: string[];
  fit: ObjectFitType;
}) {
  const { title, images, fit = "cover" } = props;
  return (
    <React.Fragment>
      <MobileImageContainer>
        <Carousel title={title} images={images} fit={fit} />
      </MobileImageContainer>

      <DesktopImageContainer>
        <Carousel title={title} images={images} fit={fit} />
      </DesktopImageContainer>
    </React.Fragment>
  );
}

export const Media = {
  PostImage,
  Wrapper,
};
