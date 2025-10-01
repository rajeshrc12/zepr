import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Csv, Message } from "@prisma/client";
import { generateSummary, getSystemInstruction } from "@/utils/api";
import { getPool } from "@/lib/pg";
import { getOpenRouterClient } from "@/lib/open-router";
const openRouter = getOpenRouterClient();
const pool = getPool();
export async function POST(req: NextRequest) {
  try {
    const { message, messages, chatId, csvId } = await req.json();
    const history = messages.slice(-4).map((message: Message) => {
      if (message.role == "model")
        return { role: "assistant", content: message.message };
      return { role: "user", content: message.message };
    });

    const columns = await prisma.column.findMany({ where: { csvId } });
    const csv = (await prisma.csv.findFirst({ where: { id: csvId } })) as Csv;
    const systemInstruction = getSystemInstruction(csv, columns);
    let response = null;
    try {
      response = await openRouter.chat.completions.create({
        model: "x-ai/grok-4-fast:free",
        messages: [
          { role: "system", content: systemInstruction },
          ...history,
          { role: "user", content: message },
        ],
      });

      response = response.choices[0]?.message?.content || "[]";
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        [{ type: "text", message: "Error while process query " }],
        { status: 401 }
      );
    }
    const modelResponse = JSON.parse(response);
    const chatResponseSQLData = [];

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
