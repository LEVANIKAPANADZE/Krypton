import Link from "next/link";

export default function page() {
  const arr = ["HOME", "RESOURCES", "PROJECTS", "TASKS"];

  return (
    <footer>
      <hr />

      <h2>KRYPTON</h2>

      <nav>
        {" "}
        {arr.map((element, index) => (
          <Link href={`/${element.toLowerCase()}`} key={index}>
            {element}
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
    </footer>
  );
}
