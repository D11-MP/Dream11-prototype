import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Session } from "next-auth";
import AuthProvider from "@/context/authProvider";
import { headers } from "next/headers";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`http:localhost:3000/api/auth/session`, {
    headers: {
      cookie,
    },
  }); 
  const session = await response.json();
  return Object.keys(session).length > 0 ? session : null;
}

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await headers();
  const cookie = header.get('cookie') ?? '';
  const session = await getSession(cookie);
  // console.log(session)
  return (
    <html lang="en" >
      <body className={poppins.variable}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
