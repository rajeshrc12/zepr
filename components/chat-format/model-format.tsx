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
    <div className="flex text-sm py-2 justify-start">
      <div className="flex gap-2 max-w-[90%]">
        <div className="flex flex-col gap-2 rounded shadow p-2 bg-white w-full">
          {message.sql ? (
            <div className="flex flex-col gap-3">
              {message.summary && <SummaryFormat message={message.summary} />}
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
            message.message
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelFormat;
