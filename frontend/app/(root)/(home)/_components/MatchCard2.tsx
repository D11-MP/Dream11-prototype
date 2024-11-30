"use client";

import React, { useEffect, useState } from "react";
import { MatchCardProps } from "@/types";
import "../styles/matchCard.css";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";

export const MatchCard2: React.FC<MatchCardProps> = ({ match }) => {
  // const [hoursLeft, setHoursLeft] = useState<number>(0);
  // const [minLeft, setMinLeft] = useState<number>(0);
  // const [secLeft, setSecLeft] = useState<number>(0);

  // useEffect(() => {
  //   const calculateTimeLeft = () => {
  //     const now = new Date();
  //     const [targetHour, targetMinute, targetSecond] = match.time
  //       .split(":")
  //       .map(Number);
  //     const target = new Date();

  //     target.setHours(targetHour, targetMinute, targetSecond, 0);

  //     if (target < now) {
  //       target.setDate(target.getDate() + 1);
  //     }

  //     const difference = target.getTime() - now.getTime();
  //     const totalSeconds = Math.floor(difference / 1000);

  //     return {
  //       hours: Math.floor(totalSeconds / 3600),
  //       minutes: Math.floor((totalSeconds % 3600) / 60),
  //       seconds: totalSeconds % 60,
  //     };
  //   };

  //   const updateTimer = () => {
  //     const { hours, minutes, seconds } = calculateTimeLeft();
  //     setHoursLeft(hours);
  //     setMinLeft(minutes);
  //     setSecLeft(seconds);
  //   };

  //   updateTimer();

  //   const interval = setInterval(() => {
  //     setSecLeft((prevSec) => {
  //       if (prevSec === 0) {
  //         setMinLeft((prevMin) => {
  //           if (prevMin === 0) {
  //             setHoursLeft((prevHour) => (prevHour > 0 ? prevHour - 1 : 0));
  //             return 59;
  //           }
  //           return prevMin - 1;
  //         });
  //         return 59;
  //       }
  //       return prevSec - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [match.time]);

  const [daysLeft, setDaysLeft] = useState(0);

  const currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"

  useEffect(() => {
    const calculateDays = () => {
      const target = new Date(match.matchDate);
      target.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const difference = target.getTime() - today.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

      setDaysLeft(days);
    };

    calculateDays();
    // Update daily at midnight
    const timer = setInterval(calculateDays, 24 * 60 * 60 * 1000);

    return () => clearInterval(timer);
  }, [match.matchDate]);

  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Image alt="Home Team Logo" height={50} width={50} src={ind} />
            <p className="text-sm mt-2 text-gray-500">{match.teamA}</p>
          </div>
          <p className="font-medium mt-3">{match.teamA.slice(0, 3)}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className=" text-red-500 bg-red-50 px-3 py-1 rounded-md">
            {/* {hoursLeft !== 0 ? `${hoursLeft}h:` : ``}
              {minLeft}m:{secLeft}s */}
            {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days ago`}
          </div>
          <div className="text-gray-500">{match.matchDate}</div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <Image alt="Away Team Logo" height={50} width={50} src={aus} />
            <p className="text-sm mt-2 text-gray-500">{match.teamB}</p>
          </div>
          <p className="font-medium mt-3">{match.teamB.slice(0, 3)}</p>
        </div>
      </div>
    </div>
  );
};
