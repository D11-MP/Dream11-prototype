import type { Metadata } from "next";
import Topnav from "./_components/Topnav";
import "./globals.css";
import LeftNav from "./_components/Leftnav";

export const metadata: Metadata = {
  title: "Dream 11",
  description:
    "Dream11 lets you showcase your sports knowledge and strategic skills by creating your own fantasy teams for cricket, football, basketball, and more. Compete with millions of fans, earn points based on real-life player performances, and win exciting rewards!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-white min-h-screen">
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-grow">
            <aside className="w-1/6 bg-white">
              <LeftNav />
            </aside>
            <main className="w-5/6 bg-gray-100">
              <div className="h-1/6">
                <Topnav />
              </div>
              <div className="h-5/6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
