import { Icon } from "@/app/components/Icon";
import Image from "next/image";

type Props = {
  profileUrl: string;
  name: string;
};
export function Author(props: Props) {
  const { profileUrl, name } = props;
  return (
    <section className="flex gap-small items-center justify-start px-gutter ls:px-0 w-full">
      <span className=" flex gap-small  items-center">
        <Image
          className="rounded-full border-pink-700 border-2"
          width={42}
          height={42}
          alt={name}
          src={`${profileUrl}`}
        />

        {name}
      </span>
      <Icon.Verified />
    </section>
  );
}
