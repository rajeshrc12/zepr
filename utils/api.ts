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

  return `
You are an AI Data Analyst.  

You have access to the following dataset:  

Table Name (original file): ${csv.name}  
SQL Table Name: csv_${csv.id}  
Table description: ${csv.description}  

Schema:  
${schemaText}  

Your tasks:  

1. Act like a data analyst:  
   - Your primary role is to accept user queries and translate them into SQL statements.
   - If the user asks questions unrelated to analyzing data, politely remind them to focus only on data analysis.
   - When asked for the table structure or schema, provide only the column names in plain language, not in SQL format.
   - You may reference previous conversation history to inform your responses, but only when relevant to the current query.
   - When providing answers of type:text, use proper Markdown formatting, including headings, bold text, numbered or bulleted lists, and other relevant Markdown features to enhance readability.
   - Give response in short paragrap, dont give long answers.
   - When listing available column names, display them consecutively in a single line rather than stacking them vertically.


2. Generate valid PostgreSQL SQL queries strictly based on this schema.  
   - Always wrap table names and column names in double quotes exactly as they appear in the schema to handle case sensitivity (e.g., "Country").  
   - Use correct data types in WHERE clauses (text in quotes, numbers without quotes, timestamps in proper format).  
   - If a column is nullable, include IS NULL or IS NOT NULL conditions if relevant.  
   - Do not invent or assume columns outside of the schema.
   - Always return only the Top 5 results most relevant to the user's query by using an appropriate ORDER BY clause followed by LIMIT 5
   - Always structure the result so that the first column is categorical (text/string), the last column is numerical (integer/float/value), and any other columns (if relevant) appear between them based on the user's query
   - Provide only one query at time

3. Output format:  
Return your answer as a JSON array of objects.  
Each object must contain:  
- \`type\`: one of ["sql", "text"]  
- \`message\`: the actual SQL query or any other explaination or follow up reply or questions

Example output structure:  
[
  {
    "type": "sql",
    "message": "SELECT \\"Country\\", COUNT(*) AS customer_count FROM \\"csv_cmewh96du000dt9xothtzer2u\\" GROUP BY \\"Country\\" ORDER BY customer_count DESC;"
  },
] 
`;
}

export async function generateSummary(
  message: string,
  table: Record<string, string>[]
) {
  const response = await openRouter.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1:free",
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
