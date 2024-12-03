"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdvancedProps from "./AdvancedProps";
import axios from "axios";
import { Data } from "../contest/[id]/dreamteam/page";

export interface TeamCustomizeProps {
  setPlayer?: React.Dispatch<React.SetStateAction<Data | null>>;
  countLockIn?: number;
  countLockOut?: number;
  setCountLockIn?: React.Dispatch<React.SetStateAction<number>>;
  setCountLockOut?: React.Dispatch<React.SetStateAction<number>>;
}

export default function Page({ setPlayer }: TeamCustomizeProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Beginner");
  const [countLockIn, setCountLockIn] = useState(1);
  const [countLockOut, setCountLockOut] = useState(1);
  const [country, setCountry] = useState("India");

  async function runModel() {
    const data = await axios.get("http://localhost:5000/predict");
    console.log(data);
    if (data.status === 200) {
      const res = await axios.get("http://localhost:3000/api/parse_csv");
      if (res.status === 200) {
        router.push("/root/contest/123/dreamteam");
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
          <div>
            <p className="mb-4">Predict winning time</p>
            <div className="flex gap-4 mb-6 p-2 rounded-md bg-gray-100">
              <button
                onClick={() => setCountry("India")}
                className={`px-6 py-2 mr-6 text-sm ${
                  country === "India"
                    ? "bg-white px-6 rounded-sm shadow-md"
                    : ""
                }`}
              >
                <div className="flex gap-2">
                  <Image
                    src="/india.png"
                    alt="An example image"
                    width={30}
                    height={30}
                  />
                  <div className="mt-1">India</div>
                </div>
              </button>
              <button
                onClick={() => setCountry("Australia")}
                className={`px-6 py-2 text-sm ${
                  country === "Australia"
                    ? " bg-white px-6 rounded-sm shadow-md"
                    : ""
                }`}
              >
                <div className="flex gap-2">
                  <Image
                    src="/aus.png"
                    alt="An example image"
                    width={30}
                    height={30}
                  />
                  <div className="mt-1">Australia</div>
                </div>
              </button>
            </div>
          </div>
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
        className="w-full mb-5 bg-red-600 text-sm text-white py-3 px-4 rounded-md hover:bg-red-700 flex gap-2 justify-center items-center cursor-pointer"
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
