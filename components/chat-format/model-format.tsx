import React from "react";
import { Message } from "@prisma/client";
import SQLFormat from "@/components/chat-format/sql-format";
import TableFormat from "./table-format";

const ModelFormat = ({ message }: { message: Message }) => {
  return (
    <div className="flex text-sm py-2 px-5 justify-start">
      <div className="flex gap-2 max-w-[90%]">
        <div className="flex flex-col gap-2 rounded shadow p-2 bg-white w-full">
          {message.type === "text" && message.message}
          {message.type === "sql" && <SQLFormat sql={message.message} />}
          {message.type === "table" && (
            <TableFormat dataString={message.message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelFormat;
