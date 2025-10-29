import React, { useState } from "react";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatType, CsvType } from "@/types/db";
import { toast } from "sonner";
import api from "@/lib/api";
import { AxiosError } from "axios";

const ChatBoxId = ({ chatId, csv }: { chatId: string; csv: CsvType }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleMessage = async () => {
    if (!message.trim() || isLoading) {
      toast.info("Type your query");
      return;
    }
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
      const messages = await api.post("/message", {
        chat_id: chatId,
        content: message,
        csv,
      });
      console.log(messages.data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(String(err?.response?.data));
    } finally {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
