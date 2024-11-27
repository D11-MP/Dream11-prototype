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

export default function Home() {
  return (
    <div className="flex w-full">
      <div className="flex-col mx-8">
        <TopCarousel images={data2} />
        <div className="flex-col mt-6">
          <div className="matches-header flex justify-between items-center">
            <p className="text-lg">Upcoming Matches</p>
            <div className="flex gap-4">
              <Button img={down} text="Sort By" />
              <Button img={filter} text="Filter" />
            </div>
          </div>
          <div>
            {data.map((match) => {
              return <MatchCard key={match.time} match={match}></MatchCard>;
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
