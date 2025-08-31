import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    const { message, csvId } = await req.json();

    const chat = await prisma.chat.create({
      data: {
        name: "New Chat", // optional field if you want to set it
        userId: id,
        csvId: csvId,
        messages: {
          create: {
            type: "text", // or whatever type you need
            role: "user", // or "assistant"
            message: message,
          },
        },
      },
      include: {
        messages: true, // so you also get the created message back
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

export async function GET() {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    // Save to DB
    const chats = await prisma.chat.findMany({ where: { userId: id } });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error("Error fetching csvs:", error);
    return NextResponse.json(
      { error: "Failed to fetch csvs" },
      { status: 500 }
    );
  }
}
