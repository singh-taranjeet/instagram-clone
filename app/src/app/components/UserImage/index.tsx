import Image from "next/image";
import React from "react";

type Props = {
  profileUrl: string;
  name: string;
  children?: React.ReactNode;
};
function UserImage(props: Props) {
  const { profileUrl, name, children } = props;
  return (
    <span className="flex gap-small items-center">
      <Image
        className="rounded-full border-pink-700 border-2 min-w-10"
        width={40}
        height={40}
        alt={name}
        src={`${profileUrl}`}
      />

      {children}
    </span>
  );
}

function UserName(props: React.PropsWithChildren<{}>) {
  return (
    <span className="font-semibold text-extraSmall text-nowrap">
      {props.children}
    </span>
  );
}

export const User = {
  image: UserImage,
  name: UserName,
};
