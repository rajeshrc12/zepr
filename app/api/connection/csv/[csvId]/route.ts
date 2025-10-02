import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { getPool } from "@/lib/pg";
const pool = getPool();
export async function GET(req: Request) {
  const url = new URL(req.url);
  const csvId = url.pathname.split("/").pop();

  try {
    const csv = await prisma.csv.findFirst({
      where: { id: csvId },
    });
    const csvData =
      (await pool.query(`SELECT * FROM csv_${csvId} LIMIT 10`)) || [];

    // Return the signed URL
    return Response.json({ ...csv, data: csvData.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const csvId = url.pathname.split("/").pop();

  try {
    const csv = await prisma.csv.update({
      where: { id: csvId },
      data: { status: "archived" },
    });

    // Return the signed URL
    return Response.json(csv, { status: 200 });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
