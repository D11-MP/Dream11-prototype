import { StaticImageData } from "next/image";
import { TopCarousel } from "./_components/topCarousel";
import { data, data2 } from "./data";
import filter from "./assets/filter.svg";
import down from "./assets/down.svg";
import Button from "./_components/button";
import { MatchCard } from "./_components/matchCard";

export interface Match {
  date: string; //assuming the string is in the format - DD/MM/YYYY
  time: string; //assuming the string is in the format - HH:MM:SS
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: StaticImageData; //can be subject to change to string
  awayTeamLogo: StaticImageData; //can be subject to change to string
  homePlayer: string;
  awayPlayer: string;
  matchName: string;
  lineupsRelease: boolean;
}

export default function Home() {
  return (
    <div>
      <TopCarousel images={data2} />
      <div className="flex flex-col" style={{ margin: "40px 0px" }}>
        <div
          className="matches-header flex justify-between items-center"
          style={{ width: "50vw", margin: "10px 0px 0px 0px" }}
        >
          <p style={{ fontSize: "1.5rem" }}>Upcoming Matches</p>
          <div className="flex gap-4">
            <Button img={down} text="Sort By" />
            <Button img={filter} text="Filter" />
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          {data.map((match) => {
            return <MatchCard match={match}></MatchCard>;
          })}
        </div>
      </div>
    </div>
  );
}
