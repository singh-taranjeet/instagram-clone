import { Icon } from "@/app/components/Icon";

export function ActionBar() {
  return (
    <div className="flex gap-small">
      <i className="cursor-pointer">
        <Icon.Fav />
      </i>
      <i className="cursor-pointer">
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
