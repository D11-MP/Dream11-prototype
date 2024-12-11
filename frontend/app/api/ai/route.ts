// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyCHRmQlM-0NnatRV-umtgANQFBdAMifyoU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {weather , condition} = body;
        console.log(`weather:${weather}`)
        const prompt = `The Weather is ${weather} and the pitch condition is ${condition} of a cricket field. you need to provide an comprehensive and breif insights of the match conditions in as if your are a commentator. Stay within 60 words`
        const result = await model.generateContent(prompt)
        return NextResponse.json({data:result.response.text()})
        
    } catch (error) {
        return NextResponse.json({error: error})
    }
 }
