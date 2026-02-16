import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MemoryCareFind.com - Find In-Home Dementia & Memory Care Near You",
    template: "%s | MemoryCareFind.com",
  },
  description:
    "Find trusted in-home dementia and memory care providers in your area. Compare specialized Alzheimer's caregivers, read reviews, and get free consultations.",
  keywords: [
    "dementia care at home",
    "in-home memory care",
    "alzheimers home care",
    "dementia caregiver near me",
    "memory care services",
    "in-home alzheimers care",
    "dementia care agency",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
