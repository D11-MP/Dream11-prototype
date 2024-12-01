"use client";

import PlayerStats from "../../_components/PlayerStats";
import { Data } from "./dreamteam/page";

import React, { use, useEffect, useState } from "react";
import TeamCustomize from "../../_components/TeamCustomize";
import { MatchCard2 } from "../../_components/MatchCard2";
import data from "@/uploads/output.json";
import Commentator from "../../_components/commentator";

type Params = {
  id: string;
};

export default function Page({ params }: { params: Promise<Params> }) {
  const matches = data;
  const id = use(params);
  const [selectedPlayer, setSelectedPlayer] = useState<Data | null>(null);

  const [commentator , setCommentator] = useState<boolean>(true);

  
  useEffect(()=>{
  if(commentator) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'scroll'
  return 
  },[commentator])

  if (!id) return <p>Loading...</p>;

  return (
    <>
   { commentator &&
    <div style={{width:'100vw',height:'100vh'}} className="fixed left-0 top-0 flex justify-center items-center z-30">
    <Commentator close={setCommentator} open={commentator}/>
    </div>}
    
    <div className="w-full">
      <h1 className="text-3xl font-medium text-center pt-8 pb-2">
        Let{"'"}s Craft Your Perfect{" "}
        <span className="text-authButton">Dream</span> Squad!
      </h1>
      <p className="text-gray-400 text-center">
        Our AI analyzes player stats and match data to quickly craft your
        perfect Dream11 team for you.
      </p>
      <div className="flex gap-4 w-full justify-center">
        <div className="w-[50%]">
          <div className="mt-8 border-t-8 w-full sticky top-[96px] z-10" style={{borderTopColor:'#f6f6f9'}}">
            <MatchCard2 match={matches[0]} />
          </div>
          <div className="mt-4 w-full">
            <TeamCustomize setPlayer={setSelectedPlayer} />
          </div>
        </div>

        {selectedPlayer && (
          <div className="rounded-lg bg-white p-4 mt-8 w-[30%]">
            <PlayerStats player={selectedPlayer} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}
