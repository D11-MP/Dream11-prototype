"use client";

import { useState } from "react";
import Image from "next/image";
import PlayerStats from "../../../_components/PlayerStats";
import final from "@/app/(root)/(home)/_components/players"
// import final from "@/uploads/final.json"
import { DreamTeamMatchCard } from "../../../_components/dreamTeamMatchCard";
import data from "@/uploads/output.json";
import { inPlayers, outPlayers } from "../../../_components/PlayerCard";
import predData from "@/uploads/final.json"
import {playerResponse} from "../../../_components/TeamCustomize";
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
    avg_economy?: any;
    total_overs_bowled?: any;
    total_5_wicket_hauls?: any;
    total_50?: any;
    total_100?: any;
    avg_strike_rate?: any;
    avg_score?: any;
    total_maiden_overs?: any;
    boundary?: any;
    past_points?: any;
}

export interface PlayerStatsProps {
    player: Data | null;
    setSelectedPlayer: any;
    predicted_points?: number;
}

export let final1: Data[] = [];

export default function Page() {
    const [selectedPlayer, setSelectedPlayer] = useState<Data | null>(null);
    const match = data;



    let filteredFinal = final.filter((player: Data) => !outPlayers.some(outPlayer => outPlayer.name === player.name));
    filteredFinal = filteredFinal.filter((player: Data) => !inPlayers.some(outPlayer => outPlayer.name === player.name));
    const sortedFinal = filteredFinal.sort((a: any, b: any) => b.predicted_points - a.predicted_points);
    // sortedFinal = sortedFinal.slice(0, 11 - inPlayers.length);


    final1 = inPlayers.concat(sortedFinal.slice(0, 11 - inPlayers.length));

    const totalPredictedPoints = final1.reduce((sum, player) => {
        const playerData = predData.find(p => p.name === player.name);
        return sum + (playerData ? parseFloat(playerData.predicted_points) : 0);
    }, 0);
    const allSameNationality = final1.every(player => player.nationality === final1[0].nationality);

    if (allSameNationality) {
        final1.pop();
        final1.push(sortedFinal[11 - inPlayers.length]);
    }
    // console.log(final1);
    const handlePlayerClick = (index: number) => {
        setSelectedPlayer(final1[index]);
    };

    return (
        <div className="flex flex-col w-full text-center pb-10">
            <div>
                <h1 className="text-3xl font-medium text-center pt-8 pb-2">
                    Congratulation! We did a{" "}
                    <span className="text-authButton">great</span> job!
                </h1>
                <p className="text-gray-400">
                Your winning squad is ready! Play smart and dominate the game. Good luck!
                </p>
            </div>
            <div className="flex justify-center min-h-fit w-[80vw] mx-0 mt-8 gap-4">
                <div className="w-[60%]">
                    <DreamTeamMatchCard match={match[0]} total_predicted_points={totalPredictedPoints} />
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
                        {selectedPlayer && <PlayerStats player={selectedPlayer} setSelectedPlayer={setSelectedPlayer} playerResponse={playerResponse} />}
                    </div>}
            </div>
        </div>
    );
}
