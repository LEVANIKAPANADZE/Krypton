import Link from "next/link";

export default function page() {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "RESOURCES", path: "/resource" },
    { name: "PROJECTS", path: "/project" },
    { name: "TASKS", path: "/task" },
  ];

  return (
    <footer className="max-w-5xl mx-auto p-6 md:p-8 xl:p-10 mt-10 text-white text-center xl:text-left">
      <hr className="border-gray-700 opacity-30 mb-6" />

      <h2 className="text-2xl md:text-3xl xl:text-4xl text-cyan-400 font-semibold mb-4">
        KRYPTON
      </h2>

      <nav className="flex flex-col md:flex-row xl:justify-start justify-center gap-6 xl:gap-10 mb-6">
        {navItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="text-gray-400 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <p className="text-gray-400 mb-6 leading-relaxed">
        Empowering students to explore the world of chemistry through
        interactive lessons, clear explanations, and engaging learning
        experiences. Our mission is to make science simple, understandable, and
        accessible for everyone, helping learners build confidence, think
        critically, and develop a deeper connection with the subject. We aim to
        transform chemistry from something complex and overwhelming into
        something intuitive, interesting, and genuinely enjoyable.
      </p>

      <div className="text-cyan-400">
        <h3 className="mb-2 font-medium">DEVELOPERS:</h3>
        <a
          href="https://my-contacts-hazel.vercel.app"
          target="_blank"
          className="block md:inline-block md:mr-4 hover:text-white"
        >
          Kapanadze Levani
        </a>
      </div>
    </footer>
  );
}
