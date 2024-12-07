import { Icon } from "../Icon";

function MobileNavBar() {
  return (
    <nav className="w-full fixed top-0 px-gutter flex flex-col justify-center h-[45px] bg-white !z-50 sm:hidden">
      <ul className="flex gap-4 justify-between">
        <li>
          <a href="/" className="flex gap-small items-center">
            <Icon.Logo.Large />
            <Icon.Down />
          </a>
        </li>
        <li className="flex flex-col justify-center">
          <div className="flex gap-small">
            <Icon.Plus />
            <Icon.UnFav />
          </div>
        </li>
      </ul>
    </nav>
  );
}

function DesktopNavBar() {
  return (
    <nav className="p-small !z-50 hidden sm:block w-fit border-r fixed left-0 border-slate-200 bg-white h-full">
      <ul className="flex flex-col gap-small">
        <li className="w-12 h-12 flex flex-col justify-center items-center m-auto">
          <Icon.Logo.Small />
        </li>
        <li className="w-12 h-12 flex flex-col justify-center items-center m-auto">
          <Icon.Home />
        </li>
        <li className="w-12 h-12 flex flex-col justify-center items-center m-auto">
          <Icon.Search />
        </li>
        <li className="w-12 h-12 flex flex-col justify-center items-center m-auto">
          <Icon.UnFav />
        </li>
        <li className="w-12 h-12 flex flex-col justify-center items-center m-auto">
          <Icon.Posts />
        </li>
      </ul>
    </nav>
  );
}

export function Navbar() {
  return (
    <>
      <MobileNavBar />
      <DesktopNavBar />
    </>
  );
}
