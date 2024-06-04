import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell Hub",
  description: "Seu Ecommerce Favorito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <meta charSet="UTF-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
