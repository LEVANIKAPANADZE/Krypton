import Header from "../components/Header/page";
import Footer from "../components/Footer/page";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krypton",
  description: "Chemistry learning app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
