"use client";

import { Poll, PollOptions } from "@/types";
import { useEffect, useState } from "react";

export default function Trivia() {
  const [poll, setPoll] = useState<Poll>({
    id: "snajdn",
    question: "Who will score a century?",
    options: [
      { id: "virat", name: "Virat Kohli", votes: 30 },
      { id: "steven", name: "Steven Smith", votes: 20 },
    ],
  });

  const [selectedOption, setSelectedOption] = useState<PollOptions>();
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const savedVote = selectedOption;
    if (savedVote) {
      setSelectedOption(savedVote);
      setHasVoted(true);
    }
  }, [selectedOption]);

  const totalVotes = poll.options.reduce((acc, cur) => acc + cur.votes, 0);
  const pollOptions = poll.options.map((option) => ({
    ...option,
    percentage: parseFloat(((option.votes / totalVotes) * 100).toFixed(2)),
  }));

  const handleVote = (id:any) => {
    if (hasVoted) return;

    setPoll((prevPoll) => ({
      ...prevPoll,
      options: prevPoll.options.map((option) =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      ),
    }));
    setSelectedOption(id);
    setHasVoted(true);
    localStorage.setItem("selectedOption", id);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-w-sm">
      <p className="text-gray-400 text-sm pb-1">Daily Trivia</p>
      <form>
        <p className="text-lg font-medium">{poll.question}</p>
        <div className="mt-4">
          {pollOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 mb-3">
              <input
                type="radio"
                id={option.id}
                value={option.id}
                name="player"
                className="w-4 h-4"
                onChange={() => handleVote(option.id)}
                disabled={hasVoted}
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <label
                    htmlFor={option.id}
                    className="block text-gray-800 font-medium mb-1"
                  >
                    {option.name}
                  </label>
                  <span className="text-gray-500 text-xs mt-2">
                    {option.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: `${option.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
