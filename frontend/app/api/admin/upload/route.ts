import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from "fs";
import csv from 'csv-parser';



export async function POST(request: NextRequest) {
  try {
    const extractData = async (filePath:any) => {
      console.log(filePath)
      const csv = fs.readFileSync(filePath)
  
      const array = csv.toString().split("\r\n");
  
      let teamA = "";
      let teamB = "";
      let playerA = [];
      let playerB = [];
      let matchDate = "";
      let format = "";
  
      for (let i = 1; i < array.length - 1; i++) {
          let str = array[i]
          let properties = str.split(",")
          
          if(teamA === ""){
              teamA = properties[1];
          }
          else if(teamB === "" && properties[1]!=teamA){
              teamB = properties[1]
          }
  
          if(matchDate === ""){
              matchDate = properties[2]
          }
  
          if(format === ""){
              format = properties[3];
          }
  
          if(properties[1] === teamA){
              playerA.push(properties[0]);
          }
          else{
              playerB.push(properties[0]);
          }
      }
  
      let obj = <any>{};
      obj["matchDate"] = matchDate;
      obj["matchName"] = teamA + " versus " + teamB;
      obj["format"] = format;
      obj["teamA"] = teamA;
      obj["teamB"] = teamB;
      obj["playerA"] = playerA;
      obj["playerB"] = playerB;
      obj["lineupsRelease"] = true;
  
      let results = [];
      results.push(obj);
      let json = JSON.stringify(results);
      // console.log(json);
      fs.writeFileSync('./uploads/output.json', json);
    }



    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.csv')) {
      return NextResponse.json(
        { message: 'Only CSV files are allowed' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads', 'admin')
    await mkdir(uploadsDir, { recursive: true })
    
    const filename = `Input_Format.csv`
    const filePath = path.join(uploadsDir, filename)
    
    await writeFile(filePath, buffer)
    await extractData(filePath);
    


    // Step 1: Parse player-data.csv to get roles
const playerData = <any>{};

fs.createReadStream('./uploads/players-final.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Assuming player-data.csv has columns: name, identifier, and role
    playerData[row.name] = row.role;
  })
  .on('end', () => {
    // Step 2: Parse Input_format.csv to get player names and squads (teams)
    const finalData = <any>[];
    
    fs.createReadStream('./uploads/admin/Input_format.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Assuming Input_format.csv has columns: Player Name and Squad
        finalData.push(row);
      })
      .on('end', () => {
        // Step 3: Construct players.js array
        const players = finalData.map((player:any) => {
          const role = playerData[player['Player Name']] || 'Unknown'; // Default to 'Unknown' if no match found
          return {
            name: player['Player Name'],
            nationality: player.Squad, // Renaming Squad to nationality
            role: role
          };
        });

        // Step 4: Manually create the JavaScript object without double quotes around field names
        let playersJsContent = 'const players = [\n';
        
        players.forEach((player:any) => {
          playersJsContent += `  { name: "${player.name}", nationality: "${player.nationality}", role: "${player.role}" },\n`;
        });

        // Remove the last comma and newline
        playersJsContent = playersJsContent.slice(0, -2) + '\n';

        playersJsContent += '];\n\nexport default players;';

        // Step 5: Write to players.js
        fs.writeFile('./uploads/admin/players.js', playersJsContent, 'utf8', (err) => {
          if (err) {
            console.error('Error writing players.js:', err);
          } else {
            console.log('players.js has been created!');
          }
        });
      });
  });




    return NextResponse.json({ 
      message: 'File uploaded successfully',
      filename: filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Error uploading file' },
      { status: 500 }
    )
  }
}