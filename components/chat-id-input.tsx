"use client";
import { ArrowUp, Pause } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ChatType } from "@/types/db";

const ChatIdInput = () => {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMessage = async () => {
    setMessage("");
    setLoading(true);
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
            created_at: new Date().toISOString(),
          },
          {
            id: crypto.randomUUID(), // temporary id until backend responds
            type: "loading",
            content: message,
            created_at: new Date().toISOString(),
          },
        ],
      };
    });
    const response = await api.post("/message", {
      content: message,
      chat_id: Number(chatId),
    });
    if (response.status == 200) {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      console.log(response.data);
    }
  };
  return (
    <div className="border shadow rounded-xl p-3 flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Type query here"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessage();
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div></div>
        <Button
          disabled={loading}
          onClick={handleMessage}
          size={"sm"}
          className="rounded-full h-7 w-7"
        >
          {loading ? <Pause /> : <ArrowUp />}
        </Button>
      </div>
    </div>
  );
};

export default ChatIdInput;
