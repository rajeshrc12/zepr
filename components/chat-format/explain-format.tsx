import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ExplainFormat = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
    </div>
  );
};

export default ExplainFormat;
