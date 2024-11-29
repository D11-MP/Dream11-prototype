"use client"

import { useSession } from "next-auth/react";
import Topnav from "./_components/topnav";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session  = useSession();

  return (
    <>
    {
      session.status!=='loading' && 
      <div className="min-h-screen">
      <div  className="w-full">
        <Topnav session={session}/>
      </div>
      <div className="bg-page_bg_color w-full">
        <div className="min-h-screen w-[1222px] mx-auto my-0 flex justify-center">
          <div className="flex flex-col min-h-screen">
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
    
  );
}