import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Csv, Message } from "@prisma/client";
import { generateSummary, getSystemInstruction } from "@/utils/api";
import { getPool } from "@/lib/pg";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { getGeminiClient } from "@/lib/gemini";
import { Type } from "@google/genai";

const geminiClient = getGeminiClient();
const pool = getPool();
export async function POST(req: NextRequest) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    const { message, messages, chatId, csvId } = await req.json();

    const columns = await prisma.column.findMany({ where: { csvId } });
    const csv = (await prisma.csv.findFirst({ where: { id: csvId } })) as Csv;
    const systemInstruction = getSystemInstruction(csv, columns);
    let modelResponse = null;
    try {
      const geminiChat = geminiClient.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                  enum: ["sql", "text"],
                },
                message: {
                  type: Type.STRING,
                },
              },
              required: ["type", "message"],
            },
          },
        },
        history: messages.slice(-4).map((m: Message) => ({
          role: m.role,
          parts: [{ text: m.message }],
        })),
      });
      const response = await geminiChat.sendMessage({
        message,
      });
      modelResponse = JSON.parse(response?.text || "[]");
    } catch {
      return NextResponse.json("Error while generating SQL query", {
        status: 401,
      });
    }
    const chatResponseSQLData = [];

    try {
      for (const chat of modelResponse) {
        if (chat.type === "sql") {
          const table = (await pool.query(chat.message))?.rows;
          const summary = await generateSummary(message, table);

          chatResponseSQLData.push({
            ...chat,
            chatId,
            role: "model",
            sql: chat.message,
            table: JSON.stringify(table),
            message: summary,
          });
        } else {
          chatResponseSQLData.push({ ...chat, chatId, role: "model" });
        }
      }
    } catch {
      return NextResponse.json("Error while generating summary", {
        status: 401,
      });
    }
    const messageResponse = await prisma.message.createMany({
      data: [
        {
          chatId,
          type: "text", // or whatever type you need
          role: "user", // or "assistant"
          message,
        },
        ...chatResponseSQLData,
      ],
    });
    await prisma.user.update({
      where: { id },
      data: {
        messageLimit: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(messageResponse, { status: 200 });
  } catch (error) {
    console.error("Error while processing request:", error);
    return NextResponse.json("Error while processing message", { status: 401 });
  }
}
