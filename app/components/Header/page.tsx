import Link from "next/link";

export default function Header() {
  const navItems = [
    { icon: "/navIcons/icon-nav-home.svg", path: "/" },
    { icon: "/navIcons/icon-nav-movies.svg", path: "/learn?type=resource" },
    { icon: "/navIcons/icon-nav-bookmark.svg", path: "/learn?type=task" },
    { icon: "/navIcons/icon-nav-tv-series.svg", path: "/learn?type=project" },
  ];

  return (
    <header className="w-full flex justify-between items-center p-4">
      <img src="/image.png" alt="logo" className="w-6 h-6 rounded-md" />

      <div className="flex gap-4">
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <img src={item.icon} alt="nav" className="w-6 h-6" />
          </Link>
        ))}
      </div>

      <img src="/image.png" alt="logo" className="w-6 h-6 rounded-md" />
    </header>
  );
}
