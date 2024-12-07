import { User } from "@/app/components/UserImage";

interface Props {
  userName: string;
  comment: string;
}
export function PostDetails(props: Props) {
  const { userName, comment } = props;
  return (
    <span>
      <User.name>{userName}</User.name>
      <span className="px-small text-extraSmall">{comment}</span>
    </span>
  );
}
