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

  export interface PollOptions{
    id:string,
    name:string,
    votes:number
  }

  export interface Poll {
    id:string,
    question:string,
    options:PollOptions[]
  }

  export interface Form { 
    name?:string,
    email?:string,
    password?:string
  }

  export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export interface FeedProps {
    alignment: 'left' | 'right'; 
    index: number;
    articles: Article[];
}

export interface ButtonProps {
    img : StaticImageData,
    text:string
}

export interface MatchCardProps {
    match: Match;
    // total_predicted_points: number;
  }

export interface TopCarouselProps {
images: StaticImageData[]; //is subject to change to string.
}

export interface DreamTeamMatchCardProps{
    match: Match;
    total_predicted_points: number;
}

export interface Data {
    player_id?: string | number ;
    name?: string;
    nationality?: string;
    role?: string;
    total_100s?: any;
    total_50s?: any;
    total_runs?: any;
    total_matches?: any;
    total_wickets?: any;
    avg_economy?: any;
    total_overs_bowled?: any;
    total_5_wicket_hauls?: any;
    total_50?: any;
    total_100?: any;
    avg_strike_rate?: any;
    avg_score?: any;
    total_maiden_overs?: any;
    boundary?: any;
    past_points?: any;
}

export interface PlayerStatsProps {
    player: Data | null;
    setSelectedPlayer: any;
    predicted_points?: number;
    newExplanation?: any;
}

export interface TeamCustomizeProps {
    setPlayer?: React.Dispatch<React.SetStateAction<Data | null>>;
    countLockIn?: number;
    countLockOut?: number;
    setCountLockIn?: React.Dispatch<React.SetStateAction<number>>;
    setCountLockOut?: React.Dispatch<React.SetStateAction<number>>;
    sliderValues?: any;
    setSliderValues?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface PlayerCardProps {
    player: Data;
    setPlayer?: React.Dispatch<React.SetStateAction<Data | null>>;
    countLockIn?: number;
    countLockOut?: number;
    setCountLockIn?: React.Dispatch<React.SetStateAction<number>>;
    setCountLockOut?: React.Dispatch<React.SetStateAction<number>>;
  }

export  interface ChatItem {
    prompt: string;
    response: string;
  }

export interface PlayerStats {
    t20: number;
    odi: number;
    test: number;
  }
  
export interface Player {
    player_id: string ;
    name: string;
    nationality: string;
    role: string;
    total_100s: PlayerStats;
    total_50s: PlayerStats;
    total_runs: PlayerStats;
    total_matches: PlayerStats;
    total_wickets: PlayerStats;
    avg_economy: PlayerStats;
    total_overs_bowled: PlayerStats;
    total_5_wicket_hauls: PlayerStats;
    total_maiden_overs: PlayerStats;
    total_50: PlayerStats;
    total_100: PlayerStats;
    avg_strike_rate: PlayerStats;
    avg_score: PlayerStats;
    boundary: PlayerStats;
    past_points: PlayerStats;
  }