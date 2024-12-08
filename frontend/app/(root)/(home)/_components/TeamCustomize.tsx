"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdvancedProps from "./AdvancedProps";
import axios from "axios";
import BeginnerProps from "./BeginnerProps";
import {TeamCustomizeProps} from "@/types/index";

export let country: string | null = null;
export let setCountry: React.Dispatch<React.SetStateAction<string | null>> = () => {};


export default function Page({ setPlayer }: TeamCustomizeProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Beginner");
  const [countLockIn, setCountLockIn] = useState(1);
  const [countLockOut, setCountLockOut] = useState(1);
  [country, setCountry] = useState<string | null>(null);
  const [toggle, setToggle] = useState<boolean>(true);
  const [sliderValues, setSliderValues] = useState({
    slider1: 5,
    slider2: 5,
    slider3: 5,
    slider4: 3,
    slider5: 1,
    slider6: 2,
    slider7: 4,
});

  async function runModel() {
    if(toggle || country || selectedOption){
        const data = await axios.get("http://localhost:5000/predict");
        console.log(data);
        if (data.status === 200) {
          const res = await axios.get("http://localhost:3000/api/parse_csv");
          if (res.status === 200) {
            router.push(`/contest/123/dreamteam?selectedOption=${selectedOption}&slider1=${sliderValues.slider1}&slider2=${sliderValues.slider2}&country=${country}`);
            
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
            sliderValues={sliderValues}
            setSliderValues={setSliderValues}
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