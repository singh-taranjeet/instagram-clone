import { Icon } from "@/app/components/Icon";

interface ActionBarProps {
  onCommentClick(): void;
  onLikeClick(): void;
}
export function ActionBar(props: ActionBarProps) {
  const { onCommentClick, onLikeClick } = props;
  return (
    <div className="flex gap-small">
      <i className="cursor-pointer" onClick={onLikeClick}>
        <Icon.Fav />
      </i>
      <i className="cursor-pointer" onClick={onCommentClick}>
        <Icon.Comment />
      </i>
      <i className="cursor-pointer">
        <Icon.Share />
      </i>
      <i className="ml-auto cursor-pointer">
        <Icon.BookMark />
      </i>
    </div>
  );
}
