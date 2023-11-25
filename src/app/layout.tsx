import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Image galley",
  description: "Image gallery by Hamed Ahmadi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
