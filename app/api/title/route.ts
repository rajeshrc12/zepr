import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
import { getOpenRouterClient } from "@/lib/open-router";
const openRouter = getOpenRouterClient();

export async function POST(req: NextRequest) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    const { chatId, message } = await req.json();
    const response = await openRouter.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "system",
          content: "create small title based on given user message",
        },
        { role: "user", content: message },
      ],
    });
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
        userId: id,
      },
      data: {
        name: response.choices[0]?.message?.content || "", // optional field if you want to set it
      },
    });

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error("Error fetching csvs:", error);
    return NextResponse.json(
      { error: "Failed to fetch csvs" },
      { status: 500 }
    );
  }
}
