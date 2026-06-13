import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CashCoach — Tu coach financiero",
  description: "Coach financiero con IA para jóvenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <MobileHeader />
            <main className="flex-1">
              <div className="mx-auto max-w-4xl p-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
