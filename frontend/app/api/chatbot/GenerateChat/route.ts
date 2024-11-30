import { GenerateChat } from "@/lib/actions/chat.actions";

export async function POST(req: Request) {
  return GenerateChat(req);
}
