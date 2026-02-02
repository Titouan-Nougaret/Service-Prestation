import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import ReduxProvider from "@/components/providers/redux-provider";
import Header from "@/components/Header";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
        suppressHydrationWarning
      >
        <ReduxProvider>
          <SidebarProvider defaultOpen={true}>
            <Header />
            <AppSidebar />
            <main className="pt-10 flex justify-center flex-1 w-full">
              <SidebarTrigger className="justify-self-start"/>
              {children}
            </main>
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
