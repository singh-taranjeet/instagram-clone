import Image from "next/image";

type Props = {
  profileUrl: string;
  name: string;
};
export function UserImage(props: Props) {
  const { profileUrl, name } = props;
  return (
    <span className=" flex gap-small items-center">
      <Image
        className="rounded-full border-pink-700 border-2"
        width={42}
        height={42}
        alt={name}
        src={`${profileUrl}`}
      />

      <b className="font-semibold text-extraSmall">{name}</b>
    </span>
  );
}
