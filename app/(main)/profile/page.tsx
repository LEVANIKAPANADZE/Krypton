import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>ჩემი ანგარიში</h1>

      <p>მართეთ თქვენი Krypton ანგარიში</p>

      <div>
        <h2>პირადი ინფორმაცია</h2>

        <div>
          <span>სახელი</span>
          <p>{session.user.name}</p>
        </div>

        <div>
          <span>ელ. ფოსტა</span>
          <p>{session.user.email}</p>
        </div>
      </div>

      <div>
        <h2>შენახულები</h2>

        <p>ნახეთ თქვენ მიერ შენახული მასალები.</p>

        <Link href="/saved">შენახულების ნახვა</Link>
      </div>

      <div>
        <h2>ანგარიშის მართვა</h2>

        <button type="button">გასვლა</button>

        <button type="button">ანგარიშის წაშლა</button>
      </div>
    </div>
  );
}
