"use client";

import Topnav from "./_components/topnav";
import Chatbot from "./_components/Chatbot";
import { useState } from "react";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showChatbot, setShowChatbot] = useState(false);
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full">
          <Topnav />
        </div>
        <div className="bg-page_bg_color w-full">
          <div className="min-h-screen w-[1222px] mx-auto my-0 flex justify-center">
            <div className="flex flex-col min-h-screen ">
              <div>{children}</div>
              <div className="bottom-6 right-6 fixed">
                <Chatbot
                  setShowChatbot={setShowChatbot}
                  showChatbot={showChatbot}
                />
                {!showChatbot ? (
                  <Image
                    onClick={() => setShowChatbot(true)}
                    src="/bot.png"
                    alt="Bot avatar"
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
