import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Krypton",
  description: "Chemistry learning app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let messages;
  const defaultLocale = "en";

  try {
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
  } catch (error) {
    messages = {};
  }

  return (
    <html lang={defaultLocale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={defaultLocale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
