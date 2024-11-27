import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LeftNav from "./_components/leftnav";
import Topnav from "./_components/topnav";

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
      <body className="bg-primary-white min-h-screen font-sans">
        <div  className="w-full">
          <Topnav />
        </div>
        <div className="min-h-screen min-w-[1222px] bg-page_bg_color my-0 flex justify-center">
          {/* <div className="flex flex-grow"> */}
            {/* <aside className="w-1/6 bg-white h-screen fixed">
              <LeftNav />
            </aside> */}

            <main className="flex flex-col  min-h-screen">
              <div className="flex-grow p-4">{children}</div>
            </main>

          {/* </div> */}
        </div>
      </body>
    </html>
  );
}
