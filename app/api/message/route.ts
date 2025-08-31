import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGeminiClient } from "@/lib/gemini";
import { Type } from "@google/genai";
import { Message } from "@prisma/client";
const client = getGeminiClient();

export async function POST(req: NextRequest) {
  try {
    const { message, messages, chatId } = await req.json();
    const geminiChat = client.chats.create({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                enum: ["text"],
              },
              message: {
                type: Type.STRING,
              },
            },
            required: ["type", "message"],
          },
        },
      },
      history: messages.map((m: Message) => ({
        role: m.role,
        parts: [{ text: m.message }],
      })),
    });
    const response = await geminiChat.sendMessage({
      message,
    });
    console.log(response.text);
    const modelResponse = JSON.parse(response?.text || "[]");

    const messageResponse = await prisma.message.createMany({
      data: [
        {
          chatId,
          type: "text", // or whatever type you need
          role: "user", // or "assistant"
          message,
        },
        ...modelResponse.map((mr: Message) => ({
          ...mr,
          chatId,
          role: "model",
        })),
      ],
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
