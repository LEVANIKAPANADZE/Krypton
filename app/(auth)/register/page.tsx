"use client";

import { useState } from "react";
import Link from "next/link";

export default function page() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const inputs: any = [
    {
      placeholder: "Username",
      inputName: "name",
    },
    {
      placeholder: "Email Address",
      inputName: "email",
    },
    {
      placeholder: "Password",
      inputName: "password",
    },
  ];

  async function handleSubmission(event: React.FormEvent) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data.message);

      if (!response.ok) {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmission}>
        {inputs.map((item: any) => (
          <div key={item.placeholder}>
            <input
              type="text"
              name={item.inputName}
              placeholder={item.placeholder}
              value={formData[item.inputName]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [item.inputName]: e.target.value,
                })
              }
            />
          </div>
        ))}

        {error ? <span>{error}</span> : null}

        <button type="submit">Register Now</button>
      </form>

      <div>
        <img src="/Guest.png" alt="Guest logo" className="h-[50px] w-[50px]" />
        <button>Continue as a GUEST</button>
      </div>

      <span>
        Already have an account? <Link href={"/login"}>Log In</Link>
      </span>
    </div>
  );
}
