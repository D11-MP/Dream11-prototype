import Image from "next/image";

export default function chatbot() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md flex flex-col p-4">
        {/* Header */}
        <div className="bg-bothead text-white py-2 px-4 rounded-t-lg">
          <div className="flex">
            <Image
              src="/bot.png"
              alt="An example image"
              width={50}
              height={50}
              className="p-1"
            />
            <div>
              <div className="text-xxs mb-0 text-gray-500">Chat with</div>
              <div className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple to-pink ">
                AI BOT
              </div>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-48">
          {" "}
          {/* Added `pb-6` for gap */}
          {/* Bot Message */}
          <div className="flex justify-start">
            <div className="flex w-fit h-fit">
              <Image
                src="/bot.png"
                alt="An example image"
                width={50}
                height={50}
                className="p-1"
              />
              <div className="px-3 py-2 rounded-lg text-sm bg-gray-100 ">
                👋Hi there! How can I help you?
              </div>
            </div>
          </div>
          {/* User Message */}
          <div className="flex justify-end">
            <div className="ml-10 px-3 py-2 rounded-lg max-w-xs text-sm text-white bg-gradient-to-r from-purple to-pink">
              Can I change the date of my reservation?
            </div>
          </div>
          {/* Bot Message */}
          <div className="flex justify-start">
            <div className="flex">
              <Image
                src="/bot.png"
                alt="An example image"
                width={50}
                height={50}
                className="p-1"
                style={{ height: "50px", width: "50px", objectFit: "cover" }}
              />
              <div className="px-3 py-2 rounded-lg text-sm bg-gray-100 ">
                Yes, you can change the date of your reservation upto seven days
                in advance.
              </div>
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="flex items-center p-3 border-t mt-2">
          {" "}
          {/* Added `mt-2` for gap */}
          <input
            type="text"
            placeholder="Type here..."
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="ml-2 px-4 py-2 bg-gradient-to-r from-purple to-pink text-white rounded-lg hover:bg-purple-500">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
