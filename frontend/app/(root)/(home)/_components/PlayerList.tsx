import { Data } from "@/types/index";
import PlayerCard from "./PlayerCard";
import players from "@/uploads/final/players";
import { TeamCustomizeProps } from "@/types/index";

export default function Page({
  setPlayer,
  setCountLockIn,
  setCountLockOut,
  countLockIn,
  countLockOut,
}: TeamCustomizeProps) {
  const team1 = players.slice(0, 10) as Data[];
  const team2 = players.slice(11, 21) as Data[];
  return (
    <div className="bg-white rounded-lg flex gap-1 justify-between w-full px-4 pt-6">
      <div>
        <div className="text-gray-400 text-lg ml-4">Player</div>
        {team1.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            setPlayer={setPlayer}
            countLockIn={countLockIn}
            countLockOut={countLockOut}
            setCountLockIn={setCountLockIn}
            setCountLockOut={setCountLockOut}
          />
        ))}
      </div>
      <div>
        <div className="text-gray-400 text-lg ml-4">Player</div>
        {team2.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            setPlayer={setPlayer}
            countLockIn={countLockIn}
            countLockOut={countLockOut}
            setCountLockIn={setCountLockIn}
            setCountLockOut={setCountLockOut}
          />
        ))}
      </div>
    </div>
  );
}
