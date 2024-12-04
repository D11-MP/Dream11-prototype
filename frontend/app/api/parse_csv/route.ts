import fs from 'fs';
import path from "path";
import csv from "csv-parser";

export function GET(req: Request) {
  console.log(process.cwd());
  const finalCsvPath = path.join(process.cwd(), 'uploads', 'final.csv');
  const finalJsonPath = path.join(process.cwd(), 'uploads', 'final.json');

  try {
    // Check if the CSV file exists
    if (!fs.existsSync(finalCsvPath)) {
      console.error("CSV file not found");
      return Response.json({ status: "error", message: "CSV file not found" });
    }

    const finalData: any[] = [];

    // Create a readable stream and handle the response using a callback
    const readStream = fs.createReadStream(finalCsvPath)
      .pipe(csv())
      .on('data', (row) => {
        // Transform the row by renaming fields
        const transformedRow = {
          name: row["Player Name"],
          date_playing: row["Match Date"],
          team: row["Squad"],
          match_type: row["Format"],
          predicted_points: row["Player Score"],
        };
        finalData.push(transformedRow);
      })
      .on('end', () => {
        // Sort the data by predicted_points
        finalData.sort((a: any, b: any) => b.predicted_points - a.predicted_points);
        
        // Write the transformed data to final.json
        fs.writeFileSync(finalJsonPath, JSON.stringify(finalData, null, 2));
        console.log('final.json created successfully!');
        
        return Response.json({ status: "success", data: finalData });
      })
      .on('error', (error) => {
        console.error(error);
        return Response.error();
      });

    // return readStream;
    return Response.json({"message": "hello"})

  } catch (error: any) {
    console.error(error);
    return Response.error();
  }
}