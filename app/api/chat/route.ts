import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    const { csvId } = await req.json();

    const chat = await prisma.chat.create({
      data: {
        name: "New Chat", // optional field if you want to set it
        userId: id,
        csvId: csvId,
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
