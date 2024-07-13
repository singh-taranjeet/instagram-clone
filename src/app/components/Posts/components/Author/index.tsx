import { Icon } from "@/app/components/Icon";
import { UserImage } from "@/app/components/UserImage";
import Image from "next/image";

type Props = {
  profileUrl: string;
  name: string;
};
export function Author(props: Props) {
  const { profileUrl, name } = props;
  return (
    <section className="flex gap-small items-center justify-start px-gutter ls:px-0 w-full">
      <UserImage profileUrl={profileUrl} name={name} />
      <Icon.Verified />
    </section>
  );
}
