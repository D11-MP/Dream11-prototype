import { MatchCardProps } from "@/types";
import "../styles/matchCard.css";
import Image from "next/image";
import ind from "../assets/india.png";
import aus from "../assets/australia.png";

export const DreamTeamMatchCard:React.FC<MatchCardProps> = ({match,total_predicted_points})=> {

    return(
        <>
        <div className="flex flex-col">
        
        <div className="flex flex-col justify-between w-full bg-white rounded-lg shadow-md p-4 mb-3">
          <div className="flex justify-around items-center my-1">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col items-center">
                <Image alt="Home Team Logo" height={60} width={60} src={ind} />
                {/* <p className="text-sm mt-2 text-gray-500">{match.teamA}</p> */}
              </div>
              <p className="font-medium">{match.teamA.slice(0, 3).toUpperCase()}</p>
            </div>

            <div className="flex flex-col items-center justify-between">
                <p className="text-gray-500 text-xs">Fantasy Pts</p>
                <div className="text-red-500 text-2xl font-medium">{total_predicted_points.toFixed(2)}</div>
            </div>
    
            <div className="flex gap-2 items-center">
            <p className="font-medium">{match.teamB.slice(0, 3).toUpperCase()}</p>
              <div className="flex flex-col items-center">
                <Image alt="Away Team Logo" height={60} width={60} src={aus} />
                {/* <p className="text-sm mt-2 text-gray-500">{match.teamB}</p> */}
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}