export const authErrorMessages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ელ. ფოსტა ან პაროლი არასწორია.",
  USER_NOT_FOUND: "მომხმარებელი ვერ მოიძებნა.",
  INVALID_PASSWORD: "პაროლი არასწორია.",
  USER_ALREADY_EXISTS: "მომხმარებელი ამ ელ. ფოსტით უკვე არსებობს.",
  EMAIL_NOT_VERIFIED: "გთხოვთ, ჯერ დაადასტუროთ თქვენი ელ. ფოსტა.",
  SESSION_EXPIRED: "სესია ვადაგასულია. გთხოვთ, თავიდან შეხვიდეთ.",
};

export function getAuthErrorMessage(code?: string) {
  if (!code) {
    return "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.";
  }

  return (
    authErrorMessages[code] ?? "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან."
  );
}
