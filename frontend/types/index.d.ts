export interface Match {
    date: string; //assuming the string is in the format - DD/MM/YYYY
    time: string; //assuming the string is in the format - HH:MM:SS
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: StaticImageData; //can be subject to change to string
    awayTeamLogo: StaticImageData; //can be subject to change to string
    homePlayer: string;
    awayPlayer: string;
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