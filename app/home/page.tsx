import Link from "next/link";

export default function page() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-start p-8 md:p-12 xl:p-16 text-center space-y-10 md:space-y-12 xl:space-y-16">
        <section className="space-y-3">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold">
            KRYPTON
          </h1>
          <p className="text-gray-500">A simple chemistry learning platform.</p>

          <Link
            href="/project"
            className="mt-4 px-5 py-2 md:px-6 md:py-3 
            xl:px-8 xl:py-4 rounded-lg 
            bg-cyan-500 text-black inline-block
            font-medium hover:bg-cyan-400"
          >
            View School Projects
          </Link>
        </section>

        <section className="max-w-2xl space-y-3 p-6 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-semibold">What is Krypton?</h2>
          <p className="text-gray-700">
            Krypton is a structured platform designed to help students
            understand chemistry in a clear and simple way. It organizes
            learning content so you can focus on understanding, not memorizing.
          </p>
        </section>

        <section className="max-w-2xl space-y-3 p-6 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-semibold">Why Krypton?</h2>
          <p className="text-gray-700">
            Chemistry is often taught in a complicated way. Krypton makes it
            easier by breaking concepts into simple explanations and organized
            topics that actually make sense.
          </p>
        </section>

        <section className="max-w-2xl space-y-3 p-6 border border-gray-200 rounded-xl">
          <h2 className="text-2xl font-semibold">What you’ll find here</h2>
          <p className="text-gray-700">
            Explore chemistry resources, practice concepts, and learn topics
            step by step through structured content.
          </p>
        </section>
      </main>
    </div>
  );
}
