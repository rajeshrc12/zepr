import React from "react";
import CodeBlock from "@/components/code-block";

const SQLFormat = ({ sql }: { sql: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <CodeBlock code={sql} lang="sql" />
      <div>
        <div className="font-bold">Query Explaination</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laborum
        laboriosam recusandae a neque! Obcaecati, natus quas non neque aperiam
        consequuntur pariatur. Nisi voluptates officia numquam consectetur iusto
        laboriosam veritatis?
      </div>
    </div>
  );
};

export default SQLFormat;
