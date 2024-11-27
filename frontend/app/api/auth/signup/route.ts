import { signup } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  return signup(req);
}