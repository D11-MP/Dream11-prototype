import { GenerateChat } from "@/lib/actions/chat.actions";

export async function POST(req: Request) {
  const { id, prompt } = await req.json();
  return GenerateChat({ id, prompt });
}