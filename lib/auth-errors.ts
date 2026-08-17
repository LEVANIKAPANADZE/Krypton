export const authErrorMessages: Record<string, string> = {
  USER_ALREADY_EXISTS: "მომხმარებელი ამ ელ. ფოსტით უკვე არსებობს.",
  INVALID_EMAIL_OR_PASSWORD: "ელ. ფოსტა ან პაროლი არასწორია.",
  USER_NOT_FOUND: "მომხმარებელი ვერ მოიძებნა.",
  INVALID_PASSWORD: "პაროლი არასწორია.",
  EMAIL_NOT_VERIFIED: "გთხოვთ, ჯერ დაადასტუროთ თქვენი ელ. ფოსტა.",
  SESSION_EXPIRED: "სესია ვადაგასულია. გთხოვთ, თავიდან შეხვიდეთ.",
};

export function getAuthErrorMessage(code?: string, message?: string): string {
  if (code && authErrorMessages[code]) {
    return authErrorMessages[code];
  }

  if (message?.includes("[body.email]")) {
    return "გთხოვთ, მიუთითოთ ვალიდური ელ. ფოსტა.";
  }

  if (message?.includes("[body.password]")) {
    return "პაროლის მონაცემები არასწორია.";
  }

  return "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.";
}
