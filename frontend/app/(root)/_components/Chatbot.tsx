import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  const [manualTranscript, setManualTranscript] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return <p>Browser does not support speech recognition.</p>;
  // }

  const startListening = () => {
    setPrompt("");
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = async () => {
    console.log("Before stopListening:", listening);
    await SpeechRecognition.stopListening();
    //setTimeout(() => console.log("After stopListening:", listening), 100);
  };

  useEffect(() => {
    setManualTranscript(transcript);
  }, [transcript]);

  const handlePrompt = async () => {
    console.log("Listening before stopListening:", listening);
    await stopListening();

    const currTrans = manualTranscript;
    setManualTranscript("");
    resetTranscript();
    setManualTranscript("");

    if (!currTrans) return;

    const newChats = [...chats, { prompt: currTrans, response: "Thinking..." }];
    setChats(newChats);

    try {
      const res = await GenerateChat({ id: chatId, prompt: currTrans });
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
    }
  };

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

  const handleGenerate = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>
  ) => {
    e?.preventDefault();
    if (listening) {
      stopListening();
      resetTranscript();
    }
    if (!prompt) return;

    const newChats = [...chats, { prompt, response: "Thinking..." }];
    setChats(newChats);
    setPrompt("");

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
    }
  };

  const prompts = {
    "What is team balance?":
      "A balanced team with team combination ensures adaptability and resilience in the changing situations of the game. The team combination consists of four top-order batsmen, middle-order stabilizers, a wicketkeeper, all-rounders, and effective bowlers.",
    "What is spin/seam balance?":
      "Spin bowling involves the ball spinning either from the off side (away from the right-handed batsman) or the leg side (towards the right-handed batsman). Seam bowling, on the other hand, focuses on generating sideways movement either through the air or off the pitch.",
  };

  const handleButtonClick = (query) => {
    const newChats = [...chats, { prompt: query, response: "Thinking..." }];
    setChats(newChats);

    // Simulate the "thinking" state for 1 second, then update with the response
    setTimeout(() => {
      const response = prompts[query] || "Sorry, I don't know the answer.";
      const updatedChats = [...newChats];
      updatedChats[updatedChats.length - 1].response = response;
      setChats(updatedChats);
    }, 2000); // 1-second delay before showing the response
  };

  return (
    <div
      className={`flex items-center justify-center ${
        !showChatbot ? "hidden" : ""
      }`}
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
                alt="Bot Avatar"
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
              👋Hi, I am Dream! How can I help you in forming your Dream Team?
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
        <div className="flex px-5 gap-4 pt-3">
          <button
            onClick={() => handleButtonClick("What is team balance?")}
            className="text-xxs px-2 py-1 bg-clip-text text-transparent bg-gradient-to-r from-purple to-pink border border-gray-400 rounded-xl "
          >
            What is team balance?
          </button>
          <button
            onClick={() => handleButtonClick("What is spin/seam balance?")}
            className="text-xxs px-2 py-1 bg-clip-text text-transparent bg-gradient-to-r from-purple to-pink border border-gray-400 rounded-xl "
          >
            What is spin/seam balance?
          </button>
        </div>
        <form
          onSubmit={handleGenerate}
          className="flex relative items-center px-3 pt-1 pb-3 mt-2"
        >
          <input
            type="text"
            placeholder={listening ? "Listening..." : "Type your message..."}
            value={prompt || manualTranscript}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 py-2 px-10 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
          />

          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={listening ? handlePrompt : startListening}
            className="absolute left-5 text-gray-600"
          >
            {listening ? (
              <>
                {" "}
                <path
                  //fill="#9D9D9D"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                />
              </>
            ) : (
              <path
                d="M13.1689 1.26562C10.8657 1.26562 8.99868 3.13268 8.99868 5.43581V12.9207C8.99868 15.2239 10.8657 17.0909 13.1689 17.0909C15.472 17.0909 17.339 15.2239 17.339 12.9207V5.43581C17.339 3.13268 15.472 1.26562 13.1689 1.26562ZM10.9234 5.43581C10.9234 4.19566 11.9287 3.19032 13.1689 3.19032C14.409 3.19032 15.4143 4.19566 15.4143 5.43581V12.9207C15.4143 14.1609 14.409 15.1662 13.1689 15.1662C11.9287 15.1662 10.9234 14.1609 10.9234 12.9207V5.43581ZM6.64638 12.9216C6.64638 12.3901 6.21552 11.9592 5.68403 11.9592C5.15254 11.9592 4.72168 12.3901 4.72168 12.9216C4.72168 15.8832 5.92034 18.0279 7.61417 19.4138C8.98806 20.5379 10.6557 21.1386 12.2066 21.3139V23.6144C12.2066 24.1458 12.6375 24.5767 13.169 24.5767C13.7005 24.5767 14.1313 24.1458 14.1313 23.6144V21.3139C15.6823 21.1386 17.3499 20.5379 18.7238 19.4138C20.4176 18.0279 21.6163 15.8832 21.6163 12.9216C21.6163 12.3901 21.1854 11.9592 20.6539 11.9592C20.1224 11.9592 19.6916 12.3901 19.6916 12.9216C19.6916 15.3064 18.7517 16.9041 17.505 17.9241C16.2283 18.9687 14.5803 19.4442 13.169 19.4442C11.7576 19.4442 10.1097 18.9687 8.83296 17.9241C7.58627 16.9041 6.64638 15.3064 6.64638 12.9216Z"
                fill="#9D9D9D"
              />
            )}
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={listening ? handlePrompt : handleGenerate}
            className="absolute right-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </form>
      </div>
    </div>
  );
}
