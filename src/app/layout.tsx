
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import localFont, { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from "react-toastify";
const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "FitnessGeek",
  description: "Create and track your fitness journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
