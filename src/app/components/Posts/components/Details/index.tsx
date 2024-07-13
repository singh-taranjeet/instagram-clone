import { User } from "@/app/components/UserImage";

interface Props {
  userName: string;
  comment: string;
}
export function PostDetails(props: Props) {
  const { userName, comment } = props;
  return (
    <div className="flex items-center">
      <User.name>{userName}</User.name>
      <p className="px-small text-extraSmall">{comment}</p>
    </div>
  );
}
