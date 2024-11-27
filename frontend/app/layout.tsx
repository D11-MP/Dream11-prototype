import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authProvider";

export const metadata: Metadata = {
  title: "Dream 11",
  description:
    "Dream11 lets you showcase your sports knowledge and strategic skills by creating your own fantasy teams for cricket, football, basketball, and more. Compete with millions of fans, earn points based on real-life player performances, and win exciting rewards!",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
