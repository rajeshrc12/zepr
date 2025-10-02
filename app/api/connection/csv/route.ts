import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { parse } from "papaparse";
import { createTableFromSchema, detectPostgresType } from "@/utils/api";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let csvId = null;
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const data = JSON.parse(formData.get("data") as string);
    const text = (await file?.text()) || "";

    const parsed = parse(text, { header: true, dynamicTyping: false });
    const rows = parsed.data as Record<string, string>[];

    // Get columns
    const headers = Object.keys(rows[0]);

    // Detect types by sampling first 10 rows
    const columns = headers.map((header) => {
      const samples = rows.slice(0, 10).map((r) => r[header]);
      let detectedType = "TEXT";

      for (const sample of samples) {
        const t = detectPostgresType(String(sample ?? ""));
        if (t !== "TEXT") {
          detectedType = t;
          break;
        }
      }

      return { name: header, type: detectedType };
    });

    // Save to DB
    const csv = await prisma.csv.create({
      data: {
        fileName: file?.name || "",
        status: "pending",
        name: data.name,
        description: data.description,
        userId: id, // replace with actual user ID
        columns: {
          create: columns,
        },
      },
      include: { columns: true },
    });
    csvId = csv.id;
    const table = await createTableFromSchema(csvId, csv.columns, rows);
    await prisma.csv.update({
      data: {
        status: "ready",
      },
      where: {
        id: csvId,
      },
    });
    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    if (csvId) {
      await prisma.column.deleteMany({
        where: {
          csvId,
        },
      });
      await prisma.csv.delete({
        where: {
          id: csvId,
        },
      });
    }

    console.error("Failed to parse csv", error);
    return NextResponse.json({ error: "Failed to parse csv" }, { status: 401 });
  }
}

export async function GET(req: Request) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;

    // Total count for pagination
    const total = await prisma.csv.count({
      where: {
        userId: { in: [id, "68b40ab6cca7cecedf1741cc"] },
      },
    });

    // Fetch paginated CSVs
    const csvs = await prisma.csv.findMany({
      where: {
        userId: { in: [id, "68b40ab6cca7cecedf1741cc"] },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      data: csvs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching csvs:", error);
    return NextResponse.json(
      { error: "Failed to fetch csvs" },
      { status: 500 }
    );
  }
}
