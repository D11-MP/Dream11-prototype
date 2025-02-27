"use client";
import { TopCarousel } from "./_components/topCarousel";
import { data2 } from "./data";
import data from "@/uploads/output.json";
import filter from "./assets/filter.svg";
import down from "./assets/down.svg";
import Button from "./_components/button";
import { MatchCard } from "./_components/matchCard";
import Trivia from "./_components/Trivia";
import Leaderboard from "./_components/Leaderboard";
import NewsCard from "./_components/NewsCard";
import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NewsCardPlaceholder from "../_components/NewsCardPlaceholder";

export default function Home() {
    const [matches, setMatches] = useState(data);
    const session = useSession();
    const router = useRouter();
    return (
        <div className="w-screen min-h-screen bg-page_bg_color">

            <div className="flex mx-auto w-fit py-3 ">
                <div className="flex-col mx-8 h-[964px]" onClick={() => {
                    // console.log(session)
                    if (session.status !== 'authenticated') router.replace('/login');
                }}>
                    <TopCarousel images={data2} />
                    <div className="flex-col mt-6">
                        <div className="matches-header flex justify-between items-center">
                            <p className="text-xl font-semibold">Upcoming Matches</p>
                            <div className="flex flex-row gap-2.5">

                                <input
                                    type="text"
                                    placeholder="Search Matches"
                                    className="border rounded-lg px-2 py-1 outline-none"
                                    onChange={(e) => {
                                        const searchTerm = e.target.value.toLowerCase();
                                        const filteredMatches = data.filter((match) =>
                                            match.matchName.toLowerCase().includes(searchTerm)
                                        );
                                        setMatches(filteredMatches);
                                    }}
                                />
                                <Button img={down} text="Sort By" />
                                <Button img={filter} text="Filter" />
                            </div>
                        </div>
                        <div>
                            {matches.map((match, index) => {
                                return <MatchCard key={index} match={match}></MatchCard>;
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex-col space-y-4 w-[365px]">
                    <Trivia />
                    <Leaderboard />
                    <NewsCard />
                </div>
            </div>
        </div>
    );
}
