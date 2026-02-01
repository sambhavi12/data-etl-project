import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Direct | Execution First",
  description: "A professional platform for proof of work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: '#09090b', color: '#fff' }}>
        {children}
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  );
}
