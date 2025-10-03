import React, { useState } from "react";
import { Message } from "@prisma/client";
import SQLFormat from "@/components/chat-format/sql-format";
import TableFormat from "./table-format";
import ChartFormat from "./chart-format";
import SummaryFormat from "./summary-format";
import { FaChartBar, FaCode, FaTable } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const ModelFormat = ({ message }: { message: Message }) => {
  const [tool, setTool] = useState("");
  return (
    <div className="flex text-sm py-2 justify-start w-full">
      <div className="flex flex-col gap-2 p-2 w-full">
        {message.sql ? (
          <div className="flex flex-col gap-3">
            {message.message && (
              <SummaryFormat message={message.message as string} />
            )}
            <div className="flex gap-2">
              <Button
                variant={tool == "sql" ? "default" : "outline"}
                onClick={() => setTool(tool != "sql" ? "sql" : "")}
              >
                <FaCode />
                SQL
              </Button>
              <Button
                variant={tool == "table" ? "default" : "outline"}
                onClick={() => setTool(tool != "table" ? "table" : "")}
              >
                <FaTable />
                Table
              </Button>
              <Button
                variant={tool == "chart" ? "default" : "outline"}
                onClick={() => setTool(tool != "chart" ? "chart" : "")}
              >
                <FaChartBar />
                Chart
              </Button>
            </div>
            {tool === "sql" && message.sql && <SQLFormat sql={message.sql} />}
            {tool === "table" && message.table && (
              <TableFormat dataString={message.table} />
            )}
            {tool === "chart" && message.table && (
              <ChartFormat dataString={message.table} />
            )}
          </div>
        ) : (
          <SummaryFormat message={message.message as string} />
        )}
      </div>
    </div>
  );
};

export default ModelFormat;
