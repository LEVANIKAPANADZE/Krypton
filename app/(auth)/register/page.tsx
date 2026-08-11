"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const inputs: any = [
    {
      placeholder: "სახელი",
      inputName: "name",
      type: "text",
      icon: "/user-icon.svg",
    },
    {
      placeholder: "ელ. ფოსტა",
      inputName: "email",
      type: "email",
      icon: "/email-icon.svg",
    },
    {
      placeholder: "პაროლი",
      inputName: "password",
      type: "password",
      icon: "/lock-icon.svg",
    },
  ];

  async function handleSubmission(event: React.FormEvent) {
    event.preventDefault();

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          name: data.errors?.name || "",
          email: data.errors?.email || "",
          password: data.errors?.password || "",
        });
      }
    } catch {
      setErrors({
        name: "",
        email: "",
        password: "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.",
      });
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#050505] p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-800 bg-white/[0.02] px-6 py-8 shadow-2xl backdrop-blur-sm sm:max-w-md sm:px-8 sm:py-10 md:px-10 md:py-12 xl:max-w-lg xl:px-12 xl:py-14">
        <div className="relative mb-8 text-center md:mb-10">
          <h1 className="bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl md:text-4xl">
            შექმენით ანგარიში
          </h1>

          <p className="mt-2 text-xs font-medium text-gray-400 sm:text-sm md:mt-3 md:text-base">
            შემოუერთდით Krypton-ს და დაიწყეთ ქიმიის შესწავლა
          </p>
        </div>

        <form
          onSubmit={handleSubmission}
          noValidate
          className="relative flex flex-col gap-3 md:gap-4"
        >
          {inputs.map((item: any) => (
            <div key={item.inputName} className="flex flex-col">
              <div className="relative">
                <input
                  type={item.type}
                  name={item.inputName}
                  placeholder={item.placeholder}
                  value={formData[item.inputName]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [item.inputName]: e.target.value,
                    })
                  }
                  className="peer h-11 w-full rounded-xl border border-gray-800 bg-white/[0.02] pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 hover:border-gray-700 focus:border-cyan-500/50 focus:bg-cyan-500/[0.03] focus:ring-4 focus:ring-cyan-500/10 sm:h-12 md:text-base"
                />

                <img
                  src={item.icon}
                  alt={`${item.inputName} icon`}
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-40 transition-opacity duration-300 peer-focus:opacity-100 sm:h-5 sm:w-5"
                />
              </div>

              <div className="mt-1 min-h-[18px] px-1 sm:min-h-[20px]">
                {errors[item.inputName] && (
                  <span className="text-xs font-medium tracking-wide text-red-400/90">
                    {errors[item.inputName]}
                  </span>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-xl bg-gradient-to-r cursor-pointer from-cyan-500 to-cyan-400 text-sm font-bold tracking-wide text-black shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] transition-all duration-200 hover:from-cyan-400 hover:to-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.65)] active:scale-[0.98] sm:h-12 md:text-base"
          >
            რეგისტრაცია
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 md:my-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            ან
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        <div className="flex justify-center">
          <button className="group flex w-full items-center cursor-pointer justify-center gap-3 rounded-xl border border-gray-700/60 bg-gray-500/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-600 hover:bg-gray-500/20 hover:text-gray-100 active:scale-[0.98] sm:py-3 md:text-base">
            <img
              src="/Guest.png"
              alt="Guest logo"
              className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100"
            />

            <span>სტუმრის სტატუსით გაგრძელება</span>
          </button>
        </div>

        <p className="mt-8 text-center text-xs font-medium text-gray-500 sm:text-sm md:mt-10">
          უკვე გაქვთ ანგარიში?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 transition-all hover:text-cyan-300 hover:decoration-cyan-400"
          >
            შესვლა
          </Link>
        </p>
      </div>
    </div>
  );
}
