import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { Session } from "next-auth";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;
  const url = new URL(req.url);
  const chatId = url.pathname.split("/").pop();

  try {
    const chat = await prisma.chat.findFirst({
      where: { id: chatId, userId: id },
      include: { messages: true },
    });
    // Return the signed URL
    return Response.json(chat, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
