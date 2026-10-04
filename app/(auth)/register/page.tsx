"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { registerSchema } from "@/lib/auth-validation";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import type {
  AuthFormErrors,
  AuthInputConfig,
  RegisterFormData,
} from "@/types/api";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    AuthFormErrors<"name" | "email" | "password">
  >({
    name: "",
    email: "",
    password: "",
  });

  const inputs: AuthInputConfig<"name" | "email" | "password">[] = [
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

  async function handleSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: AuthFormErrors<"name" | "email" | "password"> = {
        name: "",
        email: "",
        password: "",
      };

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string") {
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
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800/50 bg-zinc-900/50 px-6 py-8 md:max-w-md md:px-10 md:py-10 xl:max-w-lg xl:px-12 xl:py-12">
        <div className="mb-8 text-center md:mb-10">
          <h1 className="font-serif font-normal text-2xl tracking-tight md:text-3xl">
            <span className="text-amber-300">შექმენით </span>
            <span className="text-zinc-100">ანგარიში</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400 md:mt-3 md:text-base">
            შემოუერთდით Krypton-ს და დაიწყეთ ქიმიის შესწავლა
          </p>
        </div>

        <form
          onSubmit={handleSubmission}
          noValidate
          className="flex flex-col gap-3 md:gap-4"
        >
          {inputs.map((item) => {
            const fieldError = errors[item.inputName];

            return (
              <div key={item.inputName} className="flex flex-col">
                <div className="relative">
                  <input
                    type={item.type}
                    name={item.inputName}
                    placeholder={item.placeholder}
                    value={formData[item.inputName]}
                    onChange={(event) => {
                      const value = event.target.value;

                      setFormData((current) => ({
                        ...current,
                        [item.inputName]: value,
                      }));
                    }}
                    className="h-11 w-full rounded-xl border border-zinc-800/50 bg-zinc-900/50 pl-11 pr-4 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-300/20 md:h-12 md:text-base"
                  />

                  <img
                    src={item.icon}
                    alt={`${item.inputName} icon`}
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-40"
                  />
                </div>

                <div className="mt-1 min-h-[18px] px-1">
                  {fieldError && (
                    <span className="text-xs text-red-400 md:text-sm">
                      {fieldError}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            className="mt-1 h-11 cursor-pointer rounded-xl bg-amber-400 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 md:h-12 md:text-base"
          >
            რეგისტრაცია
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 md:my-8 md:gap-4">
          <div className="h-px flex-1 bg-zinc-800/50" />

          <span className="text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">
            ან
          </span>

          <div className="h-px flex-1 bg-zinc-800/50" />
        </div>

        <div className="flex justify-center">
          <button className="group flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-800/50 bg-zinc-900/50 px-5 py-2.5 transition-colors hover:border-amber-300/50 hover:bg-zinc-800/50 md:gap-3">
            <img
              src="/Guest.png"
              alt="Guest logo"
              className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100"
            />

            <Link
              href="/"
              className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white md:text-base"
            >
              სტუმრის სტატუსით გაგრძელება
            </Link>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500 md:mt-10 md:text-base">
          უკვე გაქვთ ანგარიში?{" "}
          <Link
            href="/login"
            className="font-semibold text-amber-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            შესვლა
          </Link>
        </p>
      </div>
    </div>
  );
}
