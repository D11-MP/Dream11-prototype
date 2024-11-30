import { CreateChat } from "@/lib/actions/chat.actions";

export async function POST() {
  return CreateChat();
}
