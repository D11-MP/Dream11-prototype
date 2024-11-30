import fs from 'fs';
import path from "path";

export function GET(){
console.log(process.cwd())
  const outputPath = path.join(process.cwd(), 'uploads', 'output.json');
  const selectorPath = path.join(process.cwd(), 'uploads', 'selector.json');
  const finalJsonPath = path.join(process.cwd(), 'uploads', 'final.json');

  try {
    // Read and parse output.json
    const outputData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const players = [...outputData[0].playerA, ...outputData[0].playerB]; // Combine both player arrays

    // Read and parse selector.json
    const selectorData = JSON.parse(fs.readFileSync(selectorPath, 'utf8'));

    // Filter selector.json for the required players
    const finalData = selectorData.filter((player:any) => players.includes(player.unique_name));

    // Write final.json
    fs.writeFileSync(finalJsonPath, JSON.stringify(finalData, null, 2));

    // res.status(200).json({ message: 'final.json created successfully!', data: finalData });
    return Response.json({"status": "success", "data": finalData})
  } catch (error) {
    console.error(error);
    return Response.error()
  }

}