import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prestalink",
  description: "Gestion de prestations de services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full h-full antialiased relative`}
      >
        <header className="fixed top-0 left-0 right-0 h-10 bg-slate-950 text-slate-50 flex items-center px-6 z-50">
          <span className="text-md tracking-[0.3em] font-light">PRESTALINK</span>
        </header>
        <main className="pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
