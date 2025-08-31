import { getPool } from "@/lib/pg";
import { Column } from "@prisma/client";

export function detectPostgresType(value: string): string {
  if (!value || value.trim() === "") return "TEXT";

  // Integer check
  if (/^-?\d+$/.test(value)) return "INTEGER";

  // Float/decimal check
  if (/^-?\d*\.\d+$/.test(value)) return "DECIMAL";

  // Boolean check
  if (/^(true|false)$/i.test(value)) return "BOOLEAN";

  // Date check (ISO, yyyy-mm-dd, etc.)
  if (!isNaN(Date.parse(value))) return "TIMESTAMP";

  // Default fallback
  return "TEXT";
}
const pool = getPool();

export async function createTableFromSchema(
  tableId: string,
  columns: Column[],
  rows: Record<string, string>[]
) {
  // build column definitions
  console.log({ tableId, columns, rows });
  const colDefs = columns
    .map((col) => {
      const colName = `"${col.name}"`; // safe col name
      return `${colName} ${col.type}`;
    })
    .join(", ");

  const query = `CREATE TABLE IF NOT EXISTS csv_${tableId} (${colDefs});`;

  await pool.query(query);

  // Insert rows if available
  if (rows.length > 0) {
    const filteredRows = rows.filter(
      (r) => Object.values(r).length === columns.length
    );

    const colNames = columns.map((c) => `"${c.name}"`).join(", ");
    const values = filteredRows
      .map(
        (_, i) =>
          `(${columns
            .map((_, j) => `$${i * columns.length + j + 1}`)
            .join(", ")})`
      )
      .join(", ");

    const flatValues = filteredRows.flatMap((row) =>
      columns.map((c) => row[c.name] ?? null)
    );

    const insertQuery = `
      INSERT INTO csv_${tableId} (${colNames})
      VALUES ${values};
    `;
    console.log(insertQuery);
    const result = await pool.query(insertQuery, flatValues);
    return result;
  }

  return [];
}
