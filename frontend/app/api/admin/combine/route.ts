import fs from "fs";
import players_t20 from "@/uploads/admin/players_t20";
import players_odi from "@/uploads/admin/players_odi";
import players_test from "@/uploads/admin/players_test";
import { NextRequest, NextResponse } from "next/server";

// Define the interface for a player
interface PlayerStats {
  t20: number;
  odi: number;
  test: number;
}

interface Player {
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

export function GET(req: NextRequest) {
  
  // Merge player statistics from T20, ODI, and Test formats
  function mergePlayerStats(
    t20Data,
    odiData,
    testData
  ): Player[] {
    const playersData: Player[] = [];

    // Combine all player data into a single array
    [...t20Data, ...odiData, ...testData].forEach((player) => {
      const playerId = player.player_id;

      // Find existing player in the array
      let existingPlayer = playersData.find(
        (p: Player) => p.player_id === playerId
      );

      if (!existingPlayer) {
        // Initialize player if not found in the array
        existingPlayer = {
          player_id: player.player_id,
          name: player.name,
          nationality: player.nationality,
          role: player.role,
          total_100s: { t20: 0, odi: 0, test: 0 },
          total_50s: { t20: 0, odi: 0, test: 0 },
          total_runs: { t20: 0, odi: 0, test: 0 },
          total_matches: { t20: 0, odi: 0, test: 0 },
          total_wickets: { t20: 0, odi: 0, test: 0 },
          avg_economy: { t20: 0, odi: 0, test: 0 },
          total_overs_bowled: { t20: 0, odi: 0, test: 0 },
          total_5_wicket_hauls: { t20: 0, odi: 0, test: 0 },
          total_maiden_overs: { t20: 0, odi: 0, test: 0 },
          total_50: { t20: 0, odi: 0, test: 0 },
          total_100: { t20: 0, odi: 0, test: 0 },
          avg_strike_rate: { t20: 0, odi: 0, test: 0 },
          avg_score: { t20: 0, odi: 0, test: 0 },
          boundary: { t20: 0, odi: 0, test: 0 },
          past_points: { t20: 0, odi: 0, test: 0 },

        };
        playersData.push(existingPlayer);
      }

      if (t20Data.includes(player)) {
        existingPlayer.total_100s.t20 = player.total_100s;
        existingPlayer.total_50s.t20 = player.total_50s;
        existingPlayer.total_runs.t20 = player.total_runs;
        existingPlayer.total_matches.t20 = player.total_matches;
        existingPlayer.total_wickets.t20 = player.total_wickets;
        existingPlayer.avg_economy.t20 = player.avg_economy;
        existingPlayer.total_overs_bowled.t20 = player.total_overs_bowled;
        existingPlayer.total_5_wicket_hauls.t20 = player.total_5_wicket_hauls;
        existingPlayer.total_maiden_overs.t20 = player.total_maiden_overs;
        existingPlayer.total_50.t20 = player.total_50;
        existingPlayer.total_100.t20 = player.total_100;
        existingPlayer.avg_strike_rate.t20 = player.avg_strike_rate;
        existingPlayer.avg_score.t20 = player.avg_score;
        existingPlayer.boundary.t20 = player.boundary;
        existingPlayer.past_points.t20 = player.past_points;
      } else if (odiData.includes(player)) {
        existingPlayer.total_100s.odi = player.total_100s;
        existingPlayer.total_50s.odi = player.total_50s;
        existingPlayer.total_runs.odi = player.total_runs;
        existingPlayer.total_matches.odi = player.total_matches;
        existingPlayer.total_wickets.odi = player.total_wickets;
        existingPlayer.avg_economy.odi = player.avg_economy;
        existingPlayer.total_overs_bowled.odi = player.total_overs_bowled;
        existingPlayer.total_5_wicket_hauls.odi = player.total_5_wicket_hauls;
        existingPlayer.total_maiden_overs.odi = player.total_maiden_overs;
        existingPlayer.total_50.odi = player.total_50;
        existingPlayer.total_100.odi = player.total_100;
        existingPlayer.avg_strike_rate.odi = player.avg_strike_rate;
        existingPlayer.avg_score.odi = player.avg_score;
        existingPlayer.boundary.odi = player.boundary;
        existingPlayer.past_points.odi = player.past_points;
      } else if (testData.includes(player)) {
        existingPlayer.total_100s.test = player.total_100s;
        existingPlayer.total_50s.test = player.total_50s;
        existingPlayer.total_runs.test = player.total_runs;
        existingPlayer.total_matches.test = player.total_matches;
        existingPlayer.total_wickets.test = player.total_wickets;
        existingPlayer.avg_economy.test = player.avg_economy;
        existingPlayer.total_overs_bowled.test = player.total_overs_bowled;
        existingPlayer.total_5_wicket_hauls.test = player.total_5_wicket_hauls;
        existingPlayer.total_maiden_overs.test = player.total_maiden_overs;
        existingPlayer.total_50.test = player.total_50;
        existingPlayer.total_100.test = player.total_100;
        existingPlayer.avg_strike_rate.test = player.avg_strike_rate;
        existingPlayer.avg_score.test = player.avg_score;
        existingPlayer.boundary.test = player.boundary;
        existingPlayer.past_points.test = player.past_points;
      }
    });

    return playersData;
  }

  function saveMergedData(mergedData: Player[], fileName: string) {
    // Convert the playersData array to a format without quotes around the keys
    const jsData = `const players = ${convertToJSObject(mergedData)};\n\nexport default players;`;
  
    fs.writeFile(fileName, jsData, "utf8", (err) => {
      if (err) {
        console.error("Error writing players.js:", err);
      } else {
        console.log("players.js has been updated!");
      }
    });
  }
  
  // Helper function to convert data to a JS object without quotes around keys
  function convertToJSObject(data: any): string {
    if (Array.isArray(data)) {
      return `[${data.map(item => `{${Object.entries(item).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", ")}}`).join(", ")}]`;
    } else if (typeof data === 'object' && data !== null) {
      return `{${Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", ")}}`;
    }
    return JSON.stringify(data);
  }

  // Load the data from the JavaScript files
  const odiData = players_odi;
  const testData = players_test;
  const t20Data = players_t20;

  // Merge player statistics
  const mergedData = mergePlayerStats(t20Data, odiData, testData);

  // Save the merged data to a new file
  saveMergedData(mergedData, "./app/(root)/(home)/_components/players.js");

  return NextResponse.json({ status: "success" });
}
