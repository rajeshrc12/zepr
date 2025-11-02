"use client";
import ChatBoxId from "@/components/chat-box-id";
import RightPanel from "@/components/right-panel";
import SummaryFormat from "@/components/summary-format";
import { Button } from "@/components/ui/button";
import { GRAPH_DATA, GraphDataType } from "@/constants/graph";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { MessageType } from "@/types/db";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ChatIdPage = () => {
  const { chatId } = useParams();
  const [rightPanel, setRightPanel] = useState(false);
  const { data: chat, isLoading: isChatLoading } = useChat(chatId as string);
  const [graphData, setGraphData] = useState<GraphDataType>(GRAPH_DATA);
  const [graphDataStatus, setGraphDataStatus] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && chat?.messages) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  useEffect(() => {
    if (!rightPanel && graphData.query_analyzer.query === "analysis") {
      setRightPanel(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData]);
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "w-1/3 flex flex-col border-r",
          !rightPanel && "w-full border-none"
        )}
      >
        <div className="px-2 py-1">Title</div>
        <div
          className={cn(
            "flex-1 overflow-y-auto p-2 flex flex-col gap-2 ",
            !rightPanel && "px-[25%]"
          )}
          ref={containerRef}
        >
          {isChatLoading ? (
            <div className="flex justify-center">
              <LoaderCircle size={15} className="animate-spin" />
            </div>
          ) : (
            chat?.messages?.map((message: MessageType) => {
              if (message.type == "ai")
                return (
                  <div key={message.id} className="flex flex-col items-start">
                    <SummaryFormat
                      message={message.content || message.summary}
                    />
                    {message.sql && (
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setRightPanel(true);
                          setGraphData({
                            query_analyzer: { query: "" },
                            normal_query: {
                              content: message.content || message.summary,
                            },
                            analysis_query: { sql: message.sql },
                            generate_table: { table: message.table },
                            generate_chart: {
                              chart: {
                                type: message.chart.type,
                                x_axis: message.chart.x_axis,
                                y_axis: message.chart.y_axis,
                              },
                            },
                            generate_summary: { summary: message.summary },
                          });
                        }}
                      >
                        Show report
                      </Button>
                    )}
                  </div>
                );
              if (message.type == "human")
                return (
                  <div key={message.id} className="flex flex-col items-end">
                    <div className="border bg-white p-1 rounded">
                      {message.content}
                    </div>
                  </div>
                );
            })
          )}
          {graphDataStatus && (
            <LoaderCircle size={15} className="animate-spin" />
          )}
        </div>
        <div
          className={cn(
            "border p-2 rounded-xl m-2 bg-white",
            !rightPanel && "mx-[25%]"
          )}
        >
          <ChatBoxId
            csv={chat?.csv}
            chatId={chatId as string}
            setGraphData={setGraphData}
            setGraphDataStatus={setGraphDataStatus}
          />
        </div>
      </div>

      {rightPanel && (
        <RightPanel graphData={graphData} setRightPanel={setRightPanel} />
      )}
    </div>
  );
};

export default ChatIdPage;
