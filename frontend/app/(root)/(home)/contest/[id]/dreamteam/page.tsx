import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col w-full text-center pb-10">
      <div>
        <h1 className="text-3xl font-medium text-center pt-8 pb-2">
          Congratulation! We did a{" "}
          <span className="text-authButton">great</span> job!
        </h1>
        <p className="text-gray-400">
          Our AI analyzes player stats and match data to quickly craft your
          perfect Dream11 team for you.
        </p>
      </div>
      <div className="flex min-h-fit w-[80vw] mx-0 mt-8 gap-4">
        <div className="w-[60%] h-screen bg-[url('/DreamTeam_BG.png')] bg-cover bg-center flex flex-col rounded-lg">
          <div className="fle items-center justify-around">
            <div className="flex flex-col items-center mt-20 mb-10">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Player_Red.png"
                alt="Dream Team Logo"
                width={70}
                height={70}
              />
              <div className="flex bg-white px-2 items-center justify-center rounded-lg gap-1">
                <Image
                  src="/Player_Role.png"
                  alt="Player"
                  width={25}
                  height={25}
                />
                <p className="">Name</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] rounded-lg bg-white"></div>
      </div>
    </div>
  );
}
