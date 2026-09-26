"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { registerSchema } from "@/lib/auth-validation";
import { getAuthErrorMessage } from "@/lib/auth-errors";

export default function Register() {
  const router = useRouter();

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

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {
        name: "",
        email: "",
        password: "",
      };

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field === "name" && !fieldErrors.name) {
          fieldErrors.name = issue.message;
        }

        if (field === "email" && !fieldErrors.email) {
          fieldErrors.email = issue.message;
        }

        if (field === "password" && !fieldErrors.password) {
          fieldErrors.password = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
      callbackURL: "/",
    });

    if (error) {
      setErrors({
        name: "",
        email: getAuthErrorMessage(error.code, error.message),
        password: "",
      });
      return;
    }

    console.log("Registered successfully:", data);

    router.push(`/verify-email?email=${encodeURIComponent(result.data.email)}`);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-800 bg-[#0a0a0a] px-6 py-8 shadow-2xl md:max-w-md md:px-10 md:py-10 xl:max-w-lg xl:px-12 xl:py-12">
        <div className="mb-8 text-center md:mb-10">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            <span className="text-cyan-400">შექმენით </span>
            <span className="text-white">ანგარიში</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400 md:mt-3 md:text-base">
            შემოუერთდით Krypton-ს და დაიწყეთ ქიმიის შესწავლა
          </p>
        </div>

        <form
          onSubmit={handleSubmission}
          noValidate
          className="flex flex-col gap-3 md:gap-4"
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
                  className="h-11 w-full rounded-xl border border-gray-800 bg-white/[0.02] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500 focus:border-cyan-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-500/10 md:h-12 md:text-base"
                />

                <img
                  src={item.icon}
                  alt={`${item.inputName} icon`}
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-50"
                />
              </div>

              <div className="mt-1 min-h-[18px] px-1">
                {errors[item.inputName] && (
                  <span className="text-xs text-red-400 md:text-sm">
                    {errors[item.inputName]}
                  </span>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-1 h-11 cursor-pointer rounded-xl bg-cyan-500 text-sm font-semibold text-black transition-all hover:bg-cyan-400 active:scale-[0.98] md:h-12 md:text-base"
          >
            რეგისტრაცია
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 md:my-8 md:gap-4">
          <div className="h-px flex-1 bg-gray-800" />

          <span className="text-[10px] uppercase tracking-widest text-gray-500 md:text-xs">
            ან
          </span>

          <div className="h-px flex-1 bg-gray-800" />
        </div>

        <div className="flex justify-center">
          <button className="group flex cursor-pointer items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/60 px-5 py-2.5 transition-colors hover:bg-gray-800 md:gap-3">
            <img
              src="/Guest.png"
              alt="Guest logo"
              className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100"
            />

            <Link
              href="/"
              className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white md:text-base"
            >
              სტუმრის სტატუსით გაგრძელება
            </Link>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 md:mt-10 md:text-base">
          უკვე გაქვთ ანგარიში?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
          >
            შესვლა
          </Link>
        </p>
      </div>
    </div>
  );
}
