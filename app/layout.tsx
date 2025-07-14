import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/navbar/navbarComponent";
import FooterComponent from "@/components/footerComponent";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // gunakan authjs untuk mengecek session
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider session={session}>
          <NavbarComponent />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <FooterComponent />
        </SessionProvider>
      </body>
    </html>
  );
}
