import Link from "next/link";

export default function Header() {
  const navItems = [
    { icon: "/navIcons/icon-nav-home.svg", path: "/" },
    { icon: "/navIcons/icon-nav-movies.svg", path: "/resource" },
    { icon: "/navIcons/icon-nav-bookmark.svg", path: "/project" },
    { icon: "/navIcons/icon-nav-tv-series.svg", path: "/task" },
  ];

  return (
    <header
      className="
      w-[95%] max-w-6xl mx-auto mt-3 md:mt-5
      bg-black/95 border border-cyan-400/40
      shadow-[0_0_25px_rgba(34,211,238,0.25)]
      backdrop-blur-xl
      rounded-2xl

      flex items-center justify-between

      px-3 py-3
      sm:px-5 sm:py-4
      md:px-8 md:py-5
      "
    >
      <div className="group cursor-pointer flex-shrink-0">
        <Link href={"/"}>
          {" "}
          <img
            src="/KryptonNewLogo.png"
            alt="logo"
            className="
           w-13 h-13
          sm:w-15 sm:h-15
          rounded-xl

          transition-all duration-300
          group-hover:scale-110
          group-hover:rotate-6
          group-hover:shadow-[0_0_20px_cyan]
          "
          />
        </Link>
      </div>

      <nav
        className="
        flex items-center justify-center
        gap-1 sm:gap-3 md:gap-5
        "
      >
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className="
              group relative

              p-2
              sm:p-3

              rounded-xl
              border border-transparent

              hover:border-cyan-400/60
              hover:bg-cyan-400/10

              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]

              active:scale-95
              "
            >
              <img
                src={item.icon}
                alt="nav"
                className="
                w-5 h-5
                sm:w-7 sm:h-7
                md:w-9 md:h-9

                brightness-75
                transition-all duration-300

                group-hover:brightness-200
                group-hover:scale-110
                "
              />

              <div
                className="
                absolute -bottom-1 left-1/2
                -translate-x-1/2

                w-1 h-1 rounded-full
                bg-cyan-400

                opacity-0
                group-hover:opacity-100

                transition-all duration-300
                shadow-[0_0_10px_cyan]
                "
              />
            </div>
          </Link>
        ))}
      </nav>

      <div className="group cursor-pointer flex-shrink-0">
        <Link href={"/"}>
          {" "}
          <img
            src="/KryptonNewLogo.png"
            alt="logo"
            className="
          w-13 h-13
          sm:w-15 sm:h-15
          rounded-xl

          transition-all duration-300
          group-hover:scale-110
          group-hover:-rotate-6
          group-hover:shadow-[0_0_20px_cyan]
          "
          />
        </Link>
      </div>
    </header>
  );
}
