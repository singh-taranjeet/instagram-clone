import { Icon } from "../Icon";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 px-gutter flex flex-col justify-center h-[45px] bg-white z-100">
      <ul className="flex gap-4 justify-between">
        <li>
          <a href="/" className="flex gap-small items-center">
            <Icon.Logo />
            <Icon.Down />
          </a>
        </li>
        <li className="flex flex-col justify-center">
          <div className="flex gap-small">
            <Icon.Plus />
            <Icon.Fav />
          </div>
        </li>
      </ul>
    </nav>
  );
}
