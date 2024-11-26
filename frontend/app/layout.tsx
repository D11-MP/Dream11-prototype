import type { Metadata } from "next";
import Topnav from "./_components/Topnav";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftNav from "./_components/leftnav";

export const metadata: Metadata = {
  title: "Dream 11",
  description:
    "Dream11 lets you showcase your sports knowledge and strategic skills by creating your own fantasy teams for cricket, football, basketball, and more. Compete with millions of fans, earn points based on real-life player performances, and win exciting rewards!",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify desired font weights
  variable: "--font-poppins", // Using as a CSS variable
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-primary-white min-h-screen font-sans">
        <div className="flex flex-col min-h-screen">
          {/* Layout structure */}
          <div className="flex flex-grow">
            {/* Left Navigation */}
            <aside className="w-1/6 bg-white h-screen fixed">
              <LeftNav />
            </aside>

            {/* Main Content */}
            <main className="flex flex-col w-5/6 ml-[16.666%] bg-gray-100 min-h-screen">
              {/* Top Navigation */}
              <div>
                <Topnav />
              </div>

              {/* Dynamic Children */}
              <div className="flex-grow p-4">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
