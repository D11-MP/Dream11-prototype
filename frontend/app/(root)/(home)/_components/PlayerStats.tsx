import { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import pic from "../../../../public/Player_Pic.png";
import india from "../../../../public/india.png";
import { Chart } from "chart.js/auto";
import { PlayerStatsProps } from "../contest/[id]/dreamteam/page";

const PlayerStats = ({ player }: PlayerStatsProps) => {
  useLayoutEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const gctx = ctx.getContext("2d") as CanvasRenderingContext2D;
    const createGradient = (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(0, 0, 400, 400);
      gradient.addColorStop(0, "rgba(225, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(217, 217, 217, 0)");
      return gradient;
    };
    const ChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            data: [0.1, 0.9, 0.8, 1.6, 1.9, 3.6, 5.1, 7.4, 9.1, 8.5],
            fill: "origin",
            backgroundColor: createGradient(gctx),
            borderColor: "rgba(127, 31, 36, 1)",
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
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
  }, []);

  return (
    <>
      <div className="flex justify-between gap-4 items-center p-2 mb-4">
        <div className="flex gap-2">
          <Image alt="" height={60} width={60} src={pic} />
          <div className="flex-col items-start justify-start gap-2">
            <h1 className="text-2xl text-left font-[600] ">{player?.name}</h1>
            <div className="flex justify-evenly items-center gap-2 text-sm">
              <div className="flex gap-1 text-gray-500 items-center">
                <Image alt="" height={20} width={24} src={india} />
                <p>{player?.nationality}</p>
              </div>
              <div className="flex gap-1 text-gray-500 items-center">
                <Image alt="" height={20} width={24} src={india} />
                <p>{player?.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col bg-gradient-to-r from-authGradient1 to-authGradient2 p-3 rounded-xl text-white">
          <h3>Fantasy Pts</h3>
          <h2 className="text-xl font-semibold">110 Pts</h2>
        </div>
      </div>
      <div className="flex-col shadow-md rounded-b-xl mb-4">
        <div className="flex justify-between bg-[#ED000017] py-4 px-2 rounded-t-xl">
          <h2 className="text-authGradient2 text-xl ml-2">All Time Stats</h2>
          <select
            name="format"
            id="format"
            className="px-2 py-1 focus:border-none rounded-md"
          >
            <option value="t20">T20</option>
            <option value="test">Test</option>
            <option value="odi">ODI</option>
          </select>
        </div>
        <div className="flex gap-4 justify-evenly p-4 mt-2">
          <div>
            <h2 className="text-xl text-left font-[500]">
              {player?.runsScored}
            </h2>
            <p className="text-gray-500 font-[400]">Runs</p>
          </div>
          <div>
            <h2 className="text-xl text-left font-[500]">
              {player?.strikeRate}
            </h2>
            <p className="text-gray-500 font-[400]">S/R</p>
          </div>
          <div>
            <h2 className="text-xl text-left font-[500]">26.61</h2>
            <p className="text-gray-500 font-[400]">Avg</p>
          </div>
          <div>
            <h2 className="text-xl text-left font-[500]">76</h2>
            <p className="text-gray-500 font-[400]">W</p>
          </div>
          <div>
            <h2 className="text-xl text-left font-[500]">6.96</h2>
            <p className="text-gray-500 font-[400]">E/R</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between py-4 px-2 rounded-t-xl">
          <h2 className="text-xl ml-2">Performance Stats</h2>
          <select
            name="format"
            id="format"
            className="px-2 py-1 focus:border-none rounded-md"
          >
            <option value="t20">T20</option>
            <option value="test">Test</option>
            <option value="odi">ODI</option>
          </select>
        </div>
        <div className="flex-col shadow-md rounded-xl">
          <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] rounded-t-xl">
            <p className="text-gray-500">30+ Runs Scored</p>
            <p className="text-authGradient2">20</p>
          </div>
          <div className="flex justify-between px-4 py-4 text-md">
            <p className="text-gray-500">No. of Centuries and Half-Centuries</p>
            <p className="text-authGradient2">24</p>
          </div>
          <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] ">
            <p className="text-gray-500">Strike Rate</p>
            <p className="text-authGradient2">{player?.strikeRate}</p>
          </div>
          <div className="flex justify-between px-4 py-4 text-md">
            <p className="text-gray-500">Boundaries %</p>
            <p className="text-authGradient2">65 %</p>
          </div>
          <div className="flex justify-between px-4 py-4 text-md bg-[#F6F6F6] ">
            <p className="text-gray-500">Top Score%</p>
            <p className="text-authGradient2">55 %</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between py-4 px-2 rounded-t-xl">
          <h2 className="text-xl ml-2">Recent Performance</h2>
          <select
            name="format"
            id="format"
            className="px-2 py-1 focus:border-none rounded-md"
          >
            <option value="t20">T20</option>
            <option value="test">Test</option>
            <option value="odi">ODI</option>
          </select>
        </div>
        <canvas id="myChart" width="100%" height="60%"></canvas>
      </div>
    </>
  );
};

export default PlayerStats;
