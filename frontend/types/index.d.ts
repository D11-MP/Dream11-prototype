import { StaticImageData } from "next/image";

export interface Match {
  matchDate: string; //assuming the string is in the format - DD/MM/YYYY
  // time: string; //assuming the string is in the format - HH:MM:SS
  teamA: string;
  teamB: string;
  // homeTeamLogo: StaticImageData; //can be subject to change to string
  // awayTeamLogo: StaticImageData; //can be subject to change to string
  playerA: string[];
  playerB: string[];
  matchName: string;
  lineupsRelease: boolean;
}

export interface PollOptions {
  id: string;
  name: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOptions[];
}

export interface Form {
  name?: string;
  email?: string;
  password?: string;
}

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export interface FeedProps {
  alignment: "left" | "right";
  index: number;
  articles: Article[];
}

export interface ButtonProps {
  img: StaticImageData;
  text: string;
}

export interface MatchCardProps {
  match: Match;
  total_predicted_points: number;
}

export interface MatchCardProps2 {
  match: Match;
}

export interface TopCarouselProps {
  images: StaticImageData[]; //is subject to change to string.
}
