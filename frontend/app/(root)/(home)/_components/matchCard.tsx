"use client";

import React, { useEffect, useState } from "react";
import "../styles/matchCard.css";
import megaphone from "../assets/megaphone.svg";
import bell from "../assets/bell.svg";
import vs from "../assets/vs.png";
import star from "../assets/star.svg";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";
import Link from "next/link";
import { MatchCardProps } from "@/types";

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
        const [day, month, year] = match.matchDate.split("-");
        const target = new Date(`${year}-${month}-${day}`);
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
    <div
      style={{
        borderRadius: "10px",
        paddingBottom: "10px",
        margin: "20px 0px",
        boxShadow: "0px 0px 4px rgb(0,0,0,0.5)",
      }}
      className="flex flex-col justify-between bg-white match-card"
    >
      {/* top portion */}
      <div className="flex justify-between" style={{ width: "100%" }}>
        <div
          style={{ width: "50%", borderTopLeftRadius: "10px" }}
          className="matchName-box"
        >
          {match.matchName}
        </div>
        <div
          style={{ borderTopRightRadius: "10px", textAlign: "right" }}
          className="lineups-box"
        >
          {match.lineupsRelease ? (
            <>
              <Image width={27} height={27} src={megaphone.src} alt="" />
              Lineups Released
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* middle portion */}
      <div
        className="flex justify-between items-center"
        style={{
          width: `calc(100 - 40/window.innerWidth)vw`,
          margin: "10px 20px",
        }}
      >
        <div className="match-details flex justify-between items-center">
          <div className="match-logo flex flex-col justify-between items-center">
            <Image alt="" height={50} width={50} src={ind} />
            <p className="match-logo-name" style={{ color: "gray" }}>
              {match.teamA}
            </p>
          </div>
          <div className="match-name" style={{ marginTop: "-8px" }}>
            {match.teamA.slice(0, 3).toUpperCase()}
          </div>
          <div style={{ marginTop: "-8px" }}>
            <Image width={20} height={20} alt="" src={vs.src} />
          </div>
          <div className="match-name" style={{ marginTop: "-8px" }}>
            {match.teamB.slice(0, 3).toUpperCase()}
          </div>
          <div className="match-logo flex flex-col justify-between items-center">
            <Image alt="" height={50} width={50} src={aus} className="rounded-full" />
            <p className="match-logo-name" style={{ color: "gray" }}>
              {match.teamB}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div
            className="timer-match-card"
            style={{
              fontWeight: "bold",
              padding: "5px",
              color: "red",
              backgroundColor: "#FFF6F7",
              borderRadius: "5px",
            }}
          >
            {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days ago`}
          </div>
          <div className="time-match-card" style={{ color: "gray" }}>
            {match.matchDate}
          </div>
        </div>

        <div>
          <Link
            href={`/contest/123`}
            className="bg-play_btn_clr play-btn w-[144px] h-[44px] flex items-center justify-center"
            style={{ borderRadius: "5px", color: "white" }}
          >
            Play
          </Link>
        </div>
      </div>

      <hr style={{ color: "black", opacity: 0.3, width: "100%" }} />

      {/* bottom portion */}
      <div
        className="flex justify-between items-center"
        style={{
          width: `calc(100 - 40/window.innerWidth)vw`,
          margin: "0px 20px",
        }}
      >
        <div className="top-player-box flex items-center gap-4">
          <Image alt="" height={20} width={20} src={star.src} />
          {match.playerA[0]} , {match.playerB[0]}
        </div>
        <div>
          <Image height={25} width={25} src={bell.src} alt="" />
        </div>
      </div>
    </div>
  );
};
