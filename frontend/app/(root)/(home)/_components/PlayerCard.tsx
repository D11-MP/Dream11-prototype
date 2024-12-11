import React from "react";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";
import bat from "@/public/Bat.png";
import ball from "@/public/Ball.png";
import { Data } from "@/types/index";
import {PlayerCardProps} from "@/types/index";


export const inPlayers: Data[] = [];
export const outPlayers: Data[] = [];

export default function PlayerCard({
  player,
  setPlayer,
  setCountLockIn,
  setCountLockOut,
  countLockIn,
  countLockOut,
}: PlayerCardProps) {
  const [clicked1, setClicked1] = React.useState<boolean>(true);
  const [clickIn, setClickIn] = React.useState<boolean>(false);
  const [clickOut, setClickOut] = React.useState<boolean>(false);
  
  const handleClick = () => {
    setClicked1(!clicked1);
    if (setPlayer) {
      setPlayer(clicked1 ? player : null);
    }
  };

  function handleLockIn() {
    if (setCountLockIn && countLockIn) {
      if (countLockIn <= 3) {
        setCountLockIn(countLockIn + 1);
        inPlayers.push(player);
        console.log(player.name, "added to inPlayers");
      }
    }
  }

  function handleLockOut() {
    if (setCountLockOut && countLockOut) {
      if (countLockOut <= 3) {
        setCountLockOut(countLockOut + 1);
        outPlayers.push(player);
        console.log(player.name, "added to outPlayers");
      }
    }
  }

  function handleClick1() {
    setClickIn(!clickIn);
    handleLockIn();
  }

  function handleClick2() {
    setClickOut(!clickOut);
    handleLockOut();
  }

  return (
    <>
      <div className="flex gap-1 items-center justify-center mx-2 my-2 cursor-pointer group relative">
        {/* Entire card is the hover area */}
        <div className="flex items-center justify-center">
          <Image alt="" height={80} width={80} src={"/profile.png"} className="rounded-full object-cover" />
        </div>

        <div className="absolute z-10 invisible group-hover:visible inline-block px-2 py-1 text-xs font-medium text-black bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-[-35px] left-1/2 transform -translate-x-1/2">
          View Stats
        </div>

      <div className="flex flex-col items-start text-left w-full" onClick={() => handleClick()}>
        <div className="font-medium">{player.name}</div>
        <div className="flex items-center gap-5 px-2">
          {player.role === "Batsman" ? (
            <Image src={bat} height={20} width={20} alt="" />
          ) : (
            <Image src={ball} height={20} width={20} alt="" />
          )}
          {player.nationality === "India" ? (
            <Image src={ind} height={20} width={20} alt="" />
          ) : (
            <Image src={aus} height={20} width={20} alt="" className="rounded-full" />
          )}
        </div>
      </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {!clickIn ? (
            <button
              className="px-4 py-1 flex items-center justify-center bg-plusButton text-black rounded-md hover:bg-green-300"
              onClick={handleClick1}
              disabled={clickOut || countLockIn === 4}
            >
              +
            </button>
          ) : (
            <button
              className="px-4 py-1 flex items-center justify-center bg-red-600 text-black rounded-md"
              onClick={() => {
                setClickIn(false);
                const index = inPlayers.findIndex(
                  (p) => p.name === player.name
                );
                if (index !== -1) {
                  inPlayers.splice(index, 1);
                  if (setCountLockIn && countLockIn) {
                    setCountLockIn(countLockIn - 1);
                  }
                  console.log(player.name, "removed from inPlayers");
                }
              }}
            >
              x
            </button>
          )}
          {!clickOut ? (
            <button
              className="px-4 py-1 flex items-center justify-center bg-minusButton text-black rounded-md hover:bg-red-300"
              onClick={handleClick2}
              disabled={clickIn || countLockOut === 4}
            >
              -
            </button>)
            :
            <button
            className={`px-4 py-1 flex items-center justify-center bg-[rgb(220,38,38)] text-black rounded-md`} onClick={() => {
                setClickOut(false);
                const index = outPlayers.findIndex(
                  (p) => p.name === player.name
                );
                if (index !== -1) {
                  outPlayers.splice(index, 1);
                  if (setCountLockOut && countLockOut) {
                    setCountLockOut(countLockOut - 1);
                  }
                  console.log(player.name, "removed from outPlayers");
                }
              }}
            >
              x
            </button>
          }
        </div>
      </div>
    </>
  );
}
