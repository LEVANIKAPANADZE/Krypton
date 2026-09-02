import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const navItems = [
    { name: "სახლი", path: "/" },
    { name: "რესურსები", path: "/resource" },
    { name: "პროექტები", path: "/project" },
    { name: "დავალებები", path: "/task" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-10 md:px-12 md:py-14 xl:px-20 xl:py-16">
        <div className="flex flex-col gap-10 md:hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
              <Image
                src="/KryptonNewLogo.png"
                alt="Krypton logo"
                width={20}
                height={20}
              />
            </span>
            <h2 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-300 via-cyan-400 to-white bg-clip-text text-transparent">
              KRYPTON
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            ჩვენ ვეხმარებით მოსწავლეებს, შეისწავლონ ქიმიის სამყარო ინტერაქციული
            გაკვეთილების, მკაფიო ახსნა-მარტებებისა და საინტერესო სასწავლო
            აქტივობების მეშვეობით.
          </p>

          <div className="flex flex-col gap-1">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-3">
              ნავიგაცია
            </h3>

            <nav className="flex flex-col divide-y divide-zinc-900">
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className="py-3 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-cyan-400"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-zinc-900">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} KRYPTON. ყველა უფლება დაცულია.
            </p>

            <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-white/[0.03] px-4 py-2 w-fit">
              <span className="text-xs font-medium tracking-wide text-gray-500">
                DEVELOPER:
              </span>
              <a
                href="https://my-contacts-hazel.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-cyan-400 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
              >
                Kapanadze Levani
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-[1fr_auto] items-start gap-y-6 gap-x-12 xl:gap-x-20 mb-12">
          <div className="col-start-1 row-start-1 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
              <Image
                src="/KryptonNewLogo.png"
                alt="Krypton logo"
                width={20}
                height={20}
              />
            </span>
            <h2 className="text-4xl font-bold tracking-wider bg-gradient-to-r from-cyan-300 via-cyan-400 to-white bg-clip-text text-transparent">
              KRYPTON
            </h2>
          </div>

          <div className="col-start-2 row-start-1 row-span-2 mt-[50px]">
            <h3 className="text-white text-lg font-semibold mb-5">
              ნავიგაცია
              <span className="mt-2 block h-0.5 w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
            </h3>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className="group inline-flex items-center gap-2 rounded-sm font-medium text-gray-400 outline-none transition-colors duration-300 hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  <span className="h-1 w-1 -translate-x-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-300 motion-reduce:transition-none group-hover:translate-x-0 group-hover:opacity-100" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="col-start-1 row-start-2 max-w-2xl">
            <p className="text-gray-400 text-base leading-relaxed">
              ჩვენ ვეხმარებით მოსწავლეებს, შეისწავლონ ქიმიის სამყარო
              ინტერაქციული გაკვეთილების, მკაფიო ახსნა-მარტებებისა და საინტერესო
              სასწავლო აქტივობების მეშვეობით. ჩვენი მისიაა, მეცნიერება
              ყველასთვის მარტივი, გასაგები და ხელმისაწვდომი გავხადოთ;
              ამასთანავე, ხელი შევუწყოთ მოსწავლეებს თავდაჯერებულობის
              გამომუშავებაში, კრიტიკული აზროვნების განვითარებასა და საგანთან
              უფრო ღრმა კავშირის დამყარებაში. ჩვენი მიზანია, ქიმია რთული და
              დამთრგუნველი საგნიდან ინტუიციურ, საინტერესო და ნამდვილად
              სასიამოვნო გამოცდილებად ვაქციოთ.
            </p>
          </div>
        </div>

        <div className="hidden md:block mb-6 h-px w-full bg-zinc-900" />

        <div className="hidden md:flex justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} KRYPTON. ყველა უფლება დაცულია.</p>

          <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-white/[0.03] px-4 py-1.5">
            <span className="font-medium tracking-wide text-gray-500">
              DEVELOPER:
            </span>
            <a
              href="https://my-contacts-hazel.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-bold text-cyan-400 underline-offset-4 outline-none transition-all duration-300 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Kapanadze Levani
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
