import fs from "fs"
import players from "@/uploads/admin/players"
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    
    fs.readFile('./uploads/players_t20_data.json', 'utf8', (err, overallData) => {
      if (err) {
        console.error('Error reading players_overall_data.json:', err);
        return;
      }
  
      const overallPlayersData = JSON.parse(overallData); // Parse the JSON data
      overallPlayersData.forEach((player: any) => {
        delete player['Unnamed: 0']; // Delete the unwanted field
      });
    
  
      // Step 2: Merge data from players_overall_data.json into players.js
      const mergedPlayers = players.map((player:any) => {
        // Find the corresponding player in players_overall_data.json by name
        const overallPlayer = overallPlayersData.find((p:any) => p.name === player.name);
  
        if (overallPlayer) {
          // Merge fields: Add all fields from players_overall_data.json to the player object
          return {
            ...overallPlayer, // All fields from players_overall_data.json
            nationality: player.nationality, // Keep nationality from players.js
            role: player.role // Keep role from players.js
          };
        } else {
          // If no match found, keep the original player with default role and nationality
          return player;
        }
      });
  
      // Step 3: Generate new content for players.js
      let playersJsContent = 'const players = [\n';
      
      mergedPlayers.forEach((player:any) => {
        // Build player data string, preserving formatting
        const playerString = JSON.stringify(player, null, 2)
          .replace(/"([^"]+)":/g, '$1:')  // Remove quotes around object keys
          .replace(/\\"/g, '"'); // Handle escaped quotes
  
        playersJsContent += `  ${playerString},\n`;
      });
  
      // Remove the last comma and newline
      playersJsContent = playersJsContent.slice(0, -2) + '\n';
  
      playersJsContent += '];\n\nexport default players;';
  
      // Step 4: Write the updated content back to players.js
      try {
        fs.writeFileSync('./uploads/admin/players_t20.js', playersJsContent, 'utf8');
        console.log('players.js has been updated!');
      } catch (err) {
        console.error('Error writing players.js:', err);
      }
    });



    fs.readFile('./uploads/players_odi_data.json', 'utf8', (err, overallData) => {
      if (err) {
        console.error('Error reading players_overall_data.json:', err);
        return;
      }
  
      const overallPlayersData = JSON.parse(overallData); // Parse the JSON data
      overallPlayersData.forEach((player: any) => {
        delete player['Unnamed: 0']; // Delete the unwanted field
      });
    
  
      // Step 2: Merge data from players_overall_data.json into players.js
      const mergedPlayers = players.map((player:any) => {
        // Find the corresponding player in players_overall_data.json by name
        const overallPlayer = overallPlayersData.find((p:any) => p.name === player.name);
  
        if (overallPlayer) {
          // Merge fields: Add all fields from players_overall_data.json to the player object
          return {
            ...overallPlayer, // All fields from players_overall_data.json
            nationality: player.nationality, // Keep nationality from players.js
            role: player.role // Keep role from players.js
          };
        } else {
          // If no match found, keep the original player with default role and nationality
          return player;
        }
      });
  
      // Step 3: Generate new content for players.js
      let playersJsContent = 'const players = [\n';
      
      mergedPlayers.forEach((player:any) => {
        // Build player data string, preserving formatting
        const playerString = JSON.stringify(player, null, 2)
          .replace(/"([^"]+)":/g, '$1:')  // Remove quotes around object keys
          .replace(/\\"/g, '"'); // Handle escaped quotes
  
        playersJsContent += `  ${playerString},\n`;
      });
  
      // Remove the last comma and newline
      playersJsContent = playersJsContent.slice(0, -2) + '\n';
  
      playersJsContent += '];\n\nexport default players;';
  
      // Step 4: Write the updated content back to players.js
      try {
        fs.writeFileSync('./uploads/admin/players_odi.js', playersJsContent, 'utf8');
        console.log('players.js has been updated!');
      } catch (err) {
        console.error('Error writing players.js:', err);
      }
    });








    fs.readFile('./uploads/players_test_data.json', 'utf8', (err, overallData) => {
      if (err) {
        console.error('Error reading players_overall_data.json:', err);
        return;
      }
  
      const overallPlayersData = JSON.parse(overallData); // Parse the JSON data
      overallPlayersData.forEach((player: any) => {
        delete player['Unnamed: 0']; // Delete the unwanted field
      });
    
  
      // Step 2: Merge data from players_overall_data.json into players.js
      const mergedPlayers = players.map((player:any) => {
        // Find the corresponding player in players_overall_data.json by name
        const overallPlayer = overallPlayersData.find((p:any) => p.name === player.name);
  
        if (overallPlayer) {
          // Merge fields: Add all fields from players_overall_data.json to the player object
          return {
            ...overallPlayer, // All fields from players_overall_data.json
            nationality: player.nationality, // Keep nationality from players.js
            role: player.role // Keep role from players.js
          };
        } else {
          // If no match found, keep the original player with default role and nationality
          return player;
        }
      });
  
      // Step 3: Generate new content for players.js
      let playersJsContent = 'const players = [\n';
      
      mergedPlayers.forEach((player:any) => {
        // Build player data string, preserving formatting
        const playerString = JSON.stringify(player, null, 2)
          .replace(/"([^"]+)":/g, '$1:')  // Remove quotes around object keys
          .replace(/\\"/g, '"'); // Handle escaped quotes
  
        playersJsContent += `  ${playerString},\n`;
      });
  
      // Remove the last comma and newline
      playersJsContent = playersJsContent.slice(0, -2) + '\n';
  
      playersJsContent += '];\n\nexport default players;';
  
      // Step 4: Write the updated content back to players.js
      try {
        fs.writeFileSync('./uploads/admin/players_test.js', playersJsContent, 'utf8');
        console.log('players.js has been updated!');
      } catch (err) {
        console.error('Error writing players.js:', err);
      }
    });

    return NextResponse.json({"status": "success"})
}