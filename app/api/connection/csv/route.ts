import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const {
    user: { id },
  } = (await auth()) as Session;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "No file uploaded" },
      { status: 400 }
    );
  }

  const response = await prisma.csv.create({
    data: {
      userId: id,
      name: file.name,
    },
  });

  return NextResponse.json({
    success: true,
    fileName: file.name,
    size: file.size,
    id: response.id,
  });
}
