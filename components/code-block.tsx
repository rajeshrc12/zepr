"use client";

import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { format } from "sql-formatter";

export default function CodeBlock({
  code,
  lang = "sql",
}: {
  code: string;
  lang?: string;
}) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      try {
        let formatted = code;

        if (lang === "sql") {
          try {
            // Try with PostgreSQL dialect first
            formatted = format(code, { language: "postgresql" });
          } catch (e1) {
            console.warn("PostgreSQL formatting failed, using raw SQL:", e1);
            // fallback: keep raw code unformatted
            formatted = code;
          }
        }

        const html = await codeToHtml(formatted, {
          lang,
          theme: "github-light",
        });

        setHtml(html);
      } catch (error) {
        console.error("Error highlighting code:", error);
        // show raw code as plain text on error
        setHtml(
          `<pre style="color: red; padding: 8px;">Error formatting code. Showing raw:\n\n${code}</pre>`
        );
      }
    }

    highlight();
  }, [code, lang]);

  if (!html) return "Loading...";
  return (
    <div className="rounded-lg overflow-x-auto text-sm leading-relaxed">
      <div
        className="[&>pre]:p-4 [&>pre]:m-0 [&>pre]:rounded-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
