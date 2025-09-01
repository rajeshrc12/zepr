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
      // Format SQL into multiple lines
      const formatted =
        lang === "sql" ? format(code, { language: "sql" }) : code;

      const html = await codeToHtml(formatted, {
        lang,
        theme: "slack-dark", // try "github-dark", "dracula", etc.
      });
      setHtml(html);
    }
    highlight();
  }, [code, lang]);

  return (
    <div className="rounded-lg overflow-x-auto text-sm leading-relaxed">
      <div
        className="[&>pre]:p-4 [&>pre]:m-0 [&>pre]:rounded-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
