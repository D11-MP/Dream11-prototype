"use client"

import React, { useEffect, useState } from "react"
import { Match } from "../page"
import '../styles/matchCard.css'
import megaphone from '../assets/megaphone.svg'
import bell from '../assets/bell.svg'
import vs from '../assets/vs.png'
import star from '../assets/star.svg'

interface Props{
    match:Match
}

export const MatchCard:React.FC<Props> = ({match})=>{

  const [hoursLeft, setHoursLeft] = useState<number>(0)
  const [minLeft, setMinLeft] = useState<number>(0)
  const [secLeft, setSecLeft] = useState<number>(0)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const [targetHour, targetMinute, targetSecond] = match.time.split(":").map(Number)
      const target = new Date()

      target.setHours(targetHour, targetMinute, targetSecond, 0)

      if (target < now) {
        target.setDate(target.getDate()+1)
      }

      const difference = target.getTime()-now.getTime()
      const totalSeconds = Math.floor(difference/1000)

      return {
        hours: Math.floor(totalSeconds/3600),
        minutes: Math.floor((totalSeconds%3600)/60),
        seconds: totalSeconds%60,
      };
    };

    const updateTimer = () => {
      const { hours,minutes,seconds } = calculateTimeLeft()
      setHoursLeft(hours)
      setMinLeft(minutes)
      setSecLeft(seconds)
    }

    updateTimer()

    const interval = setInterval(() => {
      setSecLeft((prevSec) => {
        if (prevSec === 0) {
          setMinLeft((prevMin) => {
            if (prevMin === 0) {
              setHoursLeft((prevHour) => (prevHour>0?prevHour-1:0))
              return 59;
            }
            return prevMin-1
          });
          return 59;
        }
        return prevSec-1
      });
    }, 1000);

    return () => clearInterval(interval)
  }, [match.time]);

    return(
        <div style={{ borderRadius:'10px', paddingBottom:'10px',margin:'20px 0px',boxShadow:'0px 0px 4px rgb(0,0,0,0.5)'}}
        className="flex flex-col justify-between bg-white match-card">

            {/* top portion */}
            <div className="flex justify-between" style={{width:'100%'}}>
                <div style={{width:'50%',borderTopLeftRadius:'10px'}} className="matchName-box">{match.matchName}</div>
                <div style={{borderTopRightRadius:'10px',textAlign:'right'}} className="lineups-box">{match.lineupsRelease? 
                (<><img src={megaphone.src} alt=""/>Lineups Released</>)
                :''}</div>
            </div>

           {/* middle portion */}
            <div className="flex justify-between items-center" style={{width:`calc(100 - 40/window.innerWidth)vw`,margin:'10px 20px'}}>
                <div className="match-details flex justify-between items-center">
                    <div className="match-logo flex flex-col justify-between items-center"><img src={match.homeTeamLogo.src}/><p className="match-logo-name" style={{color:'gray'}}>{match.homeTeam}</p></div>
                    <div className="match-name" style={{marginTop:'-8px'}}>{(match.homeTeam).slice(0,3)}</div>
                    <div style={{marginTop:'-8px'}}><img src={vs.src}/></div>
                    <div className="match-name" style={{marginTop:'-8px'}}>{(match.awayTeam).slice(0,3)}</div>
                    <div className="match-logo flex flex-col justify-between items-center"><img src={match.awayTeamLogo.src}/><p className="match-logo-name" style={{color:'gray'}}>{match.awayTeam}</p></div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="timer-match-card" style={{fontWeight:'bold',padding:'5px',color:'red',backgroundColor:'#FFF6F7',borderRadius:'5px'}}>{hoursLeft!==0?`${hoursLeft}h:`:``}{minLeft}m:{secLeft}s</div>
                    <div className="time-match-card" style={{color:'gray'}}>{(match.time).slice(0,4)}</div>
                </div>

                <div>
                    <button className="bg-play_btn_clr play-btn w-[144px] h-[44px] flex items-center justify-center" 
                    style={{borderRadius:'5px' , color:'white'}}>Play</button>    
                </div>
            </div>

            <hr style={{color:'black', opacity:0.3,width:'100%'}}/>

            {/* bottom portion */}
            <div className="flex justify-between items-center" style={{width:`calc(100 - 40/window.innerWidth)vw`,margin:'0px 20px'}}>
                <div className="top-player-box flex items-center gap-4"><img src={star.src}/>{match.homePlayer} , {match.awayPlayer}</div>
                <div><img src={bell.src} alt=""/></div>
            </div>

        </div>
    )
}