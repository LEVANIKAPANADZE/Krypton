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
    <footer className="relative w-full overflow-hidden bg-[#050505] pt-10 pb-6 mt-10 md:pt-16 md:mt-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 xl:left-10 xl:translate-x-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-y-8 md:gap-y-6 gap-x-8 md:gap-x-12 xl:gap-x-20 mb-8 md:mb-12">
          <div className="order-1 md:order-none md:col-start-1 md:row-start-1 flex items-center justify-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
              <Image
                src="/KryptonNewLogo.png"
                alt="Krypton logo"
                width={20}
                height={20}
              />
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-wider bg-gradient-to-r from-cyan-300 via-cyan-400 to-white bg-clip-text text-transparent">
              KRYPTON
            </h2>
          </div>

          <div className="order-2 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 w-full md:w-auto flex flex-col items-start text-left md:mt-[50px]">
            <h3 className="text-white text-lg font-semibold mb-5">
              ნავიგაცია
              <span className="mt-2 block h-0.5 w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
            </h3>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className="group inline-flex items-center gap-2 rounded-sm font-medium text-gray-400 outline-none transition-colors duration-300 hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                >
                  <span className="h-1 w-1 -translate-x-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-300 motion-reduce:transition-none group-hover:translate-x-0 group-hover:opacity-100" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="order-3 md:order-none md:col-start-1 md:row-start-2 w-full md:max-w-2xl text-left">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
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

        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm text-gray-500">
          <p className="text-left w-full md:w-auto">
            © {new Date().getFullYear()} KRYPTON. ყველა უფლება დაცულია.
          </p>

          <div className="flex items-center justify-start gap-2 rounded-full border border-gray-800 bg-white/[0.03] px-4 py-1.5 w-fit md:w-auto md:justify-start">
            <span className="font-medium tracking-wide text-gray-500">
              DEVELOPER:
            </span>

            <a
              href="https://my-contacts-hazel.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-bold text-cyan-400 underline-offset-4 outline-none transition-all duration-300 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Kapanadze Levani
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
