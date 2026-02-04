import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import ReduxProvider from "@/components/providers/redux-provider";
import Header from "@/components/Header";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomSidebarTrigger } from "@/components/CustomSidebarTrigger";
import ThemeInitializer from "@/components/ThemeInitializer";
import { Card } from "@/components/ui/card";

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
          <ThemeInitializer />
          <SidebarProvider defaultOpen={true}>
            <Header />
            <AppSidebar />
            <div className="mt-10 p-2 flex w-full gap-4">
              <CustomSidebarTrigger />
              <Card className="flex-1 h-full overflow-auto max-w-[93%] m-auto p-6 relative shadow-sm">
                {children}
              </Card>
            </div>
          </SidebarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
