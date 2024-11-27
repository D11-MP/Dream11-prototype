import { StaticImageData } from "next/image";
import { TopCarousel } from "./_components/topCarousel";
import { data, data2 } from "./data";
import filter from "./assets/filter.svg";
import down from "./assets/down.svg";
import Button from "./_components/button";
import { MatchCard } from "./_components/matchCard";
import Trivia from "./_components/Trivia";
import Leaderboard from "./_components/Leaderboard";
import NewsCard from "./_components/NewsCard";

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
    <div className="flex w-full">
      <div className="flex-col mx-8">
        <TopCarousel images={data2} />
        <div className="flex-col mt-6">
          <div className="matches-header flex justify-between items-center">
            <p className="text-lg font-semibold">Upcoming Matches</p>
            <div className="flex flex-row gap-2.5">
              <Button img={down} text="Sort By" />
              <Button img={filter} text="Filter" />
            </div>
          </div>
          <div>
            {data.map((match, index) => {
              return <MatchCard key={index} match={match}></MatchCard>;
            })}
          </div>
        </div>
      </div>
      <div className="flex-col space-y-4 grow shrink mx-2">
        <Trivia />
        <Leaderboard />
        <NewsCard />
      </div>
    </div>
  );
}
