import { Chat, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

interface ChatExtended extends Chat {
  messages: Message[];
}
const ChatBox = () => {
  const queryClient = useQueryClient();
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const handleMessage = async () => {
    setMessage("");
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
        ],
      };
    });
    const chatData = queryClient.getQueryData(["chat", chatId]) as Chat & {
      messages: Message[];
    };
    console.log(chatData);
    await axios.post("/api/message", {
      chatId,
      message,
      messages: chatData?.messages,
    });

    queryClient.invalidateQueries({ queryKey: ["chat"] });
  };
  return (
    <div className="flex w-[600px] border items-center p-4 rounded-xl bg-white">
      <input
        type="text"
        placeholder="What do you want to know ?"
        className="outline-none w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim() !== "") {
            handleMessage();
          }
        }}
      />
      <LuSendHorizontal />
    </div>
  );
};

export default ChatBox;
