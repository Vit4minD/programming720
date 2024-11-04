import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "programming720",
  description: "UIL CS Programming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
