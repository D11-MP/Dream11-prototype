import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import pic from "@/public/Player_Pic.png";
import gola from "@/public/gola.svg";
import { Chart } from "chart.js/auto";
import { PlayerStatsProps } from "../contest/[id]/dreamteam/page";
import finalData from "@/uploads/final.json";
import last10t20 from "@/uploads/t20_10_matches.json";
import last10test from "@/uploads/test_10_matches.json";
import last10odi from "@/uploads/odi_10_matches.json";
import { newExplanation } from "./TeamCustomize";

const PlayerStats = ({ player, setSelectedPlayer }: PlayerStatsProps) => {
    const [format, setFormat] = useState<string>("t20");
    const [format2, setFormat2] = useState<string>("t20");
    const [format3, setFormat3] = useState<string>("t20");

    // const predictedPoints = finalData.find(p => p.name === player?.name)?.predicted_points || 0;
    // const predictedPoints ={format1 === "t20"
    //     ? player?.past_points?.t20
    //     : format2 === "test"
    //         ? player?.past_points?.test
    //         : player?.past_points?.odi};

    useLayoutEffect(() => {
        const ctx = document.getElementById("myChart") as HTMLCanvasElement;
        const gctx = ctx.getContext("2d") as CanvasRenderingContext2D;
        const createGradient = (ctx: CanvasRenderingContext2D) => {
            const gradient = ctx.createLinearGradient(0, 0, 400, 400);
            gradient.addColorStop(0, "rgba(225, 0, 0, 1)");
            gradient.addColorStop(1, "rgba(217, 217, 217, 0)");
            return gradient;
        };
        let playerData: any;
        if (format3 === "t20") 
           playerData  = last10t20.find(p => p.name === player?.name);
        else if (format3 === "test") 
            playerData = last10test.find(p => p.name === player?.name);
        else 
            playerData = last10odi.find(p => p.name === player?.name);
        
        const runsData = playerData
            ? [
                playerData.runs_last_1,
                playerData.runs_last_2,
                playerData.runs_last_3,
                playerData.runs_last_4,
                playerData.runs_last_5,
                playerData.runs_last_6,
                playerData.runs_last_7,
                playerData.runs_last_8,
                playerData.runs_last_9,
                playerData.runs_last_10,
            ]
            : [];
        const wicketsData = playerData
            ? [
                playerData.wickets_last_1,
                playerData.wickets_last_2,
                playerData.wickets_last_3,
                playerData.wickets_last_4,
                playerData.wickets_last_5,
                playerData.wickets_last_6,
                playerData.wickets_last_7,
                playerData.wickets_last_8,
                playerData.wickets_last_9,
                playerData.wickets_last_10,
            ]
            : [];
        const ChartInstance = new Chart(ctx, {
            type: "line",
            data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                data: runsData,
                fill: "origin",
                backgroundColor: createGradient(gctx),
                borderColor: "rgba(127, 31, 36, 1)",
                tension: 0.3,
                label: "Runs",
                },
                {
                data: wicketsData,
                fill: "origin",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                borderColor: "rgba(0, 0, 255, 1)",
                tension: 0.3,
                label: "Wickets",
                },
            ],
            },
            options: {
            scales: {
                x: {
                title: {
                    display: true,
                    text: "Matches",
                },
                },
                y: {
                beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                display: false,
                },
            },
            },
        });

        return () => {
            ChartInstance.destroy();
        };
    }, [setFormat3, format3, player]);

    return (
        <>
            <div
                className="flex justify-between w-[100%] h-[8%] px-4 py-5"
                style={{
                    background: "linear-gradient(to left , #5C5CFE , #E94986)",
                    borderTopLeftRadius: "1.25rem",
                    borderTopRightRadius: "1.25rem",
                }}
            >
                <Image src={gola} alt="" width={50} height={50} />
                <span
                    className="w-[20px] h-[20px]"
                    onClick={() => setSelectedPlayer(null)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="white"
                        className="size-6 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </span>
            </div>
            <div className="p-4">
                <div className="flex justify-between gap-4 items-center p-2 mb-4">
                    <div className="flex gap-2">
                        <Image alt="" height={60} width={60} src={pic} />
                        <div className="flex-col items-start justify-start gap-2">
                            <h1 className="text-2xl text-left font-[600] ">{player?.name}</h1>
                            <div className="flex justify-evenly items-center gap-2 text-sm">
                                <div className="flex gap-1 text-gray-500 items-center">
                                    {player?.nationality === "India" ? (
                                        <Image src={"/india.png"} height={20} width={20} alt="" />
                                    ) : (
                                        <Image src={"/aus.png"} height={20} width={20} alt="" />
                                    )}
                                    <p>{player?.nationality}</p>
                                </div>
                                <div className="flex gap-1 text-gray-500 items-center">
                                    {player?.role === "Batsman" ? (
                                        <Image src={"/bat.png"} height={20} width={20} alt="" />
                                    ) : (
                                        <Image src={"/ball.png"} height={20} width={20} alt="" />
                                    )}
                                    <p>{player?.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {window.location.pathname==="/contest/123/dreamteam" && <div className="flex-col bg-gradient-to-r from-authGradient1 to-authGradient2 p-3 rounded-xl text-white">
                        <h3>Recent Pts</h3>
                        <h2 className="text-xl font-semibold">{format === "t20"
                            ? player?.past_points?.t20?.toFixed(2)
                            : format === "test"
                                ? player?.past_points?.test?.toFixed(2)
                                : player?.past_points?.odi?.toFixed(2)}</h2>
                    </div>}
                </div>
                
                {window.location.pathname=="/contest/123/dreamteam" &&
                <div className="bg-[#F6F6F6] px-2 py-1 rounded-lg my-2 text-sm text-left flex gap-1 relative">
                    <Image src={"/ai-sparkle.png"} alt="" width={20} height={20} className="absolute left-1 top-1"/>
                    <p className="ml-4">
                        {newExplanation &&player?.name && newExplanation[player?.name] ? newExplanation[player?.name] : "Thinking..."}
                    </p>
                </div>
                }
                <div className="flex-col shadow-md rounded-b-xl mb-4">
                    <div className="flex justify-between bg-[#ED000017] py-4 px-2 rounded-t-xl">
                        <h2 className="text-authGradient2 text-xl ml-2">All Time Stats</h2>
                        <select
                            name="format"
                            id="format"
                            className="px-2 py-1 focus:border-none rounded-md"
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                        >
                            <option value="t20">T20</option>
                            <option value="test">Test</option>
                            <option value="odi">ODI</option>
                        </select>
                    </div>
                    <div className="flex gap-4 justify-evenly p-4 mt-2">
                        <div>
                            <h2 className="text-xl text-left font-[500]">
                                {format === "t20"
                                    ? player?.total_runs?.t20
                                    : format === "test"
                                        ? player?.total_runs?.test
                                        : player?.total_runs?.odi}
                            </h2>
                            <p className="text-gray-500 font-[400]">Runs</p>
                        </div>
                        <div>
                            <h2 className="text-xl text-left font-[500]">
                                {format === "t20"
                                    ? player?.avg_strike_rate?.t20.toFixed(2)
                                    : format === "test"
                                        ? player?.avg_strike_rate?.test.toFixed(2)
                                        : player?.avg_strike_rate?.odi.toFixed(2)}
                            </h2>
                            <p className="text-gray-500 font-[400]">S/R</p>
                        </div>
                        <div>
                            <h2 className="text-xl text-left font-[500]">
                                {format === "t20"
                                    ? player?.avg_score?.t20.toFixed(2)
                                    : format === "test"
                                        ? player?.avg_score?.test.toFixed(2)
                                        : player?.avg_score?.odi.toFixed(2)}
                            </h2>
                            <p className="text-gray-500 font-[400]">Bat Avg</p>
                        </div>
                        <div>
                            <h2 className="text-xl text-left font-[500]">
                                {format === "t20"
                                    ? player?.total_wickets?.t20
                                    : format === "test"
                                        ? player?.total_wickets?.test
                                        : player?.total_wickets?.odi}
                            </h2>
                            <p className="text-gray-500 font-[400]">W</p>
                        </div>
                        <div>
                            <h2 className="text-xl text-left font-[500]">
                                {format === "t20"
                                    ? player?.avg_economy?.t20.toFixed(2)
                                    : format === "test"
                                        ? player?.avg_economy?.test.toFixed(2)
                                        : player?.avg_economy?.odi.toFixed(2)}
                            </h2>
                            <p className="text-gray-500 font-[400]">E/R</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between py-4 px-2 rounded-t-xl">
                        <h2 className="text-xl ml-2">Performance Stats</h2>
                        <select
                            name="format2"
                            id="format2"
                            className="px-2 py-1 focus:border-none rounded-md"
                            value={format2}
                            onChange={(e) => setFormat2(e.target.value)}
                        >
                            <option value="t20">T20</option>
                            <option value="test">Test</option>
                            <option value="odi">ODI</option>
                        </select>
                    </div>

                    <div className="flex-col shadow-md rounded-xl">
                        <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] rounded-t-xl">
                            <p className="text-gray-500">Half Centuries</p>
                            <p className="text-authGradient2">
                                {format2 === "t20"
                                    ? player?.total_50s?.t20
                                    : format2 === "test"
                                        ? player?.total_50s?.test
                                        : player?.total_50s?.odi}
                            </p>
                        </div>
                        <div className="flex justify-between px-4 py-4 text-md">
                            <p className="text-gray-500">No. of Centuries</p>
                            <p className="text-authGradient2">
                                {format2 === "t20"
                                    ? player?.total_100s?.t20
                                    : format2 === "test"
                                        ? player?.total_100s?.test
                                        : player?.total_100s?.odi}
                            </p>
                        </div>
                        <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] ">
                            <p className="text-gray-500">5 wicket hauls</p>
                            <p className="text-authGradient2">
                                {format2 === "t20"
                                    ? player?.total_5_wicket_hauls?.t20
                                    : format2 === "test"
                                        ? player?.total_5_wicket_hauls?.test
                                        : player?.total_5_wicket_hauls?.odi}
                            </p>
                        </div>
                        <div className="flex justify-between px-4 py-4 text-md">
                            <p className="text-gray-500">Total Overs Bowled</p>
                            <p className="text-authGradient2">
                                {format2 === "t20"
                                    ? player?.total_overs_bowled?.t20.toFixed(0)
                                    : format2 === "test"
                                        ? player?.total_overs_bowled?.test.toFixed(0)
                                        : player?.total_overs_bowled?.odi.toFixed(0)}{" "}
                            </p>
                        </div>
                        <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] ">
                            <p className="text-gray-500">Boundary Score %</p>
                            <p className="text-authGradient2">
                                {format2 === "t20"
                                    ? player?.boundary?.t20.toFixed(2)
                                    : format2 === "test"
                                        ? player?.boundary?.test.toFixed(2)
                                        : player?.boundary?.odi.toFixed(2)}{" "}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between py-4 px-2 rounded-t-xl">
                        <h2 className="text-xl ml-2">Recent Performance</h2>
                        <select
                            name="format3"
                            id="format3"
                            className="px-2 py-1 focus:border-none rounded-md"
                            value={format3}
                            onChange={(e) => setFormat3(e.target.value)}
                        >
                            <option value="t20">T20</option>
                            <option value="test">Test</option>
                            <option value="odi">ODI</option>
                        </select>
                    </div>
                    <div className="flex gap-2 m-auto">
                        <div className="flex justify-center items-center">
                            <div className="h-3 w-3 rounded-sm mx-1" style={{backgroundColor:"rgba(127, 31, 36, 1)"}}></div>
                            <p>Runs</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="h-3 w-3 rounded-sm mx-1" style={{backgroundColor:"rgba(0, 0, 255, 1)"}}></div>
                            <p>Wickets</p>
                        </div>
                    </div>
                    <canvas id="myChart" width="100%" height="60%"></canvas>
                </div>
            </div>
        </>
    );
};

export default PlayerStats;
