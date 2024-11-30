"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatModel from "../../models/chat";
import dbConnect from "../dbConnect";

import mongoose from "mongoose";

async function handleGenerate(prompt: string): Promise<string | null> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return null;
  }
}

export async function CreateChat() {
  try {
    await dbConnect();

    const chatCreated = new ChatModel({
      prompts: [],
      createdAt: Date.now(),
    });

    await chatCreated.save();

    return {
      message: "Chat created successfully",
      status: 201,
      chat_id: chatCreated._id.toString(),
    };
  } catch (error) {
    console.error("Error creating chat:", error);
    return {
      message: "Error creating chat",
      status: 500,
    };
  }
}
export async function GenerateChat(request: { id: string; prompt: string }) {
  try {
    if (!request?.id || !request?.prompt) {
      return { message: "Invalid request data", status: 400 };
    }

    await dbConnect();
    const { id, prompt } = request;
    const res = await handleGenerate(prompt);
    const objectId = new mongoose.Types.ObjectId(id);

    const chat = await ChatModel.findById(objectId);

    if (!chat) {
      return { message: "Chat not found", status: 404 };
    }

    chat.prompts.push({
      prompt,
      response: res ?? "",
      timestamp: new Date(),
    });

    await chat.save();
    return {
      message: "Chat updated successfully",
      status: 200,
      response: res,
    };
  } catch (error) {
    console.error("Error generating chat:", error);
    return {
      message: "Error generating chat",
      status: 500,
    };
  }
}
