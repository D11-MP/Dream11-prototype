import { NextRequest, NextResponse } from "next/server";
import { GenerateChatWithAudio } from "@/lib/actions/chat.actions";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio");
    const chat_id = formData.get("id") as string;

    if (!file || !chat_id || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(filePath, buffer);
    const result = await GenerateChatWithAudio({ id: chat_id, path: filePath });

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${fileName}`,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
