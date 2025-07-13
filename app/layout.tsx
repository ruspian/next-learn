import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import NavbarComponent from "@/components/navbar/navbarComponent";
import FooterComponent from "@/components/footerComponent";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <NavbarComponent />
        <main className="bg-gray-50 min-h-screen">{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
}
