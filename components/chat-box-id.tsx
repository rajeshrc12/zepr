import React, { useState } from "react";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatType, CsvType } from "@/types/db";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { GRAPH_DATA, GraphDataType } from "@/constants/graph";

const ChatBoxId = ({
  chatId,
  csv,
  setGraphData,
  setGraphDataStatus,
}: {
  chatId: string;
  csv: CsvType;
  setGraphData: React.Dispatch<React.SetStateAction<GraphDataType>>;
  setGraphDataStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleMessage = async () => {
    if (!message.trim() || isLoading) {
      toast.info("Type your query");
      return;
    }
    setGraphData(GRAPH_DATA);
    setIsLoading((prev) => !prev);
    setMessage(() => "");
    console.log(chatId);
    queryClient.setQueryData(["chat", chatId], (old: ChatType) => {
      if (!old) return old;
      return {
        ...old,
        messages: [
          ...old.messages,
          {
            id: crypto.randomUUID(), // temporary id until backend responds
            type: "human",
            content: message,
            createdAt: new Date().toISOString(),
            chatId,
          },
        ],
      };
    });
    try {
      // ✅ Encode params for GET
      const params = new URLSearchParams({
        chat_id: chatId,
        content: message,
        csv: JSON.stringify(csv),
      });

      const url = `http://localhost:8000/message/stream?${params.toString()}`;
      const evtSource = new EventSource(url);

      evtSource.onopen = () => {
        setGraphDataStatus("start");
        console.log("Connected to SSE stream");
      };

      evtSource.onmessage = (event) => {
        setGraphDataStatus("fetching");

        if (event.data === "[DONE]") {
          evtSource.close();
          queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
          setGraphDataStatus("");
          setIsLoading(false);
          return;
        }

        try {
          const parsed = JSON.parse(event.data);
          setGraphData((prev) => ({ ...prev, ...parsed }));
          console.log("New chunk:", parsed);
          // optionally update UI incrementally
        } catch (err) {
          console.error("Parse error:", err);
        }
      };

      evtSource.onerror = (err) => {
        console.error("SSE error:", err);
        evtSource.close();
        setIsLoading(false);
      };
    } catch (error) {
      const err = error as AxiosError;
      toast.error(String(err?.response?.data));
    } finally {
      setIsLoading((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <input
        disabled={isLoading}
        value={message}
        type="text"
        className="outline-none"
        placeholder="Ask a question"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleMessage();
          }
        }}
      />
      <div className="flex justify-between">
        <div className="border p-1 rounded-lg text-xs">{csv?.name}</div>
        {isLoading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <SendHorizontal size={20} color="gray" />
        )}
      </div>
    </div>
  );
};

export default ChatBoxId;
