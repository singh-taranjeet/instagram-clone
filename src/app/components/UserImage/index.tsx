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
        className="rounded-full border-pink-700 border-2"
        width={42}
        height={42}
        alt={name}
        src={`${profileUrl}`}
      />

      {children}
    </span>
  );
}

function UserName(props: React.PropsWithChildren<{}>) {
  return <b className="font-semibold text-extraSmall">{props.children}</b>;
}

export const User = {
  image: UserImage,
  name: UserName,
};
