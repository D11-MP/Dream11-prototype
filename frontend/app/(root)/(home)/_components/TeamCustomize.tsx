"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdvancedProps from "./AdvancedProps";
import axios from "axios";
import BeginnerProps from "./BeginnerProps";
import {TeamCustomizeProps} from "@/types/index";
import {useGlobalContext} from "@/context/GlobalContext"
import final from "@/uploads/final/players"
import {inPlayers,outPlayers} from "./PlayerCard";
import predData from "@/uploads/final.json"
import {Data} from "@/types/index"

let final1: Data[] = [] as Data[];
export let totalPredPoints;
export let playerResponse: any ;
export let newExplanation: any;
export let country: string | null = null;
export let setCountry: React.Dispatch<React.SetStateAction<string | null>> = () => {};
export default function Page({ setPlayer }: TeamCustomizeProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Beginner");
  const [countLockIn, setCountLockIn] = useState(1);
  const [countLockOut, setCountLockOut] = useState(1);
  [country, setCountry] = useState<string | null>(null);
  const [toggle, setToggle] = useState<boolean>(true);


  const {final2, setFinal2, totalPredictedPoints, setTotalPredictedPoints}=useGlobalContext();
// console.log(final1);

  async function runModel() {
    if(toggle || country || selectedOption==="Advanced"){
        const data = await axios.get("http://localhost:5000/predict");
        console.log(data);
        if (data.status === 200) {
          const res = await axios.get("https://dreamteam-sage.vercel.app/api/parse_csv");
          if (res.status === 200) {
            router.push("/contest/123/dreamteam");


            let filteredFinal = final.filter((player: Data) => !outPlayers.some(outPlayer => outPlayer.name === player.name));
            filteredFinal = filteredFinal.filter((player: Data) => !inPlayers.some(outPlayer => outPlayer.name === player.name));
            let sortedFinal = filteredFinal.sort((a: any, b: any) => b.predicted_points - a.predicted_points);
            sortedFinal = sortedFinal.slice(0, 22);


            let intermediate = inPlayers.concat(sortedFinal.slice(0, 11 - inPlayers.length));

            const allSameNationality = intermediate.every(player => player.nationality === intermediate[0].nationality);
            
            if (allSameNationality) {
                intermediate.pop();
                intermediate.push(sortedFinal[11 - inPlayers.length]);
            }
            
            const countryPlayerCount = intermediate.filter(player => player.nationality === country).length;
            if (countryPlayerCount < 6 && country) {
                const toAdd=6-countryPlayerCount;
                const a = intermediate.filter(player => player.nationality !== country);
                const b = intermediate.filter(player => player.nationality === country);
                const c = sortedFinal.filter(player => player.nationality === country);
                const d=c.filter(player => !b.includes(player));
                intermediate=b.concat(d.slice(0,toAdd));
                intermediate=intermediate.concat(a.slice(0,11-toAdd-b.length));
            }
            final1=intermediate;
            totalPredPoints = final1.reduce((sum, player) => {
                const playerData = predData.find(p => p.name === player.name);
                return sum + (playerData ? parseFloat(playerData.predicted_points) : 0);
            }, 0);

            console.log(final1);
            setFinal2(final1)
            setTotalPredictedPoints(totalPredPoints);


            const data2 = await axios.post("http://localhost:5000/shap",{final1});
            playerResponse=data2.data.data;
            console.log(playerResponse);
            newExplanation={}
            if (playerResponse) {
                playerResponse.forEach(p => {
                    newExplanation[p[0]] = p[1];
                });
                console.log(newExplanation);
            }
          }
        }
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="font-medium text-2xl mb-2">Customize your team</h1>
      <p className="text-sm text-gray-400 mb-4">
        Select inputs to help AI customize your dream team
      </p>
      <hr />

      <div className="flex gap-4 mb-6 border-b mt-2">
        <button
          onClick={() => setSelectedOption("Beginner")}
          className={`px-4 py-2 pb-3 text-sm ${
            selectedOption === "Beginner"
              ? " text-red-600 font-medium border-b-2 border-b-red-500"
              : ""
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => setSelectedOption("Advanced")}
          className={`px-4 py-2 pb-3 text-sm ${
            selectedOption === "Advanced"
              ? " text-red-600 font-medium border-b-2 border-b-red-500"
              : ""
          }`}
        >
          Advanced
        </button>
      </div>

      <div className="p-1 mb-5">
        {selectedOption === "Beginner" ? (
          <BeginnerProps country={country} setCountry={setCountry} toggle={toggle} setToggle={setToggle}/>
        ) : (
          <AdvancedProps
            setPlayer={setPlayer}
            countLockIn={countLockIn}
            countLockOut={countLockOut}
            setCountLockIn={setCountLockIn}
            setCountLockOut={setCountLockOut}
          />
        )}
      </div>
    <div
      onClick={runModel}
      className={`w-full mb-5 bg-red-600 text-sm text-white py-3 px-4 rounded-md ${(!toggle && !country && selectedOption==="Beginner") ? ' cursor-not-allowed ' : 'hover:bg-red-700 cursor-pointer'} flex gap-2 justify-center items-center `}
    >
      <Image
        src="/Vector.png"
        alt="An example image"
        width={20}
        height={20}
      />
      <div className="mt-1">Generate Team</div>
    </div>
      {/* </div> */}
    </div>
  );
}