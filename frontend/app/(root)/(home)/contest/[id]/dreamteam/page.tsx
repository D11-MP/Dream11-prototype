"use client";

import { useState } from "react";
import Image from "next/image";

interface Data {
  name: string;
  nationality: string;
  role: string;
  matchesPlayed: number;
  dateOfBirth: string;
  runsScored: number;
  highestScore: number;
  strikeRate: number;
}

const jsonData: Data[] = [
  {
    name: "Virat Kohli",
    nationality: "India",
    role: "Batsman",
    matchesPlayed: 500,
    dateOfBirth: "1988-11-05",
    runsScored: 25000,
    highestScore: 254,
    strikeRate: 93.65,
  },
  {
    name: "Babar Azam",
    nationality: "Pakistan",
    role: "Batsman",
    matchesPlayed: 250,
    dateOfBirth: "1994-10-15",
    runsScored: 12000,
    highestScore: 158,
    strikeRate: 88.23,
  },
  {
    name: "Kane Williamson",
    nationality: "New Zealand",
    role: "Batsman",
    matchesPlayed: 300,
    dateOfBirth: "1990-08-08",
    runsScored: 18000,
    highestScore: 251,
    strikeRate: 81.5,
  },
  {
    name: "Steve Smith",
    nationality: "Australia",
    role: "Batsman",
    matchesPlayed: 350,
    dateOfBirth: "1989-06-02",
    runsScored: 17000,
    highestScore: 239,
    strikeRate: 85.12,
  },
  {
    name: "Ben Stokes",
    nationality: "England",
    role: "All-rounder",
    matchesPlayed: 200,
    dateOfBirth: "1991-06-04",
    runsScored: 10000,
    highestScore: 258,
    strikeRate: 90.25,
  },
  {
    name: "Rashid Khan",
    nationality: "Afghanistan",
    role: "Bowler (Spinner)",
    matchesPlayed: 200,
    dateOfBirth: "1998-09-20",
    runsScored: 1200,
    highestScore: 57,
    strikeRate: 106.75,
  },
  {
    name: "Jasprit Bumrah",
    nationality: "India",
    role: "Bowler (Pacer)",
    matchesPlayed: 150,
    dateOfBirth: "1993-12-06",
    runsScored: 200,
    highestScore: 34,
    strikeRate: 65.4,
  },
  {
    name: "Mitchell Starc",
    nationality: "Australia",
    role: "Bowler (Pacer)",
    matchesPlayed: 200,
    dateOfBirth: "1990-01-30",
    runsScored: 1000,
    highestScore: 84,
    strikeRate: 82.1,
  },
  {
    name: "Jos Buttler",
    nationality: "England",
    role: "Wicketkeeper",
    matchesPlayed: 300,
    dateOfBirth: "1990-09-08",
    runsScored: 13000,
    highestScore: 162,
    strikeRate: 117.5,
  },
  {
    name: "Shakib Al Hasan",
    nationality: "Bangladesh",
    role: "All-rounder",
    matchesPlayed: 400,
    dateOfBirth: "1987-03-24",
    runsScored: 15000,
    highestScore: 217,
    strikeRate: 81.85,
  },
  {
    name: "Trent Boult",
    nationality: "New Zealand",
    role: "Bowler (Pacer)",
    matchesPlayed: 200,
    dateOfBirth: "1989-07-22",
    runsScored: 700,
    highestScore: 52,
    strikeRate: 66.3,
  },
];

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Data | null>(null);

  const handlePlayerClick = (index: number) => {
    setSelectedPlayer(jsonData[index]);
  };
  return (
    <div className="flex flex-col w-screen text-center">
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
      <div className="flex min-h-fit mx-1/10 mt-8 gap-4">
        <div className="w-3/5 h-screen bg-[url('/DreamTeam_BG.png')] bg-cover bg-center flex flex-col">
          <div className="flex items-center justify-around">
            <div
              key={0}
              onClick={() => handlePlayerClick(0)}
              className="flex flex-col items-center mt-20 mb-10"
            >
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
                <p className="">{jsonData[0].name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={1}
              onClick={() => handlePlayerClick(1)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[1].name}</p>
              </div>
            </div>
            <div
              key={2}
              onClick={() => handlePlayerClick(2)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[2].name}</p>
              </div>
            </div>
            <div
              key={3}
              onClick={() => handlePlayerClick(3)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[3].name}</p>
              </div>
            </div>
            <div
              key={4}
              onClick={() => handlePlayerClick(4)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[4].name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={5}
              onClick={() => handlePlayerClick(5)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[5].name}</p>
              </div>
            </div>
            <div
              key={6}
              onClick={() => handlePlayerClick(6)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[6].name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={7}
              onClick={() => handlePlayerClick(7)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[7].name}</p>
              </div>
            </div>
            <div
              key={8}
              onClick={() => handlePlayerClick(8)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[8].name}</p>
              </div>
            </div>
            <div
              key={9}
              onClick={() => handlePlayerClick(9)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[9].name}</p>
              </div>
            </div>
            <div
              key={10}
              onClick={() => handlePlayerClick(10)}
              className="flex flex-col items-center"
            >
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
                <p className="">{jsonData[10].name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-white p-4">
          {selectedPlayer && (
            <div>
              <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
              <p>
                <strong>Role:</strong> {selectedPlayer.role}
              </p>
              <p>
                <strong>Matches Played:</strong> {selectedPlayer.matchesPlayed}
              </p>
              <p>
                <strong>Runs Scored:</strong> {selectedPlayer.runsScored}
              </p>
              <p>
                <strong>Highest Score:</strong> {selectedPlayer.highestScore}
              </p>
              <p>
                <strong>Strike Rate:</strong> {selectedPlayer.strikeRate}
              </p>
              <p>
                <strong>Born:</strong> {selectedPlayer.dateOfBirth}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedPlayer.nationality}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
