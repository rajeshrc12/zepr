import { Chat, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import CsvTable from "./csv-table";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

interface ChatExtended extends Chat {
  messages: Message[];
}
const ChatBox = () => {
  const queryClient = useQueryClient();
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleMessage = async () => {
    if (!message.trim() || isLoading) {
      toast.info("Type your query");
      return;
    }
    setIsLoading((prev) => !prev);
    setMessage("");
    const chatData = queryClient.getQueryData(["chat", chatId]) as Chat & {
      messages: Message[];
    };

    queryClient.setQueryData(["chat", chatId], (old: ChatExtended) => {
      if (!old) return old;
      return {
        ...old,
        messages: [
          ...old.messages,
          {
            id: crypto.randomUUID(), // temporary id until backend responds
            type: "text",
            role: "user",
            message,
            createdAt: new Date().toISOString(),
            chatId,
          },
          {
            id: crypto.randomUUID(), // temporary id until backend responds
            type: "loader",
            role: "model",
            message: "",
            createdAt: new Date().toISOString(),
            chatId,
          },
        ],
      };
    });
    try {
      await axios.post("/api/message", {
        chatId,
        message,
        messages: chatData?.messages,
        csvId: chatData.csvId,
      });
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
    <div className="flex flex-col gap-2">
      <CsvTable />
      <div className="flex w-[600px] border items-center p-4 rounded-xl bg-white shadow">
        <input
          disabled={isLoading}
          type="text"
          placeholder="What do you want to know ?"
          className="outline-none w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessage();
            }
          }}
        />
        {isLoading ? (
          <ImSpinner2 size={20} className="animate-spin" />
        ) : (
          <LuSendHorizontal onClick={handleMessage} />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
