import fs from 'fs';
import path from "path";
import csv from "csv-parser";

export function GET() {
  console.log(process.cwd());
  const finalCsvPath = path.join(process.cwd(), 'uploads', 'final.csv');
  const finalJsonPath = path.join(process.cwd(), 'uploads', 'final.json');

  try {
    // Check if the CSV file exists
    if (!fs.existsSync(finalCsvPath)) {
      console.error("CSV file not found");
      return Response.json({ status: "error", message: "CSV file not found" });
    }

    const finalData = <any>[];

    // Read and parse the CSV file
    return new Promise((resolve, reject) => {
      fs.createReadStream(finalCsvPath)
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
          finalData.push(transformedRow); // Add the transformed row to finalData
        })
        .on('end', () => {
            finalData.sort((a:any, b:any) => b.predicted_points - a.predicted_points); // Sort the data by predicted_points
          // Write the transformed data to the final.json file
          fs.writeFileSync(finalJsonPath, JSON.stringify(finalData, null, 2));
          console.log('final.json created successfully!');
          resolve(Response.json({ status: "success", data: finalData }));
        })
        .on('error', (error) => {
          console.error(error);
          reject(Response.error());
        });
    });
  } catch (error:any) {
    console.error(error);
    return Response.error();
  }
}
