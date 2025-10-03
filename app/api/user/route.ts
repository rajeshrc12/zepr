import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { Session } from "next-auth";
import { auth } from "@/auth";

export async function GET() {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    // Return the signed URL
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
