"use client";

import { useState } from "react";
import Image from "next/image";
import PlayerStats from "../../../_components/PlayerStats";
import final from "@/uploads/final.json"
import { DreamTeamMatchCard } from "../../../_components/dreamTeamMatchCard";
import data from "@/uploads/output.json";
import { inPlayers, outPlayers } from "../../../_components/PlayerCard";

export interface Data {
  player_id?: string;
  name?: string;
  nationality?: string;
  role?: string;
  total_100s?: any;
  total_50s?: any;
  total_runs?: any;
  total_matches?: any;
  total_wickets?: any;
  avg_economy?:any;
  total_overs_bowled?:any;
  total_5_wicket_hauls?:any;
  total_50?:any;
  total_100?:any;
  avg_strike_rate?:any;
  avg_score?:any;
  total_maiden_overs?:any;
}

export interface PlayerStatsProps {
  player: Data | null;
  setSelectedPlayer: any;
}

const jsonData: any[] = [
  {
    name: "Virat Kohli",
    nationality: "India",
    role: "Batsman",
    
    dateOfBirth: "1988-11-05",
    runsScored: 25000,
    highestScore: 254,
    strikeRate: 93.65,
    run30plus:100,
    noOfCentHalfCent:50,
    boundariesPercent:90,
    topScorePercent:50
  },
  {
    name: "Babar Azam",
    nationality: "Pakistan",
    role: "Batsman",
    
    dateOfBirth: "1994-10-15",
    runsScored: 12000,
    highestScore: 158,
    strikeRate: 88.23,
    run30plus:90,
    noOfCentHalfCent:30,
    boundariesPercent:70,
    topScorePercent:30
  },
  {
    name: "Kane Williamson",
    nationality: "New Zealand",
    role: "Batsman",
    
    dateOfBirth: "1990-08-08",
    runsScored: 18000,
    highestScore: 251,
    strikeRate: 81.5,
    run30plus:40,
    noOfCentHalfCent:40,
    boundariesPercent:20,
    topScorePercent:30
  },
  {
    name: "Steve Smith",
    nationality: "Australia",
    role: "Batsman",
    
    dateOfBirth: "1989-06-02",
    runsScored: 17000,
    highestScore: 239,
    strikeRate: 85.12,
    run30plus:532,
    noOfCentHalfCent:43,
    boundariesPercent:12,
    topScorePercent:40
  },
  {
    name: "Ben Stokes",
    nationality: "England",
    role: "All-rounder",
    
    dateOfBirth: "1991-06-04",
    runsScored: 10000,
    highestScore: 258,
    strikeRate: 90.25,
    run30plus:513,
    noOfCentHalfCent:4,
    boundariesPercent:113,
    topScorePercent:67.5
  },
  {
    name: "Rashid Khan",
    nationality: "Afghanistan",
    role: "Bowler (Spinner)",
    
    dateOfBirth: "1998-09-20",
    runsScored: 1200,
    highestScore: 57,
    strikeRate: 106.75,
    run30plus:53,
    noOfCentHalfCent:94,
    boundariesPercent:137,
    topScorePercent:56
  },
  {
    name: "Jasprit Bumrah",
    nationality: "India",
    role: "Bowler (Pacer)",
    
    dateOfBirth: "1993-12-06",
    runsScored: 200,
    highestScore: 34,
    strikeRate: 65.4,
    run30plus:643,
    noOfCentHalfCent:2,
    boundariesPercent:14,
    topScorePercent:2
  },
  {
    name: "Mitchell Starc",
    nationality: "Australia",
    role: "Bowler (Pacer)",
    
    dateOfBirth: "1990-01-30",
    runsScored: 1000,
    highestScore: 84,
    strikeRate: 82.1,
    run30plus:31,
    noOfCentHalfCent:7,
    boundariesPercent:12,
    topScorePercent:43
  },
  {
    name: "Jos Buttler",
    nationality: "England",
    role: "Wicketkeeper",
    
    dateOfBirth: "1990-09-08",
    runsScored: 13000,
    highestScore: 162,
    strikeRate: 117.5,
    run30plus:53,
    noOfCentHalfCent:53,
    boundariesPercent:54,
    topScorePercent:65
  },
  {
    name: "Shakib Al Hasan",
    nationality: "Bangladesh",
    role: "All-rounder",
    
    dateOfBirth: "1987-03-24",
    runsScored: 15000,
    highestScore: 217,
    strikeRate: 81.85,
    run30plus:523,
    noOfCentHalfCent:43,
    boundariesPercent:24,
    topScorePercent:12
  },
  {
    name: "Trent Boult",
    nationality: "New Zealand",
    role: "Bowler (Pacer)",
    
    dateOfBirth: "1989-07-22",
    runsScored: 700,
    highestScore: 52,
    strikeRate: 66.3,
    run30plus:53,
    noOfCentHalfCent:53,
    boundariesPercent:54,
    topScorePercent:12
  },
];

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Data | null>(null);
  const match = data;
  
