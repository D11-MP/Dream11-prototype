import React from 'react'
import ind from '../assets/india.png';
import aus from '../assets/australia.png';
import Image from 'next/image';
import pic from "../../../../public/Player_Pic.png";
import data from "@/uploads/output.json";
const PlayerList2 = () => {
    const team1 = data[0].playerA;
    const team2 = data[0].playerB;
    console.log(data);
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-md py-5 w-full'>
        <div className='flex gap-3 m-3 justify-between items-center '> 
            <div className='flex items-center gap-2 '>
                <Image alt="Home Team Logo" height={35} width={35} src={ind} className='h-fit '/>
                <p className='text-sm text-gray-500 font-semibold '>{data[0].teamA.slice(0,3).toUpperCase()}</p>
            </div>
            <div className='flex justify-between gap-2 grow '>
                {team1.map((player) => (
                
                    <div className='flex flex-col gap-2 justify-center mx-auto text-xs items-center font-semibold w-10 text-start ' key={player}>
                        <Image alt="" height={50} width={50} src={pic} />
                        {player.split(" ").pop()?.slice(0,6)}
                    </div>
                 ))}
            </div>
        </div>
        <hr className='w-11/12 mx-auto bg-gray '/>
        <div className='flex gap-3 m-3 justify-center items-center '> 
            <div className='flex items-center gap-2 '>
                <Image alt="Home Team Logo" height={35} width={35} src={aus} className='h-fit '/>
                <p className='text-sm text-gray-500 font-semibold '>{data[0].teamB.slice(0,3).toUpperCase()}</p>
            </div>
            <div className='flex justify-center gap-2 grow ' >
                {team2.map((player) => (
                    <div className='flex flex-col gap-2 justify-center mx-auto text-xs items-center font-semibold w-10 text-start' key={player}>
                        <Image alt="" height={50} width={50} src={pic} />
                        {player.split(" ").pop()?.slice(0,6)}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PlayerList2
