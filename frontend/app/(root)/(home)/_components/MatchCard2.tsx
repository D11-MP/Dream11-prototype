"use client";

import React, { useState } from "react";
import { MatchCardProps } from "@/types";
import "../styles/matchCard.css";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";
import PlayerList2 from "./PlayerList2";

export const MatchCard2: React.FC<MatchCardProps> = ({ match }) => {
  const [clicked, setClicked] = useState(0);

  return (
    <div className="flex flex-col">
        
    <div className="flex flex-col justify-between w-full bg-white rounded-lg shadow-md p-4 mb-1">
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Image alt="Home Team Logo" height={50} width={50} src={ind} />
            <p className="text-sm mt-2 text-gray-500">{match.teamA}</p>
          </div>
          <p className="font-medium mt-3">{match.teamA.slice(0, 3).toUpperCase()}</p>
        </div>

        <div className="flex flex-col items-center " >
          <button onClick={() => setClicked(1 - clicked)} className="flex cursor-pointer text-red-500 bg-red-50 px-3 py-1 rounded-md transition-all duration-300 ease-in-out">
            {/* {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days ago`} */}
            {clicked ? "Hide Lineup" : "Show Lineup"} 
                {clicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-transform duration-300 ease-in-out transform rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-transform duration-300 ease-in-out transform rotate-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                )}
          </button>
          {/* <div className="text-gray-500">{match.matchDate}</div> */}
        </div>

        <div className="flex gap-2">
        <p className="font-medium mt-3">{match.teamB.slice(0, 3).toUpperCase()}</p>
          <div className="flex flex-col items-center">
            <Image alt="Away Team Logo" height={50} width={50} src={aus} className="rounded-full object-cover" />
            <p className="text-sm mt-2 text-gray-500">{match.teamB}</p>
          </div>
        </div>
      </div>
    </div>
      {clicked ? <PlayerList2/> : null}
    </div>
  );
};
