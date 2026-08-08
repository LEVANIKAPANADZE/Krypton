"use client";

import { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputs: any = [
    {
      placeholder: "Username",
      inputName: "Username",
      message: "Username cannot be empty",
    },
    {
      placeholder: "Email Address",
      inputName: "Email",
      message: "Looks like this is not an email",
    },
    {
      placeholder: "Password",
      inputName: "Password",
      message: "Password cannot be empty",
    },
  ];

  return (
    <div>
      <img
        src="/KryptonNewLogo.png"
        alt="Krypton Logo"
        className="h-[50px] w-[50px]"
      />

      <div>
        {inputs.map((item: any) => (
          <div key={item.message}>
            <input
              type="text"
              name={item.inputName}
              placeholder={item.placeholder}
              value={formData.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
