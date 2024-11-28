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