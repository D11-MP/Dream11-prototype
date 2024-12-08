"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlayerStats from "../../../_components/PlayerStats";
import { DreamTeamMatchCard } from "../../../_components/dreamTeamMatchCard";
import data from "@/uploads/output.json";
import { Data } from "@/types/index";
import {useGlobalContext} from "@/context/GlobalContext";
import predData from "@/uploads/final.json";
import playerList from "@/uploads/final/players";
import { useSearchParams } from "next/navigation";
import {inPlayers,outPlayers} from "../../../_components/PlayerCard";
import axios from "axios";

export let totalPredPoints;
export let playerResponse: any ;
export let newExplanation: any;
export default function Page() {
    const [selectedPlayer, setSelectedPlayer] = useState<Data | null>(null);
    const match = data;
    const {totalPredictedPoints, setTotalPredictedPoints}=useGlobalContext();
    
    const searchParams = useSearchParams();
    const selectedOption = searchParams.get("selectedOption") || "Beginner";
    const country=searchParams.get("country")
    let minPlayersFromCountry1;
    let minPlayersFromCountry2;
    if(selectedOption==="Advanced"){
        minPlayersFromCountry1=searchParams.get("slider1")
        minPlayersFromCountry2=searchParams.get("slider2")
    }
    const final1=useRef<Data[]>([]);
    const intermediate = useRef<Data[]>([]);
    const sortedPredData = predData.sort((a: any, b: any) => b.predicted_points - a.predicted_points);
    useEffect(() => {
        const fetchData = async () => {
            intermediate.current = playerList.filter(player => sortedPredData.some(predPlayer => predPlayer.name === player.name))
                                     .sort((a: Data, b: Data) => {
                                         const aPredPoints: any = sortedPredData.find(predPlayer => predPlayer.name === a.name)?.predicted_points || 0;
                                         const bPredPoints: any = sortedPredData.find(predPlayer => predPlayer.name === b.name)?.predicted_points || 0;
                                         return bPredPoints - aPredPoints;
                                     })
                                     .slice(0, 11);
            
            let sortedFinal: Data[] = [] as Data[];
            if(selectedOption==="Advanced"){
                console.log(outPlayers, inPlayers);
                let filteredFinal = playerList.filter((player: Data) => !outPlayers.some(outPlayer => outPlayer.name === player.name));
                filteredFinal = filteredFinal.filter((player: Data) => !inPlayers.some(outPlayer => outPlayer.name === player.name));
                sortedFinal = filteredFinal.sort((a: any, b: any) => b.predicted_points - a.predicted_points);
                sortedFinal = sortedFinal.slice(0, 22);
                
                const country1Players = sortedFinal.filter(player => player.nationality === "India");
                const country2Players = sortedFinal.filter(player => player.nationality === "SA");
                
                const selectedCountry1Players = country1Players.slice(0, minPlayersFromCountry1);
                const selectedCountry2Players = country2Players.slice(0, minPlayersFromCountry2);
                
                intermediate.current = selectedCountry1Players.concat(selectedCountry2Players);
                
                const remainingSlots = 11 - intermediate.current.length;
                const remainingPlayers = sortedFinal.filter(player => !intermediate.current.includes(player));
                
                intermediate.current = intermediate.current.concat(remainingPlayers.slice(0, remainingSlots));
                
            }
            
            if(selectedOption==="Beginner"){
                const countryPlayerCount = intermediate.current.filter(player => player.nationality === country).length;
                
                if (countryPlayerCount < 6 && country!=="null") {
                    const toAdd=6-countryPlayerCount;
                    const a = intermediate.current.filter(player => player.nationality !== country);
                    const b = intermediate.current.filter(player => player.nationality === country);
                    const c = sortedFinal.filter(player => player.nationality === country);
                    const d=c.filter(player => !b.includes(player));
                    intermediate.current=b.concat(d.slice(0,toAdd));
                    intermediate.current=intermediate.current.concat(a.slice(0,11-toAdd-b.length));
                }
            }

            const allSameNationality = intermediate.current.every(player => player.nationality === intermediate.current[0].nationality);

            if (allSameNationality) {
                intermediate.current.pop();
                intermediate.current.push(sortedFinal[11 - inPlayers.length]);
            }
            intermediate.current = intermediate.current.filter(player => sortedPredData.some(predPlayer => predPlayer.name === player.name))
                                    .sort((a: any, b: any) => {
                                        const aPredPoints:any = sortedPredData.find(predPlayer => predPlayer.name === a.name)?.predicted_points || 0;
                                        const bPredPoints:any = sortedPredData.find(predPlayer => predPlayer.name === b.name)?.predicted_points || 0;
                                        return bPredPoints - aPredPoints;
                                    })
            console.log(intermediate.current);
            final1.current=intermediate.current;
            const data2 = await axios.post("http://localhost:5000/shap",{intermediate});
            playerResponse=data2.data.data;
            console.log(intermediate.current)
            console.log(playerResponse);
            newExplanation={}
            if (playerResponse) {
                playerResponse.forEach(p => {
                    newExplanation[p[0]] = p[1];
                });
                console.log(newExplanation);
            }
        };
        fetchData();
        const captain = intermediate.current[0]?.name;
        const viceCaptain = intermediate.current[1]?.name;
        const totalPredPoints = intermediate.current.reduce((sum, player) => {
            const playerData = predData.find(p => p?.name === player?.name);
            if (player?.name === captain) {
                return sum + (playerData ? parseFloat(playerData?.predicted_points) * 2 : 0);
            } else if (player?.name === viceCaptain) {
                return sum + (playerData ? parseFloat(playerData?.predicted_points) * 1.5 : 0);
            }
            return sum + (playerData ? parseFloat(playerData?.predicted_points) : 0);
        }, 0);
    
        setTotalPredictedPoints(totalPredPoints);
    }, []);

    const handlePlayerClick = (index: number) => {
        setSelectedPlayer(final1.current[index]);
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
                                    <p className="">{final1.current[0]?.name}</p>
                                    <div className="bg-blue-600 text-white rounded-full h-4 w-4 text-sm flex items-center justify-center ">C</div>
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
                                    <p className="">{final1.current[1]?.name}</p>
                                    <div className="bg-blue-600 text-white rounded-full h-4 w-4 text-xxs flex items-center justify-center ">VC</div>
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
                                    <p className="">{final1.current[2]?.name}</p>
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
                                    <p className="">{final1.current[3]?.name}</p>
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
                                    <p className="">{final1.current[4]?.name}</p>
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
                                    <p className="">{final1.current[5]?.name}</p>
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
                                    <p className="">{final1.current[6]?.name}</p>
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
                                    <p className="">{final1.current[7]?.name}</p>
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
                                    <p className="">{final1.current[8]?.name}</p>
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
                                    <p className="">{final1.current[9]?.name}</p>
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
                                    <p className="">{final1.current[10]?.name}</p>
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
