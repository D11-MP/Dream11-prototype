// app/api/admin/upload/route.ts
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from "fs";



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
    
    // Add timestamp to filename to prevent overwrites
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `${timestamp}-${file.name}`
    const filePath = path.join(uploadsDir, filename)
    
    await writeFile(filePath, buffer)
    await extractData(filePath);
    
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