//   const filteredFinal = final.filter(player => !outPlayers.includes(player));
let filteredFinal = final.filter((player: Data) => !outPlayers.some(outPlayer => outPlayer.name === player.name));
filteredFinal = filteredFinal.filter((player: Data) => !inPlayers.some(outPlayer => outPlayer.name === player.name));
let sortedFinal = filteredFinal.sort((a:any, b:any) => b.predicted_points - a.predicted_points);
sortedFinal = sortedFinal.slice(0, 11-inPlayers.length);

  const final1 = inPlayers.concat(sortedFinal);

  console.log(filteredFinal);
  console.log(sortedFinal);
  console.log(final1);
  const handlePlayerClick = (index: number) => {
    jsonData[index].name = final1[index]?.name;
    setSelectedPlayer(jsonData[index]);
  };
// inPlayers.length = 0;
// outPlayers.length = 0;
console.log(inPlayers,outPlayers)
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
      <div className="flex justify-center min-h-fit w-[80vw] mx-0 mt-8 gap-4">
        <div className="w-[60%]">
        <DreamTeamMatchCard match={match[0]}/>
        <div className="w-[100%] h-screen bg-[url('/DreamTeam_BG.png')] bg-cover bg-center flex flex-col rounded-lg">
          <div className="flex items-center justify-around">
            <div
              key={0}
              onClick={() => handlePlayerClick(0)}
              className="cursor-pointer flex flex-col items-center mt-20 mb-10"
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
                <p className="">{final1[0]?.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={1}
              onClick={() => handlePlayerClick(1)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[1]?.name}</p>
              </div>
            </div>
            <div
              key={2}
              onClick={() => handlePlayerClick(2)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[2]?.name}</p>
              </div>
            </div>
            <div
              key={3}
              onClick={() => handlePlayerClick(3)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[3]?.name}</p>
              </div>
            </div>
            <div
              key={4}
              onClick={() => handlePlayerClick(4)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[4]?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={5}
              onClick={() => handlePlayerClick(5)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[5]?.name}</p>
              </div>
            </div>
            <div
              key={6}
              onClick={() => handlePlayerClick(6)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[6]?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around mt-5 mb-10 mx-10">
            <div
              key={7}
              onClick={() => handlePlayerClick(7)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[7]?.name}</p>
              </div>
            </div>
            <div
              key={8}
              onClick={() => handlePlayerClick(8)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[8]?.name}</p>
              </div>
            </div>
            <div
              key={9}
              onClick={() => handlePlayerClick(9)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[9]?.name}</p>
              </div>
            </div>
            <div
              key={10}
              onClick={() => handlePlayerClick(10)}
              className="cursor-pointer flex flex-col items-center"
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
                <p className="">{final1[10]?.name}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        {selectedPlayer && 
        <div className="w-[40%] rounded-lg bg-white">
          {selectedPlayer && <PlayerStats player={selectedPlayer} setSelectedPlayer={setSelectedPlayer}/>}
        </div>}
      </div>
    </div>
  );
}
