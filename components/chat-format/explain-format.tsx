import React from "react";

const ExplainFormat = ({ message }: { message: string }) => {
  return <div className="flex flex-col gap-2">{message}</div>;
};

export default ExplainFormat;
