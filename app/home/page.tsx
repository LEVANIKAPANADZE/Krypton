export default function page() {
  return (
    <div>
      {" "}
      <main className="min-h-screen flex flex-col items-center justify-start p-8 text-center space-y-10">
        <section className="space-y-3">
          <h1 className="text-4xl font-bold">KRYPTON</h1>
          <p className="text-gray-500">A simple chemistry learning platform.</p>
        </section>

        <section className="max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold">What is Krypton?</h2>
          <p className="text-gray-700">
            Krypton is a structured platform designed to help students
            understand chemistry in a clear and simple way. It organizes
            learning content so you can focus on understanding, not memorizing.
          </p>
        </section>

        <section className="max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold">Why Krypton?</h2>
          <p className="text-gray-700">
            Chemistry is often taught in a complicated way. Krypton makes it
            easier by breaking concepts into simple explanations and organized
            topics that actually make sense.
          </p>
        </section>

        <section className="max-w-2xl space-y-3">
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
