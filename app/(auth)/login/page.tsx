"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/auth-validation";
import { getAuthErrorMessage } from "@/lib/auth-errors";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
  });

  const inputs: any = [
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
      email: "",
      password: "",
    });

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {
        email: "",
        password: "",
      };

      for (const issue of result.error.issues) {
        const field = issue.path[0];

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

    const { data, error } = await authClient.signIn.email({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      setErrors({
        email: getAuthErrorMessage(error.code, error.message),
        password: "",
      });

      return;
    }

    console.log("Logged in successfully:", data);

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md xl:max-w-lg rounded-2xl border border-gray-800 bg-[#0a0a0a] px-6 py-8 md:px-10 md:py-10 xl:px-12 xl:py-12 shadow-2xl">
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-cyan-400">კეთილი იყოს </span>
            <span className="text-white">თქვენი მობრძანება</span>
          </h1>

          <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-400">
            შედით თქვენს Krypton-ის ანგარიშში
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
                  className="w-full h-11 md:h-12 pl-11 pr-4 rounded-xl border border-gray-800 bg-white/[0.02] text-sm md:text-base text-white placeholder-gray-500 outline-none transition-all focus:border-cyan-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-500/10"
                />

                <img
                  src={item.icon}
                  alt={`${item.inputName} icon`}
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-50"
                />
              </div>

              <div className="min-h-[18px] mt-1 px-1">
                {errors[item.inputName] && (
                  <span className="text-xs md:text-sm text-red-400">
                    {errors[item.inputName]}
                  </span>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-1 h-11 md:h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-black text-sm md:text-base font-semibold transition-all cursor-pointer"
          >
            შესვლა
          </button>
        </form>

        <div className="my-6 md:my-8 flex items-center gap-3 md:gap-4">
          <div className="h-px flex-1 bg-gray-800" />

          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
            ან
          </span>

          <div className="h-px flex-1 bg-gray-800" />
        </div>

        <div className="flex justify-center">
          <button className="group flex items-center gap-2 md:gap-3 rounded-xl border border-gray-700 bg-gray-800/60 px-5 py-2.5 transition-colors hover:bg-gray-800 cursor-pointer">
            <img
              src="/Guest.png"
              alt="Guest logo"
              className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100"
            />

            <Link
              href="/"
              className="text-sm md:text-base font-medium text-gray-300 transition-colors group-hover:text-white"
            >
              სტუმრის სტატუსით გაგრძელება
            </Link>
          </button>
        </div>

        <p className="mt-8 md:mt-10 text-center text-sm md:text-base text-gray-500">
          არ გაქვთ ანგარიში?{" "}
          <Link
            href="/register"
            className="font-semibold text-cyan-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
          >
            რეგისტრაცია
          </Link>
        </p>
      </div>
    </div>
  );
}
