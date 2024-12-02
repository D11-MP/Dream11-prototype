import fs from "fs"
import players from "@/uploads/admin/players"
import { NextRequest, NextResponse } from "next/server";
// Step 1: Read players.js and players_overall_data.json
// fs.readFile('./uploads/admin/players.js', 'utf8', (err, playersJsData) => {
//     if (err) {
//       console.error('Error reading players.js:', err);
//       return;
//     }
    
    // console.log(playersJsData)
    // Remove the export line and convert the rest to a JavaScript array
    // const playerInfo = playersJsData.replace('export default players;', '').trim();
    
    // const playersJsWithoutExport1 = playerInfo.replace('const players = [', '').trim();
    // const playersJsWithoutExport2 = playersJsWithoutExport1.replace('];', '').trim();
    // console.log(playersJsWithoutExport2)
    // const players = eval(playersJsWithoutExport1); // Convert the content of players.js into a JavaScript array
  
  
  
  
  
  
export function GET(req: NextRequest){
    
    fs.readFile('./uploads/players_overall_data.json', 'utf8', (err, overallData) => {
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
      fs.writeFile('./app/(root)/(home)/_components/players.js', playersJsContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing players.js:', err);
        } else {
          console.log('players.js has been updated!');
        }
      });
    });
    return NextResponse.json({"status": "success"})
}
  
  
  
  
  
  
  
    // fs.readFile('./uploads/players_overall_data.json', 'utf8', (err, overallData) => {
    //   if (err) {
    //     console.error('Error reading players_overall_data.json:', err);
    //     return;
    //   }
  
    //   const overallPlayersData = JSON.parse(overallData); // Parse the JSON data
  
    //   // Step 2: Merge data from players_overall_data.json into players.js
    //   const mergedPlayers = players.map((player:any) => {
    //     // Find the corresponding player in players_overall_data.json by name
    //     const overallPlayer = overallPlayersData.find((p:any) => p.name === player.name);
  
    //     if (overallPlayer) {
    //       // Merge fields: Add all fields from players_overall_data.json to the player object
    //       return {
    //         ...overallPlayer, // All fields from players_overall_data.json
    //         nationality: player.nationality, // Keep nationality from players.js
    //         role: player.role // Keep role from players.js
    //       };
    //     } else {
    //       // If no match found, keep the original player with default role and nationality
    //       return player;
    //     }
    //   });
  
    //   // Step 3: Generate new content for players.js
    //   let playersJsContent = 'const players = [\n';
      
    //   mergedPlayers.forEach((player:any) => {
    //     // Build player data string, preserving formatting
    //     const playerString = JSON.stringify(player, null, 2)
    //       .replace(/"([^"]+)":/g, '$1:')  // Remove quotes around object keys
    //       .replace(/\\"/g, '"'); // Handle escaped quotes
  
    //     playersJsContent += `  ${playerString},\n`;
    //   });
  
    //   // Remove the last comma and newline
    //   playersJsContent = playersJsContent.slice(0, -2) + '\n';
  
    //   playersJsContent += '];\n\nexport default players;';
  
    //   // Step 4: Write the updated content back to players.js
    //   fs.writeFile('./app/(root)/(home)/_components/players.js', playersJsContent, 'utf8', (err) => {
    //     if (err) {
    //       console.error('Error writing players.js:', err);
    //     } else {
    //       console.log('players.js has been updated!');
    //     }
    //   });
    // });
//   });