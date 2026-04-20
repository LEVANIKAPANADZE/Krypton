import Link from "next/link";

export default function page() {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "RESOURCES", path: "/resource" },
    { name: "PROJECTS", path: "/project" },
    { name: "TASKS", path: "/task" },
  ];

  return (
    <footer>
      <hr />

      <h2>KRYPTON</h2>

      <nav>
        {navItems.map((item, index) => (
          <Link href={item.path} key={index}>
            {item.name}
          </Link>
        ))}
      </nav>

      <p className="text-gray-500">
        Empowering students to explore the world of chemistry through
        interactive lessons, clear explanations, and engaging learning
        experiences. Our mission is to make science simple, understandable, and
        accessible for everyone, helping learners build confidence, think
        critically, and develop a deeper connection with the subject. We aim to
        transform chemistry from something complex and overwhelming into
        something intuitive, interesting, and genuinely enjoyable.
      </p>

      <div>
        <h3>DEVELOPERS:</h3>
        <a href="https://my-contacts-hazel.vercel.app" target="_blank">
          Kapanadze Levani
        </a>
        <a href="" target="_blank">
          Nika Feradze
        </a>
      </div>
    </footer>
  );
}
