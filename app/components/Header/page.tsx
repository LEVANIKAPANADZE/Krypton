import Link from "next/link";

export default function Header() {
  const navItems = [
    { icon: "/navIcons/icon-nav-home.svg", path: "/" },
    { icon: "/navIcons/icon-nav-movies.svg", path: "/resource" },
    { icon: "/navIcons/icon-nav-bookmark.svg", path: "/project" },
    { icon: "/navIcons/icon-nav-tv-series.svg", path: "/task" },
  ];

  return (
    <header className="w-full flex justify-between items-center p-4 md:p-6">
      <img
        src="/image.png"
        alt="logo"
        className="w-6 h-6 rounded-md md:w-8 md:h-8"
      />

      <div className="flex gap-4 md:gap-6">
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <img src={item.icon} alt="nav" className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
        ))}
      </div>

      <img
        src="/image.png"
        alt="logo"
        className="w-6 h-6 rounded-md md:w-8 md:h-8"
      />
    </header>
  );
}
