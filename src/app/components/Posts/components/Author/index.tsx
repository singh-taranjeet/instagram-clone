import { Icon } from "@/app/components/Icon";
import { User } from "@/app/components/UserImage";
import Image from "next/image";

type Props = {
  profileUrl: string;
  name: string;
};
export function Author(props: Props) {
  const { profileUrl, name } = props;
  return (
    <section className="flex gap-small items-center justify-start px-gutter ls:px-0 w-full">
      <User.image name={name} profileUrl={profileUrl}>
        {name}
      </User.image>
      <Icon.Verified />
    </section>
  );
}
