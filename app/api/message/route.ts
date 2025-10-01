import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGeminiClient } from "@/lib/gemini";
import { Type } from "@google/genai";
import { Csv } from "@prisma/client";
import { generateSummary, getSystemInstruction } from "@/utils/api";
import { getPool } from "@/lib/pg";
const client = getGeminiClient();
const pool = getPool();
export async function POST(req: NextRequest) {
  try {
    const { message, chatId, csvId } = await req.json();
    console.log(chatId);

    const columns = await prisma.column.findMany({ where: { csvId } });
    const csv = (await prisma.csv.findFirst({ where: { id: csvId } })) as Csv;
    const systemInstruction = getSystemInstruction(csv, columns);
    console.log(systemInstruction);
    const geminiChat = client.chats.create({
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
    });
    const response = await geminiChat.sendMessage({
      message,
    });
    const modelResponse = JSON.parse(response?.text || "[]");
    const chatResponseSQLData = [];

    for (const chat of modelResponse) {
      if (chat.type === "sql") {
        const result = await pool.query(chat.message);
        chatResponseSQLData.push({ ...chat, chatId, role: "model" });
        chatResponseSQLData.push({
          chatId,
          role: "model",
          type: "table",
          message: JSON.stringify(result.rows),
        });
        const summary = await generateSummary(message, result.rows);
        chatResponseSQLData.push({
          chatId,
          role: "model",
          type: "explain",
          message: summary,
        });
      } else {
        chatResponseSQLData.push({ ...chat, chatId, role: "model" });
      }
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

    return NextResponse.json(messageResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching csvs:", error);
    return NextResponse.json(
      { error: "Failed to fetch csvs" },
      { status: 500 }
    );
  }
}
