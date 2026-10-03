import ResetPasswordForm from "./ResetPasswordForm";
import type { ResetPasswordPageProps } from "@/types/ui";

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  const token = typeof params?.token === "string" ? params.token : "";
  const error = typeof params?.error === "string" ? params.error : "";

  return <ResetPasswordForm token={token} initialError={error} />;
}
