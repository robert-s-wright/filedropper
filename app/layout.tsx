import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Dropper",
  description:
    "A project to learn file drag and drop and storage of files in React/NextJS",
  authors: {
    name: "Robbie Wright",
    url: "https://https://github.com/robert-s-wright",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
