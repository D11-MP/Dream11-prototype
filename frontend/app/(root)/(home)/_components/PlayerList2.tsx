import React from 'react'
import players from './players';
import ind from '../assets/india.png';
import aus from '../assets/australia.png';
import Image from 'next/image';
import pic from "../../../../public/Player_Pic.png";

const PlayerList2 = () => {
    const team1 = players.slice(0, 10);
    const team2 = players.slice(11, 21);
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-md'>
        <div className='flex gap-3 m-3 justify-between items-center '> 
            <div className='flex items-center gap-2 '>
                <Image alt="Home Team Logo" height={35} width={35} src={ind} className='h-fit '/>
                <p className='text-sm text-gray-500 font-semibold '>{players[0].team.slice(0,3)}</p>
            </div>
            <div className='flex justify-center gap-2 grow ' >
                {team1.map((player) => (
                    <div className='flex flex-col gap-2 justify-center mx-auto text-xs items-center font-semibold ' key={player.name}>
                        <Image alt="" height={50} width={50} src={pic} />
                        {player.name.split(" ")[1]}
                    </div>
                ))}
            </div>
        </div>
        <div className='flex gap-3 m-3 justify-center items-center '> 
            <div className='flex items-center gap-2 '>
                <Image alt="Home Team Logo" height={35} width={35} src={aus} className='h-fit '/>
                <p className='text-sm text-gray-500 font-semibold '>{players[11].team.slice(0,3)}</p>
            </div>
            <div className='flex justify-center gap-2 grow ' >
                {team2.map((player) => (
                    <div className='flex flex-col gap-2 justify-center mx-auto text-xs items-center font-semibold ' key={player.name}>
                        <Image alt="" height={50} width={50} src={pic} />
                        {player.name.split(" ")[1]}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PlayerList2
