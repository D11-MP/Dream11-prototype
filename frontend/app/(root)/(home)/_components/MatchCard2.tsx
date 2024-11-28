"use client";

import React, { useEffect, useState } from "react";
import { Match } from "@/types";
import "../styles/matchCard.css";
import Image from "next/image";

interface Props {
  match: Match;
}

export const MatchCard2: React.FC<Props> = ({ match }) => {
  const [hoursLeft, setHoursLeft] = useState<number>(0);
  const [minLeft, setMinLeft] = useState<number>(0);
  const [secLeft, setSecLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [targetHour, targetMinute, targetSecond] = match.time
        .split(":")
        .map(Number);
      const target = new Date();

      target.setHours(targetHour, targetMinute, targetSecond, 0);

      if (target < now) {
        target.setDate(target.getDate() + 1);
      }

      const difference = target.getTime() - now.getTime();
      const totalSeconds = Math.floor(difference / 1000);

      return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
    };

    const updateTimer = () => {
      const { hours, minutes, seconds } = calculateTimeLeft();
      setHoursLeft(hours);
      setMinLeft(minutes);
      setSecLeft(seconds);
    };

    updateTimer();

    const interval = setInterval(() => {
      setSecLeft((prevSec) => {
        if (prevSec === 0) {
          setMinLeft((prevMin) => {
            if (prevMin === 0) {
              setHoursLeft((prevHour) => (prevHour > 0 ? prevHour - 1 : 0));
              return 59;
            }
            return prevMin - 1;
          });
          return 59;
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [match.time]);

  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Image
              alt="Home Team Logo"
              height={50}
              width={50}
              src={match.homeTeamLogo.src}
            />
            <p className="text-sm mt-2 text-gray-500">{match.homeTeam}</p>
          </div>
          <p className="font-medium mt-3">{match.homeTeam.slice(0, 3)}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className=" text-red-500 bg-red-50 px-3 py-1 rounded-md">
            {hoursLeft !== 0 ? `${hoursLeft}h:` : ``}
            {minLeft}m:{secLeft}s
          </div>
          <div className="text-gray-500">{match.time}</div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Image
              alt="Away Team Logo"
              height={50}
              width={50}
              src={match.awayTeamLogo.src}
            />
            <p className="text-sm mt-2 text-gray-500">{match.awayTeam}</p>
          </div>
          <p className="font-medium mt-3">{match.awayTeam.slice(0, 3)}</p>
        </div>
      </div>
    </div>
  );
};
