import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arif Adito — Business Growth Leader",
  description: "Scaling businesses across SaaS, OTT, Fintech & Telecom. Head of Business at Tapmad Bangladesh.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
