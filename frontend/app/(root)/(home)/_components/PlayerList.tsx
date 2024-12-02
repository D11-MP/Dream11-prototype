import { Data } from "../contest/[id]/dreamteam/page";
import PlayerCard from "./PlayerCard";
// import players_t20 from "@/uploads/admin/players_t20";
// import players_odi from "@/uploads/admin/players_odi";
// import players_test from "@/uploads/admin/players_test";
import players from "./players";
import { TeamCustomizeProps } from "./TeamCustomize";

export default function Page({ setPlayer,setCountLockIn,setCountLockOut,countLockIn,countLockOut}: TeamCustomizeProps) {
  const team1 = players.slice(0, 10) as Data[];
  const team2 = players.slice(11, 21) as Data[];
  return (
    <div className="bg-white rounded-lg flex gap-1 justify-between w-full px-4">
      <div>
        {team1.map((player) => (
          <PlayerCard key={player.name} player={player}
          setPlayer={setPlayer}
          countLockIn={countLockIn}
          countLockOut={countLockOut}
          setCountLockIn={setCountLockIn}
          setCountLockOut={setCountLockOut} />
        ))}
      </div>
      <div>
        {team2.map((player) => (
          <PlayerCard key={player.name} player={player}
          setPlayer={setPlayer}
          countLockIn={countLockIn}
          countLockOut={countLockOut}
          setCountLockIn={setCountLockIn}
          setCountLockOut={setCountLockOut} />
        ))}
      </div>
    </div>
  );
}
