"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ChatBox from "@/components/chat-box";

const ChatIdPage = () => {
  const [
    chats,
    // setChats
  ] = useState([
    { message: "Hi", role: "user" },
    { message: "Hi", role: "model" },
  ]);

  // Ref for scrollable container
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever chats change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);
  return (
    <div className="flex-1 flex flex-col bg-gray-50 gap-5">
      <div className="flex-1 overflow-y-auto" ref={containerRef}>
        {chats.map((chat, i) => (
          <div
            key={i}
            className={cn(
              "flex text-sm py-2 px-5",
              chat.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className="flex gap-2 max-w-[90%]">
              <div
                className={cn(
                  " rounded shadow p-2",
                  chat.role === "user" ? "bg-blue-100" : "bg-white"
                )}
              >
                {chat.message}
              </div>
              {chat.role === "user" && (
                <Avatar className="w-5 h-5">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center pb-5">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatIdPage;
