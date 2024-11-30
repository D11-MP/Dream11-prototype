"use client";

import Image from "next/image";
import { CreateChat, GenerateChat } from "@/lib/actions/chat.actions";
import { useEffect, useRef, useState } from "react";

interface ChatItem {
  prompt: string;
  response: string;
}

export default function Chatbot({
  setShowChatbot,
}: {
  setShowChatbot: (show: boolean) => void;
}) {
  const [chatId, setChatId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await CreateChat();
        setChatId(response.chat_id);
      } catch {
        console.error("Invalid");
      }
    };
    initializeChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleGenerate = async () => {
    if (!prompt) return;
    const newChats = [...chats, { prompt, response: "Thinking..." }];
    setChats(newChats);
    setPrompt("");
    setLoading(true);

    try {
      const res = await GenerateChat({ id: chatId, prompt: prompt });
      const updatedChats = [...newChats];
      updatedChats[updatedChats.length - 1].response =
        res.response || "I'm sorry, I couldn't process that.";
      setChats(updatedChats);
    } catch (error) {
      console.error(error);
      const updatedChats = [...newChats];
      updatedChats[updatedChats.length - 1].response =
        "An error occurred. Please try again.";
      setChats(updatedChats);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md flex flex-col min-h-[600px] max-h-[600px] min-w-[350px] max-w-[350px] relative">
        <div
          onClick={() => setShowChatbot(false)}
          className="absolute top-1 right-2 text-2xl mx-2 my-1 font-medium text-gray-400 cursor-pointer"
        >
          ×
        </div>

        <div className="bg-bothead text-white pt-3 pb-2 px-4 rounded-t-lg">
          <div className="flex">
            <div className="w-12 h-12">
              <Image
                src="/bot.png"
                alt="An example image"
                width={50}
                height={50}
                className="p-1"
              />
            </div>

            <div>
              <div className="text-xxs mb-0 text-gray-500">Chat with</div>
              <div className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple to-pink ">
                AI BOT
              </div>
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-scroll p-4 space-y-3"
        >
          <div className="mr-10 flex justify-start items-start space-x-3">
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src="/bot.png"
                alt="Bot avatar"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
            </div>
            <div className="px-3 py-2 rounded-lg text-sm bg-gray-100">
              Hi there! How can I help you today?
            </div>
          </div>
          {chats.map((item, index) => (
            <div key={index}>
              <div className="flex justify-end mb-3">
                <div className="ml-10 px-3 py-2 rounded-lg max-w-xs text-sm text-white bg-gradient-to-r from-purple to-pink">
                  {item.prompt}
                </div>
              </div>
              <div className="mr-10 flex justify-start items-start space-x-3">
                <div className="w-12 h-12 flex-shrink-0">
                  <Image
                    src="/bot.png"
                    alt="Bot avatar"
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="px-3 py-2 rounded-lg text-sm bg-gray-100">
                  {item.response}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center p-3 mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            onClick={handleGenerate}
            className="ml-2 px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
