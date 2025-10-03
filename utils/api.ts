import { getPool } from "@/lib/pg";
import { Column, Csv } from "@prisma/client";
import { isDateString } from "./date";
import { getOpenRouterClient } from "@/lib/open-router";
const pool = getPool();
const openRouter = getOpenRouterClient();

export function detectPostgresType(value: string): string {
  if (!value || value.trim() === "") return "TEXT";

  if (isDateString(value)) return "TIMESTAMP";

  // Default fallback
  return "TEXT";
}

export async function createTableFromSchema(
  tableId: string,
  columns: Column[],
  rows: Record<string, string>[]
) {
  // build column definitions
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
    const result = await pool.query(insertQuery, flatValues);
    return result;
  }

  return [];
}

export function getSystemInstruction(csv: Csv, columns: Column[]) {
  const schemaText = columns
    .map((col) => `- ${col.name} (${col.type})`)
    .join("\n");

  return `You are an AI Data Analyst.

You have access to the following dataset:

Table Name (original file): ${csv.name}
SQL Table Name: csv_${csv.id}
Table description: ${csv.description}

Schema:
${schemaText}

Your tasks:

1. Data Analyst Role (type:text):
- Respond only with human-readable explanations, suggestions, or analysis.
- Show table columns consecutively in one line in plain language.
- Reference prior relevant conversation if needed.
- Use Markdown formatting (headings, lists, bold, etc.) for clarity.
- Keep answers concise, in short paragraphs.
- When asked for possible queries, provide exactly 5 realistic queries in natural English based on the available columns. Do not output SQL or unrealistic queries.
- Output must have type "text".

2. PostgreSQL Query Role (type:sql):
- Generate only one SQL query per request.
- Use double quotes for table and column names exactly as in the schema.
- Match data types correctly in WHERE clauses; handle nullable columns.
- Never reference columns not in the schema.
- Always return Top 5 results using ORDER BY + LIMIT 5.
- Arrange columns: first = categorical, last = numerical, others in between.
- Do not include explanations, comments, or any extra text in SQL output.
- Output must have type "sql".

3. Output Format:
- Return answers strictly as a JSON array of objects.
- Each object must have:
  - "type": "text" or "sql" depending on the task
  - "message": human-readable text (for "text") or SQL query string (for "sql")

Example text output:
[
  {
    "type": "text",
    "message": "Hi, how are you?"
  }
]

Example SQL output:
[
  {
    "type": "sql",
    "message": "SELECT \"Country\", COUNT(*) AS customer_count FROM \"csv_cmewh96du000dt9xothtzer2u\" GROUP BY \"Country\" ORDER BY customer_count DESC LIMIT 5;"
  }
]

Important Rules:
- Never mix "text" and "sql" in the same object.
- If the task is analysis, respond only with type "text".
- If the task is a query, respond only with type "sql".
`;
}

export async function generateSummary(
  message: string,
  table: Record<string, string>[]
) {
  const response = await openRouter.chat.completions.create({
    model: "google/gemini-2.5-flash-lite",
    messages: [
      {
        role: "system",
        content: `
      You are given a user query and a dataset (array of objects).

      Your task is to:
      - Carefully analyze the dataset in the context of the user query.
      - Generate a clear, concise, and insightful answer that directly addresses the query.
      - Present the results in a well-structured summary using bullet points or other Markdown formatting where appropriate.
      - Include contextual insights, comparisons, or trends to make the explanation more meaningful.
      - Use proper Markdown formatting (headings, bold or numbering)
      - Give response in short paragraph, dont give long answers.
    `,
      },
      {
        role: "user",
        content: `
    user query:
    ${message}

    data:
    ${JSON.stringify(table)}
    `,
      },
    ],
  });
  return response.choices[0]?.message?.content;
}
