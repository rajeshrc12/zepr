import React from "react";
import CodeBlock from "@/components/code-block";

const SQLFormat = ({ sql }: { sql: string }) => {
  return (
    <div className="flex flex-col gap-2 w-[70vw]">
      <CodeBlock code={sql} lang="sql" />
    </div>
  );
};

export default SQLFormat;
