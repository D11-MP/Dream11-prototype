import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CreateChat, GenerateChat } from "@/lib/actions/chat.actions";

interface ChatItem {
  prompt: string;
  response: string;
}

export default function Chatbot({
  setShowChatbot,
  showChatbot,
}: {
  setShowChatbot: (show: boolean) => void;
  showChatbot: boolean;
}) {
  const [chatId, setChatId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await CreateChat();
        setChatId(response.chat_id);
      } catch {
        console.error("Error creating chat");
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

  const handleGenerate = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!prompt) return;

    const newChats = [...chats, { prompt, response: "Thinking..." }];
    setChats(newChats);
    setPrompt("");
    setLoading(true);

    try {
      const res = await GenerateChat({ id: chatId, prompt });
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleRecordingToggle = () => {
    if (recording) stopRecording();
    else startRecording();
  };

  return (
    <div
      className="flex items-center justify-center"
      style={!showChatbot ? { display: "none" } : {}}
    >
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

        <form
          onSubmit={(e) => handleGenerate(e)}
          className="flex relative items-center p-3 mt-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 py-2 px-10 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
          />
          <svg
            onClick={handleRecordingToggle}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute left-5 w-6 h-6 text-gray-500"
          >
            {recording ? (
              <>
                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
              </>
            ) : (
              <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            )}
          </svg>
        </form>
      </div>
    </div>
  );
}
