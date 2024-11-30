import mongoose, { Schema } from "mongoose";

export interface Chat {
  prompts: PromptResponse[];
  createdAt: Date;
}

export interface PromptResponse {
  prompt: string;
  response: string;
  timestamp: Date;
}

const ChatSchema: Schema<Chat> = new Schema({
  prompts: [
    {
      prompt: { type: String, required: true },
      response: { type: String, required: true },
      timestamp: { type: Date, required: true, default: Date.now() },
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now() },
});

const ChatModel =
  (mongoose.models.Chat as mongoose.Model<Chat>) ||
  mongoose.model<Chat>("User", ChatSchema);

export default ChatModel;
