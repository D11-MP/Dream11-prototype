import {spawn} from 'node:child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    let python = spawn('python', ['ml_model/model.py']);
    let dataToSend = '';

    for await (const data of python.stdout){
      dataToSend += data.toString()
      console.log(dataToSend);
    }

    python.stderr.on("data", (data) => {
      console.log(data.toString())
    })


  return NextResponse.json({ message: dataToSend},{ status: 200})
}