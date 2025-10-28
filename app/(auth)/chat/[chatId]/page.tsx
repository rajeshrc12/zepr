"use client";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { MessageType } from "@/types/db";
import { SendHorizontal, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ChatIdPage = () => {
  const { chatId } = useParams();
  const [rightPanel, setRightPanel] = useState(false);
  const { data: chat } = useChat(chatId as string);
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
        >
          {chat?.messages?.map((message: MessageType) => {
            if (message.type === "ai")
              return (
                <div key={message.id} className="flex flex-col items-start">
                  <div>{message.content}</div>
                </div>
              );
            if (message.type === "human")
              return (
                <div key={message.id} className="flex flex-col items-end">
                  <div className="border bg-white p-1 rounded">
                    {message.content}
                  </div>
                </div>
              );
          })}
        </div>

        <div
          className={cn(
            "border p-2 rounded-xl m-2 bg-white flex flex-col gap-3",
            !rightPanel && "mx-[25%]"
          )}
        >
          <input
            type="text"
            className="outline-none"
            placeholder="Ask a question"
          />
          <div className="flex justify-between">
            <div className="border p-1 rounded-lg text-xs">{chat?.csv_id}</div>
            <SendHorizontal size={20} color="gray" />
          </div>
        </div>
      </div>

      {rightPanel && (
        <div className="flex-1 flex flex-col bg-white rounded-r p-2">
          <div className="flex justify-between">
            <div>Title</div>
            <X size={15} onClick={() => setRightPanel(false)} />
          </div>
          <div className="overflow-y-auto">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i}>hi {i + 1}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIdPage;
