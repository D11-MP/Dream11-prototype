import React from "react";
import pic from "../../../../public/Player_Pic.png";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";
import bat from "../../../../public/bat.png";
import ball from "../../../../public/ball.png";
import { Data } from "../contest/[id]/dreamteam/page";

type PlayerCardProps = {
  player: Data;
  setPlayer?: React.Dispatch<React.SetStateAction<Data | null>>;
};

export default function PlayerCard({ player, setPlayer}: PlayerCardProps) {
    const [clicked1, setClicked1] = React.useState<boolean>(true);
    const handleClick = () =>{

        setClicked1(!clicked1);

        if(setPlayer){
            setPlayer(clicked1 ? player : null);
        }
    }
  return (
    <div className="flex items-center justify-center mx-2 my-2 cursor-pointer" onClick={() => handleClick()}>
      <Image
        alt=""
        height={80}
        width={80}
        src={pic}
      />

      <div className="flex flex-col items-start text-left w-full">
        <div className="font-medium">{player.name}</div>
        <div className="flex items-center gap-5 px-2">
          {player.nationality === "India" ? (
            <Image src={bat} height={20} width={20} alt="" />
          ) : (
            <Image src={ball} height={20} width={20} alt="" />
          )}
          {player.role === "Batsman" ? (
            <Image src={ind} height={20} width={20} alt="" />
          ) : (
            <Image src={aus} height={20} width={20} alt="" />
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-1 flex items-center justify-center bg-plusButton text-black rounded-md hover:bg-green-300">
          +
        </button>
        <button className="px-4 py-1 flex items-center justify-center bg-minusButton text-black rounded-md hover:bg-red-300">
          -
        </button>
      </div>
    </div>
  );
}
