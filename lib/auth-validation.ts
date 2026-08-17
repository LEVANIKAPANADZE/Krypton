import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "სახელი უნდა შეიცავდეს სულ მცირე 2 სიმბოლოს.")
    .max(50, "სახელი არ უნდა აღემატებოდეს 50 სიმბოლოს."),

  email: z.string().trim().email("გთხოვთ, მიუთითოთ ვალიდური ელ. ფოსტა."),

  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს სულ მცირე 8 სიმბოლოს.")
    .max(20, "პაროლი არ უნდა აღემატებოდეს 20 სიმბოლოს."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("გთხოვთ, მიუთითოთ ვალიდური ელ. ფოსტა."),

  password: z.string().min(1, "გთხოვთ, შეიყვანოთ პაროლი."),
});
