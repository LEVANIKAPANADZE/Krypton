"use client";

import { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const inputs: any = [
    {
      placeholder: "Username",
      inputName: "name",
      message: "Username cannot be empty",
    },
    {
      placeholder: "Email Address",
      inputName: "email",
      message: "Looks like this is not an email",
    },
    {
      placeholder: "Password",
      inputName: "password",
      message: "Password cannot be empty",
    },
  ];

  async function handleSubmission(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <img
        src="/KryptonNewLogo.png"
        alt="Krypton Logo"
        className="h-[50px] w-[50px]"
      />

      <div>
        <form onSubmit={handleSubmission}>
          {inputs.map((item: any) => (
            <div key={item.message}>
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

          <button type="submit">Register Now</button>
        </form>

        <button>Continou with GOOGLE</button>
        <button>Continou as a GUEST</button>

        <span>
          Already have an account? <span>Log in</span>
        </span>
      </div>
    </div>
  );
}
