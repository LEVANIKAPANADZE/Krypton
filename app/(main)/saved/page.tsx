import Link from "next/link";
import SavedItems from "../../components/SavedItems";
import { getSavedItemsForCurrentUser } from "@/lib/actions/saved";

export default async function Page() {
  const savedItems = await getSavedItemsForCurrentUser();

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">შენახული მასალები</h1>

      {savedItems.length === 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-red-400">
            შენახული მასალები ვერ მოიძებნა
          </h2>

          <div>
            <h3>მასალების შესანახად დაათვალიერეთ ისინი:</h3>
            <Link href="/resources">მასალები</Link>
          </div>
        </div>
      ) : (
        <SavedItems items={savedItems} />
      )}
    </main>
  );
}
