import { Data } from "../contest/[id]/dreamteam/page";
import PlayerCard from "./PlayerCard";
import players from "./players";
import { TeamCustomizeProps } from "./TeamCustomize";

export default function Page({ setPlayer }: TeamCustomizeProps) {
  const team1 = players.slice(0, 10) as Data[];
  const team2 = players.slice(11, 21) as Data[];
  return (
    <div className="bg-white rounded-lg flex gap-1 justify-between w-full px-4">
      <div>
        {team1.map((player) => (
          <PlayerCard key={player.name} player={player} setPlayer={setPlayer} />
        ))}
      </div>
      <div>
        {team2.map((player) => (
          <PlayerCard key={player.name} player={player} setPlayer={setPlayer} />
        ))}
      </div>
    </div>
  );
}
