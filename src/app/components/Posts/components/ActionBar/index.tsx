import { Icon } from "@/app/components/Icon";

export function ActionBar() {
  return (
    <div className="flex gap-small mx-gutter">
      <Icon.Fav />
      <Icon.Comment />
      <Icon.Share />
      <div className="ml-auto">
        <Icon.BookMark />
      </div>
    </div>
  );
}
