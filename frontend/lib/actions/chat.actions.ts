"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatModel from "../../models/chat";
import dbConnect from "../dbConnect";

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
      chat: chatCreated,
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
    const response = await handleGenerate(prompt);

    if (!response) {
      return { message: "Failed to generate response", status: 500 };
    }

    let chat = await ChatModel.findOne({ id });

    if (!chat) {
      chat = new ChatModel({
        id,
        prompts: [
          {
            prompt,
            response,
            timestamp: new Date(),
          },
        ],
        createdAt: Date.now(),
      });
    } else {
      chat.prompts.push({
        prompt,
        response,
        timestamp: new Date(),
      });
    }

    await chat.save();
    return { message: "Chat updated successfully", status: 200, chat };
  } catch (error) {
    console.error("Error generating chat:", error);
    return {
      message: "Error generating chat",
      status: 500,
    };
  }
}

export async function getChat(request: { id: string }) {
  try {
    if (!request?.id) {
      return { message: "Invalid request data", status: 400 };
    }

    await dbConnect();
    const { id } = request;
    const chat = await ChatModel.findOne({ id });

    if (chat) {
      return { chat, status: 200 };
    }

    return { message: "Chat not found", status: 404 };
  } catch (error) {
    console.error("Error fetching chat:", error);
    return {
      message: "Error fetching chat",
      status: 500,
    };
  }
}
