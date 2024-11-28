"use client";

import React, { use } from "react";
import TeamCustomize from "../../_components/TeamCustomize";
import { MatchCard2 } from "../../_components/MatchCard2";
import data from "@/uploads/output.json";

type Params = {
  id: string;
};

export default function Page({ params }: { params: Promise<Params> }) {
  const matches = data;
  const id = use(params);

  if (!id) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-medium text-center pt-8 pb-2">
        Let{"'"}s Craft Your Perfect{" "}
        <span className="text-authButton">Dream</span> Squad!
      </h1>
      <p className="text-gray-400">
        Our AI analyzes player stats and match data to quickly craft your
        perfect Dream11 team for you.
      </p>
      <div className="mt-8 w-full">
        <MatchCard2 match={matches[0]} />
      </div>
      <div className="mt-4 w-full">
        <TeamCustomize />
      </div>
    </div>
  );
}
