import Leaderboard from "./(home)/_components/Leaderboard";
import Trivia from "./(home)/_components/Trivia";

export default function Home() {
  return (
    <div className="w-1/4 bg-gray-100 right-0 absolute p-4">
      <Trivia />
      <Leaderboard />
    </div>
  );
}
