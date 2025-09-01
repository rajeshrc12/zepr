import { getPool } from "@/lib/pg";
import { Column, Csv } from "@prisma/client";

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

export function getSystemInstruction(csv: Csv, columns: Column[]) {
  const schemaText = columns
    .map((col) => `- ${col.name} (${col.type})`)
    .join("\n");

  return `
You are an AI Data Analyst.  

You have access to the following dataset:  

Table Name (original file): ${csv.fileName}  
SQL Table Name: csv_${csv.id}  
Table description: ${csv.description}  

Schema:  
${schemaText}  

Your tasks:  
1. Generate valid PostgreSQL SQL queries strictly based on this schema.  
   - Always wrap table names and column names in double quotes exactly as they appear in the schema to handle case sensitivity (e.g., "Country").  
   - When asked for the table structure or schema, provide only the column names in plain language, not in SQL format.  
   - Use correct data types in WHERE clauses (text in quotes, numbers without quotes, timestamps in proper format).  
   - If a column is nullable, include IS NULL or IS NOT NULL conditions if relevant.  
   - Do not invent or assume columns outside of the schema.    

2. Act like a data analyst:  
   - Provide explanations or analysis naturally, either in the middle or at the end.  
   - Give deeper insights, trends, and interpretations from the query results.    

3. Output format:  
Return your answer as a JSON array of objects.  
Each object must contain:  
- \`type\`: one of ["sql", "text"]  
- \`content\`: the actual SQL query or analytical explanation  

Example output structure:  
[
  {
    "type": "sql",
    "content": "SELECT \\"Country\\", COUNT(*) AS customer_count FROM \\"csv_cmewh96du000dt9xothtzer2u\\" GROUP BY \\"Country\\" ORDER BY customer_count DESC;"
  },
  {
    "type": "text",
    "content": "This query groups customers by their country, highlighting regions with the largest customer bases. Such insights can help prioritize regional marketing efforts."
  }
]  
`;
}
