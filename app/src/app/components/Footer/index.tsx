import { Icon } from "../Icon";

export function Footer() {
  return (
    <div className="flex sm:hidden justify-around py-small fixed bottom-0 w-full border-t border-t-slate-200 bg-white z-100">
      <Icon.Home />
      <Icon.Search />
      <Icon.Posts />
    </div>
  );
}
