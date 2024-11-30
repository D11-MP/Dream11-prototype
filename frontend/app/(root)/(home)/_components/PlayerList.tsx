import PlayerCard from "./PlayerCard";
import players from "./players";

export default function PlayerList() {
  const team1 = players.slice(0, 10);
  const team2 = players.slice(11, 21);
  return (
    <div className="bg-white rounded-lg flex gap-3 justify-between w-full">
      <div>
        {team1.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
      <div>
        {team2.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
    </div>
  );
}
