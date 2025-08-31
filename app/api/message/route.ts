import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { message, chatId } = await req.json();

    const messageResponse = await prisma.message.create({
      data: {
        chatId,
        type: "text", // or whatever type you need
        role: "user", // or "assistant"
        message,
      },
    });

    return NextResponse.json(messageResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching csvs:", error);
    return NextResponse.json(
      { error: "Failed to fetch csvs" },
      { status: 500 }
    );
  }
}
