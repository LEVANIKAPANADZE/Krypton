import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const font = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KRYPTON",
  description: "ქიმიის სასწავლო პლატფორმა",
  icons: {
    icon: "/KryptonNewLogo.png",
    apple: "/KryptonNewLogo.png",
  },
  openGraph: {
    title: "KRYPTON",
    description: "ქიმიის სასწავლო პლატფორმა",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body
        className={`${font.className} min-h-screen flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
